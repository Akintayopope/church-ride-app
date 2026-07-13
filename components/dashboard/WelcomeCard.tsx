import type { MemberProfile } from "@/lib/types";

type WelcomeCardProps = {
    member: MemberProfile;
};

export default function WelcomeCard({
    member,
}: WelcomeCardProps) {
    return (
        <div className="rounded-xl bg-slate-100 px-6 py-6 text-center">
            <h1 className="text-2xl font-bold text-slate-800">
                👋 Welcome Back, {member.name}!
            </h1>

            <p className="mt-2 text-sm text-slate-500">
                Ready for your next church service?
            </p>
        </div>
    );
}