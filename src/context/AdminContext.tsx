import React, { createContext, useReducer, useContext } from 'react'; 
import { initialState } from './adminReducers';


import { Action } from './type';
import { State } from './type';
import { dataReducer } from './adminReducers';

// Context
const AdminContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Provider
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);

    return <AdminContext.Provider value={{ state, dispatch }}>{children}</AdminContext.Provider>;
};

// Custom Hook
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within a AdminProvider');
  }
  return context;
};
