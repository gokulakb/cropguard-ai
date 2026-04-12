module {
  public type UserId = Principal;
  public type Timestamp = Int;

  public type SeverityLevel = {
    #mild;
    #moderate;
    #severe;
  };

  public type AppointmentStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  public type ChatRole = {
    #user;
    #assistant;
  };

  // Mutable container for API keys — passed by reference to mixins so
  // admin_set* methods in main.mo can update keys and mixins see the change.
  public type ApiConfig = {
    var openAiApiKey : Text;
    var huggingFaceApiKey : Text;
  };
};
