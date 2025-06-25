import React from 'react';

interface ButtonProps {
    children: string | React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties; 
    color?: "primary" | "danger" | "default" | "success" | "none";
    rounded?: "sm" | "lg" | "full"
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    onClick, 
    disabled = false, 
    style,  
    className,
    color = "primary", 
    rounded = "sm"
}) => { 
    // Define color classes based on the color prop
    const colorClasses = {
        primary: "bg-primary hover:bg-secondary text-white p-4 px-[43.5px]",
        success: "bg-green-500 hover:bg-green-700 text-white",
        danger: "bg-red-500 hover:bg-red-700 text-white",
        default: "bg-gray-400 hover:bg-gray-700 text-white",
        none: "bg-transparent text-primary p-0",
        outline: "",
    };

    const baseStyle: string = "flex justify-center items-center  text-md gap-3 rounded-lg transition duration-300 w-full md:w-fit  mx-[3px]";

    return (
        <button 
            disabled={disabled}
            onClick={onClick} 
            style={style} 
            className={`
                ${baseStyle} 
                ${colorClasses[color]}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                rounded-${rounded}
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default Button;
