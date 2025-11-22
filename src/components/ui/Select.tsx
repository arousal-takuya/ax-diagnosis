import React from 'react';

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
                <label htmlFor={selectId} className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`w-full rounded-xl border-2 border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--foreground)] transition-all duration-200 focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/10' : ''
                    } ${className}`}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-2 text-sm text-[var(--error)]">{error}</p>}
        </div>
    );
}
