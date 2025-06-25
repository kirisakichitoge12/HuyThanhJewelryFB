export interface NewsPage {
    id: string;
    title: string; 
    created_at: string;
    updated_at: string;
    content?: ContentItem[];
}

export interface ContentItem {
    id: number;
    type: 'heading' | 'text' | 'image';
    content: string;
    caption?: string;
    file?: File;
}


export interface NewsArticle {
    id: string;
    title: string;
    content: string; 
    imageUrl: string;
    type: "text" | "image";
    created_at: string;  
    isPublished?: boolean;
} 



export interface NewsPreviewDTO{
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    textContent:string;
    imageUrl: string;
}