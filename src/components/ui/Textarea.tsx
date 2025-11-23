import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export default function Textarea({ label, error, className = '', id, ...props }: TextareaProps) {
    const textareaId = id || props.name;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={textareaId} className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                className={cn(
                    "w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--foreground)] placeholder-gray-500 transition-colors focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50",
                    error && "border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]",
                    className
                )}
                aria-invalid={!!error}
                aria-describedby={error ? `${textareaId}-error` : undefined}
                {...props}
            />
            {error && <p id={`${textareaId}-error`} className="mt-1 text-xs text-[var(--error)]">{error}</p>}
        </div>
    );
}
