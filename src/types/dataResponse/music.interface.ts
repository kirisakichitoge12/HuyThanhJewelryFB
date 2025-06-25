export interface MusicTrack {
    _id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    file: File | string;
}


export interface MusicResponse {
    currentPage: number; 
    totalPages: number;
    tracks: MusicTrack[] | [];
}