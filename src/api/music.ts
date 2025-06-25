import { toast } from "react-hot-toast";
import { apiRequest } from ".";
import { Action } from "../context/type";
import axios, { AxiosResponse } from "axios";
import { MusicData } from "../types/music.interface";
import { API_BASE_URL } from '../config/api.config';
export const fetchMusicLists: () => Promise<MusicData[]> = async () => {
        try {
            const response: AxiosResponse = await axios.get(`${API_BASE_URL}/api/getmusic`);  
            const result = response.data;
            
            if (!result.success || response.status !== 200) {
                throw new Error(result.message || 'No music uploaded');
            }   
            const data = result.music;
            return data; 
        } catch (error: unknown) {
            console.log( error instanceof Error 
                    ? error.message 
                    : 'An unknown error occurred' 
            )
            return [];
        }
    };
export const fetchMusicList = async (dispatch: React.Dispatch<Action>) => {
    dispatch({ type: 'FETCH_MUSICTLIST_START' });
        try {
            const response = await apiRequest({
                url: '/music',   
            });  
            if (response.statusCode !== 200) {
                throw new Error(response.message || 'No music uploaded');
            }   
            dispatch({ type: 'FETCH_MUSICTLIST_SUCCESS', payload: response.data });
        } catch (error: unknown) {
            dispatch({ 
                type: 'FETCH_MUSICTLIST_ERROR', 
                payload: error instanceof Error 
                    ? error.message 
                    : 'An unknown error occurred' 
            });
        }
    };

export const updateNewMusic = async (data: FormData) => {
    try { 
        const response = await apiRequest({
            url: `${API_BASE_URL}/api/music/uploaded`,  
            method: 'POST',
            data,
            ContentType: "multipart/form-data"
        });  
        if (response.statusCode === 201) { 
            toast.success( "Upload music success")
            console.log('dataa',response.data)
        }  else{ 
            toast.error(response.message || 'Failed to upload music') 
            console.log('dataa ne',response.data)
        }
    } catch (error: unknown) { 
        if (error instanceof Error) {
            toast.error( error instanceof Error 
                ? error.message 
                : 'An unknown error occurred');   
        }  
    } 
};