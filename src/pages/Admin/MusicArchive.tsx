import React, { useState, useRef, useEffect } from 'react'; 
import Progress from '../../components/common/Progress';
import { toast } from 'react-hot-toast';
import { PiMusicNotesPlusBold } from 'react-icons/pi';
import Button from '../../components/common/Button';
import { FaSave, FaTrash } from 'react-icons/fa';
import { MusicTrack } from '../../types/dataResponse/music.interface';  
import LoadingDots from '../../components/common/LoadingDots';
import { convertTracksToFormData } from '../../utils/convertTracksToFormData';  
import { useAdminContext } from '../../context/AdminContext';
import { fetchMusicList, updateNewMusic } from '../../api/music';
import { useNavigate } from 'react-router-dom';

const MusicArchive: React.FC = () => { 
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);  
  const [tracks,setTracks] = useState<MusicTrack[]>([]);

  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { musicList } = useAdminContext().state;
  const { dispatch } = useAdminContext();
  const handleUpload = (files: FileList | null) => {
    if (!files) return; // Check if files are selected
    setUploading(true);
    setProgress(0); 
    const totalFiles = files.length;
    let uploadedFiles = 0;
    const newTracks: MusicTrack[] = []; // Array to hold new tracks

    const loadFileDuration = (file: File): Promise<MusicTrack> => {
        return new Promise((resolve) => {
            const audio = new Audio(URL.createObjectURL(file)); // Create an audio object
            audio.onloadedmetadata = () => { 
              resolve({
                    _id: (tracks.length + uploadedFiles + 1).toString(), // Generate a new ID
                    title: file.name, // Use the file name as the title
                    artist: 'Unknown Artist',  
                    album: 'Unknown Album', 
                    duration: formatDuration(audio.duration), // Use the actual duration
                    file: file  
                });
            };
            audio.onerror = () =>  toast.error("Load music fail!!");
        });
    };

    const formatDuration = (duration: number): string => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format as mm:ss
    };

    const uploadFiles = async () => {
        for (let i = 0; i < totalFiles; i++) {
            const file = files[i];
            const newTrack = await loadFileDuration(file);  
            newTracks.push(newTrack);  
            uploadedFiles += 1;  
            setProgress(((uploadedFiles / totalFiles) * 100)); 
        }
        setUploading(false);
        setTracks((prevTracks) => [...prevTracks, ...newTracks]);  
    };

    uploadFiles(); // Start the upload process
  };  

  const handleRemoveMusicUploaded = (id: string) => {
    setTracks(prev => prev.filter((i: MusicTrack) => i._id !== id ));
  }

  const handlePlayMusic = (track: MusicTrack) => {
    setCurrentTrack(track);
    
    if (audioRef.current && typeof track.file === "string") {
        audioRef.current.src = track.file as string;
        audioRef.current.play();
    }
    if (audioRef.current && track.file instanceof File) {
      const audio: string = URL.createObjectURL(track.file);
      audioRef.current.src = audio ;
      audioRef.current.play();
    }
  };
  const handleSave: VoidFunction = () => {
    const formData: FormData = convertTracksToFormData(tracks);
    updateNewMusic(formData); 
    fetchMusicList(dispatch);
    for (const [key, value] of formData.entries()) {
      console.log(`FormData key: ${key}`, value);
    }
    
  }   
  useEffect(() => {
    fetchMusicList(dispatch);
  },[dispatch])
  const handleInputChange = (index: number, field: keyof MusicTrack, value: string) => {
    setTracks(prevTracks => {
      const updatedTracks = [...prevTracks];
      updatedTracks[index] = {
        ...updatedTracks[index],
        [field]: value,
      };
      return updatedTracks;
    });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin/danh-sach-nhac');
  };
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800">Music Management</h1> 
      <div className="w-full max-w-full mx-auto p-4">
        <div className='flex items-center justify-between mb-5'>
          <div>
          <div className="flex items-center gap-2">
            <label htmlFor="music" className="w-fit flex justify-center items-center text-white bg-blue-500 px-4 py-2 rounded cursor-pointer">
              <PiMusicNotesPlusBold size={20} /> Uploads 
            </label>
            <label    onClick={handleClick}  className="w-fit flex justify-center items-center text-white bg-blue-500 px-4 py-2 rounded cursor-pointer">
              Lists music
            </label>
          </div>

            <input 
              id='music' 
              className='hidden' 
              type='file' 
              accept='audio/mp3' 
              multiple 
              onChange={(e) => (e.target.files) && handleUpload(e.target.files) } 
            /> 
          </div>
          <audio  
            ref={audioRef}
            controls  
            onEnded={() => setCurrentTrack(null)}
          />
          <Button onClick={handleSave}>
            <FaSave /> Save
          </Button>
        </div>
        {uploading && <Progress percent={progress} />}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Music Name</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Album</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {musicList.data && musicList.data.tracks.map((track: MusicTrack, index: number) => (
                <tr 
                  key={index} 
                  className={`hover:bg-gray-50 transition-colors duration-200 cursor-pointer border 
                    ${currentTrack?._id === track._id ? 'bg-blue-100' : ''}`}
                  onClick={() => handlePlayMusic(track)}
                >
                  <td className="p-3 text-sm font-medium text-gray-900">{track.title}</td>
                  <td className="p-3 text-sm text-gray-500">{track.artist}</td>
                  <td className="p-3 text-sm text-gray-500">{track.album}</td>
                  <td className="p-3 text-sm text-gray-500">{track.duration}</td>  
                </tr>
              ))}
              {tracks.map((track: MusicTrack, index: number) => (
                <tr 
                  key={index} 
                  className={`relative hover:bg-gray-50 transition-colors duration-200 cursor-pointer border 
                    ${currentTrack?._id === track._id ? 'bg-blue-100' : 'bg-gray-100'}`}
                  onClick={() => handlePlayMusic(track)}
                >
                  <td className="p-3 text-sm font-medium text-gray-900">
                    <input className='border-none outline-none py-1 w-full ps-2 rounded-md' type='text' value={track.title}/>
                  </td>
                  <td className="p-3 text-sm text-gray-500">
                  <input
                    className='border-none outline-none py-1 w-full ps-2 rounded-md'
                    value={track.artist}
                    onChange={(e) => handleInputChange(index, 'artist', e.target.value)}
                  />
                  </td>
                  <td className="p-3 text-sm text-gray-500">{track.album}</td>
                  <td className="p-3 text-sm text-gray-500">{track.duration}</td>  
                  { 
                    currentTrack?._id === track._id  && 
                      <button className='absolute right-5 top-3 text-red-500' onClick={() => handleRemoveMusicUploaded(track._id)}>
                        <FaTrash/>
                      </button>
                  }
                </tr>
              ))}
            </tbody>
          </table> 
          {
            musicList.loading && 
              <div className='py-3 flex justify-center '>
                <LoadingDots/> 
              </div> 
          }
          { musicList.error && <p className='flex justify-center items-center py-2 text-gray-400'>No music upload ...</p> }
        </div>
      </div>
    </section>
  );
};

export default MusicArchive;