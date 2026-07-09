import { member } from "@/lib/data";

export default function SavedMemberInfo() {
    return (
        <section className="mt-6 rounded-xl bg-slate-50 p-6">
            <h3 className="font-bold text-slate-700">📍 Your Saved Information</h3>

            <div className="mt-5 space-y-0 text-sm">
                <InfoRow label="Pickup Address" value={member.pickupAddress} />
                <InfoRow label="Default Passengers" value={member.defaultPassengers} />
                <InfoRow label="Phone Number" value={member.phoneNumber} />
            </div>

            <div className="mt-4 text-center">
                <button className="text-sm font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-800">
                    ✏️ Edit Information
                </button>
            </div>
        </section>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-200 py-3">
            <span className="text-slate-500">{label}</span>
            <span className="font-medium text-slate-800">{value}</span>
        </div>
    );
}