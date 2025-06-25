import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { DisplayMode } from '../types';
import MobilePreview from './MobilePreview';
import { FiArrowDownLeft } from 'react-icons/fi';

interface Props {  
    setDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;  
}

export interface SubNavbarMethods {
    enterFullScreen: (type: DisplayMode) => void;
    exitFullScreen: () => void;
}

const SubNavbarDisplayMode = forwardRef<SubNavbarMethods, Props> (({ children, setDisabled }, ref) => { 
    const phoneRef = useRef<HTMLDivElement>(null);  
    const [display, setDisplay] = useState<DisplayMode>("edit");  

    useImperativeHandle(ref, () => ({
        enterFullScreen,
        exitFullScreen
    }));

    const enterFullScreen = (type: DisplayMode) => {
        if (phoneRef.current && setDisabled) { 
            setDisplay(type); 
            setDisabled(true);
            phoneRef.current.requestFullscreen().catch((err) => {
                console.error("Error entering fullscreen:", err);
            });
        }
    };
    
    const exitFullScreen = () => { 
        if (document.fullscreenElement && setDisabled) { 
            document.exitFullscreen().catch((err) => {
                console.error("Error exiting fullscreen:", err);
            });
            setDisplay("edit"); 
            setDisabled(false);
        }
    }; 
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                exitFullScreen(); // xử lý khi nhấn Esc
            }
        };
    
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setDisplay("edit");
                setDisabled?.(false);
            }
        };
    
        document.addEventListener('keydown', handleEscKey);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
    
        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);
    

    return (
        <div ref={phoneRef} className='relative overflow-auto'> 
            {
                display !== "edit" && ( 
                    <button className='absolute top-5 right-5 z-50' onClick={exitFullScreen}><FiArrowDownLeft size={30}/></button> 
                )
            }
            {
                display === "mobile" && (
                    <MobilePreview>
                        {children}
                    </MobilePreview>
                )
            }
            {
                display !== "mobile" &&  children  
            } 
        </div>
    )
})

export default React.memo(SubNavbarDisplayMode);