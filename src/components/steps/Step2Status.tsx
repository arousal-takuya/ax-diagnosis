import React from 'react';
import { DiagnosisData } from '@/types/diagnosis';
import { STATUSES, TOOLS, YEARS, GUIDELINES, USAGE_TRACKING, TRAININGS, EXPERT_SYSTEMS } from '@/constants/options';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface StepProps {
    data: DiagnosisData;
    updateData: (data: Partial<DiagnosisData>) => void;
}

export default function Step2Status({ data, updateData }: StepProps) {
    const handleToolsChange = (tool: string, checked: boolean) => {
        let newTools = [...data.tools];

        if (checked) {
            if (tool === '未導入') {
                newTools = ['未導入'];
            } else {
                newTools = newTools.filter(t => t !== '未導入');
                newTools.push(tool);
            }
        } else {
            newTools = newTools.filter(t => t !== tool);
        }

        updateData({ tools: newTools });
    };

    const handleTrainingChange = (training: string, checked: boolean) => {
        let newTrainings = [...data.training];

        if (checked) {
            if (training === '未実施') {
                newTrainings = ['未実施'];
            } else {
                newTrainings = newTrainings.filter(t => t !== '未実施');
                newTrainings.push(training);
            }
        } else {
            newTrainings = newTrainings.filter(t => t !== training);
        }

        updateData({ training: newTrainings });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Step 2: 導入状況・ガバナンス・人材</h2>
                <p className="text-[var(--secondary-foreground)]">現在の導入状況やガバナンス体制について教えてください。</p>
            </div>

            <Card>
                <div className="space-y-6">
                    <Select
                        label="Q6：生成AIの導入ステータス"
                        value={data.status}
                        onChange={(e) => updateData({ status: e.target.value })}
                        options={STATUSES}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                            Q7：主な利用ツール
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {TOOLS.map((tool) => (
                                <Checkbox
                                    key={tool}
                                    label={tool}
                                    checked={data.tools.includes(tool)}
                                    onChange={(e) => handleToolsChange(tool, e.target.checked)}
                                />
                            ))}
                        </div>
                    </div>

                    <Select
                        label="Q8：生成AI環境の導入時期"
                        value={data.introductionYear}
                        onChange={(e) => updateData({ introductionYear: e.target.value })}
                        options={YEARS}
                    />

                    <Select
                        label="Q9：利用ガイドライン／ポリシー"
                        value={data.guidelines}
                        onChange={(e) => updateData({ guidelines: e.target.value })}
                        options={GUIDELINES}
                    />

                    <Select
                        label="Q10：利用率の取得"
                        value={data.usageRateTracking}
                        onChange={(e) => updateData({ usageRateTracking: e.target.value })}
                        options={USAGE_TRACKING}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                            Q11：AI活用研修の実施
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {TRAININGS.map((training) => (
                                <Checkbox
                                    key={training}
                                    label={training}
                                    checked={data.training.includes(training)}
                                    onChange={(e) => handleTrainingChange(training, e.target.checked)}
                                />
                            ))}
                        </div>
                    </div>

                    <Select
                        label="Q12：AIエキスパート／エバンジェリスト制度"
                        value={data.expertSystem}
                        onChange={(e) => updateData({ expertSystem: e.target.value })}
                        options={EXPERT_SYSTEMS}
                    />
                </div>
            </Card>
        </div>
    );
}
