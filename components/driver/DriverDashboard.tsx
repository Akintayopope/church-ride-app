"use client";

import Navbar from "@/components/layout/Navbar";

import type {
    Driver,
    MemberProfile,
    Ride,
} from "@/lib/types";

interface DriverDashboardProps {
    member: MemberProfile;
    driver: Driver;
    rides: Ride[];
    message: string;
    onAcceptRide: (rideId: string) => void;
    onDeclineRide: (rideId: string) => void;
    onDismissMessage: () => void;
}

export default function DriverDashboard({
    member,
    driver,
    rides,
    message,
    onAcceptRide,
    onDeclineRide,
    onDismissMessage,
}: DriverDashboardProps) {
    const pendingRides = rides.filter(
        (ride) =>
            ride.assignedDriverId === driver.id &&
            ride.status === "driver-response-pending",
    );

    const confirmedRides = rides.filter(
        (ride) =>
            ride.assignedDriverId === driver.id &&
            ride.status === "confirmed",
    );

    return (
        <>
            <Navbar member={member} />

            <main className="space-y-6">
                <section className="overflow-hidden rounded-3xl bg-white shadow-lg">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white sm:px-8">
                        <p className="text-sm font-semibold text-indigo-100">
                            Driver Dashboard
                        </p>

                        <h1 className="mt-2 text-3xl font-bold">
                            Welcome back, {driver.name}
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                            Review new ride requests, manage confirmed trips, and help
                            members travel safely to church services.
                        </p>
                    </div>

                    <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
                        <SummaryCard
                            icon="📨"
                            label="Pending Requests"
                            value={pendingRides.length}
                        />

                        <SummaryCard
                            icon="✅"
                            label="Confirmed Rides"
                            value={confirmedRides.length}
                        />

                        <SummaryCard
                            icon="⭐"
                            label="Driver Rating"
                            value={driver.rating.toFixed(1)}
                        />

                        <SummaryCard
                            icon="🚗"
                            label="Completed Rides"
                            value={driver.totalRides}
                        />
                    </div>
                </section>

                {message && (
                    <div className="flex items-start justify-between gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-4">
                        <div>
                            <p className="text-sm font-semibold text-indigo-900">
                                Ride update
                            </p>

                            <p className="mt-1 text-sm text-indigo-700">
                                {message}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onDismissMessage}
                            className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                <section className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <SectionHeading
                            title="Pending Ride Requests"
                            subtitle="Accept or decline newly assigned requests."
                            count={pendingRides.length}
                        />

                        {pendingRides.length === 0 ? (
                            <EmptyState
                                icon="📭"
                                title="No pending requests"
                                message="New ride requests assigned to you will appear here."
                            />
                        ) : (
                            <div className="space-y-4">
                                {pendingRides.map((ride) => (
                                    <PendingRideCard
                                        key={ride.id}
                                        ride={ride}
                                        onAccept={() => onAcceptRide(ride.id)}
                                        onDecline={() => onDeclineRide(ride.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <DriverProfileCard driver={driver} />
                </section>

                <section>
                    <SectionHeading
                        title="Confirmed Rides"
                        subtitle="Your accepted upcoming trips."
                        count={confirmedRides.length}
                    />

                    {confirmedRides.length === 0 ? (
                        <EmptyState
                            icon="📅"
                            title="No confirmed rides"
                            message="Accepted ride requests will appear here."
                        />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {confirmedRides.map((ride) => (
                                <ConfirmedRideCard
                                    key={ride.id}
                                    ride={ride}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}

function SummaryCard({
    icon,
    label,
    value,
}: {
    icon: string;
    label: string;
    value: number | string;
}) {
    return (
        <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center justify-between">
                <span className="text-2xl">{icon}</span>

                <span className="text-2xl font-bold text-slate-900">
                    {value}
                </span>
            </div>

            <p className="mt-3 text-sm font-medium text-slate-500">
                {label}
            </p>
        </div>
    );
}

function SectionHeading({
    title,
    subtitle,
    count,
}: {
    title: string;
    subtitle: string;
    count: number;
}) {
    return (
        <div className="mb-4 flex items-end justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-slate-900">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {subtitle}
                </p>
            </div>

            <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-indigo-600 shadow-sm">
                {count}
            </span>
        </div>
    );
}

function PendingRideCard({
    ride,
    onAccept,
    onDecline,
}: {
    ride: Ride;
    onAccept: () => void;
    onDecline: () => void;
}) {
    return (
        <article className="overflow-hidden rounded-3xl bg-white shadow-lg">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500" />

            <div className="p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                Awaiting response
                            </span>

                            <span className="text-sm text-slate-500">
                                {ride.dateTime}
                            </span>
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-slate-900">
                            {ride.title}
                        </h3>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <RideDetail
                                icon="📍"
                                label="Pickup address"
                                value={ride.pickupAddress}
                            />

                            <RideDetail
                                icon="👥"
                                label="Passengers"
                                value={ride.passengers}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 md:flex-col">
                        <button
                            type="button"
                            onClick={onAccept}
                            className="flex-1 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Accept Ride
                        </button>

                        <button
                            type="button"
                            onClick={onDecline}
                            className="flex-1 rounded-xl border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function ConfirmedRideCard({
    ride,
}: {
    ride: Ride;
}) {
    return (
        <article className="overflow-hidden rounded-3xl bg-white shadow-lg">
            <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-500" />

            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Confirmed
                        </span>

                        <h3 className="mt-4 text-xl font-bold text-slate-900">
                            {ride.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            {ride.dateTime}
                        </p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-xl">
                        ✓
                    </div>
                </div>

                <div className="mt-5 space-y-3">
                    <RideDetail
                        icon="📍"
                        label="Pickup address"
                        value={ride.pickupAddress}
                    />

                    <RideDetail
                        icon="👥"
                        label="Passengers"
                        value={ride.passengers}
                    />
                </div>

                <button
                    type="button"
                    className="mt-5 w-full rounded-xl border border-indigo-200 px-4 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                >
                    View Ride Details
                </button>
            </div>
        </article>
    );
}

function RideDetail({
    icon,
    label,
    value,
}: {
    icon: string;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
            <span className="text-lg">{icon}</span>

            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {label}
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                    {value}
                </p>
            </div>
        </div>
    );
}

function DriverProfileCard({
    driver,
}: {
    driver: Driver;
}) {
    return (
        <aside>
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                    Driver Profile
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Your current driving information.
                </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white">
                        {driver.initials}
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900">
                            {driver.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Approved Driver
                        </p>
                    </div>
                </div>

                <div className="mt-6 space-y-4 border-t border-slate-100 pt-5">
                    <ProfileDetail
                        label="Vehicle"
                        value={driver.vehicle}
                    />

                    <ProfileDetail
                        label="Phone"
                        value={driver.phoneNumber}
                    />

                    <ProfileDetail
                        label="Rating"
                        value={`${driver.rating} / 5`}
                    />

                    <ProfileDetail
                        label="Availability"
                        value={driver.isAvailable ? "Available" : "Currently assigned"}
                    />
                </div>
            </div>
        </aside>
    );
}

function ProfileDetail({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
                {value}
            </p>
        </div>
    );
}

function EmptyState({
    icon,
    title,
    message,
}: {
    icon: string;
    title: string;
    message: string;
}) {
    return (
        <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                {icon}
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                {message}
            </p>
        </div>
    );
}