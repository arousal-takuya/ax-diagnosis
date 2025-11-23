import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    hover?: boolean;
}

export default function Card({ children, className = '', title, description, hover = false }: CardProps) {
    const hoverClass = hover ? 'hover:shadow-md transition-shadow duration-200' : '';

    return (
        <div className={cn("dashboard-card bg-white p-6", hoverClass, className)}>
            {(title || description) && (
                <div className="mb-4 border-b border-[var(--border-light)] pb-3">
                    {title && <h3 className="text-lg font-bold text-[var(--primary)]">{title}</h3>}
                    {description && <p className="text-sm text-[var(--foreground-muted)] mt-1">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
}
