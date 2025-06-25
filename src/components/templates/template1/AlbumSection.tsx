import React, { useEffect, useState } from 'react' 
import ImageDeco from '../../../assets/images/templates/template1/weddingGiftEnvelope.svg'
import Picture1 from '../../../assets/images/templates/template1/Picture1.webp';
import Picture2 from '../../../assets/images/templates/template1/Picture2.webp';
import Picture3 from '../../../assets/images/templates/template1/Picture3.webp';
import Picture4 from '../../../assets/images/templates/template1/Picture4.webp';
import Picture5 from '../../../assets/images/templates/template1/Picture5.webp';
import Picture6 from '../../../assets/images/templates/template1/Picture6.webp';
import Picture7 from '../../../assets/images/templates/template1/Picture7.webp';
import Picture8 from '../../../assets/images/templates/template1/Picture8.webp';
import Each from '../../../layouts/Each';
import FollowerSmall from '../../../assets/images/templates/template1/flower-large.svg';
import { FiEdit } from 'react-icons/fi';
import { useImagesModal } from '../../../hooks/modals';
import toast from 'react-hot-toast';
import { CustomFile } from '../../../types';
import { API_BASE_URL } from '../../../config/api.config';

interface AlbumSectionProps{
    id: string;
    disabled?: boolean; 
    albums: File[] | string[],
    titleFont: string;
    onSectionChange:  (name: string, newValue: string | CustomFile[]) => void;
} 

const AlbumSection: React.FC<AlbumSectionProps> = ({
    id,
    disabled, 
    albums,
    titleFont,
    onSectionChange
}) => {  
    const defaultAlbums: string[] = [Picture1, Picture2, Picture3, Picture4, Picture5, Picture6, Picture7, Picture8];
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [photos, setPhotos] = useState<string[]>(defaultAlbums)
    const { onOpen, id: idImage, listImage } = useImagesModal();

    useEffect(()=>{ 
        if(idImage === `albums-template1-${id}`){
            if(listImage && listImage.length > 0){
                setPhotos(listImage.map(item => item.preview || ""));
                onSectionChange("albums", listImage);
            }else{ 
                toast.error("Bạn cần phải ít nhất 4 ảnh")
            }
        }
    },[listImage]);

    useEffect(() => {
        if(albums && albums.length > 0){
            setPhotos(albums.map(item => `${API_BASE_URL}/${item}`)); 
        }
    }, [])
    return (
        <section className='relative w-full bg-white pt-[70px] pb-[105px]'>
            <section className='max-w-9xl mx-auto flex flex-col justify-center items-center text-center px-4' onClick={() => setIsEdit(true)}>
                <h1 className='text-[42pt] text-[#ee8584] font-marmelad' style={{fontFamily: titleFont}}>Album Hình Cưới</h1> 
                <img src={ImageDeco} className='mb-[70px]'/>
                <div className='relative z-30 grid justify-center grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-5 hover:border-[#ee8584] border-[1px] border-transparent'>
                    <Each of={photos} render={(item: string) => ( 
                        <img src={item} alt="" className='w-full max-h-[400px] object-cover'/> 
                    )} />
                    {!disabled && isEdit 
                        ? <button className='absolute top-2 right-2 z-20 text-black bg-white px-8 py-4 rounded-md font-svn-sans' onClick={() => onOpen(`albums-template1-${id}`)}>
                            <p>Sửa Album</p>
                            <div className='text-gray-400 flex flex-col justify-center items-center hover:bg-gray-200 p-1'>
                                <FiEdit size={25}/>
                                <p>sửa</p>
                            </div>
                        </button> 
                        : null
                    }
                </div> 
            </section>
            <img src={FollowerSmall} className='absolute bottom-20 max-w-[424px] -rotate-90' alt='icon follower'/>
        </section>
    )
}

export default AlbumSection