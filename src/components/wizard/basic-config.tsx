"use client";

import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicConfigProps {
    onNext: () => void;
    onBack: () => void;
}

export function BasicConfig({ onNext, onBack }: BasicConfigProps) {
    const { wizard, updateWizardConfig } = useAppStore();
    const config = wizard.formConfig;

    const isValid = config.name && config.formTitle && config.submitEndpoint && config.productTitle;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">Basic Configuration</h2>
                <p className="text-muted-foreground mt-1">
                    Configure the basic settings for your form
                </p>
            </div>

            <div className="space-y-4 max-w-xl">
                <div className="space-y-2">
                    <Label htmlFor="name">Form Name</Label>
                    <Input
                        id="name"
                        placeholder="My Registration Form"
                        value={config.name || ""}
                        onChange={(e) => updateWizardConfig({ name: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                        Internal name for identifying this form
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="formTitle">Form Title</Label>
                    <Input
                        id="formTitle"
                        placeholder="Product Registration"
                        value={config.formTitle || ""}
                        onChange={(e) => updateWizardConfig({ formTitle: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                        Displayed as the heading on the form
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="submitEndpoint">Submit Endpoint URL</Label>
                    <Input
                        id="submitEndpoint"
                        placeholder="https://your-domain.com/webhook"
                        value={config.submitEndpoint || ""}
                        onChange={(e) => updateWizardConfig({ submitEndpoint: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                        Where the form data will be sent
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="productTitle">Product Title</Label>
                    <Input
                        id="productTitle"
                        placeholder="Amazing Product Bundle"
                        value={config.productTitle || ""}
                        onChange={(e) => updateWizardConfig({ productTitle: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                        The name of your product or offer
                    </p>
                </div>

                {wizard.platform === 'jvzoo' && (
                    <>
                        <div className="border-t border-border pt-4 mt-6">
                            <h3 className="font-medium mb-4">JVZoo Configuration</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="vendorId">Vendor ID</Label>
                                        <Input
                                            id="vendorId"
                                            placeholder="12345"
                                            value={config.jvzooConfig?.vendorId || ""}
                                            onChange={(e) => updateWizardConfig({
                                                jvzooConfig: { ...config.jvzooConfig, vendorId: e.target.value } as any
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="verifyCode">Verify Code</Label>
                                        <Input
                                            id="verifyCode"
                                            placeholder="ABC123"
                                            value={config.jvzooConfig?.verifyCode || ""}
                                            onChange={(e) => updateWizardConfig({
                                                jvzooConfig: { ...config.jvzooConfig, verifyCode: e.target.value } as any
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="transAmount">Transaction Amount</Label>
                                        <Input
                                            id="transAmount"
                                            placeholder="37.00"
                                            value={config.jvzooConfig?.transAmount || ""}
                                            onChange={(e) => updateWizardConfig({
                                                jvzooConfig: { ...config.jvzooConfig, transAmount: e.target.value } as any
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="paymentMethod">Payment Method</Label>
                                        <Input
                                            id="paymentMethod"
                                            placeholder="PYPL"
                                            value={config.jvzooConfig?.paymentMethod || "PYPL"}
                                            onChange={(e) => updateWizardConfig({
                                                jvzooConfig: { ...config.jvzooConfig, paymentMethod: e.target.value } as any
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {wizard.platform === 'warriorplus' && (
                    <>
                        <div className="border-t border-border pt-4 mt-6">
                            <h3 className="font-medium mb-4">WarriorPlus Configuration</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="securityKey">Security Key</Label>
                                    <Input
                                        id="securityKey"
                                        placeholder="Your W+ security key"
                                        value={config.warriorplusConfig?.securityKey || ""}
                                        onChange={(e) => updateWizardConfig({
                                            warriorplusConfig: { ...config.warriorplusConfig, securityKey: e.target.value } as any
                                        })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="txnId">Transaction ID</Label>
                                        <Input
                                            id="txnId"
                                            placeholder="8AB94645KS7334044"
                                            value={config.warriorplusConfig?.txnId || ""}
                                            onChange={(e) => updateWizardConfig({
                                                warriorplusConfig: { ...config.warriorplusConfig, txnId: e.target.value } as any
                                            })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="saleId">Sale ID</Label>
                                        <Input
                                            id="saleId"
                                            placeholder="8AB94645KS7334044"
                                            value={config.warriorplusConfig?.saleId || ""}
                                            onChange={(e) => updateWizardConfig({
                                                warriorplusConfig: { ...config.warriorplusConfig, saleId: e.target.value } as any
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext} disabled={!isValid}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
