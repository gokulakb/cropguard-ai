import Common "common";

module {
  public type Appointment = {
    id : Nat;
    userId : Common.UserId;
    name : Text;
    phone : Text;
    location : Text;
    preferredDatetime : Text;
    diseaseName : Text;
    severity : Common.SeverityLevel;
    status : Common.AppointmentStatus;
    createdAt : Common.Timestamp;
  };

  public type AppointmentInput = {
    name : Text;
    phone : Text;
    location : Text;
    preferredDatetime : Text;
    diseaseName : Text;
    severity : Common.SeverityLevel;
  };
};
