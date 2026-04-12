import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import OutCall "mo:caffeineai-http-outcalls/outcall";

import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Common "types/common";
import PredictionTypes "types/prediction";
import AppointmentTypes "types/appointment";
import ChatTypes "types/chat";
import ProfileTypes "types/profile";
import CommunityTypes "types/community";
import AgronomyTypes "types/agronomy";
import PredictionLib "lib/prediction";
import AgronomyLib "lib/agronomy";
import PredictionApiMixin "mixins/prediction-api";
import AppointmentApiMixin "mixins/appointment-api";
import ChatApiMixin "mixins/chat-api";
import ProfileApiMixin "mixins/profile-api";
import CommunityApiMixin "mixins/community-api";
import AgronomyApiMixin "mixins/agronomy-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Transform callback for HTTP outcalls (required by IC HTTP outcall mechanism)
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // API keys — stored in a mutable record so admin_set* methods update the same
  // reference that mixins hold. Keys start empty; set them after deployment.
  let apiConfig : Common.ApiConfig = {
    var openAiApiKey = "";
    var huggingFaceApiKey = "";
  };

  // Allow the canister admin to set the OpenAI API key after deployment
  public shared ({ caller }) func admin_setOpenAiKey(key : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: admin only");
    };
    apiConfig.openAiApiKey := key;
  };

  // Allow the canister admin to set the Hugging Face API key after deployment
  public shared ({ caller }) func admin_setHuggingFaceKey(key : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: admin only");
    };
    apiConfig.huggingFaceApiKey := key;
  };

  // Domain state
  let predictions = List.empty<PredictionTypes.PredictionRecord>();
  let diseases = Map.empty<Text, PredictionTypes.DiseaseRecord>();

  let appointments = List.empty<AppointmentTypes.Appointment>();

  let chatMessages = List.empty<ChatTypes.ChatMessage>();

  let userProfiles = Map.empty<Common.UserId, ProfileTypes.UserProfile>();

  // Seed the disease database with 15+ common crop diseases
  PredictionLib.seedDiseases(diseases);

  // Community state
  let reminders = List.empty<CommunityTypes.TreatmentReminder>();
  let forumPosts = List.empty<CommunityTypes.ForumPost>();
  let forumReplies = List.empty<CommunityTypes.ForumReply>();
  let successStories = List.empty<CommunityTypes.SuccessStory>();

  // Tracks which notification IDs each user has marked as read
  let readNotifications = Map.empty<Common.UserId, [Text]>();

  // Agronomy state — seeded on first run
  let cropCalendar = List.empty<AgronomyTypes.CropCalendarEntry>();
  let expertContacts = List.empty<AgronomyTypes.ExpertContact>();
  let fertilizerGuides = List.empty<AgronomyTypes.FertilizerGuide>();

  AgronomyLib.seedCropCalendar(cropCalendar);
  AgronomyLib.seedExpertContacts(expertContacts);
  AgronomyLib.seedFertilizerGuides(fertilizerGuides);

  // Mixin composition — apiConfig passed by reference so key updates are visible
  include PredictionApiMixin(accessControlState, predictions, diseases, apiConfig, transform);
  include AppointmentApiMixin(accessControlState, appointments);
  include ChatApiMixin(accessControlState, chatMessages, apiConfig, transform);
  include ProfileApiMixin(accessControlState, userProfiles);
  include CommunityApiMixin(accessControlState, reminders, forumPosts, forumReplies, successStories, predictions, userProfiles, readNotifications);
  include AgronomyApiMixin(accessControlState, cropCalendar, expertContacts, fertilizerGuides);
};
