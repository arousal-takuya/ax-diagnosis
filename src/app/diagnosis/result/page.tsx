"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, RefreshCcw, ArrowRight, BarChart2, ShieldCheck, Users, Database, Brain } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { DiagnosisData } from '@/types/diagnosis';
import { calculateScores, getScoreLevel } from '@/lib/scoring';
import { cn } from '@/lib/utils';

export default function ResultPage() {
    const [data, setData] = useState<DiagnosisData | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('diagnosisData');
        if (storedData) {
            setData(JSON.parse(storedData));
            // Trigger animation after load
            setTimeout(() => setIsAnimating(true), 100);
        }
    }, []);

    if (!data) {
        return (
            <MainLayout>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center animate-fade-in">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Sparkles className="text-gray-400" size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">データが見つかりません</h2>
                        <p className="text-[var(--foreground-muted)] mb-8">診断データが存在しないか、有効期限が切れています。</p>
                        <Link href="/diagnosis">
                            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                                <RefreshCcw size={18} className="mr-2" />
                                診断を開始する
                            </Button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const scores = calculateScores(data);
    const overallLevel = getScoreLevel(scores.overall);

    const categoryScores = [
        { name: '導入成熟度', score: scores.adoption, icon: <Database size={20} />, color: 'bg-blue-500' },
        { name: '利用浸透度', score: scores.usage, icon: <Users size={20} />, color: 'bg-cyan-500' },
        { name: 'ガバナンス', score: scores.governance, icon: <ShieldCheck size={20} />, color: 'bg-indigo-500' },
        { name: '成果測定', score: scores.measurement, icon: <BarChart2 size={20} />, color: 'bg-teal-500' },
    ];

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto pb-12 animate-slide-in">
                {/* Score Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-[var(--border-light)] overflow-hidden mb-8">
                    <div className="p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Background Gradient */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent -z-10" />

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                            <Sparkles size={12} />
                            AX Diagnosis Result
                        </div>

                        <div className="mb-2">
                            <span className="text-sm font-bold text-[var(--foreground-muted)] uppercase tracking-wider block mb-2">Total Score</span>
                            <div className="flex items-end justify-center gap-3 leading-none">
                                <span className={cn("text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600")}>
                                    {scores.overall}
                                </span>
                                <span className="text-2xl md:text-3xl text-gray-400 font-bold mb-2 md:mb-3">/ 100</span>
                            </div>
                        </div>

                        <div className="mt-6 mb-8">
                            <div className={cn(
                                "inline-block px-6 py-2 rounded-full text-lg font-bold border shadow-sm",
                                "bg-white text-blue-600 border-blue-100"
                            )}>
                                {overallLevel.level}
                            </div>
                        </div>

                        <p className="text-[var(--foreground)] max-w-lg mx-auto leading-relaxed text-lg">
                            {overallLevel.description}
                        </p>
                    </div>

                    {/* Category Breakdown */}
                    <div className="border-t border-[var(--border-light)] bg-gray-50/50 p-6 md:p-10">
                        <h4 className="text-xs font-bold text-[var(--foreground-muted)] uppercase tracking-wider mb-6 flex items-center gap-2">
                            <BarChart2 size={14} />
                            Category Breakdown
                        </h4>
                        <div className="space-y-6">
                            {categoryScores.map((cat, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex justify-between items-end mb-2">
                                        <div className="flex items-center gap-3 text-[var(--foreground)] font-semibold">
                                            <div className={cn("p-2 rounded-lg bg-white shadow-sm text-gray-600")}>
                                                {cat.icon}
                                            </div>
                                            {cat.name}
                                        </div>
                                        <span className="text-lg font-bold text-[var(--foreground)]">{cat.score}%</span>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full rounded-full transition-all duration-1000 ease-out", cat.color)}
                                            style={{
                                                width: isAnimating ? `${cat.score}%` : '0%',
                                                transitionDelay: `${idx * 150}ms`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Card */}
                <div className="bg-[var(--header-bg)] rounded-2xl shadow-lg p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div className="relative z-10">
                        <h4 className="font-bold text-xl mb-2 flex items-center gap-2">
                            <Brain size={24} className="text-blue-300" />
                            詳細レポートが必要ですか？
                        </h4>
                        <p className="text-blue-100 opacity-90">
                            より深い分析と、他社比較データを含む完全版レポートを<br className="hidden md:block" />PDF形式でダウンロードできます。
                        </p>
                    </div>
                    <Button
                        className="relative z-10 whitespace-nowrap bg-white text-[var(--header-bg)] hover:bg-blue-50 border-0 shadow-xl px-8 py-4 text-lg font-bold"
                        onClick={() => alert('デモ版のため、レポート機能は現在利用できません。')}
                    >
                        レポートを表示
                    </Button>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/diagnosis">
                        <Button variant="ghost" className="text-[var(--foreground-muted)] hover:text-[var(--primary)] hover:bg-transparent">
                            <RefreshCcw size={16} className="mr-2" />
                            もう一度診断する
                        </Button>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
