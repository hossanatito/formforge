"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wand2, FolderOpen, Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/wizard", label: "Create Form", icon: Wand2 },
    { href: "/forms", label: "Forms Library", icon: FolderOpen },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-border/50 flex flex-col h-full bg-card/50 backdrop-blur-xl">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    <span className="hidden">F</span>
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-tight tracking-tight">FormForge</h1>
                    <p className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Beta v1.0</p>
                </div>
            </div>

            <div className="px-4 mb-4">
                <Link href="/wizard">
                    <Button className="w-full gap-2 bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-primary-foreground shadow-lg shadow-orange-500/20 border-0">
                        <Plus className="h-4 w-4" />
                        Create New Form
                    </Button>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg" />
                            )}
                            <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "group-hover:text-foreground")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto border-t border-border/50 bg-muted/20">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-xs">
                        <p className="font-medium text-foreground">Settings</p>
                        <p className="text-muted-foreground">Preferences</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
