import axios, { AxiosResponse } from 'axios'; 
import { ApiRequestProps } from '../types/apiRequest.interface';


const api = axios.create({
    baseURL: 'http://localhost:5000'
}) 

export const apiRequest = async({url, data, method, ContentType}: ApiRequestProps) => {
    try { 
        const result: AxiosResponse = await api(url,{
            method: method || "GET",
            data: data,  
            headers: { 
                "content-type": ContentType || "application/json", 
                credentials: 'include',
            } 
        }) 
        return result?.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message;  
        } else {
            return "An unknown error occurred";  
        } 
    } 
}