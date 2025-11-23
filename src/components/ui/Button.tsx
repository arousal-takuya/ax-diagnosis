import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export default function Button({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm",
        secondary: "bg-[#E0E0E0] text-[#333333] hover:bg-[#D0D0D0]",
        outline: "border border-[var(--primary)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary-light)]",
        ghost: "bg-transparent hover:bg-[var(--border-light)] text-[var(--foreground)]",
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
    };

    const width = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
