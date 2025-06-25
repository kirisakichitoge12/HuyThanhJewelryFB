import { create } from "zustand";
import { CustomFile } from "../../types";

interface ImagesModalStore{
    isOpen: boolean; 
    id: string | null;
    images: CustomFile[];
    isSingle: boolean;
    listImage: CustomFile[];
    onOpen: (id?: string, isSingle?: boolean) => void;
    onClose: () => void;
    onChooseImages: (images: CustomFile[]) => void; 
    onUploadImages: (images: CustomFile[]) => void; 
}

const useImagesModal = create<ImagesModalStore>((set) => ({
    isOpen: false,
    image: null,
    images: [],
    id: null, 
    listImage: [],
    isSingle: false,
    onChooseImages: (listImage: CustomFile[])=> set({ listImage }), 
    onOpen: (id?: string, isSingle: boolean = false, )=> set({isOpen: true, isSingle, id }),
    onClose: () => set({isOpen: false}),
    onUploadImages: (images: CustomFile[])=> set({images}),
}))

export default useImagesModal;