import React, { useState, useEffect, useRef } from 'react'; 
import IconImage from "../../assets/images/templates/template1/logo.png"
interface FallingIconProps {
    iconCount?: number; 
}

const FallingIcons: React.FC<FallingIconProps> = ({ 
    iconCount = 15,
}) => {
    const iconComponent = <img src={IconImage} alt="" className='max-w-11 max-h-11'/>
    const containerRef = useRef<HTMLDivElement>(null);
    const [icons, setIcons] = useState<Array<{
        id: number;
        x: number;
        delay: number;
        duration: number;
        size: number;
    }>>([]);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const randomInRange = (min: number, max: number): number => {
        return min + Math.random() * (max - min);
    };
  // Lấy kích thước của container cha
    useEffect(() => {
        if (containerRef.current) {
            const updateDimensions = () => {
                const parent = containerRef.current?.parentElement;
                if (parent) {
                setDimensions({
                    width: parent.offsetWidth,
                    height: parent.offsetHeight
                });
                }
            }; 
            updateDimensions(); 
            window.addEventListener('resize', updateDimensions);
            
            return () => window.removeEventListener('resize', updateDimensions);
        }
    }, []);

  // Tạo các icon sau khi biết kích thước
    useEffect(() => {
        if (dimensions.height > 0) {
            const newIcons = Array.from({ length: iconCount }, (_, index) => ({
                id: index,
                x: Math.random() * 100, // Vị trí ngang (%)
                delay: randomInRange(0, 30), // Độ trễ (giây) - phân bố để icon không rơi cùng lúc
                duration: randomInRange(80, 150), // Thời gian rơi từ 80-150 giây
                size: 16 + Math.random() * 24, // Kích thước icon (px)
            }));
            
            
            setIcons(newIcons);
        }
    }, [iconCount, dimensions.height]); 
    const keyframesStyle = `
        @keyframes fallFull {
            0% {
                transform: translateY(-50px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(${dimensions.height + 50}px);
                opacity: 0;
            }
        }
            
        .animate-fall-full {
            animation-name: fallFull;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }
    `;

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-40">
            {/* Sử dụng style tiêu chuẩn để tránh lỗi TypeScript */}
            <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />

            {icons.map((icon) => (
                <div
                    key={icon.id}
                    className="absolute animate-fall-full"
                    style={{
                        left: `${icon.x}%`,
                        animationDelay: `${icon.delay}s`,
                        animationDuration: `${icon.duration}s`,
                        fontSize: `${icon.size}px`,
                    }}
                >
                    {iconComponent}
                </div>
            ))}
        </div>
    );
};

export default FallingIcons;