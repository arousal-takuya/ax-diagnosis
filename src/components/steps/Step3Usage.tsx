import React from 'react';
import { DiagnosisData } from '@/types/diagnosis';
import { ACTIVE_USER_RATES, DEPARTMENTS, METRICS, MEASUREMENT_OPERATIONS, RAG_STATUSES, WORKFLOW_TOOLS } from '@/constants/options';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface StepProps {
    data: DiagnosisData;
    updateData: (data: Partial<DiagnosisData>) => void;
}

export default function Step3Usage({ data, updateData }: StepProps) {
    const handleExclusiveCheckboxChange = (
        field: keyof DiagnosisData,
        value: string,
        checked: boolean,
        noneValue: string = 'なし'
    ) => {
        const currentValues = data[field] as string[];
        let newValues = [...currentValues];

        if (checked) {
            if (value === noneValue) {
                newValues = [noneValue];
            } else {
                newValues = newValues.filter(v => v !== noneValue);
                newValues.push(value);
            }
        } else {
            newValues = newValues.filter(v => v !== value);
        }

        updateData({ [field]: newValues });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Step 3: 利用・浸透 / ユースケース・基盤/成果</h2>
                <p className="text-[var(--secondary-foreground)]">実際の利用状況や成果について教えてください。</p>
            </div>

            <Card>
                <div className="space-y-6">
                    <Select
                        label="Q13：週3回以上の有効利用者率（区分）"
                        value={data.activeUserRate}
                        onChange={(e) => updateData({ activeUserRate: e.target.value })}
                        options={ACTIVE_USER_RATES}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                            Q14：浸透している部門
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {DEPARTMENTS.map((dept) => (
                                <Checkbox
                                    key={dept}
                                    label={dept}
                                    checked={data.departments.includes(dept)}
                                    onChange={(e) => handleExclusiveCheckboxChange('departments', dept, e.target.checked)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                            Q15：測定指標
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {METRICS.map((metric) => (
                                <Checkbox
                                    key={metric}
                                    label={metric}
                                    checked={data.metrics.includes(metric)}
                                    onChange={(e) => handleExclusiveCheckboxChange('metrics', metric, e.target.checked)}
                                />
                            ))}
                        </div>
                    </div>

                    <Select
                        label="Q16：成果の計測運用"
                        value={data.measurementOperation}
                        onChange={(e) => updateData({ measurementOperation: e.target.value })}
                        options={MEASUREMENT_OPERATIONS}
                    />

                    <Select
                        label="Q17：RAG（社内データ連携）"
                        value={data.rag}
                        onChange={(e) => updateData({ rag: e.target.value })}
                        options={RAG_STATUSES}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                            Q18：ワークフロー/ツール連携
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {WORKFLOW_TOOLS.map((tool) => (
                                <Checkbox
                                    key={tool}
                                    label={tool}
                                    checked={data.workflowTools.includes(tool)}
                                    onChange={(e) => handleExclusiveCheckboxChange('workflowTools', tool, e.target.checked)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
