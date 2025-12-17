"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface WizardStepperProps {
    steps: { title: string }[];
    currentStep: number;
}

export function WizardStepper({ steps, currentStep }: WizardStepperProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const isPending = index > currentStep;

                return (
                    <div key={step.title} className="flex items-center flex-1 last:flex-none">
                        <div className="flex items-center gap-3 relative">
                            {isActive && (
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse" />
                            )}
                            <div
                                className={cn(
                                    "relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
                                    isCompleted
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : isActive
                                            ? "bg-background border-primary text-primary shadow-lg shadow-primary/20 scale-110"
                                            : "bg-muted border-muted-foreground/20 text-muted-foreground"
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="h-5 w-5 animate-in zoom-in duration-200" />
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </div>
                            <span
                                className={cn(
                                    "text-sm font-medium hidden md:block transition-colors duration-300 absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap",
                                    isActive ? "text-primary font-bold" : isCompleted ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {step.title}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="flex-1 mx-4 h-1 rounded-full bg-muted overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full bg-primary transition-all duration-500 ease-in-out",
                                        isCompleted ? "w-full" : "w-0"
                                    )}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
