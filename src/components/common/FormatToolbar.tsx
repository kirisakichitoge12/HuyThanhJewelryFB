import React from "react";
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineUnderline } from "react-icons/ai";
import { CiRedo, CiUndo } from "react-icons/ci";
export type FormatType = 'bold' | 'italic' | 'underline' | 'left' | 'center' | 'right' | "strikethrough";


export interface Position {
    top: number;
    left: number;
}

interface FormatToolbarProps{ 
    position: Position;
    onFormat: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent> , type: FormatType) => void;
    canUndo: boolean;
    canRedo: boolean;
    onUndo: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    onRedo: (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
    currentStyle: {
        fontWeight?: string;
        fontStyle?: string;
        textDecoration?: string;
    };
}

const FormatToolbar: React.FC<FormatToolbarProps> = ({  
    position,
    onFormat,
    canRedo,
    canUndo, 
    onRedo,
    onUndo,
    currentStyle
}) => { 
    return (
        <div 
            className="absolute z-50 font-svn-sans lg:min-w-[420px] text-[10px] bg-white text-gray-700 rounded-md shadow-lg border border-gray-200 px-2 lg:px-4 py-2 text-center"
            style={{ 
                top: `${position.top}wv`, 
                left: `${position.left}hv` 
            }}
        >
            <h3 className="pb-3 font-bold text-[12px]">Sửa văn bản</h3>
            <div className="flex gap-3">
                <button 
                    onClick={onUndo} 
                    disabled={!canUndo}
                    className={`p-1 rounded ${canUndo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'} flex flex-col justify-between items-center`}
                >
                    <CiUndo size={20}/>
                    <p>Hoàn tác</p>
                </button>
                <button 
                    onClick={onRedo} 
                    disabled={!canRedo}
                    className={`p-1 rounded ${canRedo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'} flex flex-col justify-between items-center`}
                >
                    <CiRedo size={20}/>
                    <p>Làm lại</p>
                </button>
                <button 
                    onClick={(e) => onFormat(e,'bold')} 
                    className={`p-1 rounded flex flex-col justify-between items-center ${
                        currentStyle.fontWeight === 'bold' ? 'bg-gray-200' : 'hover:bg-gray-100'
                    }`}
                >
                    <AiOutlineBold size={20}/>
                    <p>In đậm</p>
                </button>
                <button 
                    onClick={(e) => onFormat(e,'italic')} 
                    className={`p-1 rounded flex flex-col justify-between items-center ${
                        currentStyle.fontStyle === 'italic' ? 'bg-gray-200' : 'hover:bg-gray-100'
                    }`}
                >
                    <AiOutlineItalic size={20}/>
                    <p>In nghiêng</p>
                </button>
                <button 
                    onClick={(e) => onFormat(e,'underline')} 
                    className={`p-1 rounded flex flex-col justify-between items-center ${
                        currentStyle.textDecoration === 'underline' ? 'bg-gray-200' : 'hover:bg-gray-100'
                    }`}
                >
                    <AiOutlineUnderline size={20}/>
                    <p>Gạch chân</p>
                </button> 
                <button 
                    onClick={(e) => onFormat(e, 'strikethrough')} 
                    className={`p-1 rounded flex flex-col justify-between items-center ${
                        currentStyle.textDecoration === 'line-through' ? 'bg-gray-200' : 'hover:bg-gray-100'
                    }`}
                >
                    <AiOutlineStrikethrough size={20}/>
                    <p>Gạch ngang</p>
                </button> 
            </div>
        </div>
    );
};

export default FormatToolbar;