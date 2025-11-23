import React from 'react';
import { DiagnosisData } from '@/types/diagnosis';
import { INDUSTRIES, EMPLOYEE_COUNTS, AI_DEPARTMENTS, POLICIES } from '@/constants/options';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface StepProps {
    data: DiagnosisData;
    updateData: (data: Partial<DiagnosisData>) => void;
}

export default function Step1Profile({ data, updateData }: StepProps) {
    const handlePolicyChange = (policy: string, checked: boolean) => {
        let newPolicies = [...data.policy];

        if (checked) {
            // Exclusive logic
            if (policy === '全社展開') {
                newPolicies = newPolicies.filter(p => p !== '部署限定');
            } else if (policy === '部署限定') {
                newPolicies = newPolicies.filter(p => p !== '全社展開');
            }
            newPolicies.push(policy);
        } else {
            newPolicies = newPolicies.filter(p => p !== policy);
        }

        updateData({ policy: newPolicies });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-5">
                <Select
                    label="Q1：診断組織対象"
                    value={data.organizationTarget}
                    onChange={(e) => updateData({ organizationTarget: e.target.value })}
                    options={[
                        { value: '全社', label: '全社' },
                        { value: '部署', label: '部署' },
                    ]}
                />

                <Select
                    label="Q2：所属従業員規模"
                    value={data.employeeCount}
                    onChange={(e) => updateData({ employeeCount: e.target.value })}
                    options={EMPLOYEE_COUNTS}
                />

                <Select
                    label="Q3：業界"
                    value={data.industry}
                    onChange={(e) => updateData({ industry: e.target.value })}
                    options={INDUSTRIES.map(i => ({ value: i, label: i }))}
                />

                <Select
                    label="Q4：AI推進部署"
                    value={data.aiDepartment}
                    onChange={(e) => updateData({ aiDepartment: e.target.value })}
                    options={AI_DEPARTMENTS}
                />

                <div className="pt-2">
                    <label className="mb-3 block text-sm font-semibold text-[var(--foreground)]">
                        Q5：推進方針
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {POLICIES.map((policy) => (
                            <Checkbox
                                key={policy}
                                label={policy}
                                checked={data.policy.includes(policy)}
                                onChange={(e) => handlePolicyChange(policy, e.target.checked)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
