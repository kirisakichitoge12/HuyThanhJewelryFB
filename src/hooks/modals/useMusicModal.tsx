import { create } from "zustand";
import { MusicData } from "../../types/music.interface";


interface MusicModalStore{
    isOpen: boolean;  
    isSingle: boolean;
    track: MusicData | null;
    listTrackId: MusicData[] | MusicData;
    onOpen: (isSingle?: boolean) => void;
    onClose: () => void; 
    onSetMusicList: (trackList: MusicData[]) => void; 
    onChooseMusic: (track: MusicData) => void;
    onChangeMusicTemplate: (listTrackId: MusicData[]) => void;
}

const useMusicModal = create<MusicModalStore>((set) => ({
    isOpen: false,
    track: null,
    isSingle: false,  
    listTrackId: [],
    onChooseMusic: (track: MusicData) => set({ track, isOpen: false }), 
    onChangeMusicTemplate: (listTrackId: MusicData[]) => set({ listTrackId }),
    onSetMusicList: (trackList: MusicData[]) => set({ listTrackId: trackList }),
    onOpen: (isSingle?: boolean)=> set({isOpen: true, isSingle: isSingle ?? false }),
    onClose: ()=> set({isOpen: false})
}))

export default useMusicModal;