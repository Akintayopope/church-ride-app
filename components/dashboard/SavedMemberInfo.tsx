import type { MemberProfile } from "@/lib/types";

type SavedMemberInfoProps = {
    member: MemberProfile;
    onEditProfile: () => void;
};

export default function SavedMemberInfo({
    member,
    onEditProfile,
}: SavedMemberInfoProps) {
    return (
        <section className="mt-6 rounded-xl bg-slate-50 p-6">
            <h3 className="font-bold text-slate-700">
                📍 Your Saved Information
            </h3>

            <div className="mt-5 text-sm">
                <InfoRow
                    label="Pickup Address"
                    value={member.pickupAddress}
                />

                <InfoRow
                    label="Default Passengers"
                    value={member.defaultPassengers}
                />

                <InfoRow
                    label="Phone Number"
                    value={member.phoneNumber}
                />
            </div>

            <div className="mt-4 text-center">
                <button
                    type="button"
                    onClick={onEditProfile}
                    className="text-sm font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-800"
                >
                    ✏️ Edit Information
                </button>
            </div>
        </section>
    );
}

function InfoRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex flex-col gap-1 border-b border-slate-200 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-slate-500">{label}</span>

            <span className="font-medium text-slate-800 sm:text-right">
                {value}
            </span>
        </div>
    );
}