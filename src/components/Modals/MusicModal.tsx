import React, { memo, useRef, useState, useCallback, useEffect } from 'react'
import Modal from './Modal'
import Button from '../common/Button'
import Each from '../../layouts/Each';   
import { TbMusic, TbMusicPause } from 'react-icons/tb'; 
import useMusicModal from '../../hooks/modals/useMusicModal';
import { fetchMusicLists } from '../../api/music';
import { MusicData } from '../../types/music.interface';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config/api.config';


const MusicModal: React.FC = () => {   
    const [musicTracks, setMusicTracks] = useState<Array<MusicData>>([]);
    const { isOpen, onClose, onChooseMusic } = useMusicModal(); 
    const [currentTrack, setCurrentTrack] = useState<MusicData | null>(null); 
    const [ isPause, setIsPause ] = useState<number>(-1);
    const audioRef = useRef<HTMLAudioElement>(null);
   const handlePlayMusic = useCallback((track: MusicData, index: number) => {
    setCurrentTrack(track);

    if (isPause === index) {  
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPause(-1);   
        }
    } else {  
        if (audioRef.current) {
            if (typeof track.file_url === "string") {
                audioRef.current.src = `${API_BASE_URL}${track.file_url}`; 
            } else if (track.file_url instanceof File) {
                const audio: string = URL.createObjectURL(track.file_url);
                audioRef.current.src = audio; 
            }
            audioRef.current.play(); // Phát nhạc mới
            setIsPause(index);
        }
    }
}, [isPause]); 

    
    
    // const handleChooseTrack = (event: React.ChangeEvent<HTMLInputElement>, track: MusicTrack) => { 
    //     if(musicList.data.tracks){
    //         const location: number = tracksId.findIndex((i: MusicTrack) => i._id === track._id);
    //         if(location > -1) {
    //             if (isSingle) {
    //                 setTracksId(tracksId.filter((i: MusicTrack) => i._id !== track._id));

    //         }
    //     }
    //         if(location > -1) {
    //         } else {
    //             setTracksId([...tracksId, track]);
    //         }
    //     }
    //     if (event.target.checked) {
    //         setTracksId([...tracksId, track]);
    //     } else {
    //         setTracksId(tracksId.filter((i: MusicTrack) => i._id !== track._id));
    //     }
    // }  
    const handleSubmit: VoidFunction = () => {
        if (currentTrack) {
            onChooseMusic(currentTrack);  
            
            if (audioRef.current) {
                console.log("tắt nhạc")
                audioRef.current.pause();
                audioRef.current.currentTime = 0;           
                setIsPause(-1); // Đánh dấu là không có bài nào đang phát
            }
    
            onClose();
        } else {
            toast.error("Vui lòng chọn nhạc");
        }
    };
    
    useEffect(() => {  
        const fetchMusic = async () => {
            const data = await fetchMusicLists(); 
            if(data && data.length > 0){
                console.log("tắt nhạc 1 ")
                setMusicTracks(data);
            }
        }
        fetchMusic();
    },[]); 
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='max-w-md'
        >
            <div className="bg-white shadow-md rounded-lg p-6 w-full">
                <h2 className="text-2xl font-bold mb-4">Tùy chọn nhạc nền</h2>
                <hr/>
                <audio  
                    ref={audioRef}
                    // controls  
                    className='hidden'
                    onEnded={() => setCurrentTrack(null)}
                />
                {/* <div className="grid grid-cols-2 gap-4 text-sm my-3 cursor-pointer">
                    <div 
                        className={`${currentState ? "border-b-2 border-blue-400" : ""} col-span-1 text-center `} 
                        onClick={() => setCurrentState(true)}    
                    >
                        <h3 className="font-medium mb-2">Nhạc hiện tại</h3>
                    </div> 
                    <div 
                        className={`${currentState ? "" : "border-b-2 border-blue-400"} col-span-1 text-center`} 
                        onClick={() => setCurrentState(false)}    
                    >
                        <h3 className="font-medium mb-2">Nhạc Upload</h3> 
                    </div>
                </div> */}
                <div className='max-h-[300px] overflow-y-auto px-5 py-5'>
                    <ul className="space-y-4">
                        <Each 
                            of={musicTracks}
                            render={(track: MusicData, index: number) => 
                            <li className='flex '>
                                {/* <input 
                                    type="checkbox"  
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChooseTrack(event, track)}  
                                    className="mr-2"
                                /> */}
                                <div
                                    className={`
                                        flex justify-between items-center cursor-pointer py-2 px-5 rounded-md w-full
                                        ${currentTrack?.id === track.id ? "bg-blue-500 text-white" : "bg-gray-50"}
                                    `}
                                    onClick={() => handlePlayMusic(track, index)}
                                >
                                    <span className='truncate max-w-44'>{track.name}</span>
                                    <span className='flex justify-center items-center gap-5'> 
                                        { isPause === index ? <TbMusic /> :<TbMusicPause  />  } 
                                    </span>  
                                </div>
                            </li> 
                        }
                        /> 
                    </ul>
                </div>
                <hr/>
                <div className="flex justify-between mt-4 space-x-2">
                    <Button onClick={onClose} color='none'>Đóng</Button>
                    <Button onClick={handleSubmit}>Sử dụng nhạc</Button>
                </div>

                </div>
        </Modal>
    )
}

export default memo(MusicModal)