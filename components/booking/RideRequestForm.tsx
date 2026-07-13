"use client";

import { useState } from "react";

import { serviceOptions } from "@/lib/data";

import type { Ride, ServiceKey } from "@/lib/types";

interface RideRequestFormProps {
    memberId: string;
    pickupAddress: string;
    defaultPassengers: string;
    onRideRequested: (ride: Ride) => void;
    onCancel?: () => void;
}

export default function RideRequestForm({
    memberId,
    pickupAddress,
    defaultPassengers,
    onRideRequested,
    onCancel,
}: RideRequestFormProps) {
    const [selectedService, setSelectedService] =
        useState<ServiceKey>("sunday");

    const [passengers, setPassengers] = useState(defaultPassengers);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const service = serviceOptions.find(
            (option) => option.id === selectedService,
        );

        if (!service) {
            return;
        }

        setIsSubmitting(true);

        const newRide: Ride = {
            id: crypto.randomUUID(),
            memberId,
            title: `${service.title} Service`,
            dateTime: `${service.date} · ${service.time}`,
            pickupAddress,
            passengers,
            status: "matching",
            assignedDriverId: null,
            driverResponse: null,
            declinedDriverIds: [],
        };

        onRideRequested(newRide);
        setIsSubmitting(false);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-[24px] bg-white p-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
        >
            <div className="mb-[25px]">
                <h2 className="text-[24px] font-bold text-slate-900">
                    Request a Ride
                </h2>

                <p className="mt-[6px] text-[14px] text-slate-500">
                    Select the church service you need transportation for.
                </p>
            </div>

            <div className="mb-[24px]">
                <label className="mb-[10px] block text-[14px] font-semibold text-slate-700">
                    Church Service
                </label>

                <div className="grid gap-[12px] sm:grid-cols-2">
                    {serviceOptions.map((service) => {
                        const isSelected = selectedService === service.id;

                        return (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => setSelectedService(service.id)}
                                className={`rounded-[18px] border-2 p-[18px] text-left transition ${isSelected
                                        ? "border-indigo-500 bg-indigo-50"
                                        : "border-slate-200 bg-white hover:border-indigo-300"
                                    }`}
                            >
                                <div className="flex items-center gap-[12px]">
                                    <span className="text-[26px]">{service.icon}</span>

                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {service.title}
                                        </p>

                                        <p className="text-[13px] text-slate-500">
                                            {service.date} · {service.time}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-[20px]">
                <label className="mb-[8px] block text-[14px] font-semibold text-slate-700">
                    Pickup Address
                </label>

                <input
                    type="text"
                    value={pickupAddress}
                    readOnly
                    className="w-full rounded-[14px] border border-slate-200 bg-slate-100 px-[16px] py-[13px] text-[14px] text-slate-600 outline-none"
                />
            </div>

            <div className="mb-[28px]">
                <label
                    htmlFor="passengers"
                    className="mb-[8px] block text-[14px] font-semibold text-slate-700"
                >
                    Passengers
                </label>

                <input
                    id="passengers"
                    type="text"
                    value={passengers}
                    onChange={(event) => setPassengers(event.target.value)}
                    placeholder="Example: 2 Adults, 1 Child"
                    required
                    className="w-full rounded-[14px] border border-slate-200 px-[16px] py-[13px] text-[14px] text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
            </div>

            <div className="flex gap-[12px]">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-[14px] border border-slate-300 px-[20px] py-[13px] font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || !passengers.trim()}
                    className="flex-1 rounded-[14px] bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] px-[20px] py-[13px] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSubmitting ? "Requesting..." : "Request Ride"}
                </button>
            </div>
        </form>
    );
}