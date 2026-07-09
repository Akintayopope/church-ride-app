import type { TabKey } from "@/lib/types";

type TabsProps = {
    activeTab: TabKey;
    onTabChange: (tab: TabKey) => void;
};

const tabs: { id: TabKey; label: string; icon: string }[] = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "rides", label: "My Rides", icon: "🚗" },
    { id: "history", label: "History", icon: "📜" },
    { id: "profile", label: "Profile", icon: "👤" },
];

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
    return (
        <nav className="mb-[30px] grid grid-cols-4 gap-[10px] rounded-[20px] bg-white/95 p-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-[10px]">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center justify-center gap-[8px] rounded-[12px] px-[20px] py-[15px] text-[15px] font-semibold transition duration-300 ${isActive
                                ? "-translate-y-[2px] bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white shadow-[0_8px_20px_rgba(102,126,234,0.3)]"
                                : "bg-transparent text-[#718096] hover:-translate-y-[2px] hover:bg-[#f7fafc]"
                            }`}
                    >
                        <span className="text-[18px]">{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}