import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Common "../types/common";
import CommunityTypes "../types/community";
import PredictionTypes "../types/prediction";

module {
  // ── helpers ──────────────────────────────────────────────────────────────

  func makeId(prefix : Text, idx : Nat) : Text {
    prefix # "-" # debug_show (idx);
  };

  // 30 days in nanoseconds
  func thirtyDaysNs() : Int { 30 * 24 * 60 * 60 * 1_000_000_000 };

  // Region assignment based on disease name (simple hash-based bucketing)
  let regions : [Text] = ["North", "South", "East", "West", "Central", "Northeast", "Northwest", "Southeast", "Southwest"];

  func diseaseRegion(diseaseName : Text) : Text {
    var h : Nat = 0;
    for (c in diseaseName.toIter()) {
      h := (h * 31 + (h + 1)) % regions.size(); // simple deterministic spread
    };
    regions[h % regions.size()];
  };

  // ── TreatmentReminder ────────────────────────────────────────────────────

  public func addReminder(
    reminders : List.List<CommunityTypes.TreatmentReminder>,
    userId : Common.UserId,
    predictionId : Text,
    diseaseName : Text,
    reminderDate : Common.Timestamp,
    note : Text,
  ) : CommunityTypes.TreatmentReminder {
    let id = makeId("rem", reminders.size());
    let now = Time.now();
    let reminder : CommunityTypes.TreatmentReminder = {
      id;
      userId;
      predictionId;
      diseaseName;
      reminderDate;
      note;
      completed = false;
      createdAt = now;
    };
    reminders.add(reminder);
    reminder;
  };

  public func getReminders(
    reminders : List.List<CommunityTypes.TreatmentReminder>,
    userId : Common.UserId,
  ) : [CommunityTypes.TreatmentReminder] {
    reminders.filter(func(r) { r.userId == userId }).toArray();
  };

  public func completeReminder(
    reminders : List.List<CommunityTypes.TreatmentReminder>,
    reminderId : Text,
    userId : Common.UserId,
  ) : Bool {
    var found = false;
    reminders.mapInPlace(func(r) {
      if (r.id == reminderId and r.userId == userId) {
        found := true;
        { r with completed = true };
      } else { r };
    });
    found;
  };

  // ── ForumPost ─────────────────────────────────────────────────────────────

  public func createForumPost(
    posts : List.List<CommunityTypes.ForumPost>,
    userId : Common.UserId,
    authorName : Text,
    title : Text,
    body : Text,
    cropType : Text,
    tags : [Text],
  ) : CommunityTypes.ForumPost {
    let id = makeId("post", posts.size());
    let now = Time.now();
    let post : CommunityTypes.ForumPost = {
      id;
      userId;
      authorName;
      title;
      body;
      cropType;
      tags;
      likesCount = 0;
      createdAt = now;
      updatedAt = now;
    };
    posts.add(post);
    post;
  };

  public func getForumPosts(
    posts : List.List<CommunityTypes.ForumPost>,
    offset : Nat,
    limit : Nat,
  ) : [CommunityTypes.ForumPost] {
    let total = posts.size();
    if (offset >= total) return [];
    let toExcl : Int = if (offset + limit > total) { total } else { offset + limit };
    posts.sliceToArray(offset, toExcl);
  };

  public func getForumPost(
    posts : List.List<CommunityTypes.ForumPost>,
    postId : Text,
  ) : ?CommunityTypes.ForumPost {
    posts.find(func(p) { p.id == postId });
  };

  public func likePost(
    posts : List.List<CommunityTypes.ForumPost>,
    postId : Text,
  ) : Bool {
    var found = false;
    posts.mapInPlace(func(p) {
      if (p.id == postId) {
        found := true;
        { p with likesCount = p.likesCount + 1 };
      } else { p };
    });
    found;
  };

  // ── Forum Leaderboard ─────────────────────────────────────────────────────

  public func getForumLeaderboard(
    posts : List.List<CommunityTypes.ForumPost>,
  ) : [CommunityTypes.ForumLeaderboardEntry] {
    // Accumulate postCount and totalLikes per userId
    let postCounts = Map.empty<Common.UserId, Nat>();
    let likeCounts = Map.empty<Common.UserId, Nat>();
    let displayNames = Map.empty<Common.UserId, Text>();

    posts.forEach(func(p) {
      let pc = switch (postCounts.get(p.userId)) { case (?n) n; case null 0 };
      postCounts.add(p.userId, pc + 1);

      let lc = switch (likeCounts.get(p.userId)) { case (?n) n; case null 0 };
      likeCounts.add(p.userId, lc + p.likesCount);

      // Always update so we keep the most recent name
      displayNames.add(p.userId, p.authorName);
    });

    // Build entries
    let entries = List.empty<CommunityTypes.ForumLeaderboardEntry>();
    for ((uid, pc) in postCounts.entries()) {
      let lc = switch (likeCounts.get(uid)) { case (?n) n; case null 0 };
      let name = switch (displayNames.get(uid)) { case (?n) n; case null "" };
      entries.add({
        userId = uid;
        displayName = name;
        postCount = pc;
        totalLikes = lc;
        score = pc + lc * 2;
      });
    };

    // Sort descending by score, return top 10
    let sorted = entries.sort(func(a : CommunityTypes.ForumLeaderboardEntry, b : CommunityTypes.ForumLeaderboardEntry) : Order.Order {
      if (b.score > a.score) #less
      else if (b.score < a.score) #greater
      else #equal
    });
    sorted.sliceToArray(0, if (sorted.size() < 10) sorted.size() else 10);
  };

  // ── ForumReply ────────────────────────────────────────────────────────────

  public func replyToPost(
    replies : List.List<CommunityTypes.ForumReply>,
    postId : Text,
    userId : Common.UserId,
    authorName : Text,
    body : Text,
  ) : CommunityTypes.ForumReply {
    let id = makeId("reply", replies.size());
    let reply : CommunityTypes.ForumReply = {
      id;
      postId;
      userId;
      authorName;
      body;
      likesCount = 0;
      createdAt = Time.now();
    };
    replies.add(reply);
    reply;
  };

  public func getReplies(
    replies : List.List<CommunityTypes.ForumReply>,
    postId : Text,
  ) : [CommunityTypes.ForumReply] {
    replies.filter(func(r) { r.postId == postId }).toArray();
  };

  // ── SuccessStory ──────────────────────────────────────────────────────────

  public func createSuccessStory(
    stories : List.List<CommunityTypes.SuccessStory>,
    userId : Common.UserId,
    authorName : Text,
    cropType : Text,
    diseaseName : Text,
    beforeDescription : Text,
    afterDescription : Text,
    treatmentUsed : Text,
    photoUrl : ?Text,
  ) : CommunityTypes.SuccessStory {
    let id = makeId("story", stories.size());
    let story : CommunityTypes.SuccessStory = {
      id;
      userId;
      authorName;
      cropType;
      diseaseName;
      beforeDescription;
      afterDescription;
      treatmentUsed;
      photoUrl;
      likesCount = 0;
      createdAt = Time.now();
    };
    stories.add(story);
    story;
  };

  public func getSuccessStories(
    stories : List.List<CommunityTypes.SuccessStory>,
  ) : [CommunityTypes.SuccessStory] {
    stories.toArray();
  };

  public func likeSuccessStory(
    stories : List.List<CommunityTypes.SuccessStory>,
    storyId : Text,
  ) : Bool {
    var found = false;
    stories.mapInPlace(func(s) {
      if (s.id == storyId) {
        found := true;
        { s with likesCount = s.likesCount + 1 };
      } else { s };
    });
    found;
  };

  // ── Disease Severity Map ──────────────────────────────────────────────────

  public func getDiseaseSeverityMap(
    predictions : List.List<{ diseaseName : Text }>,
  ) : [CommunityTypes.DiseaseSeverityEntry] {
    let counts = Map.empty<Text, Nat>();
    predictions.forEach(func(p) {
      let current = switch (counts.get(p.diseaseName)) {
        case (?n) n;
        case null 0;
      };
      counts.add(p.diseaseName, current + 1);
    });
    let entries = List.empty<CommunityTypes.DiseaseSeverityEntry>();
    for ((name, count) in counts.entries()) {
      entries.add({ diseaseName = name; count });
    };
    entries.toArray();
  };

  // ── Notifications ─────────────────────────────────────────────────────────

  public func getNotifications(
    reminders : List.List<CommunityTypes.TreatmentReminder>,
    predictions : List.List<PredictionTypes.PredictionRecord>,
    userId : Common.UserId,
    regionAlerts : [(Text, Bool)],
    readIds : [Text],
  ) : [CommunityTypes.AppNotification] {
    let now = Time.now();
    let readSet = Map.empty<Text, Bool>();
    for (rid in readIds.values()) {
      readSet.add(rid, true);
    };

    let result = List.empty<CommunityTypes.AppNotification>();

    // (a) Overdue treatment reminders for this user
    for (r in reminders.values()) {
      if (r.userId == userId and not r.completed and r.reminderDate < now) {
        let notifId = "rem-" # r.id;
        let isRead = switch (readSet.get(notifId)) { case (?_) true; case null false };
        result.add({
          notifId;
          notifType = "reminder";
          message = "Overdue treatment reminder: " # r.diseaseName # " — " # r.note;
          timestamp = r.reminderDate;
          isRead;
        });
      };
    };

    // (b) Regional alert notifications — count per region in last 30 days
    let cutoff = now - thirtyDaysNs();
    let regionCounts = Map.empty<Text, Nat>();
    for (p in predictions.values()) {
      if (p.timestamp >= cutoff) {
        let region = diseaseRegion(p.diseaseName);
        let cnt = switch (regionCounts.get(region)) { case (?n) n; case null 0 };
        regionCounts.add(region, cnt + 1);
      };
    };

    for ((region, enabled) in regionAlerts.values()) {
      if (enabled) {
        let count = switch (regionCounts.get(region)) { case (?n) n; case null 0 };
        if (count > 5) {
          let notifId = "region-" # region;
          let isRead = switch (readSet.get(notifId)) { case (?_) true; case null false };
          result.add({
            notifId;
            notifType = "regional_alert";
            message = "Disease alert for " # region # " region: " # debug_show(count) # " reports in the last 30 days";
            timestamp = now;
            isRead;
          });
        };
      };
    };

    result.toArray();
  };
};
