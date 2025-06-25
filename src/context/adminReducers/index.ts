import { Action } from "../type";

import { State } from "../type";
import { musicListInitialState, musicListReducer } from "./musicListReducer";
import { widgetListInitialState, widgetListReducer } from "./widgetListReducer";


// Initial state
export const initialState: State = {
    widgetList: widgetListInitialState  ,
    musicList: musicListInitialState,
};

  // Reducer function
export const dataReducer = (state: State = initialState, action: Action): State => ({
    widgetList: widgetListReducer(state.widgetList, action), 
    musicList: musicListReducer(state.musicList, action),
});