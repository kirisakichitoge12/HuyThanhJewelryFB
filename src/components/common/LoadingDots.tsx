import React from 'react';

interface LoadingDotsProps {
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ 
    color = 'bg-blue-500', 
    size = 'md',
    className = '' 
}) => {
  // Determine dot sizes based on size prop
    const dotSizes = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };

    return (
        <div className={`flex items-center justify-center space-x-1.5 ${className}`}>
        <div 
            className={`${dotSizes[size]} ${color} rounded-full animate-bounce`} 
            style={{ animationDelay: '0ms' }}
        ></div>
        <div 
            className={`${dotSizes[size]} ${color} rounded-full animate-bounce`} 
            style={{ animationDelay: '200ms' }}
        ></div>
        <div 
            className={`${dotSizes[size]} ${color} rounded-full animate-bounce`} 
            style={{ animationDelay: '400ms' }}
        ></div>
        </div>
    );
};

export default LoadingDots;