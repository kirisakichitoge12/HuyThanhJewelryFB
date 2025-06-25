import { MusicResponse } from "../types/dataResponse/music.interface";
import { WidgetData } from "../types/widget.interface";

// State type
export interface State {
    widgetList: {
        data: WidgetData[];
        loading: boolean;
        error: string | null;
    }; 
    musicList:{
        data: MusicResponse;
        loading: boolean;
        error: string | null;
    }
}

// Action type
export type Action =
    | { type: 'FETCH_WIDGETLIST_START' }
    | { type: 'FETCH_WIDGETLIST_SUCCESS'; payload: WidgetData[] }
    | { type: 'FETCH_WIDGETLIST_ERROR'; payload: string } 

    | { type: 'FETCH_MUSICTLIST_START' }
    | { type: 'FETCH_MUSICTLIST_SUCCESS'; payload: MusicResponse }
    | { type: 'FETCH_MUSICTLIST_ERROR'; payload: string } 