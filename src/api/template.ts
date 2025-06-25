import axios, { AxiosResponse } from "axios";
import { apiRequest } from ".";
import { TemplateData } from "../types/dataResponse/template.interface";
import { isTemplateDataResponse } from "../utils/templateUtils";
import { API_BASE_URL } from '../config/api.config';


export const createTemplate= async (data: FormData): Promise<string> => { 
    const response = await apiRequest({
        url: "/template/created", 
        method: 'POST',
        data, 
    });  
    // console.log({response})
    if (!response || response.statusCode !== 200) {
        console.error(`Template create failed with status code: ${response.statusCode}`);
        throw response.message;
    }   
    return response.message; 
};


// export const updateWidget = async (_id: string, data: FormData): Promise<string> => { 
//     const response = await apiRequest({
//         url: `/widget/eidted/${_id}`, 
//         method: 'PUT',
//         data,
//         ContentType: "multipart/form-data"
//     });  
//     if ( !response || response.statusCode !== 200) {
//         console.error(`widget updated failed with status code: ${response.statusCode}`);
//         throw response.message;
//     }  
//     return response.message; 
// };



// export const deleteWidget = async (_id: string): Promise<string> => { 
//     const response = await apiRequest({
//         url: `/widget/deleted/${_id}`, 
//         method: 'PUT', 
//     });  
//     if ( !response ) {
//         console.error(`widget deleted failed with status code: ${response.statusCode}`);
//         throw response.message;
//     } 
//     if (response.statusCode !== 204) {
//         throw new Error(response.message);
//     } 
//     return response.message; 
// };


export const fetchTemplateList = async (): Promise<TemplateData[]> => {   
    const response = await apiRequest({
        url: '/template',  
        method: 'GET'
    });  
    if (response.statusCode !== 200) {
        throw new Error(response.message || 'Không có template được tạo');
    }    
    if(isTemplateDataResponse(response)){
        return response.data; 
    }
    throw new Error;
};

export const fetchTemplatesUser = async (id: string): Promise<any[]> => {
    try{   
        const response: AxiosResponse = await axios.get(`${API_BASE_URL}/api/widgets/${id}`); 
        const result = response.data; 
        if (!result || response.status !== 200) {
            throw new Error(result.message || 'No template uploaded');
        }   
        const data = result.templates_with_widgets;
        return data; 
    } catch (error: unknown) {
        console.log( error instanceof Error 
                ? error.message 
                : 'An unknown error occurred' 
        )
        return [];
    }
};