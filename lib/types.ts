export type TabKey = "home" | "rides" | "history" | "profile";

export type ServiceKey = "sunday" | "wednesday";

export type RideStatus =
    | "pending"
    | "matching"
    | "driver-response-pending"
    | "confirmed"
    | "completed"
    | "cancelled";

export type DriverResponse =
    | "pending"
    | "accepted"
    | "declined";

export interface MemberProfile {
    id: string;
    name: string;
    initials: string;
    memberSince: string;
    pickupAddress: string;
    defaultPassengers: string;
    phoneNumber: string;
    hasCar: boolean;
    isApprovedDriver: boolean;
    driverId: string | null;
}

export interface ServiceOption {
    id: ServiceKey;
    title: string;
    icon: string;
    time: string;
    date: string;
}

export interface Driver {
    id: string;
    name: string;
    initials: string;
    rating: number;
    totalRides: number;
    vehicle: string;
    phoneNumber: string;
    address: string;
    distanceKm: number;
    hasVehicle: boolean;
    isAvailable: boolean;
    assignedRideId: string | null;
}

export interface Ride {
    id: string;
    memberId: string;
    title: string;
    dateTime: string;
    pickupAddress: string;
    passengers: string;
    status: RideStatus;
    assignedDriverId: string | null;
    driverResponse: DriverResponse | null;
    declinedDriverIds: string[];
    driver?: Driver;
}