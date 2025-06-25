import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  isBorder?: boolean;
  borderColor?: string;
}

const ButtonTemplate: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  isBorder = false,
  borderColor = "#fff",
}) => { 
  const baseStyles =
    "relative w-[229px] m-[15px] px-[35px] py-[15px] font-medium uppercase border-[1px] bg-transparent whitespace-nowrap text-ellipsis overflow-hidden";
  const variantStyles = {
    primary: "text-white border-white",
    secondary: "text-[#ee8584] border-[#ee8584]",
    danger: "text-white border-white",
  };

  return (
    <div className="relative transition-all duration-200 group">
      <span className={`absolute top-2 left-[15px] w-[88.5%] h-[82%] border-y-[1px] border-[${borderColor}] ${ isBorder ? "scale-x-100 group-hover:scale-x-0" : "scale-x-0 group-hover:scale-x-100" }  origin-center transition-transform duration-500 ease-in-out `}></span>
      <span className={`absolute top-[15px] left-2 w-[94%] h-[65%] border-x-[1px] border-[${borderColor}] ${ isBorder ? "scale-y-100 group-hover:scale-y-0" : "scale-y-0 group-hover:scale-y-100" } origin-center transition-transform duration-500 ease-in-out`}></span>
      <span className={`absolute top-2 left-[15px] w-[88.5%] h-[82%] border-x-[1px] border-[${borderColor}] ${ isBorder ? "scale-y-100 group-hover:scale-y-0" : "scale-y-0 group-hover:scale-y-100" } origin-center transition-transform duration-500 ease-in-out`}></span>
      <span className={`absolute top-[15px] left-2 w-[94%] h-[65%] border-y-[1px] border-[${borderColor}] ${ isBorder ? "scale-x-100 group-hover:scale-x-0" : "scale-x-0 group-hover:scale-x-100" } origin-center transition-transform duration-500 ease-in-out`}></span>
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default ButtonTemplate;

