import StatusBadge from "@/components/ui/StatusBadge";
import { rideHistory } from "@/lib/data";
import type { Ride } from "@/lib/types";

export default function RideHistory() {
    return (
        <section className="mt-4 rounded-2xl bg-white/95 p-6 shadow-xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">📜 Ride History</h1>
                <p className="mt-1 text-sm text-slate-500">
                    View your completed and cancelled ride requests.
                </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                <div className="hidden grid-cols-4 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 md:grid">
                    <span>Service</span>
                    <span>Date</span>
                    <span>Driver</span>
                    <span>Status</span>
                </div>

                <div className="divide-y divide-slate-200">
                    {rideHistory.map((ride) => (
                        <HistoryRow key={ride.id} ride={ride} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function HistoryRow({ ride }: { ride: Ride }) {
    return (
        <div className="grid gap-3 px-4 py-4 text-sm text-slate-600 md:grid-cols-4 md:items-center">
            <div>
                <p className="font-medium text-slate-800">{ride.title}</p>
                <p className="mt-1 text-xs text-slate-500 md:hidden">
                    {ride.dateTime}
                </p>
            </div>

            <span className="hidden md:block">{ride.dateTime}</span>

            <span>{ride.driver ? ride.driver.name : "Not Assigned"}</span>

            <StatusBadge status={ride.status} />
        </div>
    );
}