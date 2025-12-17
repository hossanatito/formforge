import { create } from 'zustand';
import { FormConfig, WizardState, Platform, AppStats } from '@/types';

interface AppStore {
    // Forms
    forms: FormConfig[];
    setForms: (forms: FormConfig[]) => void;
    addForm: (form: FormConfig) => void;
    updateForm: (id: string, form: Partial<FormConfig>) => void;
    deleteForm: (id: string) => void;

    // Stats
    stats: AppStats;
    updateStats: () => void;

    // Wizard
    wizard: WizardState;
    setWizardStep: (step: number) => void;
    setWizardPlatform: (platform: Platform) => void;
    updateWizardConfig: (config: Partial<FormConfig>) => void;
    resetWizard: () => void;

    // Loading
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const initialWizardState: WizardState = {
    currentStep: 0,
    platform: null,
    formConfig: {
        theme: 'dark',
        primaryColor: '#f59e0b',
        accentColor: '#d97706',
        buttonStyle: 'gradient',
        products: [],
    }
};

export const useAppStore = create<AppStore>((set, get) => ({
    forms: [],

    setForms: (forms) => {
        set({ forms });
        get().updateStats();
    },

    addForm: (form) => {
        set((state) => ({ forms: [...state.forms, form] }));
        get().updateStats();
    },

    updateForm: (id, updates) => {
        set((state) => ({
            forms: state.forms.map(f => f.id === id ? { ...f, ...updates, updatedAt: new Date().toISOString() } : f)
        }));
    },

    deleteForm: (id) => {
        set((state) => ({ forms: state.forms.filter(f => f.id !== id) }));
        get().updateStats();
    },

    stats: {
        totalForms: 0,
        jvzooForms: 0,
        warriorplusForms: 0,
        lastCreated: null
    },

    updateStats: () => {
        const forms = get().forms;
        const sorted = [...forms].sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        set({
            stats: {
                totalForms: forms.length,
                jvzooForms: forms.filter(f => f.platform === 'jvzoo').length,
                warriorplusForms: forms.filter(f => f.platform === 'warriorplus').length,
                lastCreated: sorted.length > 0 ? sorted[0].createdAt : null
            }
        });
    },

    wizard: initialWizardState,

    setWizardStep: (step) => set((state) => ({
        wizard: { ...state.wizard, currentStep: step }
    })),

    setWizardPlatform: (platform) => set((state) => ({
        wizard: {
            ...state.wizard,
            platform,
            formConfig: { ...state.wizard.formConfig, platform }
        }
    })),

    updateWizardConfig: (config) => set((state) => ({
        wizard: {
            ...state.wizard,
            formConfig: { ...state.wizard.formConfig, ...config }
        }
    })),

    resetWizard: () => set({ wizard: initialWizardState }),

    isLoading: true,
    setLoading: (loading) => set({ isLoading: loading }),
}));
