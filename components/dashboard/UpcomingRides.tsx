import RideCard from "@/components/rides/RideCard";
import { upcomingRides } from "@/lib/data";

export default function UpcomingRides() {
    return (
        <section className="rounded-2xl bg-white/95 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800">🚗 Upcoming Rides</h2>

            <div className="mt-5 space-y-4">
                {upcomingRides.map((ride) => (
                    <RideCard key={ride.id} ride={ride} showDriverDetails />
                ))}
            </div>
        </section>
    );
}