"use client";

import { useState } from "react";

import {
    drivers as initialDrivers,
    member as initialMember,
    rideHistory as initialRideHistory,
    serviceOptions,
    upcomingRides as initialUpcomingRides,
} from "@/lib/data";

import {
    acceptRideAssignment,
    assignClosestDriver,
    declineRideAssignment,
} from "@/lib/rideMatching";

import type {
    Driver,
    MemberProfile,
    Ride,
    ServiceKey,
} from "@/lib/types";

export default function useRideManagement() {
    const [member, setMember] =
        useState<MemberProfile>(initialMember);

    const [drivers, setDrivers] =
        useState<Driver[]>(initialDrivers);

    const [rides, setRides] =
        useState<Ride[]>(initialUpcomingRides);

    const [history, setHistory] =
        useState<Ride[]>(initialRideHistory);

    const [message, setMessage] = useState("");

    function requestRide(serviceId: ServiceKey) {
        const selectedService = serviceOptions.find(
            (service) => service.id === serviceId,
        );

        if (!selectedService) {
            return false;
        }

        const rideTitle = `${selectedService.title} Service`;

        const duplicateRide = rides.some(
            (ride) =>
                ride.memberId === member.id &&
                ride.title === rideTitle &&
                ride.status !== "completed" &&
                ride.status !== "cancelled",
        );

        if (duplicateRide) {
            setMessage(
                `You already have an active request for ${rideTitle}.`,
            );

            return false;
        }

        const newRide: Ride = {
            id: crypto.randomUUID(),
            memberId: member.id,
            title: rideTitle,
            dateTime: `${selectedService.date} · ${selectedService.time}`,
            pickupAddress: member.pickupAddress,
            passengers: member.defaultPassengers,
            status: "matching",
            assignedDriverId: null,
            driverResponse: null,
            declinedDriverIds: [],
        };

        const result = assignClosestDriver(
            newRide,
            drivers,
        );

        setDrivers(result.drivers);

        setRides((currentRides) => [
            result.ride,
            ...currentRides,
        ]);

        if (result.success) {
            setMessage(
                `Your ride request was submitted. ${result.driver.name} has been asked to accept it.`,
            );
        } else {
            setMessage(
                "Your ride request was submitted, but no driver is currently available.",
            );
        }

        return true;
    }

    function cancelRide(rideId: string) {
        const rideToCancel = rides.find(
            (ride) =>
                ride.id === rideId &&
                ride.memberId === member.id,
        );

        if (!rideToCancel) {
            return;
        }

        const cancelledRide: Ride = {
            ...rideToCancel,
            status: "cancelled",
        };

        setDrivers((currentDrivers) =>
            currentDrivers.map((driver) =>
                driver.assignedRideId === rideId
                    ? {
                        ...driver,
                        assignedRideId: null,
                        isAvailable: true,
                    }
                    : driver,
            ),
        );

        setRides((currentRides) =>
            currentRides.filter(
                (ride) => ride.id !== rideId,
            ),
        );

        setHistory((currentHistory) => [
            cancelledRide,
            ...currentHistory,
        ]);

        setMessage("Your ride request was cancelled.");
    }

    function acceptRide(rideId: string) {
        const rideToAccept = rides.find(
            (ride) => ride.id === rideId,
        );

        if (!rideToAccept) {
            return;
        }

        const result = acceptRideAssignment(
            rideToAccept,
            drivers,
        );

        if (!result.success) {
            setMessage(
                "The ride assignment could not be accepted.",
            );

            return;
        }

        setDrivers(result.drivers);

        setRides((currentRides) =>
            currentRides.map((ride) =>
                ride.id === rideId ? result.ride : ride,
            ),
        );

        setMessage(
            `${result.driver.name} accepted the ride request.`,
        );
    }

    function declineRide(rideId: string) {
        const rideToDecline = rides.find(
            (ride) => ride.id === rideId,
        );

        if (!rideToDecline) {
            return;
        }

        const previousDriverName =
            rideToDecline.driver?.name ?? "The driver";

        const result = declineRideAssignment(
            rideToDecline,
            drivers,
        );

        setDrivers(result.drivers);

        setRides((currentRides) =>
            currentRides.map((ride) =>
                ride.id === rideId ? result.ride : ride,
            ),
        );

        if (result.success) {
            setMessage(
                `${previousDriverName} declined the ride. It was reassigned to ${result.driver.name}.`,
            );
        } else {
            setMessage(
                `${previousDriverName} declined the ride. No other driver is currently available.`,
            );
        }
    }

    function updateMember(
        updatedMember: MemberProfile,
    ) {
        setMember(updatedMember);
    }

    function dismissMessage() {
        setMessage("");
    }

    return {
        member,
        drivers,
        rides,
        history,
        message,
        requestRide,
        cancelRide,
        acceptRide,
        declineRide,
        updateMember,
        dismissMessage,
    };
}