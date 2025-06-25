

export interface ApiRequestProps{
    url: string; 
    data?: FormData;
    method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
    ContentType?: "application/json" | "multipart/form-data";
}