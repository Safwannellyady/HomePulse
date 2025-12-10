import React from 'react';

const RealtimeGauge = ({ value, max = 5, unit = 'kW' }) => {
    // Gauge configuration
    const radius = 80;
    const stroke = 12;
    const normalizedValue = Math.min(Math.max(value, 0), max);
    const circumference = normalizedValue / max * 180; // 180 degree arc

    // Rotation for semi-circle
    const rotation = -180;

    return (
        <div className="relative flex items-center justify-center w-full h-48">
            {/* Background Arc */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#00f3ff" />
                        <stop offset="100%" stopColor="#bc13fe" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Track */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                />

                {/* Filled Value */}
                {/* We use strokeDasharray to animate the arc. 
                    Full semi-circle length = PI * R */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={`${(normalizedValue / max) * (Math.PI * 80)} ${(Math.PI * 80)}`}
                    strokeDashoffset={0}
                    style={{ transition: 'stroke-dasharray 0.5s ease-out' }}
                    filter="url(#glow)"
                />
            </svg>

            {/* Value Text */}
            <div className="absolute bottom-4 flex flex-col items-center">
                <div className="text-4xl font-bold text-white tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                    {value}
                </div>
                <div className="text-gray-400 text-sm font-medium">{unit}</div>
            </div>
        </div>
    );
};

export default RealtimeGauge;
