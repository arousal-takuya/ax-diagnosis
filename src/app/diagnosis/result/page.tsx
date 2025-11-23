"use client";

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { DiagnosisData } from '@/types/diagnosis';
import { calculateScores, getScoreLevel } from '@/lib/scoring';
import ScoreRadarChart from '@/components/charts/ScoreRadarChart';
import ProgressRing from '@/components/charts/ProgressRing';
import CategoryBarChart from '@/components/charts/CategoryBarChart';
import Link from 'next/link';

export default function ResultPage() {
    const [data, setData] = useState<DiagnosisData | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('ax_diagnosis_result');
        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, []);

    if (!data) {
        return (
            <MainLayout>
                <div className="flex min-h-[50vh] items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[var(--foreground)]">データが見つかりません</h2>
                        <p className="mt-3 text-[var(--foreground-muted)]">診断を最初からやり直してください。</p>
                        <Link href="/diagnosis" className="mt-6 inline-block">
                            <Button size="lg">診断を開始する</Button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const scores = calculateScores(data);
    const overallLevel = getScoreLevel(scores.overall);

    const radarData = [
        { category: '導入成熟度', score: scores.adoption },
        { category: '利用浸透度', score: scores.usage },
        { category: 'ガバナンス', score: scores.governance },
        { category: '成果測定', score: scores.measurement },
    ];

    const barData = [
        { name: '導入', score: scores.adoption },
        { name: '利用', score: scores.usage },
        { name: 'ガバナンス', score: scores.governance },
        { name: '成果', score: scores.measurement },
    ];

    return (
        <MainLayout>
            <div className="space-y-6 pb-12">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--header-bg)]">AX Diagnosis Dashboard</h1>
                        <p className="text-sm text-[var(--foreground-muted)]">
                            最終更新: {new Date().toLocaleDateString()} | 対象: {data.organizationTarget}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="secondary">エクスポート</Button>
                        <Button size="sm" variant="primary">共有</Button>
                    </div>
                </div>

                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="flex flex-col items-center justify-center py-8">
                        <div className="text-5xl font-bold text-[var(--foreground)] mb-1">{scores.overall}</div>
                        <div className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">総合スコア</div>
                    </Card>
                    <Card className="flex flex-col items-center justify-center py-8">
                        <div className="text-5xl font-bold mb-1" style={{ color: overallLevel.color }}>{overallLevel.level}</div>
                        <div className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">成熟度レベル</div>
                    </Card>
                    <Card className="flex flex-col items-center justify-center py-8">
                        <div className="text-5xl font-bold text-[var(--primary)] mb-1">{scores.adoption}%</div>
                        <div className="text-sm font-medium text-[var(--foreground-muted)] uppercase tracking-wider">導入進捗率</div>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Main Chart Area (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card title="カテゴリ別スコア分析">
                            <div className="h-[300px] w-full">
                                <CategoryBarChart data={barData} />
                            </div>
                        </Card>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card title="成熟度バランス">
                                <div className="h-[250px] w-full flex items-center justify-center">
                                    <ScoreRadarChart data={radarData} />
                                </div>
                            </Card>
                            <Card title="総合評価">
                                <div className="h-[250px] w-full flex items-center justify-center">
                                    <ProgressRing score={scores.overall} size={180} strokeWidth={16} />
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Side Panel (1 col) */}
                    <div className="space-y-4">
                        <Card title="詳細メトリクス">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">導入成熟度</span>
                                        <span className="font-bold">{scores.adoption}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${scores.adoption}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">利用浸透度</span>
                                        <span className="font-bold">{scores.usage}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500" style={{ width: `${scores.usage}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">ガバナンス</span>
                                        <span className="font-bold">{scores.governance}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: `${scores.governance}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">成果測定</span>
                                        <span className="font-bold">{scores.measurement}</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500" style={{ width: `${scores.measurement}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card title="推奨アクション">
                            <ul className="space-y-3 text-sm">
                                <li className="flex gap-2 items-start">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span className="text-[var(--foreground-muted)]">全社的なAI利用ガイドラインの策定と周知を強化してください。</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span className="text-[var(--foreground-muted)]">部署ごとの利用状況を定期的にモニタリングする仕組みを導入しましょう。</span>
                                </li>
                                <li className="flex gap-2 items-start">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span className="text-[var(--foreground-muted)]">成功事例の共有会を開催し、利用促進を図ってください。</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>

                <div className="flex justify-center pt-8">
                    <Link href="/diagnosis">
                        <Button variant="outline">新しい診断を開始</Button>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
