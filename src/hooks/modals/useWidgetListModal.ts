import { create } from "zustand";    
import { WidgetData } from "../../types/widget.interface";

interface WidgetModalStore{ 
    isOpen: boolean;  
    index: number;
    template: Array<WidgetData>;
    onAddWidget: (data: WidgetData) => void;
    onOpen: (index: number) => void;
    onClose: () => void; 
}

const useWidgetListModal = create<WidgetModalStore>((set) => ({ 
    isOpen: false,  
    index: 0,   
    template: [], 
    onOpen: (index: number)=> set({ isOpen: true, index}),
    onClose: ()=> set({ isOpen: false, index: 0 }),
    onAddWidget: (widget: WidgetData) => set((state) => { 
        const newTemplate: Array<WidgetData> = [...state.template];  
        if (state.index >= 0 && state.index <= newTemplate.length) {
            newTemplate.splice(state.index, 0, widget); 
        } else {
            newTemplate.push(widget);
        }  
        return { ...state, template: newTemplate };
    }), 
}))

export default useWidgetListModal;