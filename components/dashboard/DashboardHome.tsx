import WelcomeCard from "./WelcomeCard";
import QuickBookingCard from "./QuickBookingCard";
import SavedMemberInfo from "./SavedMemberInfo";
import JourneyStats from "./JourneyStats";
import UpcomingRides from "./UpcomingRides";

export default function DashboardHome() {
    return (
        <section className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl bg-white/95 p-6 shadow-xl">
                <WelcomeCard />
                <QuickBookingCard />
                <SavedMemberInfo />
            </div>

            <div className="space-y-4">
                <JourneyStats />
                <UpcomingRides />
            </div>
        </section>
    );
}