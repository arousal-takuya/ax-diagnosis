import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className = '', id, ...props }: InputProps) {
    const inputId = id || props.name;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`w-full rounded-xl border-2 border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--foreground)] placeholder-[var(--foreground-muted)] transition-all duration-200 focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/10' : ''
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-2 text-sm text-[var(--error)]">{error}</p>}
        </div>
    );
}
