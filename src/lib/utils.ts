import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateId(): string {
    return `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateTransactionId(): string {
    const digits = '0123456789';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const secondChar = letters[Math.floor(Math.random() * letters.length)];

    let middleDigits = '';
    for (let i = 0; i < 7; i++) {
        middleDigits += digits[Math.floor(Math.random() * digits.length)];
    }

    const thirdChar = letters[Math.floor(Math.random() * letters.length)];

    let lastDigits = '';
    for (let i = 0; i < 6; i++) {
        lastDigits += digits[Math.floor(Math.random() * digits.length)];
    }

    const lastChar = letters[Math.floor(Math.random() * letters.length)];

    return `${firstDigit}${secondChar}${middleDigits}${thirdChar}${lastDigits}${lastChar}`;
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
}
