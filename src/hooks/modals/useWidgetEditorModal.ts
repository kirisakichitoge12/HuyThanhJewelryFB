import { create } from "zustand";  
import { WidgetData } from "../../types/widget.interface";

interface WidgetModalStore{ 
    isOpen: boolean;    
    currentWidget: WidgetData | null;
    onOpen: (widget: WidgetData | null) => void;
    onClose: () => void; 
}

const useWidgetEditorModal = create<WidgetModalStore>((set) => ({ 
    isOpen: false,  
    currentWidget: null, 
    onOpen: (widget: WidgetData | null)=> set({ isOpen: true, currentWidget: widget }),
    onClose: ()=> set({ isOpen: false, currentWidget: null }), 
}))

export default useWidgetEditorModal;