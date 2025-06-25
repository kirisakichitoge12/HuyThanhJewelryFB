export interface ContentSection{
    sectionTitle: string,
    sectionContent: string,
    sectionImage?: { name: string } | null;  
}

export interface BlogPostInterface {
    _id: string;
    title: string;
    content: string;
    contents: ContentSection[];
    author: string;
    createdAt?: string;
    imageUrl: string;
    image?: File;
    isTrending?: boolean;
    tags?: string[];
    status:  StatusBlogPost;
}

export type StatusBlogPost = 'nháp' | 'đăng' | 'lưu trữ';

export interface BlogPostResponse{
    posts: BlogPostInterface[];
    currentPage: number;
    totalPages: number;
}