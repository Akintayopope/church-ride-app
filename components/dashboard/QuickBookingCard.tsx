"use client";

import { useState } from "react";

import { serviceOptions } from "@/lib/data";
import type { ServiceKey } from "@/lib/types";

type QuickBookingCardProps = {
    onRequestRide: (serviceId: ServiceKey) => void;
};

export default function QuickBookingCard({
    onRequestRide,
}: QuickBookingCardProps) {
    const [selectedService, setSelectedService] =
        useState<ServiceKey | null>(null);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const selectedServiceDetails = serviceOptions.find(
        (service) => service.id === selectedService,
    );

    function handleOpenConfirmation() {
        if (!selectedService) {
            return;
        }

        setShowConfirmation(true);
    }

    function handleConfirmRequest() {
        if (!selectedService) {
            return;
        }

        onRequestRide(selectedService);
        setShowConfirmation(false);
        setSelectedService(null);
    }

    function handleCloseConfirmation() {
        setShowConfirmation(false);
    }

    return (
        <>
            <section className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 p-6 text-white shadow-lg">
                <h2 className="text-center text-xl font-bold">
                    🚗 Request a Ride
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-6 text-white/90">
                    Select the service you need transportation for. Your saved pickup
                    address and passenger details will be used automatically.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {serviceOptions.map((service) => {
                        const isSelected = selectedService === service.id;

                        return (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => setSelectedService(service.id)}
                                aria-pressed={isSelected}
                                className={`rounded-xl border px-5 py-6 text-center shadow-sm transition ${isSelected
                                        ? "border-white bg-white text-indigo-700"
                                        : "border-white/40 bg-white/20 text-white hover:scale-[1.02] hover:bg-white/25"
                                    }`}
                            >
                                <p className="text-lg font-bold">
                                    {service.icon} {service.title}
                                </p>

                                <p className="mt-2 text-sm">{service.time}</p>
                                <p className="mt-5 text-xs">{service.date}</p>

                                {isSelected && (
                                    <p className="mt-3 text-sm font-semibold">
                                        ✓ Selected
                                    </p>
                                )}
                            </button>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={handleOpenConfirmation}
                    disabled={!selectedService}
                    className="mt-5 w-full rounded-lg bg-white px-4 py-3 font-semibold text-indigo-600 shadow transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {selectedService
                        ? "✅ I Need a Ride"
                        : "Select a Service First"}
                </button>

                <p className="mt-4 text-center text-xs text-white/80">
                    Your saved profile details will be used for this request.
                </p>
            </section>

            {showConfirmation && selectedServiceDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="ride-confirmation-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <h2
                            id="ride-confirmation-title"
                            className="text-xl font-bold text-slate-800"
                        >
                            Confirm Ride Request
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            Do you want to request a ride for the{" "}
                            <span className="font-semibold text-slate-800">
                                {selectedServiceDetails.title} Service
                            </span>
                            ?
                        </p>

                        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                            <p>
                                🗓️ {selectedServiceDetails.date}
                            </p>

                            <p className="mt-2">
                                🕒 {selectedServiceDetails.time}
                            </p>

                            <p className="mt-2">
                                📍 Your saved pickup address will be used.
                            </p>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={handleCloseConfirmation}
                                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Go Back
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirmRequest}
                                className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
                            >
                                Confirm Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}