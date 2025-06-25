import { create } from "zustand";

interface CropImageModalStore {
    isOpen: boolean;
    image: File | null;
    newImage: File | null;
    id: string;
    onSaveCropImage: (image: File) => void;
    onOpen: (image: File, id: string) => void;
    onClose: () => void;
    reset: () => void;
}

const useCropImageModal = create<CropImageModalStore>((set) => ({
    isOpen: false,
    image: null,
    newImage: null,
    id: "",
    onSaveCropImage: (image: File) => {
        set(() => ({
            newImage: image,
            isOpen: false, // Close modal after saving
        }));
    },
    onOpen: (image: File, id: string) => {
        set({
            isOpen: true,
            image,
            id,
            newImage: null // Reset newImage when opening
        });
    },
    onClose: () => set({ isOpen: false }),
    reset: () => set({ newImage: null, image: null, id: "" })
}));

export default useCropImageModal;