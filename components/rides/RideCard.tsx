"use client";

import { useState } from "react";

import StatusBadge from "@/components/ui/StatusBadge";
import type { Ride } from "@/lib/types";

type RideCardProps = {
    ride: Ride;
    showActions?: boolean;
    showDriverDetails?: boolean;
    onCancelRide?: (rideId: string) => void;
};

export default function RideCard({
    ride,
    showActions = false,
    showDriverDetails = false,
    onCancelRide,
}: RideCardProps) {
    const [showRideDetails, setShowRideDetails] = useState(false);
    const [showCancelConfirmation, setShowCancelConfirmation] =
        useState(false);

    function handleOpenRideDetails() {
        setShowRideDetails(true);
    }

    function handleCloseRideDetails() {
        setShowRideDetails(false);
    }

    function handleOpenCancelConfirmation() {
        setShowCancelConfirmation(true);
    }

    function handleCloseCancelConfirmation() {
        setShowCancelConfirmation(false);
    }

    function handleConfirmCancel() {
        onCancelRide?.(ride.id);
        setShowCancelConfirmation(false);
    }

    return (
        <>
            <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800">
                            {ride.title}
                        </h3>

                        <div className="mt-3 space-y-2 text-sm text-slate-600">
                            <p>🗓️ {ride.dateTime}</p>
                            <p>📍 {ride.pickupAddress}</p>
                            <p>👥 {ride.passengers}</p>
                        </div>

                        {ride.driver && !showDriverDetails && (
                            <p className="mt-3 text-sm font-medium text-slate-700">
                                🚗 Driver: {ride.driver.name}
                            </p>
                        )}
                    </div>

                    <StatusBadge status={ride.status} />
                </div>

                {ride.driver && showDriverDetails && (
                    <div className="mt-4 rounded-xl bg-green-500 p-5 text-white shadow">
                        <h4 className="font-bold">🚗 Your Driver</h4>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-green-600">
                                {ride.driver.initials}
                            </div>

                            <div>
                                <p className="font-bold">{ride.driver.name}</p>

                                <p className="text-sm">
                                    ⭐ {ride.driver.rating} ({ride.driver.totalRides} rides)
                                </p>

                                <p className="text-sm">
                                    🚙 {ride.driver.vehicle}
                                </p>

                                <p className="text-sm">
                                    📱 {ride.driver.phoneNumber}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {showActions && (
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={handleOpenRideDetails}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            View Details
                        </button>

                        <button
                            type="button"
                            onClick={handleOpenCancelConfirmation}
                            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                            Cancel Ride
                        </button>
                    </div>
                )}
            </article>

            {showRideDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`ride-details-title-${ride.id}`}
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2
                                    id={`ride-details-title-${ride.id}`}
                                    className="text-xl font-bold text-slate-800"
                                >
                                    Ride Details
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Review the information for this ride request.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleCloseRideDetails}
                                aria-label="Close ride details"
                                className="rounded-lg px-3 py-1 text-2xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4">
                            <div>
                                <p className="font-bold text-slate-800">
                                    {ride.title}
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    Ride request status
                                </p>
                            </div>

                            <StatusBadge status={ride.status} />
                        </div>

                        <div className="mt-5 space-y-4 text-sm text-slate-600">
                            <div>
                                <p className="font-semibold text-slate-800">
                                    Date and time
                                </p>
                                <p className="mt-1">🗓️ {ride.dateTime}</p>
                            </div>

                            <div>
                                <p className="font-semibold text-slate-800">
                                    Pickup address
                                </p>
                                <p className="mt-1">📍 {ride.pickupAddress}</p>
                            </div>

                            <div>
                                <p className="font-semibold text-slate-800">
                                    Passengers
                                </p>
                                <p className="mt-1">👥 {ride.passengers}</p>
                            </div>
                        </div>

                        {ride.driver ? (
                            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
                                <h3 className="font-bold text-green-800">
                                    🚗 Assigned Driver
                                </h3>

                                <div className="mt-4 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                                        {ride.driver.initials}
                                    </div>

                                    <div className="text-sm text-green-900">
                                        <p className="font-bold">
                                            {ride.driver.name}
                                        </p>

                                        <p className="mt-1">
                                            ⭐ {ride.driver.rating} ({ride.driver.totalRides} rides)
                                        </p>

                                        <p className="mt-1">
                                            🚙 {ride.driver.vehicle}
                                        </p>

                                        <p className="mt-1">
                                            📱 {ride.driver.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                                <p className="font-semibold text-amber-800">
                                    Driver assignment pending
                                </p>

                                <p className="mt-1 text-sm text-amber-700">
                                    A driver has not yet been assigned to this ride.
                                </p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleCloseRideDetails}
                            className="mt-6 w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showCancelConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`cancel-ride-title-${ride.id}`}
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl">
                            ⚠️
                        </div>

                        <h2
                            id={`cancel-ride-title-${ride.id}`}
                            className="mt-4 text-xl font-bold text-slate-800"
                        >
                            Cancel Ride?
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            Are you sure you want to cancel your ride for{" "}
                            <span className="font-semibold text-slate-800">
                                {ride.title}
                            </span>
                            ?
                        </p>

                        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                            <p>🗓️ {ride.dateTime}</p>
                            <p className="mt-2">📍 {ride.pickupAddress}</p>
                        </div>

                        <p className="mt-4 text-sm text-red-600">
                            The cancelled ride will be moved to your ride history.
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleCloseCancelConfirmation}
                                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Keep Ride
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirmCancel}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
                            >
                                Yes, Cancel Ride
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}