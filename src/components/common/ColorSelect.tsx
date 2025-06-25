import { useState, useRef, useEffect } from 'react';  
import { availableColors } from '../../config';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface ColorSelectProps {
    selectedStyle: number;
    onStyleChange: (index: number) => void;
    colorSets?: string[][];
} 

const ColorSelect = ({ 
    selectedStyle = 0,
    onStyleChange,
    colorSets = availableColors
}: ColorSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    // Ensure selectedStyle is within bounds
    const safeSelectedStyle = Math.min(Math.max(0, selectedStyle), colorSets.length - 1);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Ensure we have valid color sets
    if (!Array.isArray(colorSets) || colorSets.length === 0) {
        colorSets = availableColors;
    }

    return (
        <div className="relative w-full min-w-60  " ref={dropdownRef} >
            {/* Selected Option */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-full px-4 py-2 bg-white border rounded-md shadow-sm flex items-center justify-between ${isOpen ? 'border-blue-400' : ''}`}
            >
                <label className={`${isOpen ? 'text-blue-400' : ''} absolute -top-4 text-gray-600 font-thin bg-white left-4 text-[12px]`}>Kiểu dáng</label>
                <div className={`flex items-center gap-1`}>
                    {colorSets[safeSelectedStyle]?.map((color, i) => (
                        <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <span className="ml-2">Bộ {safeSelectedStyle + 1}</span>
                </div>
                <MdOutlineKeyboardArrowDown  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-50">
                    {colorSets.map((colors, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onStyleChange(index);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-2 flex items-center gap-1 hover:bg-gray-50 
                                ${safeSelectedStyle === index ? 'bg-gray-50' : ''}`}
                        >
                            {colors.map((color, i) => (
                                <div
                                    key={i}
                                    className="w-4 h-4 rounded-full border border-gray-200"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                            <span className="ml-2">Bộ {index + 1}</span>
                        </button>
                    ))} 
                </div>
            )}
        </div>
    );
};

export default ColorSelect;