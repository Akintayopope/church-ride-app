"use client";

import { useState } from "react";

import DashboardHome from "@/components/dashboard/DashboardHome";
import RideHistory from "@/components/history/RideHistory";
import Navbar from "@/components/layout/Navbar";
import Tabs from "@/components/layout/Tabs";
import Profile from "@/components/profile/Profile";
import MyRides from "@/components/rides/MyRides";

import type {
    MemberProfile,
    Ride,
    ServiceKey,
    TabKey,
} from "@/lib/types";

interface MemberAppProps {
    member: MemberProfile;
    rides: Ride[];
    history: Ride[];
    message: string;
    onRequestRide: (serviceId: ServiceKey) => boolean;
    onCancelRide: (rideId: string) => void;
    onUpdateMember: (updatedMember: MemberProfile) => void;
    onDismissMessage: () => void;
}

export default function MemberApp({
    member,
    rides,
    history,
    message,
    onRequestRide,
    onCancelRide,
    onUpdateMember,
    onDismissMessage,
}: MemberAppProps) {
    const [activeTab, setActiveTab] =
        useState<TabKey>("home");

    function handleRequestRide(serviceId: ServiceKey) {
        onRequestRide(serviceId);
        setActiveTab("rides");
    }

    function handleTabChange(tab: TabKey) {
        setActiveTab(tab);

        if (tab !== "rides") {
            onDismissMessage();
        }
    }

    return (
        <>
            <Navbar member={member} />

            <Tabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {activeTab === "home" && (
                <DashboardHome
                    member={member}
                    rides={rides}
                    onRequestRide={handleRequestRide}
                    onEditProfile={() =>
                        setActiveTab("profile")
                    }
                />
            )}

            {activeTab === "rides" && (
                <MyRides
                    rides={rides}
                    onCancelRide={onCancelRide}
                    message={message}
                    onDismissMessage={onDismissMessage}
                />
            )}

            {activeTab === "history" && (
                <RideHistory rides={history} />
            )}

            {activeTab === "profile" && (
                <Profile
                    member={member}
                    onUpdateMember={onUpdateMember}
                />
            )}
        </>
    );
}