import type {
    MemberProfile,
    Ride,
    ServiceKey,
} from "@/lib/types";

import JourneyStats from "./JourneyStats";
import QuickBookingCard from "./QuickBookingCard";
import SavedMemberInfo from "./SavedMemberInfo";
import UpcomingRides from "./UpcomingRides";
import WelcomeCard from "./WelcomeCard";

type DashboardHomeProps = {
    member: MemberProfile;
    rides: Ride[];
    onRequestRide: (serviceId: ServiceKey) => void;
    onEditProfile: () => void;
};

export default function DashboardHome({
    member,
    rides,
    onRequestRide,
    onEditProfile,
}: DashboardHomeProps) {
    return (
        <section className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl bg-white/95 p-6 shadow-xl">
                <WelcomeCard member={member} />

                <QuickBookingCard onRequestRide={onRequestRide} />

                <SavedMemberInfo
                    member={member}
                    onEditProfile={onEditProfile}
                />
            </div>

            <div className="space-y-4">
                <JourneyStats />
                <UpcomingRides rides={rides} />
            </div>
        </section>
    );
}