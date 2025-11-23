import React from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
    placeholder?: string;
}

export default function Select({
    label,
    options,
    error,
    placeholder = '選択してください',
    className = '',
    id,
    ...props
}: SelectProps) {
    const selectId = id || props.name;

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={selectId} className="mb-1 block text-sm font-semibold text-[var(--foreground)]">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={cn(
                    "w-full rounded border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] transition-colors focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:bg-gray-100 disabled:cursor-not-allowed",
                    error && "border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]",
                    className
                )}
                aria-invalid={!!error}
                aria-describedby={error ? `${selectId}-error` : undefined}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p id={`${selectId}-error`} className="mt-1 text-xs text-[var(--error)]">{error}</p>}
        </div>
    );
}
