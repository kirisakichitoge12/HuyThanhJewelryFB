import React, { memo } from 'react';    
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';

interface SortByFormProps { 
    currentState: boolean;
    size?: "large" | "medium" | 'small';
    title?: string;
    onClick : () => void;
}

const SortByForm: React.FC<SortByFormProps> = ({ 
    title, 
    currentState,
    size = "medium",
    onClick
}) => {  
    return (
        <div className={`
            w-full min-w-40 bg-[#fdfdfd] flex justify-between items-center ps-4 pr-1 py-1 rounded-full shadow  hover:shadow-md
            ${ size === "large" ? "max-w-80" : size === "medium" ? 'max-w-60' : 'max-w-40' }
        `}
            onClick={onClick}
        >
            <label className="block text-sm font-medium text-gray-400">
                {title || "Sắp xếp"}
            </label>
            <div className="relative cursor-pointer bg-gray-100 p-2 rounded-full">
                {
                    currentState
                        ? <FaSortAmountDownAlt />
                        :<FaSortAmountDown />
                }  
            </div>
        </div>
    );
};

export default memo(SortByForm);