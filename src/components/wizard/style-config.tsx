"use client";

import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Theme, ButtonStyle } from "@/types";

interface StyleConfigProps {
    onNext: () => void;
    onBack: () => void;
}

const themes: { id: Theme; name: string; bg: string; fg: string }[] = [
    { id: "dark", name: "Dark", bg: "#1a1a2e", fg: "#ffffff" },
    { id: "light", name: "Light", bg: "#ffffff", fg: "#1a1a1a" },
];

const buttonStyles: { id: ButtonStyle; name: string }[] = [
    { id: "gradient", name: "Gradient" },
    { id: "solid", name: "Solid" },
    { id: "outline", name: "Outline" },
];

const presetColors = [
    "#f59e0b", // Amber
    "#ef4444", // Red
    "#22c55e", // Green
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#f97316", // Orange
];

export function StyleConfig({ onNext, onBack }: StyleConfigProps) {
    const { wizard, updateWizardConfig } = useAppStore();
    const config = wizard.formConfig;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">Styling Options</h2>
                <p className="text-muted-foreground mt-1">
                    Customize the look and feel of your form
                </p>
            </div>

            <div className="space-y-6 max-w-xl">
                {/* Theme Selection */}
                <div className="space-y-3">
                    <Label>Theme</Label>
                    <div className="flex gap-3">
                        {themes.map((theme) => (
                            <Card
                                key={theme.id}
                                className={cn(
                                    "flex-1 cursor-pointer transition-all",
                                    config.theme === theme.id && "border-primary"
                                )}
                                onClick={() => updateWizardConfig({ theme: theme.id })}
                            >
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 border border-border"
                                        style={{ backgroundColor: theme.bg }}
                                    />
                                    <span className="font-medium">{theme.name}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Primary Color */}
                <div className="space-y-3">
                    <Label>Primary Color</Label>
                    <div className="flex flex-wrap gap-2">
                        {presetColors.map((color) => (
                            <button
                                key={color}
                                className={cn(
                                    "w-10 h-10 transition-transform hover:scale-110",
                                    config.primaryColor === color && "ring-2 ring-white ring-offset-2 ring-offset-background"
                                )}
                                style={{ backgroundColor: color }}
                                onClick={() => updateWizardConfig({ primaryColor: color })}
                            />
                        ))}
                        <div className="relative">
                            <Input
                                type="color"
                                className="w-10 h-10 p-0 border-0 cursor-pointer"
                                value={config.primaryColor || "#f59e0b"}
                                onChange={(e) => updateWizardConfig({ primaryColor: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Accent Color */}
                <div className="space-y-3">
                    <Label>Accent Color</Label>
                    <div className="flex flex-wrap gap-2">
                        {presetColors.map((color) => (
                            <button
                                key={color}
                                className={cn(
                                    "w-10 h-10 transition-transform hover:scale-110",
                                    config.accentColor === color && "ring-2 ring-white ring-offset-2 ring-offset-background"
                                )}
                                style={{ backgroundColor: color }}
                                onClick={() => updateWizardConfig({ accentColor: color })}
                            />
                        ))}
                        <div className="relative">
                            <Input
                                type="color"
                                className="w-10 h-10 p-0 border-0 cursor-pointer"
                                value={config.accentColor || "#d97706"}
                                onChange={(e) => updateWizardConfig({ accentColor: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Button Style */}
                <div className="space-y-3">
                    <Label>Button Style</Label>
                    <div className="flex gap-3">
                        {buttonStyles.map((style) => (
                            <Card
                                key={style.id}
                                className={cn(
                                    "flex-1 cursor-pointer transition-all",
                                    config.buttonStyle === style.id && "border-primary"
                                )}
                                onClick={() => updateWizardConfig({ buttonStyle: style.id })}
                            >
                                <CardContent className="p-4 text-center">
                                    <div
                                        className="h-10 flex items-center justify-center text-sm font-medium mb-2"
                                        style={{
                                            background: style.id === 'gradient'
                                                ? `linear-gradient(135deg, ${config.primaryColor || '#f59e0b'}, ${config.accentColor || '#d97706'})`
                                                : style.id === 'outline'
                                                    ? 'transparent'
                                                    : config.primaryColor || '#f59e0b',
                                            color: style.id === 'outline'
                                                ? config.primaryColor || '#f59e0b'
                                                : '#000',
                                            border: style.id === 'outline'
                                                ? `2px solid ${config.primaryColor || '#f59e0b'}`
                                                : 'none',
                                        }}
                                    >
                                        Submit
                                    </div>
                                    <span className="text-sm">{style.name}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
