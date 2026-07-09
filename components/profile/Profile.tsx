import { member } from "@/lib/data";

export default function Profile() {
    return (
        <section className="mt-4 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-2xl bg-white/95 p-6 text-center shadow-xl">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow">
                    {member.initials}
                </div>

                <h1 className="mt-4 text-2xl font-bold text-slate-800">
                    {member.name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Member Since {member.memberSince}
                </p>

                <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow">
                    Edit Profile
                </button>
            </div>

            <div className="rounded-2xl bg-white/95 p-6 shadow-xl">
                <h2 className="text-xl font-bold text-slate-800">
                    👤 Personal Information
                </h2>

                <div className="mt-5 space-y-4 text-sm">
                    <InfoRow label="Full Name" value={member.name} />
                    <InfoRow label="Phone Number" value={member.phoneNumber} />
                    <InfoRow label="Pickup Address" value={member.pickupAddress} />
                    <InfoRow label="Default Passengers" value={member.defaultPassengers} />
                    <InfoRow label="Member Since" value={member.memberSince} />
                </div>
            </div>
        </section>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between border-b border-slate-200 pb-3">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-800">{value}</span>
        </div>
    );
}