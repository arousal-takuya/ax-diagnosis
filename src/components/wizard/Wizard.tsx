"use client";

import React, { useState } from 'react';
import { DiagnosisData, initialDiagnosisData } from '@/types/diagnosis';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import Step1Profile from '@/components/steps/Step1Profile';
import Step2Status from '@/components/steps/Step2Status';
import Step3Usage from '@/components/steps/Step3Usage';
import Step4Goals from '@/components/steps/Step4Goals';
import { useRouter } from 'next/navigation';

export default function Wizard() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<DiagnosisData>(initialDiagnosisData);

    const totalSteps = 4;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            // Submit logic here
            console.log('Form Data:', formData);
            // Save to local storage or pass via query params (simplified for now)
            localStorage.setItem('ax_diagnosis_result', JSON.stringify(formData));
            router.push('/diagnosis/result');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const updateFormData = (data: Partial<DiagnosisData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1Profile data={formData} updateData={updateFormData} />;
            case 2:
                return <Step2Status data={formData} updateData={updateFormData} />;
            case 3:
                return <Step3Usage data={formData} updateData={updateFormData} />;
            case 4:
                return <Step4Goals data={formData} updateData={updateFormData} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="mb-8">
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            <div className="mb-8 min-h-[400px]">
                {renderStep()}
            </div>

            <div className="flex justify-between pt-6 border-t border-[var(--border)]">
                <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                >
                    Back
                </Button>
                <Button onClick={handleNext}>
                    {currentStep === totalSteps ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    );
}
