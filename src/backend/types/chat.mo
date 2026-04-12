import Common "common";

module {
  public type ChatMessage = {
    id : Nat;
    userId : Common.UserId;
    message : Text;
    role : Common.ChatRole;
    timestamp : Common.Timestamp;
  };
};
