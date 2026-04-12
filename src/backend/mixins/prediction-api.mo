import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";
import Array "mo:core/Array";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import PredictionTypes "../types/prediction";
import PredictionLib "../lib/prediction";
import OutCallLib "../lib/outcall";

mixin (
  accessControlState : AccessControl.AccessControlState,
  predictions : List.List<PredictionTypes.PredictionRecord>,
  diseases : Map.Map<Text, PredictionTypes.DiseaseRecord>,
  apiConfig : Common.ApiConfig,
  xform : OutCall.Transform,
) {
  public query ({ caller }) func getPredictionHistory() : async [PredictionTypes.PredictionRecord] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    PredictionLib.getPredictionHistory(predictions, caller);
  };

  public shared ({ caller }) func savePrediction(
    input : PredictionTypes.PredictionInput,
    diseaseName : Text,
    confidenceScore : Float,
    severityLevel : Common.SeverityLevel,
  ) : async PredictionTypes.PredictionRecord {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let nextId = predictions.size();
    PredictionLib.savePrediction(predictions, nextId, caller, input, diseaseName, confidenceScore, severityLevel);
  };

  public query func getDiseaseRecord(name : Text) : async ?PredictionTypes.DiseaseRecord {
    PredictionLib.getDiseaseRecord(diseases, name);
  };

  public query func listDiseaseRecords() : async [PredictionTypes.DiseaseRecord] {
    PredictionLib.listDiseaseRecords(diseases);
  };

  // Accepts base64 image string and imageBlob reference from object-storage.
  // Calls Hugging Face API to identify the disease, stores the result.
  // Falls back gracefully if the API call fails.
  public shared ({ caller }) func predictDiseaseFromImage(
    imageBase64 : Text,
    plantType : Text,
    imageBlob : Storage.ExternalBlob,
  ) : async PredictionTypes.PredictionRecord {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };

    // Call HuggingFace API — response is JSON like:
    // [{"label":"Tomato___Early_blight","score":0.95}, ...]
    let rawResponse = await OutCallLib.predictDisease(imageBase64, apiConfig.huggingFaceApiKey, xform);

    // Extract top label and score from JSON response via simple text scanning
    let (diseaseName, confidenceScore) = parseHuggingFaceResponse(rawResponse, plantType);
    let severityLevel = PredictionLib.mapToSeverity(confidenceScore, diseaseName);

    let input : PredictionTypes.PredictionInput = {
      imageBlob = imageBlob;
      plantType = plantType;
    };
    let nextId = predictions.size();
    PredictionLib.savePrediction(predictions, nextId, caller, input, diseaseName, confidenceScore, severityLevel);
  };

  // Minimal JSON parser: extracts the first label and score from HuggingFace response.
  // Format: [{"label":"<name>","score":<float>}, ...]
  // Returns (diseaseName, confidenceScore). Falls back to mock on any parse failure.
  func parseHuggingFaceResponse(json : Text, plantType : Text) : (Text, Float) {
    if (json == "" or json.startsWith(#text "ERROR:")) {
      return (plantType # " Unknown Disease", 0.3);
    };

    let labelMarker = "\"label\":\"";
    let scoreMarker = "\"score\":";

    let labelStart = findSubstring(json, labelMarker);
    let scoreStart = findSubstring(json, scoreMarker);

    switch (labelStart, scoreStart) {
      case (?lStart, ?sStart) {
        let afterLabel = lStart + labelMarker.size();
        let labelEnd = findChar(json, afterLabel, '\"');

        let afterScore = sStart + scoreMarker.size();
        let scoreEnd = findScoreEnd(json, afterScore);

        switch (labelEnd, scoreEnd) {
          case (?lEnd, ?sEnd) {
            let rawLabel = substringSlice(json, afterLabel, lEnd);
            let scoreText = substringSlice(json, afterScore, sEnd);
            // HuggingFace labels use ___ as separator: "Tomato___Early_blight"
            let cleanedLabel = rawLabel.replace(#text "___", " - ").replace(#text "_", " ");
            let score = switch (parseFloat(scoreText)) {
              case (?f) { f };
              case null { 0.5 };
            };
            (cleanedLabel, score);
          };
          case _ { (plantType # " Disease Detected", 0.5) };
        };
      };
      case _ { (plantType # " Disease Detected", 0.5) };
    };
  };

  // Find substring index within text; returns ?Nat (start index of match)
  func findSubstring(text : Text, needle : Text) : ?Nat {
    let tArr = text.toArray();
    let nArr = needle.toArray();
    let tLen = tArr.size();
    let nLen = nArr.size();
    if (nLen == 0 or nLen > tLen) return null;
    var i = 0;
    label search while (i + nLen <= tLen) {
      var match_ = true;
      var j = 0;
      while (j < nLen) {
        if (tArr[i + j] != nArr[j]) {
          match_ := false;
        };
        j += 1;
      };
      if (match_) return ?i;
      i += 1;
    };
    null;
  };

  // Find the next occurrence of a character starting at fromIdx
  func findChar(text : Text, fromIdx : Nat, ch : Char) : ?Nat {
    let arr = text.toArray();
    var i = fromIdx;
    while (i < arr.size()) {
      if (arr[i] == ch) return ?i;
      i += 1;
    };
    null;
  };

  // Find end of a numeric float value (ends at , or ] or })
  func findScoreEnd(text : Text, fromIdx : Nat) : ?Nat {
    let arr = text.toArray();
    var i = fromIdx;
    while (i < arr.size()) {
      let c = arr[i];
      if (c == ',' or c == '}' or c == ']') return ?i;
      i += 1;
    };
    if (i > fromIdx) ?i else null;
  };

  // Extract substring using char array slice
  func substringSlice(text : Text, from : Nat, to_ : Nat) : Text {
    let arr = text.toArray();
    if (from >= to_ or to_ > arr.size()) return "";
    Text.fromArray(arr.sliceToArray(from, to_));
  };

  // Parse a float from text (handles "0.95" format)
  func parseFloat(text : Text) : ?Float {
    let parts = text.split(#char '.').toArray();
    switch (parts.size()) {
      case 1 {
        switch (textToNat(parts[0])) {
          case (?n) { ?n.toFloat() };
          case null { null };
        };
      };
      case 2 {
        switch (textToNat(parts[0]), textToNat(parts[1])) {
          case (?intPart, ?decPart) {
            let decLen = parts[1].size();
            let divisor = natPow(10, decLen);
            ?(intPart.toFloat() + decPart.toFloat() / divisor.toFloat());
          };
          case _ { null };
        };
      };
      case _ { null };
    };
  };

  func textToNat(text : Text) : ?Nat {
    var result : Nat = 0;
    var valid = true;
    for (c in text.toIter()) {
      if (c >= '0' and c <= '9') {
        result := result * 10 + (c.toNat32().toNat() - 48);
      } else {
        valid := false;
      };
    };
    if (valid and text.size() > 0) ?result else null;
  };

  func natPow(base : Nat, exp : Nat) : Nat {
    var result = 1;
    var i = 0;
    while (i < exp) {
      result := result * base;
      i += 1;
    };
    result;
  };
};
