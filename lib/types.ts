export type TabKey = "home" | "rides" | "history" | "profile";

export type ServiceKey = "sunday" | "wednesday";

export type ServiceOption = {
    id: ServiceKey;
    title: string;
    icon: string;
    time: string;
    date: string;
};

export type MemberProfile = {
    name: string;
    initials: string;
    memberSince: string;
    pickupAddress: string;
    defaultPassengers: string;
    phoneNumber: string;
};

export type Driver = {
    name: string;
    initials: string;
    rating: number;
    totalRides: number;
    vehicle: string;
    phoneNumber: string;
};

export type RideStatus =
    | "pending"
    | "assigned"
    | "confirmed"
    | "completed"
    | "cancelled";

export type Ride = {
    id: string;
    title: string;
    dateTime: string;
    pickupAddress: string;
    passengers: string;
    status: RideStatus;
    driver?: Driver;
};