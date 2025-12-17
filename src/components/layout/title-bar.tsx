"use client";

import { Minus, Square, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function TitleBar() {
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const checkMaximized = async () => {
            if (typeof window !== 'undefined' && window.electronAPI) {
                const maximized = await window.electronAPI.isMaximized();
                setIsMaximized(maximized);
            }
        };
        checkMaximized();
    }, []);

    const handleMinimize = () => {
        window.electronAPI?.minimize();
    };

    const handleMaximize = async () => {
        await window.electronAPI?.maximize();
        const maximized = await window.electronAPI?.isMaximized();
        setIsMaximized(maximized ?? false);
    };

    const handleClose = () => {
        window.electronAPI?.close();
    };

    return (
        <div className="h-10 bg-background border-b border-border flex items-center justify-between px-4 select-none" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-xs font-bold text-black">
                    FF
                </div>
                <span className="text-sm font-semibold text-foreground">FormForge</span>
            </div>

            <div className="flex items-center" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-muted"
                    onClick={handleMinimize}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-muted"
                    onClick={handleMaximize}
                >
                    {isMaximized ? <Square className="h-3 w-3" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={handleClose}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
