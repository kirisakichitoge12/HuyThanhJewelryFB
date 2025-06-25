import React, { memo, useState, useRef, useEffect } from 'react'; 
import { FontOption } from '../types/fonts';
import { availableFonts } from '../config';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface FontSelectorProps {
    title?: string;
    selectedFont: string;
    onFontChange: (font: FontOption) => void;
    fontSets?: FontOption[];
}

const FontSelector: React.FC<FontSelectorProps> = ({ 
    title,
    selectedFont, 
    onFontChange,
    fontSets = availableFonts,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!Array.isArray(fontSets) || fontSets.length === 0) {
        fontSets = availableFonts;
    }

    // Lấy font đang chọn từ danh sách
    const currentFont = fontSets.find((font) => font.value === selectedFont) || fontSets[0];

    return (
        <div className="relative w-full min-w-60 p-2" ref={dropdownRef}>
            {/* Label */}
            <label className="absolute -top-2 left-4 z-10 bg-white text-[12px] font-thin text-gray-600">
                {title || "Chọn kiểu chữ"}
            </label>

            {/* Custom Select Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white flex items-center justify-between"
            >
                <span style={{ fontFamily: currentFont.value }}>{currentFont.name}</span>

                {/* Custom Dropdown Icon */}
                <MdOutlineKeyboardArrowDown
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-50">
                    {fontSets.map((font) => (
                        <button
                            key={font.value}
                            onClick={() => {
                                onFontChange(font);
                                setIsOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                        >
                            <span style={{ fontFamily: font.value }}>{font.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default memo(FontSelector);
