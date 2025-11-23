import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
}

export default function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className={cn("w-full", className)}>
            <div className="mb-2 flex justify-between text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% Completed</span>
            </div>
            <div className="h-2 w-full overflow-hidden bg-[var(--border-light)]">
                <div
                    className="h-full bg-[var(--primary)] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
