import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

export default function Checkbox({ label, className = '', id, ...props }: CheckboxProps) {
    const checkboxId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
        <div className={`flex items-start ${className}`}>
            <div className="flex h-5 items-center">
                <input
                    id={checkboxId}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                    {...props}
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor={checkboxId} className="font-medium text-[var(--foreground)]">
                    {label}
                </label>
            </div>
        </div>
    );
}
