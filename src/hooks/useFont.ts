import { useState, useEffect } from 'react';
import { FontOption } from '../types/fonts'; 
import { availableFonts } from '../config';

export const useFont = (initialFont: FontOption = availableFonts[0]) => {
    const [currentFont, setCurrentFont] = useState<FontOption>(initialFont);

    useEffect(() => {
        // Load font using Google Fonts
        if(currentFont.value !== ""){
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${currentFont.name.replace(' ', '+')}:wght@${currentFont.weights.join(';')}&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        return () => {
            // Cleanup if needed
            // document.head.removeChild(link);
        };
    }, [currentFont]);

    return {
        currentFont,
        setCurrentFont,
    };
};
