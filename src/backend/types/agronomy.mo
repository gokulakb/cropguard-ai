module {
  public type CropCalendarEntry = {
    cropType : Text;
    region : Text;
    sowingMonths : [Nat];
    harvestMonths : [Nat];
    growthDuration : Nat;
    notes : Text;
  };

  public type YieldEstimation = {
    cropType : Text;
    areaHectares : Float;
    healthStatus : Text;
    estimatedYieldKg : Float;
    notes : Text;
  };

  public type ExpertContact = {
    id : Text;
    name : Text;
    region : Text;
    district : Text;
    phone : Text;
    email : Text;
    specialization : Text;
    available : Bool;
  };

  public type FertilizerGuide = {
    cropType : Text;
    growthStage : Text;
    npkRatio : Text;
    organicOptions : [Text];
    applicationTiming : Text;
    soilPhRange : Text;
    notes : Text;
  };
};
