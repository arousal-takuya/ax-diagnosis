'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CategoryBarChartProps {
    data: {
        name: string;
        score: number;
    }[];
}

const COLORS = ['#0EA5E9', '#14B8A6', '#06B6D4', '#0284C7'];

export default function CategoryBarChart({ data }: CategoryBarChartProps) {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                        domain={[0, 100]}
                        tick={{ fill: '#64748B', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #E2E8F0',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.1)',
                        }}
                        cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }}
                    />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
