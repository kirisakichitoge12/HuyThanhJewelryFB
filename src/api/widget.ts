import { apiRequest } from ".";
import { Action } from "../context/type"; 
 

export const createWidget = async (data: FormData): Promise<string> => { 
    const response = await apiRequest({
        url: "/widget/created", 
        method: 'POST',
        data,
        ContentType: "multipart/form-data"
    });  
    if (!response || response.statusCode !== 200) {
        console.error(`widget create failed with status code: ${response.statusCode}`);
        throw response.message;
    }   
    return response.message; 
};


export const updateWidget = async (_id: string, data: FormData): Promise<string> => { 
    const response = await apiRequest({
        url: `/widget/eidted/${_id}`, 
        method: 'PUT',
        data,
        ContentType: "multipart/form-data"
    });  
    if ( !response || response.statusCode !== 200) {
        console.error(`widget updated failed with status code: ${response.statusCode}`);
        throw response.message;
    }  
    return response.message; 
};



export const deleteWidget = async (_id: string): Promise<string> => { 
    const response = await apiRequest({
        url: `/widget/deleted/${_id}`, 
        method: 'PUT', 
    });  
    if ( !response ) {
        console.error(`widget deleted failed with status code: ${response.statusCode}`);
        throw response.message;
    } 
    if (response.statusCode !== 204) {
        throw new Error(response.message);
    } 
    return response.message; 
};


export const fetchWidgetList = async (dispatch:  React.Dispatch<Action>) => { 
    dispatch({ type: 'FETCH_WIDGETLIST_START' });
        try {
            const response = await apiRequest({
                url: '/widgets',  
                method: 'GET'
            });  
            if (response.statusCode !== 200) {
                throw new Error(response.message || 'Không có widget được tạo');
            }   
            dispatch({ type: 'FETCH_WIDGETLIST_SUCCESS', payload: response.data });
        } catch (error: unknown) {
            dispatch({ 
                type: 'FETCH_WIDGETLIST_ERROR', 
                payload: error instanceof Error 
                    ? error.message 
                    : 'An unknown error occurred' 
            });
        }
    };