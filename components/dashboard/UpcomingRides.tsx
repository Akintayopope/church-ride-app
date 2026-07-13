import RideCard from "@/components/rides/RideCard";
import type { Ride } from "@/lib/types";

type UpcomingRidesProps = {
    rides: Ride[];
};

export default function UpcomingRides({
    rides,
}: UpcomingRidesProps) {
    const activeRides = rides.filter(
        (ride) =>
            ride.status !== "cancelled" &&
            ride.status !== "completed",
    );

    return (
        <section className="rounded-2xl bg-white/95 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800">
                🚗 Upcoming Rides
            </h2>

            {activeRides.length > 0 ? (
                <div className="mt-5 space-y-4">
                    {activeRides.map((ride) => (
                        <RideCard
                            key={ride.id}
                            ride={ride}
                            showDriverDetails
                        />
                    ))}
                </div>
            ) : (
                <p className="mt-5 text-sm text-slate-500">
                    You do not have any upcoming rides.
                </p>
            )}
        </section>
    );
}