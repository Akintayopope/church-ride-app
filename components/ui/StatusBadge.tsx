import type { RideStatus } from "@/lib/types";

type StatusBadgeProps = {
    status: RideStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const statusText: Record<RideStatus, string> = {
        pending: "Pending",
        assigned: "Driver Assigned",
        confirmed: "Confirmed",
        completed: "Completed",
        cancelled: "Cancelled",
    };

    const statusClass: Record<RideStatus, string> = {
        pending: "bg-yellow-100 text-yellow-700",
        assigned: "bg-green-100 text-green-700",
        confirmed: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClass[status]}`}
        >
            {statusText[status]}
        </span>
    );
}