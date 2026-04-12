import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import CommunityTypes "../types/community";
import PredictionTypes "../types/prediction";
import ProfileTypes "../types/profile";
import CommunityLib "../lib/community";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reminders : List.List<CommunityTypes.TreatmentReminder>,
  forumPosts : List.List<CommunityTypes.ForumPost>,
  forumReplies : List.List<CommunityTypes.ForumReply>,
  successStories : List.List<CommunityTypes.SuccessStory>,
  predictions : List.List<PredictionTypes.PredictionRecord>,
  userProfiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
  readNotifications : Map.Map<Common.UserId, [Text]>,
) {
  // ── Treatment Reminders ───────────────────────────────────────────────────

  public shared ({ caller }) func addReminder(
    predictionId : Text,
    diseaseName : Text,
    reminderDate : Common.Timestamp,
    note : Text,
  ) : async CommunityTypes.TreatmentReminder {
    CommunityLib.addReminder(reminders, caller, predictionId, diseaseName, reminderDate, note);
  };

  public shared query ({ caller }) func getReminders() : async [CommunityTypes.TreatmentReminder] {
    CommunityLib.getReminders(reminders, caller);
  };

  public shared ({ caller }) func completeReminder(reminderId : Text) : async Bool {
    CommunityLib.completeReminder(reminders, reminderId, caller);
  };

  // ── Forum Posts ───────────────────────────────────────────────────────────

  public shared ({ caller }) func createForumPost(
    authorName : Text,
    title : Text,
    body : Text,
    cropType : Text,
    tags : [Text],
  ) : async CommunityTypes.ForumPost {
    CommunityLib.createForumPost(forumPosts, caller, authorName, title, body, cropType, tags);
  };

  public query func getForumPosts(offset : Nat, limit : Nat) : async [CommunityTypes.ForumPost] {
    CommunityLib.getForumPosts(forumPosts, offset, limit);
  };

  public query func getForumPost(postId : Text) : async ?CommunityTypes.ForumPost {
    CommunityLib.getForumPost(forumPosts, postId);
  };

  public shared ({ caller }) func likePost(postId : Text) : async Bool {
    CommunityLib.likePost(forumPosts, postId);
  };

  public query func getForumLeaderboard() : async [CommunityTypes.ForumLeaderboardEntry] {
    CommunityLib.getForumLeaderboard(forumPosts);
  };

  // ── Forum Replies ─────────────────────────────────────────────────────────

  public shared ({ caller }) func replyToPost(
    postId : Text,
    authorName : Text,
    body : Text,
  ) : async CommunityTypes.ForumReply {
    CommunityLib.replyToPost(forumReplies, postId, caller, authorName, body);
  };

  public query func getReplies(postId : Text) : async [CommunityTypes.ForumReply] {
    CommunityLib.getReplies(forumReplies, postId);
  };

  // ── Success Stories ───────────────────────────────────────────────────────

  public shared ({ caller }) func createSuccessStory(
    authorName : Text,
    cropType : Text,
    diseaseName : Text,
    beforeDescription : Text,
    afterDescription : Text,
    treatmentUsed : Text,
    photoUrl : ?Text,
  ) : async CommunityTypes.SuccessStory {
    CommunityLib.createSuccessStory(successStories, caller, authorName, cropType, diseaseName, beforeDescription, afterDescription, treatmentUsed, photoUrl);
  };

  public query func getSuccessStories() : async [CommunityTypes.SuccessStory] {
    CommunityLib.getSuccessStories(successStories);
  };

  public shared ({ caller }) func likeSuccessStory(storyId : Text) : async Bool {
    CommunityLib.likeSuccessStory(successStories, storyId);
  };

  // ── Disease Severity Map ──────────────────────────────────────────────────

  public query func getDiseaseSeverityMap() : async [CommunityTypes.DiseaseSeverityEntry] {
    // Project PredictionRecord to the structural type expected by the lib function
    let projected = predictions.map<PredictionTypes.PredictionRecord, { diseaseName : Text }>(
      func(p) { { diseaseName = p.diseaseName } }
    );
    CommunityLib.getDiseaseSeverityMap(projected);
  };

  // ── Notifications ─────────────────────────────────────────────────────────

  public shared query ({ caller }) func getNotifications() : async [CommunityTypes.AppNotification] {
    let regionAlerts : [(Text, Bool)] = switch (userProfiles.get(caller)) {
      case (?p) p.regionAlerts;
      case null [];
    };
    let readIds : [Text] = switch (readNotifications.get(caller)) {
      case (?ids) ids;
      case null [];
    };
    CommunityLib.getNotifications(reminders, predictions, caller, regionAlerts, readIds);
  };

  public shared ({ caller }) func markNotificationRead(notifId : Text) : async () {
    let existing : [Text] = switch (readNotifications.get(caller)) {
      case (?ids) ids;
      case null [];
    };
    // Only add if not already present
    let alreadyRead = existing.find(func(id : Text) : Bool { id == notifId });
    switch (alreadyRead) {
      case (?_) {}; // already marked
      case null {
        readNotifications.add(caller, existing.concat([notifId]));
      };
    };
  };
};
