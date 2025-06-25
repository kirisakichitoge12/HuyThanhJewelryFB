import React, { memo } from 'react';    

interface SelectFormProps {
    availabData: string[];
    selectedValue: string;
    onSelectedChange: (value: string) => void;
    size?: "large" | "medium" | 'small';
    title?: string;
}

const SelectForm: React.FC<SelectFormProps> = ({ 
    title,
    availabData,
    selectedValue,
    onSelectedChange, 
    size = "medium",
}) => {  
    return (
        <div className={`w-full min-w-40 ${ size === "large" ? "max-w-80" : size === "medium" ? 'max-w-60' : 'max-w-40' }`}>
            <div className="relative text-gray-400 w-full ps-5 rounded-full shadow flex justify-between items-center">
                <label className="block text-sm font-medium ">
                    {title}
                </label> 
                <select
                    className="custom-arrow-select px-4 py-2 focus:outline-none border-l-[1px] focus:ring-blue-500 focus:border-blue-500 rounded-r-full"
                    style={{ backgroundColor: '#fdfdfd' }}
                    value={selectedValue}
                    onChange={(e) => {
                        if(availabData.length > 0){
                            const selectedMusic = availabData.find(f => f === e.target.value); 
                            if (selectedMusic) onSelectedChange(selectedMusic);
                        }
                    }}
                >
                    {availabData.length > 0
                        ? availabData.map((music, index) => (
                            <option
                                key={index}
                                value={music}
                            > 
                                {music}
                            </option>
                        ))
                        : <option>No music upload...</option>
                    }
                </select>
            </div>
        </div>
    );
};

export default memo(SelectForm);