import type { MemberProfile, Ride, ServiceOption } from "@/lib/types";

export const member: MemberProfile = {
    name: "John Doe",
    initials: "JD",
    memberSince: "2023",
    pickupAddress: "123 Main St, Winnipeg",
    defaultPassengers: "2 Adults, 1 Child",
    phoneNumber: "(204) 555-0123",
};

export const serviceOptions: ServiceOption[] = [
    {
        id: "sunday",
        title: "Sunday",
        icon: "☀️",
        time: "10:00 AM",
        date: "Sept 30, 2025",
    },
    {
        id: "wednesday",
        title: "Wednesday",
        icon: "🌙",
        time: "7:00 PM",
        date: "Oct 02, 2025",
    },
];

export const upcomingRides: Ride[] = [
    {
        id: "ride-1",
        title: "Sunday Service",
        dateTime: "Sept 30, 2025 · 10:00 AM",
        pickupAddress: member.pickupAddress,
        passengers: member.defaultPassengers,
        status: "assigned",
        driver: {
            name: "Michael Johnson",
            initials: "MJ",
            rating: 4.9,
            totalRides: 127,
            vehicle: "Toyota Camry · Blue",
            phoneNumber: "(204) 555-0199",
        },
    },
    {
        id: "ride-2",
        title: "Wednesday Service",
        dateTime: "Oct 02, 2025 · 7:00 PM",
        pickupAddress: member.pickupAddress,
        passengers: member.defaultPassengers,
        status: "confirmed",
    },
];

export const rideHistory: Ride[] = [
    {
        id: "history-1",
        title: "Sunday Service",
        dateTime: "Sept 23, 2025 · 10:00 AM",
        pickupAddress: member.pickupAddress,
        passengers: member.defaultPassengers,
        status: "completed",
        driver: {
            name: "Michael Johnson",
            initials: "MJ",
            rating: 4.9,
            totalRides: 127,
            vehicle: "Toyota Camry · Blue",
            phoneNumber: "(204) 555-0199",
        },
    },
    {
        id: "history-2",
        title: "Wednesday Service",
        dateTime: "Sept 20, 2025 · 7:00 PM",
        pickupAddress: member.pickupAddress,
        passengers: member.defaultPassengers,
        status: "completed",
        driver: {
            name: "Sarah Williams",
            initials: "SW",
            rating: 4.8,
            totalRides: 95,
            vehicle: "Honda CR-V · White",
            phoneNumber: "(204) 555-0188",
        },
    },
    {
        id: "history-3",
        title: "Sunday Service",
        dateTime: "Sept 16, 2025 · 10:00 AM",
        pickupAddress: member.pickupAddress,
        passengers: member.defaultPassengers,
        status: "cancelled",
    },
];