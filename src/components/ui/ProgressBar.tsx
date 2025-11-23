import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full">
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
