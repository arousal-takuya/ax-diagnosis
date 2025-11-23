import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className = '', id, ...props }: InputProps) {
    const inputId = id || props.name;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="mb-1 block text-sm font-semibold text-[var(--foreground)]">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={cn(
                    "w-full rounded border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] placeholder-gray-400 transition-colors focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:bg-gray-100 disabled:cursor-not-allowed",
                    error && "border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]",
                    className
                )}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...props}
            />
            {error && <p id={`${inputId}-error`} className="mt-1 text-xs text-[var(--error)]">{error}</p>}
        </div>
    );
}
