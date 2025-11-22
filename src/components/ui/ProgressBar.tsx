import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

    return (
        <div className="w-full">
            <div className="mb-2 flex justify-between text-xs font-medium text-[var(--secondary-foreground)]">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface)]">
                <div
                    className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
