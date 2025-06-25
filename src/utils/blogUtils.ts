import { BlogPostInterface, BlogPostResponse } from "../types/dataResponse/blog.interface";

export const convertBlogToFormData  = (post: BlogPostInterface): FormData => {
    const formData = new FormData(); 
    formData.append(`_id`, post._id); 
    formData.append(`title`, post.title);
    formData.append(`content`, post.content);
    formData.append(`author`, post.author); 
    if (post.imageUrl) formData.append(`imageUrl`, post.imageUrl);
    console.log("Before: ", post.image);
    if (post.image instanceof File){
        console.log("After", post.image);
        formData.append(`image`, post.image);
    } 
    if (post.tags){
        for(let i = 0; i< post.tags.length; i++){
            formData.append(`tags[${i}]`, post.tags[i]); 
        }
    } 
    formData.append(`status`, post.status);
    
    return  formData;
} 

export const isBlogPostResponse = (result: unknown): result is BlogPostResponse => {
    return (
        typeof result === 'object' &&
        result !== null &&
        'posts' in result &&
        Array.isArray((result as { posts: unknown[] }).posts)
    );
}
export const isBlogPost = (result: unknown): result is BlogPostInterface => {
    return (
        typeof result === 'object' &&
        result !== null &&
        '_id' in result &&
        'title' in result &&
        'content' in result &&
        'author' in result &&
        'imageUrl' in result
    );
}