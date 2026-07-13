import RideCard from "@/components/rides/RideCard";
import type { Ride } from "@/lib/types";

type MyRidesProps = {
    rides: Ride[];
    onCancelRide: (rideId: string) => void;
    message?: string;
    onDismissMessage?: () => void;
};

export default function MyRides({
    rides,
    onCancelRide,
    message,
    onDismissMessage,
}: MyRidesProps) {
    return (
        <section className="mt-4 rounded-2xl bg-white/95 p-6 shadow-xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    🚗 My Rides
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    View your upcoming rides and driver assignment status.
                </p>
            </div>

            {message && (
                <div className="mt-5 flex items-start justify-between gap-4 rounded-xl border border-green-200 bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-800">
                        ✅ {message}
                    </p>

                    <button
                        type="button"
                        onClick={onDismissMessage}
                        aria-label="Dismiss message"
                        className="font-bold text-green-700 hover:text-green-900"
                    >
                        ×
                    </button>
                </div>
            )}

            {rides.length > 0 ? (
                <div className="mt-6 grid gap-4">
                    {rides.map((ride) => (
                        <RideCard
                            key={ride.id}
                            ride={ride}
                            showActions
                            onCancelRide={onCancelRide}
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                    <p className="text-lg font-semibold text-slate-700">
                        No upcoming rides
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        Select a church service from the Home page to request a ride.
                    </p>
                </div>
            )}
        </section>
    );
}