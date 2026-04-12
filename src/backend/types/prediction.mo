import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type DiseaseRecord = {
    id : Nat;
    name : Text;
    plantType : Text;
    cause : Text;
    severityLevel : Common.SeverityLevel;
    preventionSteps : [Text];
    treatmentSteps : [Text];
    medicationNames : [Text];
  };

  public type PredictionRecord = {
    id : Nat;
    userId : Common.UserId;
    imageBlob : Storage.ExternalBlob;
    diseaseName : Text;
    confidenceScore : Float;
    severityLevel : Common.SeverityLevel;
    timestamp : Common.Timestamp;
  };

  public type PredictionInput = {
    imageBlob : Storage.ExternalBlob;
    plantType : Text;
  };
};
