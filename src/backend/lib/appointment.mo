import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import AppointmentTypes "../types/appointment";

module {
  public type Appointment = AppointmentTypes.Appointment;
  public type AppointmentInput = AppointmentTypes.AppointmentInput;

  public func getAppointments(
    appointments : List.List<Appointment>,
    userId : Common.UserId,
  ) : [Appointment] {
    appointments.filter(func(a) { a.userId == userId }).toArray();
  };

  public func bookAppointment(
    appointments : List.List<Appointment>,
    nextId : Nat,
    userId : Common.UserId,
    input : AppointmentInput,
  ) : Appointment {
    let appt : Appointment = {
      id = nextId;
      userId = userId;
      name = input.name;
      phone = input.phone;
      location = input.location;
      preferredDatetime = input.preferredDatetime;
      diseaseName = input.diseaseName;
      severity = input.severity;
      status = #pending;
      createdAt = Time.now();
    };
    appointments.add(appt);
    appt;
  };

  public func updateAppointmentStatus(
    appointments : List.List<Appointment>,
    id : Nat,
    status : Common.AppointmentStatus,
  ) : Bool {
    var found = false;
    appointments.mapInPlace(func(a) {
      if (a.id == id) {
        found := true;
        { a with status = status };
      } else {
        a;
      };
    });
    found;
  };
};
