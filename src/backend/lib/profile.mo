import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import ProfileTypes "../types/profile";

module {
  public type UserProfile = ProfileTypes.UserProfile;

  public func getProfile(
    profiles : Map.Map<Common.UserId, UserProfile>,
    userId : Common.UserId,
  ) : ?UserProfile {
    profiles.get(userId);
  };

  public func saveProfile(
    profiles : Map.Map<Common.UserId, UserProfile>,
    userId : Common.UserId,
    name : Text,
  ) : UserProfile {
    let existing = profiles.get(userId);
    let createdAt = switch (existing) {
      case (?p) { p.createdAt };
      case null { Time.now() };
    };
    let regionAlerts = switch (existing) {
      case (?p) { p.regionAlerts };
      case null { [] };
    };
    let profile : UserProfile = {
      userId = userId;
      name = name;
      createdAt = createdAt;
      regionAlerts = regionAlerts;
    };
    profiles.add(userId, profile);
    profile;
  };

  public func getAlertSettings(
    profiles : Map.Map<Common.UserId, UserProfile>,
    userId : Common.UserId,
  ) : [(Text, Bool)] {
    switch (profiles.get(userId)) {
      case (?p) { p.regionAlerts };
      case null { [] };
    };
  };

  public func saveAlertSettings(
    profiles : Map.Map<Common.UserId, UserProfile>,
    userId : Common.UserId,
    alerts : [(Text, Bool)],
  ) : () {
    let existing = profiles.get(userId);
    let (name, createdAt) = switch (existing) {
      case (?p) { (p.name, p.createdAt) };
      case null { ("", Time.now()) };
    };
    let profile : UserProfile = {
      userId = userId;
      name = name;
      createdAt = createdAt;
      regionAlerts = alerts;
    };
    profiles.add(userId, profile);
  };
};
