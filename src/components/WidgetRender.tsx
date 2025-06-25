import React from 'react'; 
import Each from '../layouts/Each';
import { WidgetData, WidgetElement } from '../types/widget.interface';

interface WidgetRendererProps {
  data: WidgetData;
  fontTitleFamily?: string;
  fontContentFamily?: string;
  size?: 'full' | 'medium' | 'small';
}

const WidgetRenderer: React.FC<WidgetRendererProps> = ({ 
  data, 
  fontTitleFamily,
  fontContentFamily,
  size = 'full' 
}) => { 
  const { backgroundImage, elements } = data; 
  const renderElement = (element: WidgetElement, scaleFactor: number) => {
    const { content, type, _id, position, style, isTitle } = element; 
    const fontFamily = isTitle ? fontTitleFamily || style.fontFamily : fontContentFamily || style.fontFamily; 
    const baseStyle = {
      position: 'absolute' as const,
      left: `calc(${ position.x }%  - 0vw)`, //size === "full" ? `calc(${ position.x }% + 0.5vw)` : 
      top: `${ position.y }%`,
      color: style.color || 'black',
      fontFamily: fontFamily,
      fontSize: style.fontSize 
        ? `${style.fontSize * scaleFactor}px` 
        : `${16 * scaleFactor}px`, 
      fontStyle: style.fontStyle,
      fontWeight: style.fontWeight,
      textDecoration: style.textDecoration || "none"
    };

    // Check if content is a base64 image
    if (type === "image" && typeof content === "string") {
      return (
        <img
          key={_id}
          src={content}
          alt="Template element"
          className='object-contain'
          style={{
            ...baseStyle, 
            width: (style.imageSize || 200) * scaleFactor, 
            height: (style.imageSize || 200) * scaleFactor
          }}
        />
      );
    }
    if(type === "text" && typeof content === "string"){ 
      return (
        <div
          key={_id}
          style={baseStyle}
        >
          {content}
        </div>
      );
    }
  };

  const scaleFactorMap = {
    full: 1,
    medium: 0.6,
    small: 0.3  // Adjust this value to control the scaling of elements
  };

  return (
    <div  
      style={{  
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
        borderRadius: "5px", 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Each 
        of={elements}
        render={(element: WidgetElement) => renderElement(element, scaleFactorMap[size])}
      /> 
    </div>
  );
};

export default WidgetRenderer; 