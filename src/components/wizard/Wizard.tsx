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
        <div className="mx-auto max-w-4xl">
            {/* Header Section */}
            <div className="mb-8 animate-fade-in">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-[var(--foreground)] mb-2">AX診断</h1>
                    <p className="text-[var(--foreground-muted)]">
                        組織のAI活用状況を診断するための質問にお答えください。
                    </p>
                </div>
                <ProgressBar currentStep={currentStep} totalSteps={4} />
            </div>

            {/* Form Card */}
            <Card className="mb-8">
                {/* Step Title */}
                <div className="mb-8 pb-4 border-b-2 border-[var(--primary)]/20">
                    <h2 className="text-2xl font-bold text-[var(--primary)]">
                        {currentStep === 1 && 'Step 1: 基本プロファイル'}
                        {currentStep === 2 && 'Step 2: 導入状況・ガバナンス'}
                        {currentStep === 3 && 'Step 3: 利用・浸透'}
                        {currentStep === 4 && 'Step 4: 競合/目標'}
                    </h2>
                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                        {currentStep === 1 && '組織の基本情報を入力してください。'}
                        {currentStep === 2 && '現在の導入状況やガバナンス体制について教えてください。'}
                        {currentStep === 3 && '実際の利用状況や成果について教えてください。'}
                        {currentStep === 4 && '将来の目標や競合状況について教えてください。'}
                    </p>
                </div>

                {/* Step Content */}
                <div>
                    {currentStep === 1 && <Step1Profile data={data} updateData={updateData} />}
                    {currentStep === 2 && <Step2Status data={data} updateData={updateData} />}
                    {currentStep === 3 && <Step3Usage data={data} updateData={updateData} />}
                    {currentStep === 4 && <Step4Goals data={data} updateData={updateData} />}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-10 flex justify-between pt-6 border-t border-[var(--border-light)]">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        size="lg"
                        className="min-w-[120px]"
                    >
                        ← 戻る
                    </Button>
                    <Button
                        variant="primary"
                        onClick={nextStep}
                        size="lg"
                        className="min-w-[120px]"
                    >
                        {currentStep === 4 ? '診断完了 ✓' : '次へ →'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
