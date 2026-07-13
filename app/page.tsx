"use client";

import DriverDashboard from "@/components/driver/DriverDashboard";
import AppShell from "@/components/layout/AppShell";
import MemberApp from "@/components/member/MemberApp";

import useRideManagement from "@/hooks/useRideManagement";

export default function Home() {
  const {
    member,
    drivers,
    rides,
    history,
    message,
    requestRide,
    cancelRide,
    acceptRide,
    declineRide,
    updateMember,
    dismissMessage,
  } = useRideManagement();

  const isDriver =
    member.hasCar &&
    member.isApprovedDriver &&
    member.driverId !== null;

  const currentDriver = isDriver
    ? drivers.find(
      (driver) => driver.id === member.driverId,
    )
    : undefined;

  return (
    <AppShell>
      {isDriver && currentDriver ? (
        <DriverDashboard
          member={member}
          driver={currentDriver}
          rides={rides}
          message={message}
          onAcceptRide={acceptRide}
          onDeclineRide={declineRide}
          onDismissMessage={dismissMessage}
        />
      ) : (
        <MemberApp
          member={member}
          rides={rides}
          history={history}
          message={message}
          onRequestRide={requestRide}
          onCancelRide={cancelRide}
          onUpdateMember={updateMember}
          onDismissMessage={dismissMessage}
        />
      )}
    </AppShell>
  );
}