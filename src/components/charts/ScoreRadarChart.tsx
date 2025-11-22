'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface ScoreRadarChartProps {
    data: {
        category: string;
        score: number;
    }[];
}

export default function ScoreRadarChart({ data }: ScoreRadarChartProps) {
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis
                        dataKey="category"
                        tick={{ fill: '#64748B', fontSize: 14, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#64748B', fontSize: 12 }}
                    />
                    <Radar
                        name="スコア"
                        dataKey="score"
                        stroke="#0EA5E9"
                        fill="#0EA5E9"
                        fillOpacity={0.3}
                        strokeWidth={3}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
