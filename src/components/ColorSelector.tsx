import { memo } from "react";

interface ColorSelectorProps {
    onColorChange: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ onColorChange }) => { 
    const predefinedColors = [
        "#FFFFFF",
        '#EF4444', // red-500
        '#3b4174', // blue-500
        '#1c7357', // green-500
        '#EAB308', // yellow-500
        '#A855F7', // purple-500 
    ];
    const updateColor = (index: number) => {
        const newColor = predefinedColors[index]; 
        onColorChange(newColor);
    }; 
    return (  
            <div>  
                <h4 className="text-sm font-medium mb-2">Chọn màu nền</h4>
                <div className="flex gap-2 relative">
                    {predefinedColors.map((color, index) => (
                        <button
                            key={index}
                            className="w-8 h-8 rounded-full hover:opacity-80 transition-opacity border"
                            style={{ backgroundColor: color }}
                            onClick={() => updateColor(index)}
                        />
                    ))}
                    
                    <div className="flex items-center justify-center">
                        <label htmlFor="color" className="z-10">🎨</label>
                        <input
                            id="color"
                            type="color"
                            onChange={(e) => onColorChange(e.target.value)}
                            className="w-8 h-8 rounded-full absolute hover:opacity-80 transition-opacity border-none outline-none"
                        />
                    </div>
                </div> 
            </div> 
    );
};

export default memo(ColorSelector);