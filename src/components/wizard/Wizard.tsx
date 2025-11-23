"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Step1Profile from '@/components/steps/Step1Profile';
import Step2Status from '@/components/steps/Step2Status';
import Step3Usage from '@/components/steps/Step3Usage';
import Step4Goals from '@/components/steps/Step4Goals';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { DiagnosisData } from '@/types/diagnosis';
import { cn } from '@/lib/utils';

const INITIAL_DATA: DiagnosisData = {
    organizationTarget: '全社',
    employeeCount: '100-300人',
    industry: '製造業',
    aiDepartment: 'なし',
    policy: [],
    status: '未導入',
    governance: 'なし',
    tools: [],
    introductionYear: '未定',
    guidelines: 'なし',
    usageRateTracking: 'していない',
    training: [],
    expertSystem: 'なし',
    talent: 'いない',
    usage: 'していない',
    activeUserRate: '0%',
    departments: [],
    metrics: [],
    measurementOperation: 'していない',
    rag: 'なし',
    workflowTools: [],
    useCase: [],
    infrastructure: 'なし',
    outcome: 'なし',
    competitorMaturity: '不明',
    competitor: '不明',
    benchmark: 'なし',
    issues: '特になし',
    kgi: [],
    kpi: 'なし',
    period: '未定',
    budget: '未定',
    goal: '業務効率化',
};

export default function Wizard() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [data, setData] = useState<DiagnosisData>(INITIAL_DATA);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const updateData = (newData: Partial<DiagnosisData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
                setIsAnimating(false);
                window.scrollTo(0, 0);
            }, 300);
        } else {
            // Save data to local storage or state management before navigating
            localStorage.setItem('diagnosisData', JSON.stringify(data));
            router.push('/diagnosis/result');
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev - 1);
                setIsAnimating(false);
                window.scrollTo(0, 0);
            }, 300);
        }
    };

    if (!isLoaded) return null;

    const totalSteps = 4;
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans flex flex-col">
            {/* Sticky Header with Progress */}
            <header className="bg-white border-b border-[var(--border-light)] sticky top-0 z-50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center text-white shadow-md">
                            <Sparkles size={18} />
                        </div>
                        <h1 className="font-bold text-lg tracking-tight text-[var(--foreground)]">AX Compass</h1>
                    </div>
                    <div className="text-sm font-medium text-[var(--foreground-muted)]">
                        Step {currentStep} / {totalSteps}
                    </div>
                </div>
                <div className="h-1 bg-[var(--border-light)] w-full">
                    <div
                        className="h-full bg-[var(--primary)] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,120,212,0.5)]"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 w-full max-w-4xl mx-auto">
                <div className={cn(
                    "w-full transition-all duration-300 ease-in-out",
                    isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0 animate-slide-in"
                )}>
                    <Card className="mb-8 overflow-hidden border-0 shadow-xl ring-1 ring-black/5">
                        {/* Step Title Section */}
                        <div className="bg-gradient-to-r from-gray-50 to-white p-6 md:p-8 border-b border-[var(--border-light)]">
                            <div className="flex items-center gap-2 text-[var(--primary)] font-semibold uppercase text-xs tracking-wider mb-2">
                                <CheckCircle size={14} className="text-[var(--primary)]" />
                                <span>Step {currentStep}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
                                {currentStep === 1 && '基本プロファイル'}
                                {currentStep === 2 && '導入状況・ガバナンス'}
                                {currentStep === 3 && '利用・浸透'}
                                {currentStep === 4 && '競合・目標'}
                            </h2>
                            <p className="text-[var(--foreground-muted)] text-lg">
                                {currentStep === 1 && '組織の基本情報を入力してください。'}
                                {currentStep === 2 && '現在の導入状況やガバナンス体制について教えてください。'}
                                {currentStep === 3 && '実際の利用状況や成果について教えてください。'}
                                {currentStep === 4 && '将来の目標や競合状況について教えてください。'}
                            </p>
                        </div>

                        {/* Form Content */}
                        <div className="p-6 md:p-8">
                            <div className="space-y-8">
                                {currentStep === 1 && <Step1Profile data={data} updateData={updateData} />}
                                {currentStep === 2 && <Step2Status data={data} updateData={updateData} />}
                                {currentStep === 3 && <Step3Usage data={data} updateData={updateData} />}
                                {currentStep === 4 && <Step4Goals data={data} updateData={updateData} />}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="mt-10 flex justify-between pt-6 border-t border-[var(--border-light)]">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-gray-100 px-6"
                                >
                                    <ChevronLeft size={18} className="mr-2" /> 戻る
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={nextStep}
                                    size="lg"
                                    className="px-8 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5"
                                >
                                    {currentStep === 4 ? (
                                        <span className="flex items-center">診断完了 <CheckCircle size={18} className="ml-2" /></span>
                                    ) : (
                                        <span className="flex items-center">次へ <ChevronRight size={18} className="ml-2" /></span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}
