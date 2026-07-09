import { serviceOptions } from "@/lib/data";

export default function QuickBookingCard() {
    return (
        <section className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 p-6 text-white shadow-lg">
            <h2 className="text-center text-xl font-bold">🚗 Quick Ride Booking</h2>

            <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-6 text-white/90">
                Select your service and we&apos;ll automatically match you with the
                nearest available driver based on your saved address.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {serviceOptions.map((service) => (
                    <button
                        key={service.id}
                        className="rounded-xl border border-white/40 bg-white/20 px-5 py-6 text-center shadow-sm transition hover:scale-[1.02] hover:bg-white/25"
                    >
                        <p className="text-lg font-bold">
                            {service.icon} {service.title}
                        </p>
                        <p className="mt-2 text-sm">{service.time}</p>
                        <p className="mt-5 text-xs">{service.date}</p>
                    </button>
                ))}
            </div>

            <button className="mt-5 w-full rounded-lg bg-white px-4 py-3 font-semibold text-indigo-600 shadow transition hover:bg-slate-100">
                ✅ I Need a Ride!
            </button>

            <button className="mt-3 w-full rounded-lg border border-white px-4 py-3 font-semibold text-white transition hover:bg-white/15">
                📝 Custom Booking
            </button>

            <div className="mt-4 rounded-xl bg-white/15 px-4 py-4 text-center">
                <p className="text-sm">Different pickup location or passengers?</p>
                <button className="mt-2 text-sm font-bold underline underline-offset-2">
                    Update booking details
                </button>
            </div>
        </section>
    );
}