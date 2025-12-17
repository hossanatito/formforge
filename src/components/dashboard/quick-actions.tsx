"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FolderOpen } from "lucide-react";

export function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3">
                <Link href="/wizard" className="flex-1">
                    <Button variant="default" className="w-full gap-2">
                        <Plus className="h-4 w-4" />
                        Create New Form
                    </Button>
                </Link>
                <Link href="/forms" className="flex-1">
                    <Button variant="outline" className="w-full gap-2">
                        <FolderOpen className="h-4 w-4" />
                        Browse Library
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
