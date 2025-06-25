// File: api.ts - Service to interact with the backend
import axios from 'axios';
import { ContentItem, NewsPage, NewsPreviewDTO } from '../types/news.dto';
const api = axios.create({
    baseURL: 'https://nhahang.hungthinhsecurity.com/api',
});

// Upload an image file and get back the URL
export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post(`/upload`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    
    return response.data.imageUrl;
};

// Create a new news page
export const createNewsPage = async (title: string, content: ContentItem[]): Promise<number> => {
  // First, upload any images that are File objects
    const processedContent = await Promise.all(
        content.map(async (item) => {
        if (item.type === 'image' && item.file) {
            // Upload the file and get URL
            const imageUrl = await uploadImage(item.file);
            return {
            ...item,
            content: imageUrl,
            file: undefined // Remove file object before sending to API
            };
        }
        return item;
        })
    );
    
    const response = await api.post(`/pages`, {
        title,
        content: processedContent
    });
    
    return response.data.pageId;
};

// Get all news pages
export const getNewsPages = async (): Promise<NewsPreviewDTO[]> => {
  const response = await api.get(`/pages`);
  return response.data;
};

// Get a specific news page with content
export const getNewsPage = async (id: string): Promise<NewsPage> => {
    const response = await api.get(`/pages/${id}`);
    return response.data;
};

// Update an existing news page
export const updateNewsPage = async (id: number, title: string, content: ContentItem[]): Promise<void> => {
  // First, upload any images that are File objects
  const processedContent = await Promise.all(
    content.map(async (item) => {
      if (item.type === 'image' && item.file) {
        // Upload the file and get URL
        const imageUrl = await uploadImage(item.file);
        return {
          ...item,
          content: imageUrl,
          file: undefined // Remove file object before sending to API
        };
      }
      return item;
    })
  );
  
  await api.put(`/pages/${id}`, {
    title,
    content: processedContent
  });
};

// Delete a news page
export const deleteNewsPage = async (id: number): Promise<void> => {
  await api.delete(`/pages/${id}`);
};