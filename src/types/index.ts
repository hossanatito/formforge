export type Platform = 'jvzoo' | 'warriorplus';
export type Theme = 'dark' | 'light' | 'custom';
export type ButtonStyle = 'gradient' | 'solid' | 'outline';

export interface Product {
    id: string;
    name: string;
    itemNumber: string;
}

export interface JVZooConfig {
    vendorId: string;
    verifyCode: string;
    transAmount: string;
    paymentMethod: string;
}

export interface WarriorPlusConfig {
    securityKey: string;
    txnId: string;
    saleId: string;
}

export interface FormConfig {
    id: string;
    name: string;
    platform: Platform;
    createdAt: string;
    updatedAt: string;

    // Basic Config
    formTitle: string;
    submitEndpoint: string;
    productTitle: string;

    // Products
    products: Product[];

    // Styling
    theme: Theme;
    primaryColor: string;
    accentColor: string;
    buttonStyle: ButtonStyle;

    // Platform-specific
    jvzooConfig?: JVZooConfig;
    warriorplusConfig?: WarriorPlusConfig;
}

export interface AppStats {
    totalForms: number;
    jvzooForms: number;
    warriorplusForms: number;
    lastCreated: string | null;
}

export interface WizardState {
    currentStep: number;
    platform: Platform | null;
    formConfig: Partial<FormConfig>;
}

// Electron API types
declare global {
    interface Window {
        electronAPI: {
            createForm: (config: FormConfig) => Promise<FormConfig>;
            getAllForms: () => Promise<FormConfig[]>;
            getForm: (id: string) => Promise<FormConfig | undefined>;
            updateForm: (id: string, config: Partial<FormConfig>) => Promise<FormConfig | null>;
            deleteForm: (id: string) => Promise<boolean>;
            exportForm: (id: string, phpContent: string) => Promise<{ success: boolean; path?: string }>;
            minimize: () => Promise<void>;
            maximize: () => Promise<void>;
            close: () => Promise<void>;
            isMaximized: () => Promise<boolean>;
        };
    }
}
