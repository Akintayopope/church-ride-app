import DriverInfo from "./DriverInfo";

type RideCardProps = {
    title: string;
    date: string;
    status: string;
    showDriver?: boolean;
};

export default function RideCard({
    title,
    date,
    status,
    showDriver = false,
}: RideCardProps) {
    return (
        <div className="rounded-xl border-l-4 border-indigo-500 bg-white p-5 shadow-sm">
            <h3 className="font-bold text-slate-800">{title}</h3>

            <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>🗓️ {date}</p>
                <p>📍 123 Main St, Winnipeg</p>
                <p>👥 2 Adults, 1 Child</p>
            </div>

            <span className="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                ✅ {status}
            </span>

            {showDriver && <DriverInfo />}
        </div>
    );
}