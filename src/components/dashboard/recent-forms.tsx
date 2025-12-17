"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { Edit, Trash2 } from "lucide-react";

export function RecentForms() {
    const { forms, deleteForm, updateStats } = useAppStore();

    const recentForms = [...forms]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const handleDelete = async (id: string) => {
        try {
            if (typeof window !== 'undefined' && window.electronAPI) {
                await window.electronAPI.deleteForm(id);
            }
            deleteForm(id);
            updateStats();
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };

    if (recentForms.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Forms</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No forms created yet.</p>
                        <Link href="/wizard">
                            <Button className="mt-4" variant="outline">
                                Create your first form
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="glass-card border-border/50 animate-fade-in delay-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">Recent Forms</CardTitle>
                <Link href="/forms">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        View All
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {recentForms.map((form) => (
                        <div
                            key={form.id}
                            className="group flex items-center justify-between p-4 rounded-xl border border-border/40 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <span className="text-lg">
                                        {form.platform === 'jvzoo' ? '🛒' : '⚔️'}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{form.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="secondary" className="text-[10px] px-2 h-5 bg-secondary/50">
                                            {form.platform === 'jvzoo' ? 'JVZoo' : 'WarriorPlus'}
                                        </Badge>
                                        <span className="text-[10px] text-muted-foreground">
                                            {formatRelativeTime(form.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Link href={`/forms/edit?id=${form.id}`}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                    onClick={() => handleDelete(form.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
