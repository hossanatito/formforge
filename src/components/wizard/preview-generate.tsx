"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { generatePHP } from "@/lib/templates";
import { generateId } from "@/lib/utils";
import { FormConfig } from "@/types";
import { Download, Copy, Check, Eye } from "lucide-react";

interface PreviewGenerateProps {
    onBack: () => void;
}

export function PreviewGenerate({ onBack }: PreviewGenerateProps) {
    const router = useRouter();
    const { wizard, addForm, resetWizard } = useAppStore();
    const [copied, setCopied] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [saving, setSaving] = useState(false);

    const config = wizard.formConfig;

    // Build complete form config
    const formConfig: FormConfig = {
        id: generateId(),
        name: config.name || "Untitled Form",
        platform: wizard.platform!,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        formTitle: config.formTitle || "",
        submitEndpoint: config.submitEndpoint || "",
        productTitle: config.productTitle || "",
        products: config.products || [],
        theme: config.theme || "dark",
        primaryColor: config.primaryColor || "#f59e0b",
        accentColor: config.accentColor || "#d97706",
        buttonStyle: config.buttonStyle || "gradient",
        jvzooConfig: config.jvzooConfig,
        warriorplusConfig: config.warriorplusConfig,
    };

    const phpCode = generatePHP(formConfig);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(phpCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = async () => {
        if (typeof window !== 'undefined' && window.electronAPI) {
            await window.electronAPI.exportForm(formConfig.id, phpCode);
        }
    };

    const handleSaveAndFinish = async () => {
        setSaving(true);

        if (typeof window !== 'undefined' && window.electronAPI) {
            await window.electronAPI.createForm(formConfig);
        }

        addForm(formConfig);
        resetWizard();
        router.push('/forms');
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">Preview & Generate</h2>
                <p className="text-muted-foreground mt-1">
                    Review your form configuration and generate the PHP code
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Form Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground text-sm">Name</span>
                                <span className="text-sm font-medium">{formConfig.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground text-sm">Platform</span>
                                <Badge variant="secondary">
                                    {formConfig.platform === 'jvzoo' ? 'JVZoo' : 'WarriorPlus'}
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground text-sm">Form Title</span>
                                <span className="text-sm font-medium">{formConfig.formTitle}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground text-sm">Products</span>
                                <span className="text-sm font-medium">{formConfig.products.length} items</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground text-sm">Theme</span>
                                <span className="text-sm font-medium capitalize">{formConfig.theme}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground text-sm">Colors</span>
                                <div className="flex gap-1">
                                    <div
                                        className="w-5 h-5"
                                        style={{ backgroundColor: formConfig.primaryColor }}
                                    />
                                    <div
                                        className="w-5 h-5"
                                        style={{ backgroundColor: formConfig.accentColor }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground text-sm">Button Style</span>
                                <span className="text-sm font-medium capitalize">{formConfig.buttonStyle}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Products List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {formConfig.products.map((product, index) => (
                                <div key={product.id} className="flex justify-between items-center p-2 bg-muted">
                                    <span className="text-sm">{product.name}</span>
                                    <span className="text-xs text-muted-foreground">#{product.itemNumber}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Code Preview Toggle */}
            <div className="space-y-3">
                <Button
                    variant="outline"
                    onClick={() => setShowCode(!showCode)}
                    className="gap-2"
                >
                    <Eye className="h-4 w-4" />
                    {showCode ? 'Hide' : 'Show'} PHP Code
                </Button>

                {showCode && (
                    <div className="relative">
                        <Textarea
                            value={phpCode}
                            readOnly
                            className="font-mono text-xs h-64 resize-none"
                        />
                        <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-2 gap-1"
                            onClick={handleCopy}
                        >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleExport} className="gap-2">
                        <Download className="h-4 w-4" />
                        Export PHP
                    </Button>
                    <Button onClick={handleSaveAndFinish} disabled={saving}>
                        {saving ? 'Saving...' : 'Save & Finish'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
