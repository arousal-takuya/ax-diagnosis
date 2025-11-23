"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import Step1Profile from '@/components/steps/Step1Profile';
import Step2Status from '@/components/steps/Step2Status';
import Step3Usage from '@/components/steps/Step3Usage';
import Step4Goals from '@/components/steps/Step4Goals';
import { DiagnosisData, initialDiagnosisData } from '@/types/diagnosis';
import { useRouter } from 'next/navigation';

export default function Wizard() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState<DiagnosisData>(initialDiagnosisData);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('ax_diagnosis_data');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('ax_diagnosis_data', JSON.stringify(data));
        }
    }, [data, isLoaded]);

    const updateData = (newData: Partial<DiagnosisData>) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            // Finish
            localStorage.setItem('ax_diagnosis_result', JSON.stringify(data));
            router.push('/diagnosis/result');
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    if (!isLoaded) return null;

    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">AX診断</h1>
                <p className="text-[var(--foreground-muted)] mb-6">
                    組織のAI活用状況を診断するための質問にお答えください。
                </p>
                <ProgressBar currentStep={currentStep} totalSteps={4} />
            </div>

            <Card className="mb-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[var(--primary)] border-b border-[var(--border-light)] pb-2 mb-4">
                        {currentStep === 1 && 'Step 1: 基本プロファイル'}
                        {currentStep === 2 && 'Step 2: 導入状況・ガバナンス'}
                        {currentStep === 3 && 'Step 3: 利用・浸透'}
                        {currentStep === 4 && 'Step 4: 競合/目標'}
                    </h2>
                </div>

                <div className="space-y-6">
                    {currentStep === 1 && <Step1Profile data={data} updateData={updateData} />}
                    {currentStep === 2 && <Step2Status data={data} updateData={updateData} />}
                    {currentStep === 3 && <Step3Usage data={data} updateData={updateData} />}
                    {currentStep === 4 && <Step4Goals data={data} updateData={updateData} />}
                </div>

                <div className="mt-8 flex justify-between pt-6 border-t border-[var(--border-light)]">
                    <Button
                        variant="secondary"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="w-32"
                    >
                        戻る
                    </Button>
                    <Button
                        variant="primary"
                        onClick={nextStep}
                        className="w-32"
                    >
                        {currentStep === 4 ? '診断完了' : '次へ'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
