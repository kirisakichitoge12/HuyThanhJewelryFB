import { Action } from "../type";
import { State } from "../type";


export const musicListInitialState: State['musicList'] = {
    data: {
        currentPage:0, 
        totalPages: 0,
        tracks: []
    },
    loading: false,
    error: null,
};

export const musicListReducer = (
    state: State['musicList'] = musicListInitialState,
    action: Action
): State['musicList'] => {
    switch (action.type) {
        case 'FETCH_MUSICTLIST_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_MUSICTLIST_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_MUSICTLIST_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
