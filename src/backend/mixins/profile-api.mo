import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import ProfileTypes "../types/profile";
import ProfileLib "../lib/profile";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProfileLib.getProfile(userProfiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(name : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ignore ProfileLib.saveProfile(userProfiles, caller, name);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?ProfileTypes.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    ProfileLib.getProfile(userProfiles, user);
  };

  // ── Region Alert Settings ─────────────────────────────────────────────────

  public query ({ caller }) func getCallerAlertSettings() : async [(Text, Bool)] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProfileLib.getAlertSettings(userProfiles, caller);
  };

  public shared ({ caller }) func saveCallerAlertSettings(alerts : [(Text, Bool)]) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProfileLib.saveAlertSettings(userProfiles, caller, alerts);
  };
};
