import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import AgronomyTypes "../types/agronomy";
import AgronomyLib "../lib/agronomy";

mixin (
  accessControlState : AccessControl.AccessControlState,
  cropCalendar : List.List<AgronomyTypes.CropCalendarEntry>,
  expertContacts : List.List<AgronomyTypes.ExpertContact>,
  fertilizerGuides : List.List<AgronomyTypes.FertilizerGuide>,
) {
  public query func getCropCalendar(cropType : Text) : async ?AgronomyTypes.CropCalendarEntry {
    AgronomyLib.getCropCalendar(cropCalendar, cropType);
  };

  public query func estimateYield(
    cropType : Text,
    areaHectares : Float,
    healthStatus : Text,
  ) : async AgronomyTypes.YieldEstimation {
    AgronomyLib.estimateYield(cropType, areaHectares, healthStatus);
  };

  public query func getExpertContacts(region : Text) : async [AgronomyTypes.ExpertContact] {
    AgronomyLib.getExpertContacts(expertContacts, region);
  };

  public shared ({ caller }) func addExpertContact(
    name : Text,
    region : Text,
    district : Text,
    phone : Text,
    email : Text,
    specialization : Text,
    available : Bool,
  ) : async AgronomyTypes.ExpertContact {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: admin only");
    };
    AgronomyLib.addExpertContact(expertContacts, name, region, district, phone, email, specialization, available);
  };

  public query func getFertilizerGuide(
    cropType : Text,
    growthStage : Text,
  ) : async ?AgronomyTypes.FertilizerGuide {
    AgronomyLib.getFertilizerGuide(fertilizerGuides, cropType, growthStage);
  };
};
