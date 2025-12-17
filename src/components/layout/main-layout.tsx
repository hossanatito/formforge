"use client";

import { TitleBar } from "./title-bar";
import { Sidebar } from "./sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden">
            <TitleBar />
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
