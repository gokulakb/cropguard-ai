import OutCall "mo:caffeineai-http-outcalls/outcall";

module {
  // Call Hugging Face image classification API with base64 image data.
  // Returns raw JSON response text from the API, or an error string prefixed with "ERROR:".
  public func predictDisease(
    imageBase64 : Text,
    huggingFaceApiKey : Text,
    transform : OutCall.Transform,
  ) : async Text {
    if (huggingFaceApiKey == "") {
      return "ERROR: Hugging Face API key is not configured. Please contact the administrator.";
    };
    let url = "https://api-inference.huggingface.co/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification";
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = "Bearer " # huggingFaceApiKey },
      { name = "Content-Type"; value = "application/json" },
    ];
    // The HuggingFace inference API for image models accepts base64 JSON body
    let body = "{\"inputs\":\"" # imageBase64 # "\"}";
    try {
      await OutCall.httpPostRequest(url, headers, body, transform);
    } catch (_e) {
      "ERROR: Failed to reach Hugging Face API. Please try again later.";
    };
  };

  // Call OpenAI Chat Completions API.
  // messages: array of {role, content} objects already serialized as JSON array string.
  // Returns raw JSON response text, or an error string prefixed with "ERROR:".
  public func chatWithOpenAI(
    messagesJson : Text,
    openAiApiKey : Text,
    transform : OutCall.Transform,
  ) : async Text {
    if (openAiApiKey == "") {
      return "ERROR: OpenAI API key is not configured. Please contact the administrator.";
    };
    let url = "https://api.openai.com/v1/chat/completions";
    let headers : [OutCall.Header] = [
      { name = "Authorization"; value = "Bearer " # openAiApiKey },
      { name = "Content-Type"; value = "application/json" },
    ];
    let body = "{\"model\":\"gpt-3.5-turbo\",\"messages\":" # messagesJson # ",\"max_tokens\":500}";
    try {
      await OutCall.httpPostRequest(url, headers, body, transform);
    } catch (_e) {
      "ERROR: Failed to reach OpenAI API. Please check your connection and try again.";
    };
  };
};
