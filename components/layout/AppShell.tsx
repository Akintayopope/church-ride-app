import type { ReactNode } from "react";

type AppShellProps = {
    children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
    return (
        <main className="min-h-screen px-4 py-6 sm:px-8 lg:px-[50px]">
            <div className="mx-auto w-full max-w-[1180px]">{children}</div>
        </main>
    );
}