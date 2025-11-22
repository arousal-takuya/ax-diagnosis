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
                <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)] placeholder-gray-500 transition-colors focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]' : ''
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-[var(--error)]">{error}</p>}
        </div>
    );
}
