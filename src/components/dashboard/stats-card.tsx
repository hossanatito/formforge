"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    description?: string;
    className?: string;
}

export function StatsCard({ title, value, icon, description, className }: StatsCardProps) {
    return (
        <Card className={cn("glass-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group animate-fade-in", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {title}
                </CardTitle>
                <div className="p-2 rounded-full bg-primary/5 group-hover:bg-primary/20 transition-colors">
                    <span className="text-xl">{icon}</span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80">{description}</p>
                )}
            </CardContent>
        </Card>
    );
}
