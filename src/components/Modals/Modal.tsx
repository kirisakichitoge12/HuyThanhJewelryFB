import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: string;
    children: React.ReactNode;  
    isCloseBtn?: boolean;
}

const Modal = ({ isOpen, onClose, title, size, children, isCloseBtn = false}: ModalProps) => {
    // Handle escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
            };

            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
            }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    // Handle click outside modal
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
        >
        <div className={`relative w-full ${size || "max-w-2xl"} bg-white rounded-lg shadow-lg`}>
            {
                isCloseBtn && <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        X
                    </button>
                </div>
            }
            
            <div>
                {children}
            </div> 
        </div>
        </div>
    );
};

export default Modal;