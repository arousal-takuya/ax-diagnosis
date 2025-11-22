"use client";

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { DiagnosisData } from '@/types/diagnosis';
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
                        <h2 className="text-xl font-bold text-[var(--foreground)]">データが見つかりません</h2>
                        <p className="mt-2 text-[var(--secondary-foreground)]">診断を最初からやり直してください。</p>
                        <Link href="/diagnosis" className="mt-4 inline-block">
                            <Button>診断を開始する</Button>
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-8 animate-fade-in">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-[var(--foreground)]">診断結果サマリー</h1>
                    <p className="mt-2 text-[var(--secondary-foreground)]">
                        ご回答いただいた内容のサマリーです。
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card title="Step 1: 基本プロファイル">
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">診断組織対象</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.organizationTarget}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">従業員規模</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.employeeCount}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">業界</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.industry}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">AI推進部署</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.aiDepartment}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">推進方針</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.policy.join(', ')}</dd>
                            </div>
                        </dl>
                    </Card>

                    <Card title="Step 2: 導入状況・ガバナンス">
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">導入ステータス</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.status}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">利用ツール</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.tools.join(', ')}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">導入時期</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.introductionYear}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">ガイドライン</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.guidelines}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">利用率取得</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.usageRateTracking}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">研修</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.training.join(', ')}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">エキスパート制度</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.expertSystem}</dd>
                            </div>
                        </dl>
                    </Card>

                    <Card title="Step 3: 利用・浸透">
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">有効利用者率</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.activeUserRate}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">浸透部門</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.departments.join(', ')}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">測定指標</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.metrics.join(', ')}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">成果計測</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.measurementOperation}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">RAG</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.rag}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">連携ツール</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.workflowTools.join(', ')}</dd>
                            </div>
                        </dl>
                    </Card>

                    <Card title="Step 4: 競合/目標">
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">競合成熟度</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.competitorMaturity}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">ベンチマーク</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.benchmark || 'なし'}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">主要課題</dt>
                                <dd className="font-medium text-[var(--foreground)] max-w-[200px] truncate">{data.issues || 'なし'}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">目標KGI</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.kgi.join(', ')}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">目標KPI</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.kpi || 'なし'}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">期間</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.period}</dd>
                            </div>
                            <div className="flex justify-between border-b border-[var(--border)] pb-2">
                                <dt className="text-[var(--secondary-foreground)]">予算</dt>
                                <dd className="font-medium text-[var(--foreground)]">{data.budget}</dd>
                            </div>
                        </dl>
                    </Card>
                </div>

                <div className="flex justify-center pt-8">
                    <Link href="/diagnosis">
                        <Button variant="outline">もう一度診断する</Button>
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
