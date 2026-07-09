"use client";

import { useState } from "react";

import DashboardHome from "@/components/dashboard/DashboardHome";
import MyRides from "@/components/rides/MyRides";
import RideHistory from "@/components/history/RideHistory";
import Profile from "@/components/profile/Profile";

import AppShell from "@/components/layout/AppShell";
import Navbar from "@/components/layout/Navbar";
import Tabs from "@/components/layout/Tabs";

import type { TabKey } from "@/lib/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  return (
    <AppShell>
      <Navbar />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "home" && <DashboardHome />}
      {activeTab === "rides" && <MyRides />}
      {activeTab === "history" && <RideHistory />}
      {activeTab === "profile" && <Profile />}
    </AppShell>
  );
}