import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full">
            <div className="mb-2 flex justify-between text-sm font-medium text-[var(--secondary-foreground)]">
                <span>ステップ {currentStep} / {totalSteps}</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface)]">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out shadow-lg shadow-blue-500/30"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
