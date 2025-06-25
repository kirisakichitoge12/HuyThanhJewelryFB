import React, { useEffect, useRef } from "react";    
import ReactDOM from 'react-dom';

interface MobilePreviewProps {
    children: React.ReactNode;
}

const MobilePreview: React.FC<MobilePreviewProps> = ({
    children, 
}) => {   
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow && iframe.contentDocument) {
            // Copy all styles from parent window
            const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
            styles.forEach(style => {
                iframe.contentDocument?.head.appendChild(style.cloneNode(true));
            });

            // Mount React component into iframe
            const mountPoint = iframe.contentDocument.createElement('div');
            mountPoint.id = 'mobile-preview-root';
            iframe.contentDocument.body.appendChild(mountPoint);

            // Create wrapper with fixed width
            const MobileWrapper = () => (
                <div style={{ width: '390px', margin: '0' }}>
                    {children}
                </div>
            );

            ReactDOM.render(<MobileWrapper />, mountPoint);

            // Add viewport meta
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=410px, initial-scale=1';
            iframe.contentDocument.head.appendChild(meta);

            // Add necessary styles to iframe document
            const iframeStyles = document.createElement('style');
            iframeStyles.textContent = `
                html,body {
                    margin: 0;
                    padding: 0;
                    width: 420px !important;
                    overflow-x: hidden;
                    scrollbar-width: none; /* Firefox */
                }
                body::-webkit-scrollbar {
                    display: none; /* Chrome, Safari */
                }
                * {
                    max-width: 420px !important;
                }
            `;
            iframe.contentDocument.head.appendChild(iframeStyles);

            // Copy fonts if using next/font or other font solutions
            const fonts = document.querySelectorAll('link[rel="preload"][as="font"]');
            fonts.forEach(font => {
                iframe.contentDocument?.head.appendChild(font.cloneNode(true));
            });
        }

        // Cleanup
        return () => {
            if (iframeRef.current?.contentDocument) {
                const mountPoint = iframeRef.current.contentDocument.getElementById('mobile-preview-root');
                if (mountPoint) {
                    ReactDOM.unmountComponentAtNode(mountPoint);
                }
            }
        };
    }, []);

    return ( 
        <div className="flex justify-center items-center h-full bg-white">
            <div className="relative w-[410px] h-[800px] mt-10 bg-transparent rounded-[60px] border-[10px] border-black overflow-hidden shadow-xl">
                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-6 bg-transparent z-10">
                    <div className="flex justify-between items-center px-6 py-1 text-white">
                        <span>9:41</span>
                        <span>namtuyen</span>
                        <div className="flex items-center space-x-2">
                            <span>📶</span>
                            <span>🔋</span>
                        </div>    
                    </div>
                </div>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 z-10 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl"></div>

                {/* Content */}
                <div className="w-full h-full bg-white">
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full border-none"
                        title="Mobile Preview"
                    />
                </div>
            </div>
        </div>
    );
};

export default MobilePreview;