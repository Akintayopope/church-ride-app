import RideCard from "@/components/rides/RideCard";
import { upcomingRides } from "@/lib/data";

export default function MyRides() {
    return (
        <section className="mt-4 rounded-2xl bg-white/95 p-6 shadow-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">🚗 My Rides</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your upcoming ride requests.
                    </p>
                </div>

                <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:scale-[1.02]">
                    + Request Ride
                </button>
            </div>

            <div className="mt-6 grid gap-4">
                {upcomingRides.map((ride) => (
                    <RideCard key={ride.id} ride={ride} showActions />
                ))}
            </div>
        </section>
    );
}