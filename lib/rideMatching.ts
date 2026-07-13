import type { Driver, Ride } from "@/lib/types";

type MatchDriverResult =
    | {
        success: true;
        ride: Ride;
        driver: Driver;
        drivers: Driver[];
    }
    | {
        success: false;
        ride: Ride;
        driver: null;
        drivers: Driver[];
    };

export function findClosestAvailableDriver(
    ride: Ride,
    drivers: Driver[],
): Driver | null {
    const eligibleDrivers = drivers
        .filter((driver) => driver.hasVehicle)
        .filter((driver) => driver.isAvailable)
        .filter((driver) => driver.assignedRideId === null)
        .filter((driver) => !ride.declinedDriverIds.includes(driver.id))
        .sort((firstDriver, secondDriver) => {
            return firstDriver.distanceKm - secondDriver.distanceKm;
        });

    return eligibleDrivers[0] ?? null;
}

export function assignClosestDriver(
    ride: Ride,
    drivers: Driver[],
): MatchDriverResult {
    const selectedDriver = findClosestAvailableDriver(ride, drivers);

    if (!selectedDriver) {
        return {
            success: false,
            ride: {
                ...ride,
                status: "pending",
                assignedDriverId: null,
                driverResponse: null,
                driver: undefined,
            },
            driver: null,
            drivers,
        };
    }

    const updatedDriver: Driver = {
        ...selectedDriver,
        assignedRideId: ride.id,
    };

    const updatedDrivers = drivers.map((driver) =>
        driver.id === selectedDriver.id ? updatedDriver : driver,
    );

    const updatedRide: Ride = {
        ...ride,
        status: "driver-response-pending",
        assignedDriverId: selectedDriver.id,
        driverResponse: "pending",
        driver: updatedDriver,
    };

    return {
        success: true,
        ride: updatedRide,
        driver: updatedDriver,
        drivers: updatedDrivers,
    };
}

export function acceptRideAssignment(
    ride: Ride,
    drivers: Driver[],
): MatchDriverResult {
    if (!ride.assignedDriverId) {
        return {
            success: false,
            ride,
            driver: null,
            drivers,
        };
    }

    const assignedDriver = drivers.find(
        (driver) => driver.id === ride.assignedDriverId,
    );

    if (!assignedDriver) {
        return {
            success: false,
            ride,
            driver: null,
            drivers,
        };
    }

    const updatedDriver: Driver = {
        ...assignedDriver,
        isAvailable: false,
        assignedRideId: ride.id,
    };

    const updatedDrivers = drivers.map((driver) =>
        driver.id === assignedDriver.id ? updatedDriver : driver,
    );

    const updatedRide: Ride = {
        ...ride,
        status: "confirmed",
        driverResponse: "accepted",
        driver: updatedDriver,
    };

    return {
        success: true,
        ride: updatedRide,
        driver: updatedDriver,
        drivers: updatedDrivers,
    };
}

export function declineRideAssignment(
    ride: Ride,
    drivers: Driver[],
): MatchDriverResult {
    if (!ride.assignedDriverId) {
        return {
            success: false,
            ride,
            driver: null,
            drivers,
        };
    }

    const declinedDriverId = ride.assignedDriverId;

    const releasedDrivers = drivers.map((driver) =>
        driver.id === declinedDriverId
            ? {
                ...driver,
                assignedRideId: null,
            }
            : driver,
    );

    const updatedRide: Ride = {
        ...ride,
        status: "matching",
        assignedDriverId: null,
        driverResponse: null,
        declinedDriverIds: ride.declinedDriverIds.includes(declinedDriverId)
            ? ride.declinedDriverIds
            : [...ride.declinedDriverIds, declinedDriverId],
        driver: undefined,
    };

    return assignClosestDriver(updatedRide, releasedDrivers);
}

export function completeRide(
    ride: Ride,
    drivers: Driver[],
): MatchDriverResult {
    if (!ride.assignedDriverId) {
        return {
            success: false,
            ride,
            driver: null,
            drivers,
        };
    }

    const completedDriver = drivers.find(
        (driver) => driver.id === ride.assignedDriverId,
    );

    if (!completedDriver) {
        return {
            success: false,
            ride,
            driver: null,
            drivers,
        };
    }

    const releasedDriver: Driver = {
        ...completedDriver,
        isAvailable: true,
        assignedRideId: null,
    };

    const updatedDrivers = drivers.map((driver) =>
        driver.id === completedDriver.id ? releasedDriver : driver,
    );

    const updatedRide: Ride = {
        ...ride,
        status: "completed",
        driverResponse: "accepted",
        driver: completedDriver,
    };

    return {
        success: true,
        ride: updatedRide,
        driver: releasedDriver,
        drivers: updatedDrivers,
    };
}