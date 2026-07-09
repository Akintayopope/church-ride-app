import StatusBadge from "@/components/ui/StatusBadge";
import type { Ride } from "@/lib/types";

type RideCardProps = {
    ride: Ride;
    showActions?: boolean;
    showDriverDetails?: boolean;
};

export default function RideCard({
    ride,
    showActions = false,
    showDriverDetails = false,
}: RideCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h3 className="font-bold text-slate-800">{ride.title}</h3>

                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                        <p>🗓️ {ride.dateTime}</p>
                        <p>📍 {ride.pickupAddress}</p>
                        <p>👥 {ride.passengers}</p>
                    </div>

                    {ride.driver && !showDriverDetails && (
                        <p className="mt-3 text-sm font-medium text-slate-700">
                            🚗 Driver: {ride.driver.name}
                        </p>
                    )}
                </div>

                <StatusBadge status={ride.status} />
            </div>

            {ride.driver && showDriverDetails && (
                <div className="mt-4 rounded-xl bg-green-500 p-5 text-white shadow">
                    <h4 className="font-bold">🚗 Your Driver</h4>

                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-green-600">
                            {ride.driver.initials}
                        </div>

                        <div>
                            <p className="font-bold">{ride.driver.name}</p>
                            <p className="text-sm">
                                ⭐ {ride.driver.rating} ({ride.driver.totalRides} rides)
                            </p>
                            <p className="text-sm">🚙 {ride.driver.vehicle}</p>
                            <p className="text-sm">📱 {ride.driver.phoneNumber}</p>
                        </div>
                    </div>
                </div>
            )}

            {showActions && (
                <div className="mt-5 flex flex-wrap gap-3">
                    <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                        View Details
                    </button>

                    <button className="rounded-lg border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50">
                        Edit Ride
                    </button>

                    <button className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                        Cancel Ride
                    </button>
                </div>
            )}
        </div>
    );
}