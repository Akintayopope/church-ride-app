type EmptyStateProps = {
    title: string;
};

export default function EmptyState({ title }: EmptyStateProps) {
    return (
        <section className="rounded-[20px] bg-white/95 p-[35px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-[10px]">
            <h2 className="text-[28px] font-bold text-[#2d3748]">{title}</h2>
            <p className="mt-[10px] text-[#718096]">
                This section will be built next.
            </p>
        </section>
    );
}