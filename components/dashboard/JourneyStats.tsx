export default function JourneyStats() {
    return (
        <section className="rounded-2xl bg-white/95 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800">📊 Your Journey</h2>

            <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 p-5 text-white shadow">
                    <p className="text-sm">Total Rides</p>
                    <p className="mt-3 text-3xl font-bold">24</p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 p-5 text-white shadow">
                    <p className="text-sm">This Month</p>
                    <p className="mt-3 text-3xl font-bold">6</p>
                </div>
            </div>
        </section>
    );
}