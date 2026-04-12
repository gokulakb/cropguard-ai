import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";

import ProfileTypes "types/profile";
import CommunityTypes "types/community";
import Common "types/common";

module {
  // ── Old inline type definitions (copied from .old/src/backend) ─────────────

  type OldSuccessStory = {
    id : Text;
    userId : Principal;
    authorName : Text;
    cropType : Text;
    diseaseName : Text;
    beforeDescription : Text;
    afterDescription : Text;
    treatmentUsed : Text;
    likesCount : Nat;
    createdAt : Int;
  };

  type OldUserProfile = {
    userId : Principal;
    name : Text;
    createdAt : Int;
  };

  // ── Migration record types ──────────────────────────────────────────────────

  type OldActor = {
    successStories : List.List<OldSuccessStory>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewActor = {
    successStories : List.List<CommunityTypes.SuccessStory>;
    userProfiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>;
  };

  // ── Migration function ──────────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let successStories = old.successStories.map<OldSuccessStory, CommunityTypes.SuccessStory>(
      func(s) { { s with photoUrl = null } }
    );

    let userProfiles = old.userProfiles.map<Principal, OldUserProfile, ProfileTypes.UserProfile>(
      func(_id, p) { { p with regionAlerts = [] } }
    );

    { successStories; userProfiles };
  };
};
