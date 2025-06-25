import { MusicTrack } from "../types/dataResponse/music.interface";

export const convertTracksToFormData  = (tracks: MusicTrack[]): FormData => {
    const formData = new FormData();
    let i: number = 0;
    tracks.forEach((track: MusicTrack) => {
        // Append track metadata
        // Handle file upload if it's a File object
        if (track.file instanceof File) {
            formData.append(`tracks[${i}][_id]`, track._id);
            formData.append(`tracks[${i}][title]`, track.title);
            formData.append(`tracks[${i}][artist]`, track.artist);
            formData.append(`tracks[${i}][album]`, track.album);
            formData.append(`tracks[${i}][duration]`, track.duration); 
            formData.append(`tracks[${i}][file]`, track.file); 
            i++;
        }  
       
        console.log(i)
    });
    
    return  formData;
} 