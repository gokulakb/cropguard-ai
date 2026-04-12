import Common "common";

module {
  public type UserProfile = {
    userId : Common.UserId;
    name : Text;
    createdAt : Common.Timestamp;
    regionAlerts : [(Text, Bool)];
  };
};
