"use client";

import { useAppStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Platform } from "@/types";

const platforms = [
    {
        id: "jvzoo" as Platform,
        name: "JVZoo",
        icon: "🛒",
        description: "Generate forms for JVZoo affiliate products",
        features: ["Transaction ID Generator", "JVZoo-specific fields", "IPN Integration Ready"]
    },
    {
        id: "warriorplus" as Platform,
        name: "WarriorPlus",
        icon: "⚔️",
        description: "Generate forms for WarriorPlus marketplace",
        features: ["Simple Registration", "W+ API Compatible", "Sale ID Support"]
    }
];

interface PlatformSelectProps {
    onNext: () => void;
}

export function PlatformSelect({ onNext }: PlatformSelectProps) {
    const { wizard, setWizardPlatform } = useAppStore();

    const handleSelect = (platform: Platform) => {
        setWizardPlatform(platform);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">Select Platform</h2>
                <p className="text-muted-foreground mt-1">
                    Choose the affiliate platform for your registration form
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform) => (
                    <Card
                        key={platform.id}
                        className={cn(
                            "cursor-pointer transition-all hover:border-primary/50",
                            wizard.platform === platform.id && "border-primary bg-primary/5"
                        )}
                        onClick={() => handleSelect(platform.id)}
                    >
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{platform.icon}</span>
                                <div>
                                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                                    <CardDescription>{platform.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {platform.features.map((feature) => (
                                    <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <Button onClick={onNext} disabled={!wizard.platform}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
