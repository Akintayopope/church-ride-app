import StatusBadge from "@/components/ui/StatusBadge";
import type { Ride } from "@/lib/types";

type RideHistoryProps = {
    rides: Ride[];
};

export default function RideHistory({
    rides,
}: RideHistoryProps) {
    return (
        <section className="mt-4 rounded-2xl bg-white/95 p-6 shadow-xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    📜 Ride History
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    View your completed and cancelled ride requests.
                </p>
            </div>

            {rides.length > 0 ? (
                <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                    <div className="hidden grid-cols-4 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 md:grid">
                        <span>Service</span>
                        <span>Date</span>
                        <span>Driver</span>
                        <span>Status</span>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {rides.map((ride) => (
                            <HistoryRow key={ride.id} ride={ride} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                    <p className="text-lg font-semibold text-slate-700">
                        No ride history
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        Completed and cancelled rides will appear here.
                    </p>
                </div>
            )}
        </section>
    );
}

function HistoryRow({ ride }: { ride: Ride }) {
    return (
        <div className="grid gap-3 px-4 py-4 text-sm text-slate-600 md:grid-cols-4 md:items-center">
            <div>
                <p className="font-medium text-slate-800">
                    {ride.title}
                </p>

                <p className="mt-1 text-xs text-slate-500 md:hidden">
                    {ride.dateTime}
                </p>
            </div>

            <span className="hidden md:block">
                {ride.dateTime}
            </span>

            <span>
                {ride.driver ? ride.driver.name : "Not Assigned"}
            </span>

            <StatusBadge status={ride.status} />
        </div>
    );
}