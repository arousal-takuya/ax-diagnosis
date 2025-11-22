import React from 'react';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string;
}

export default function Radio({ label, className = '', id, ...props }: RadioProps) {
    const radioId = id || `${props.name}-${props.value}`;

    return (
        <div className={`flex items-center ${className}`}>
            <input
                id={radioId}
                type="radio"
                className="h-4 w-4 border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                {...props}
            />
            <label htmlFor={radioId} className="ml-3 block text-sm font-medium text-[var(--foreground)]">
                {label}
            </label>
        </div>
    );
}
