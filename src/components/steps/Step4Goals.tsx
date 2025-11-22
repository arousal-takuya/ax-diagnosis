import React from 'react';
import { DiagnosisData } from '@/types/diagnosis';
import { COMPETITOR_MATURITY, KGIS, PERIODS, BUDGETS } from '@/constants/options';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';

interface StepProps {
    data: DiagnosisData;
    updateData: (data: Partial<DiagnosisData>) => void;
}

export default function Step4Goals({ data, updateData }: StepProps) {
    const handleKgiChange = (kgi: string, checked: boolean) => {
        let newKgis = [...data.kgi];
        if (checked) {
            newKgis.push(kgi);
        } else {
            newKgis = newKgis.filter(k => k !== kgi);
        }
        updateData({ kgi: newKgis });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Step 4: 競合/目標（TO-BE）</h2>
                <p className="text-[var(--secondary-foreground)]">将来の目標や競合状況について教えてください。</p>
            </div>

            <Card>
                <div className="space-y-6">
                    <Select
                        label="Q19：主要競合の想定成熟度"
                        value={data.competitorMaturity}
                        onChange={(e) => updateData({ competitorMaturity: e.target.value })}
                        options={COMPETITOR_MATURITY}
                    />

                    <Input
                        label="Q20：参考ベンチマーク企業（任意）"
                        value={data.benchmark}
                        onChange={(e) => updateData({ benchmark: e.target.value })}
                        placeholder="企業名などを入力"
                    />

                    <Textarea
                        label="Q21：主要課題（任意）"
                        value={data.issues}
                        onChange={(e) => updateData({ issues: e.target.value })}
                        rows={4}
                        placeholder="現在抱えている課題を入力"
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                            Q22：目標KGI
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {KGIS.map((kgi) => (
                                <Checkbox
                                    key={kgi}
                                    label={kgi}
                                    checked={data.kgi.includes(kgi)}
                                    onChange={(e) => handleKgiChange(kgi, e.target.checked)}
                                />
                            ))}
                        </div>
                    </div>

                    <Input
                        label="Q23：目標KPI（具体値）"
                        value={data.kpi}
                        onChange={(e) => updateData({ kpi: e.target.value })}
                        placeholder="例：業務時間20%削減"
                    />

                    <Select
                        label="Q24：期間"
                        value={data.period}
                        onChange={(e) => updateData({ period: e.target.value })}
                        options={PERIODS}
                    />

                    <Select
                        label="Q25：AI推進にかける年間のおおよその予算規模"
                        value={data.budget}
                        onChange={(e) => updateData({ budget: e.target.value })}
                        options={BUDGETS}
                    />
                </div>
            </Card>
        </div>
    );
}
