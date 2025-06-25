import React from "react";
import { create } from "zustand";


interface ConfirmModalStore{
    isOpen: boolean;  
    content: string | React.ReactNode;
    onSubmit: () => void;
    onOpen: (content?: string | React.ReactNode, onSubmit?: VoidFunction, ) => void;
    onClose: () => void; 
}

const useConfirmModal = create<ConfirmModalStore>((set) => ({
    isOpen: false, 
    content: "",
    onSubmit: () => {},
    onOpen: (content?: string | React.ReactNode, onSubmit?: VoidFunction, )=> set({isOpen: true, onSubmit, content}),
    onClose: ()=> set({isOpen: false, content: ""})
}))

export default useConfirmModal;