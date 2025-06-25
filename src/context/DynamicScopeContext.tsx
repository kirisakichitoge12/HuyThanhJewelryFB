import { createContext, useContext } from 'react';

export const DynamicScopeContext = createContext<Record<string, any>>({});

export const useDynamicScope = () => useContext(DynamicScopeContext);
