import React, { useRef, useState } from 'react'
import { FaPlus, FaCircle, FaSquare } from 'react-icons/fa';

interface ImageEditorProps {
    id: string;
    image: string;
    disabled?: boolean;
    handleLayoutImageUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ 
    id, 
    image, 
    disabled = false, 
    handleLayoutImageUpload 
}) => {
    const [showToolbar, setShowToolbar] = useState<boolean>(false);
    const [isCircle, setIsCircle] = useState<boolean>(false);
    const editorRef = useRef<HTMLDivElement>(null);

    const handleBlur = (e: React.FocusEvent) => { 
        const isClickingToolbar = (e.relatedTarget as HTMLElement)?.closest('.toolbar-animation');
        if (!isClickingToolbar) {
            setShowToolbar(false);
        }
    }; 

    return ( 
            <div className="w-auto h-[400px] flex items-center justify-center z-0 relative">
                {!disabled && showToolbar && (
                    <div className="absolute -top-20 left-0 py-2 px-4 rounded text-center bg-white shadow-md text-black">
                        <h1>Chỉnh sửa hình ảnh</h1>
                        <div className='flex gap-2'> 
                            <button 
                                type="button"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setIsCircle(!isCircle)}
                                className={`px-4 py-2 border rounded hover:bg-gray-100 ${isCircle ? 'bg-gray-200' : ''}`}
                            >
                                {isCircle ? <FaCircle /> : <FaSquare />}
                            </button>
                        </div>
                    </div>
                )} 
                {image ? (
                    <div className="w-full h-full flex items-center justify-center" 
                        ref={editorRef}
                        onBlur={handleBlur}
                        onClick={() => setShowToolbar(true)}
                    >
                        <img 
                            src={image} 
                            alt="image" 
                            className={`object-cover ${isCircle ? 'rounded-full' : 'rounded-none'}`}
                        />
                    </div>
                ) : (
                    <label className="cursor-pointer flex flex-col items-center" >
                        <FaPlus className="text-white text-2xl mb-2" />
                        <span className="text-white text-sm">Upload Image</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleLayoutImageUpload(id, e)}
                            />
                    </label>
                )}
            </div> 
    )
}

export default ImageEditor;