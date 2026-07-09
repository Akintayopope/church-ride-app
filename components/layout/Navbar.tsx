import { member } from "@/lib/data";

export default function Navbar() {
  return (
    <header className="mb-[30px] flex w-full items-center justify-between rounded-[20px] bg-white/95 px-[35px] py-[25px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-[10px]">
      <div className="flex items-center gap-[15px]">
        <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-[15px] bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-[26px] font-bold text-white shadow-[0_8px_20px_rgba(102,126,234,0.3)]">
          ✨
        </div>

        <div>
          <h1 className="text-[24px] font-bold leading-tight text-[#2d3748]">
            Winners Chapel Winnipeg
          </h1>
          <p className="mt-[4px] text-[13px] font-medium text-[#718096]">
            Ride Request & Management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-[15px]">
        <div className="relative flex h-[45px] w-[45px] items-center justify-center rounded-[12px] bg-[#f7fafc] transition duration-300 hover:scale-110 hover:bg-[#edf2f7]">
          <span className="text-[22px]">🔔</span>

          <div className="absolute -right-[5px] -top-[5px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#f56565] text-[11px] font-bold text-white">
            2
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold text-[#2d3748]">{member.name}</p>
          <p className="text-[13px] font-medium text-[#718096]">
            Member Since {member.memberSince}
          </p>
        </div>

        <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f093fb_0%,#f5576c_100%)] text-[18px] font-bold text-white shadow-[0_5px_15px_rgba(245,87,108,0.3)]">
          {member.initials}
        </div>
      </div>
    </header>
  );
}