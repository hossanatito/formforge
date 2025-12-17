"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { Product } from "@/types";

interface ProductConfigProps {
    onNext: () => void;
    onBack: () => void;
}

export function ProductConfig({ onNext, onBack }: ProductConfigProps) {
    const { wizard, updateWizardConfig } = useAppStore();
    const products = wizard.formConfig.products || [];

    const [newProduct, setNewProduct] = useState({ name: "", itemNumber: "" });

    const addProduct = () => {
        if (newProduct.name && newProduct.itemNumber) {
            const product: Product = {
                id: `prod_${Date.now()}`,
                name: newProduct.name,
                itemNumber: newProduct.itemNumber,
            };
            updateWizardConfig({ products: [...products, product] });
            setNewProduct({ name: "", itemNumber: "" });
        }
    };

    const removeProduct = (id: string) => {
        updateWizardConfig({ products: products.filter(p => p.id !== id) });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">Product Configuration</h2>
                <p className="text-muted-foreground mt-1">
                    Add the products that users can select from
                </p>
            </div>

            <div className="space-y-4 max-w-xl">
                <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                            id="productName"
                            placeholder="Premium Edition"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                    </div>
                    <div className="w-40 space-y-2">
                        <Label htmlFor="itemNumber">Item Number</Label>
                        <Input
                            id="itemNumber"
                            placeholder="12345"
                            value={newProduct.itemNumber}
                            onChange={(e) => setNewProduct({ ...newProduct, itemNumber: e.target.value })}
                        />
                    </div>
                    <div className="pt-7">
                        <Button
                            onClick={addProduct}
                            disabled={!newProduct.name || !newProduct.itemNumber}
                            size="icon"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {products.length > 0 && (
                    <div className="space-y-2 mt-6">
                        <Label>Added Products ({products.length})</Label>
                        <div className="space-y-2">
                            {products.map((product) => (
                                <Card key={product.id}>
                                    <CardContent className="p-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                ID: {product.itemNumber}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => removeProduct(product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {products.length === 0 && (
                    <div className="border border-dashed border-border p-8 text-center text-muted-foreground">
                        <p>No products added yet.</p>
                        <p className="text-sm mt-1">Add at least one product to continue.</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext} disabled={products.length === 0}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
