import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    hover?: boolean;
}

export default function Card({ children, className = '', title, description, hover = false }: CardProps) {
    const hoverClass = hover ? 'hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-200' : '';

    return (
        <div className={`bg-white rounded-2xl p-8 border border-[var(--border-light)] shadow-md ${hoverClass} ${className}`}>
            {(title || description) && (
                <div className="mb-6">
                    {title && <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">{title}</h3>}
                    {description && <p className="text-[var(--foreground-muted)]">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
}
