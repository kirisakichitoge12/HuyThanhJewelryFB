import React from 'react';

interface ProgressProps {
    percent: number;
    height?: string;
    className?: string;
}

const Progress: React.FC<ProgressProps> = ({ 
    percent, 
    height = 'h-2', 
    className = '' 
}) => {
  // Ensure percent is between 0 and 100
    const clampedPercent = Math.max(0, Math.min(100, percent));

    return (
        <div 
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${height} ${className}`}
        >
        <div 
            className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
            style={{ 
            width: `${clampedPercent}%`,
            borderRadius: 'inherit'
        }}
        ></div>
        </div>
    );
};

export default Progress;
