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
            <div className="space-y-12 animate-fade-in pb-12">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold text-[var(--foreground)] mb-4">診断結果</h1>
                    <p className="text-xl text-[var(--foreground-muted)]">
                        あなたの組織のAI活用成熟度を分析しました
                    </p>
                </div>

                {/* Overall Score */}
                <Card className="text-center">
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">総合スコア</h2>
                    <div className="flex flex-col items-center">
                        <ProgressRing score={scores.overall} size={240} strokeWidth={20} />
                        <div className="mt-8">
                            <div
                                className="inline-block px-6 py-3 rounded-full text-white font-bold text-xl"
                                style={{ backgroundColor: overallLevel.color }}
                            >
                                {overallLevel.level}
                            </div>
                            <p className="mt-4 text-lg text-[var(--foreground-muted)]">
                                {overallLevel.description}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Category Scores */}
                <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">カテゴリ別スコア（レーダーチャート）</h3>
                        <ScoreRadarChart data={radarData} />
                    </Card>
                    <Card>
                        <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">カテゴリ別スコア（バーチャート）</h3>
                        <CategoryBarChart data={barData} />
                    </Card>
                </div>

                {/* Detailed Scores */}
                <div className="grid gap-6 md:grid-cols-4">
                    <Card hover>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gradient mb-2">{scores.adoption}</div>
                            <div className="text-sm font-semibold text-[var(--foreground-muted)]">導入成熟度</div>
                        </div>
                    </Card>
                    <Card hover>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gradient mb-2">{scores.usage}</div>
                            <div className="text-sm font-semibold text-[var(--foreground-muted)]">利用浸透度</div>
                        </div>
                    </Card>
                    <Card hover>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gradient mb-2">{scores.governance}</div>
                            <div className="text-sm font-semibold text-[var(--foreground-muted)]">ガバナンス</div>
                        </div>
                    </Card>
                    <Card hover>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gradient mb-2">{scores.measurement}</div>
                            <div className="text-sm font-semibold text-[var(--foreground-muted)]">成果測定</div>
                        </div>
                    </Card>
                </div>

                {/* Summary Data */}
                <Card title="回答サマリー">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="font-bold text-[var(--foreground)] mb-3">基本情報</h4>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between py-2 border-b border-[var(--border-light)]">
                                    <dt className="text-[var(--foreground-muted)]">組織対象</dt>
                                    <dd className="font-semibold text-[var(--foreground)]">{data.organizationTarget}</dd>
                                </div>
                                <div className="flex justify-between py-2 border-b border-[var(--border-light)]">
                                    <dt className="text-[var(--foreground-muted)]">従業員規模</dt>
                                    <dd className="font-semibold text-[var(--foreground)]">{data.employeeCount}</dd>
                                </div>
                                <div className="flex justify-between py-2 border-b border-[var(--border-light)]">
                                    <dt className="text-[var(--foreground-muted)]">業界</dt>
                                    <dd className="font-semibold text-[var(--foreground)]">{data.industry}</dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <h4 className="font-bold text-[var(--foreground)] mb-3">導入状況</h4>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between py-2 border-b border-[var(--border-light)]">
                                    <dt className="text-[var(--foreground-muted)]">ステータス</dt>
                                    <dd className="font-semibold text-[var(--foreground)]">{data.status}</dd>
                                </div>
                                <div className="flex justify-between py-2 border-b border-[var(--border-light)]">
                                    <dt className="text-[var(--foreground-muted)]">導入時期</dt>
                                    <dd className="font-semibold text-[var(--foreground)]">{data.introductionYear}</dd>
                                </div>
                                <div className="flex justify-between py-2 border-b border-[var(--border-light)]">
                                    <dt className="text-[var(--foreground-muted)]">有効利用者率</dt>
                                    <dd className="font-semibold text-[var(--foreground)]">{data.activeUserRate}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </Card>

                {/* CTA */}
                <div className="flex justify-center gap-4 pt-8">
                    <Link href="/diagnosis">
                        <Button size="lg" variant="outline">もう一度診断する</Button>
                    </Link>
                    <Button size="lg">レポートをダウンロード（準備中）</Button>
                </div>
            </div>
        </MainLayout>
    );
}
