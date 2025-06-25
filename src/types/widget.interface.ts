import { CustomFile } from ".";

// Add interfaces for type safety
interface ElementPosition {
    x: number;
    y: number;
}

interface ElementStyle {
    color?: string;
    fontFamily?: string;
    fontSize?: number;
    imageSize?: number;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
} 
interface WidgetElement {
    _id: string; 
    content: string | CustomFile;
    type: 'text' | 'image';
    isTitle?: boolean;
    position: ElementPosition;
    style: ElementStyle;
}

interface WidgetData {
    _id: string,
    createdAt?: string;
    backgroundImage?: CustomFile | null;
    elements: WidgetElement[];
}


export type { WidgetData, WidgetElement, ElementStyle, ElementPosition };   