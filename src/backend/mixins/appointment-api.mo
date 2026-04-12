import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import AppointmentTypes "../types/appointment";
import AppointmentLib "../lib/appointment";

mixin (
  accessControlState : AccessControl.AccessControlState,
  appointments : List.List<AppointmentTypes.Appointment>,
) {
  public query ({ caller }) func getAppointments() : async [AppointmentTypes.Appointment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    AppointmentLib.getAppointments(appointments, caller);
  };

  public shared ({ caller }) func bookAppointment(
    input : AppointmentTypes.AppointmentInput,
  ) : async AppointmentTypes.Appointment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let nextId = appointments.size();
    AppointmentLib.bookAppointment(appointments, nextId, caller, input);
  };

  public shared ({ caller }) func updateAppointmentStatus(
    id : Nat,
    status : Common.AppointmentStatus,
  ) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update appointment status");
    };
    AppointmentLib.updateAppointmentStatus(appointments, id, status);
  };
};
