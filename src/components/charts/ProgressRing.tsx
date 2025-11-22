'use client';

interface ProgressRingProps {
    score: number;
    size?: number;
    strokeWidth?: number;
}

export default function ProgressRing({ score, size = 200, strokeWidth = 16 }: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    const getColor = (score: number) => {
        if (score >= 80) return '#10B981';
        if (score >= 60) return '#0EA5E9';
        if (score >= 40) return '#F59E0B';
        return '#EF4444';
    };

    const color = getColor(score);

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#F1F5F9"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    style={{
                        filter: `drop-shadow(0 0 8px ${color}40)`,
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-[var(--foreground)]">{score}</div>
                <div className="text-sm text-[var(--foreground-muted)] font-semibold">/ 100</div>
            </div>
        </div>
    );
}
