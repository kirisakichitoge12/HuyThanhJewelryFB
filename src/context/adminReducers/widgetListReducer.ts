import { Action } from "../type";
import { State } from "../type";


export const widgetListInitialState: State['widgetList'] = {
    data: [],
    loading: false,
    error: null,
};

export const widgetListReducer = (
    state: State['widgetList'] = widgetListInitialState,
    action: Action
): State['widgetList'] => {
    switch (action.type) {
        case 'FETCH_WIDGETLIST_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_WIDGETLIST_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_WIDGETLIST_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
