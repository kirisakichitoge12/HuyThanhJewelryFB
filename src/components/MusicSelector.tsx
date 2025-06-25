import React, { memo } from 'react';   
import { MusicTrack } from '../types/dataResponse/music.interface'; 
interface MusicSelectorProps {
    availabMusic: MusicTrack[] | [];
    selectedMusic: string;
    onMusicChange: (music: MusicTrack) => void;
}

const MusicSelector: React.FC<MusicSelectorProps> = ({ 
    availabMusic,
    selectedMusic, 
    onMusicChange 
}) => {
    return (
        <div className="w-full min-w-40 max-w-60">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn âm nhạc
            </label>
            <div className="relative">
                <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedMusic}
                    onChange={(e) => {
                        if(availabMusic.length > 0){
                            const track = availabMusic.find(f => f._id === e.target.value); 
                            if (track) onMusicChange(track);
                        }
                    }}
                >
                    {availabMusic.length > 0
                        ? availabMusic.map((music: MusicTrack, index: number) => (
                            <option
                                key={index}
                                value={music._id} 
                            > 
                                {music.title} 
                            </option>
                        ))
                        : <option>No music upload...</option>
                    }
                </select>
            </div>
        </div>
    );
};

export default memo(MusicSelector);