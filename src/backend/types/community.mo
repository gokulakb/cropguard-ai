import Common "common";

module {
  public type TreatmentReminder = {
    id : Text;
    userId : Common.UserId;
    predictionId : Text;
    diseaseName : Text;
    reminderDate : Common.Timestamp;
    note : Text;
    completed : Bool;
    createdAt : Common.Timestamp;
  };

  public type ForumPost = {
    id : Text;
    userId : Common.UserId;
    authorName : Text;
    title : Text;
    body : Text;
    cropType : Text;
    tags : [Text];
    likesCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type ForumReply = {
    id : Text;
    postId : Text;
    userId : Common.UserId;
    authorName : Text;
    body : Text;
    likesCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type SuccessStory = {
    id : Text;
    userId : Common.UserId;
    authorName : Text;
    cropType : Text;
    diseaseName : Text;
    beforeDescription : Text;
    afterDescription : Text;
    treatmentUsed : Text;
    photoUrl : ?Text;
    likesCount : Nat;
    createdAt : Common.Timestamp;
  };

  public type DiseaseSeverityEntry = {
    diseaseName : Text;
    count : Nat;
  };

  // Leaderboard entry — score = postCount + (totalLikes * 2)
  public type ForumLeaderboardEntry = {
    userId : Common.UserId;
    displayName : Text;
    postCount : Nat;
    totalLikes : Nat;
    score : Nat;
  };

  // In-app notification (derived — not stored, read state tracked separately)
  public type AppNotification = {
    notifId : Text;
    notifType : Text;
    message : Text;
    timestamp : Common.Timestamp;
    isRead : Bool;
  };
};
