import React, { memo, useEffect, useState } from 'react';
import StampAlbum from '../../../assets/images/templates/coba/stampAlbum.png';
import Picture1 from '../../../assets/images/templates/coba/picture5.png'; 
import Picture2 from '../../../assets/images/templates/coba/picture6.png';
import Picture3 from '../../../assets/images/templates/coba/picture7.png';
import Picture4 from '../../../assets/images/templates/coba/picture8.png';
import Each from '../../../layouts/Each'; 
import AngleLeft from '../../../assets/icons/angle-left.svg';
import AngleRight from '../../../assets/icons/angle-right.svg'; 
import FrameAlbum1 from '../../../assets/images/templates/coba/frameAlbum1.png';
import FrameAlbum2 from '../../../assets/images/templates/coba/frameAlbum2.png';
import FrameAlbum3 from '../../../assets/images/templates/coba/frameAlbum3.png';
import { availableColors } from '../../../config';
import { useImagesModal } from '../../../hooks/modals';
import { CustomFile } from '../../../types';
import { FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../../config/api.config';

export interface AlbumProps{
    albums: File[] | string[],
}

interface AlbumSectionProps extends AlbumProps{
    id: string;
    style: number;
    titleFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File | CustomFile[]) => void;
}

const AlbumSection: React.FC<AlbumSectionProps> = ({    
    id,
    albums,
    style,
    titleFont,
    disabled = false,
    onSectionChange
}) => {
    const initialPhotos: string[] = [Picture1, Picture2, Picture3, Picture4]; 
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [photos, setPhotos] = useState<string[]>(initialPhotos);
    const frames: string[] = [FrameAlbum1, FrameAlbum2, FrameAlbum3]; 
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { onOpen, listImage, id: idImage } = useImagesModal();  

    const handleDisplayEditBtn = () =>  setIsEdit(true);  
    const handleHiddenEditBtn = () =>  setIsEdit(false);  
    const handleChooseImages = (index: number) => setCurrentSlide(index); 
    const nextSlide = () => setCurrentSlide((prev) => prev < 3 ? prev + 1 : 0); 
    const prevSlide = () => setCurrentSlide((prev) => prev > 0 ? prev - 1 : 3);
    useEffect(()=>{ 
        if(idImage === `albums-${id}`){
            if(listImage && listImage.length > 0){
                setPhotos(listImage.map(item => item.preview || ""));
                onSectionChange("albums", listImage);
            }else{ 
                toast.error("Bạn cần phải chọn đủ 4 ảnh")
            }
        }
    },[listImage]);

    useEffect(()=>{
        if(albums && albums.length === 4){
            setPhotos(albums.map(item => `${API_BASE_URL}/${item}`));
        }
    },[]);
    return (
        <section
            id="album-section"
            onMouseEnter={handleDisplayEditBtn} 
            onMouseLeave={handleHiddenEditBtn}
            className={`${style === 0 ? "bg-[#EFE7DE]" : "bg-white-default"} relative overflow-hidden`} 
        >
            <section
                onClick={(event) => event.stopPropagation()} 
                className='z-10 relative max-w-[1443px] mx-auto flex flex-col text-center justify-center items-center font-phudu px-[15px] pt-[55px] pb-[43px] full:py-[103px] full:px-[194px]'
            >
                <h1 
                    className="text-title-coba-mobile mb-10 full:mb-[52px] md:text-tilte-coba text-3d drop-shadow-3d tracking-wide uppercase" 
                    style={{fontFamily: titleFont,  color: availableColors[style][4] }}
                > 
                    ALBUM ẢNH CƯỚI
                </h1>  
                <div  
                    className='relative w-full md:max-w-[1054px] mb-6 lg:mb-[41px]'
                >
                    {!disabled && isEdit 
                        ? <button className='absolute top-2 right-2 z-20 text-black bg-white px-8 py-4 rounded-md font-svn-sans' onClick={() => onOpen(`albums-${id}`)}>
                            <p>Sửa Album</p>
                            <div className='text-gray-400 flex flex-col justify-center items-center hover:bg-gray-200 p-1'>
                                <FiEdit size={25}/>
                                <p>sửa</p>
                            </div>
                        </button> 
                        : null
                    }
                    <div className='relative w-full'>
                                <img 
                                    src={StampAlbum} 
                                    className='w-full h-auto rotate-1 aspect-[16/10]' 
                                    alt="Stamp Frame"
                                />
                                <img 
                                    src={photos[currentSlide]} 
                                    className='absolute top-[6%] left-[4%] 
                                        w-[94%] h-[92%] 
                                        object-cover' 
                                    alt="Inner Picture"
                                />
                            </div>


                    {/* Navigation Buttons */}
                    <div className='block w-full absolute h-full'>
                        <button 
                            onClick={prevSlide}
                            className="absolute hover:bg-pink-default -top-[60%] -left-3 lg:-left-[80px] bg-white p-3 rounded-full border-2 border-primary text-primary shadow-lg" 
                        >
                            <img alt="angle left" src={AngleLeft} className="w-8 h-8" />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute hover:bg-pink-default -top-[60%] -right-3 lg:-right-[80px] bg-white p-3 rounded-full border-2 border-primary text-primary shadow-lg" 
                        >
                            <img alt="angle right" src={AngleRight} className="w-8 h-8" />
                        </button> 
                    </div>
                </div>
                <div className='flex justify-center overflow-hidden w-[488px] sm:w-full space-x-4 full:space-x-6 z-40'> 
                    <Each 
                        of={photos}
                        render={(item: string, index: number) =>   
                            <img 
                            src={item} 
                            className='w-[110px] h-[65px] sm:w-[245px] sm:h-[145px] 
                                object-cover cursor-pointer' 
                            onClick={() => handleChooseImages(index)} 
                        />
                        
                        }
                    />
                </div>  
                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6 z-50">
                    <Each
                        of={Array(4).fill(4)}
                        render={(_, index) => 
                            <div 
                                onClick={() => handleChooseImages(index)} 
                                className={`cursor-pointer ${
                                    currentSlide === index ? "bg-secondary" : "bg-primary"
                                } w-3 h-3 rounded-full`}
                            />
                        }
                    />
                </div>
            </section>
            <img src={frames[style]} className='absolute bottom-0 w-full max-h-[523.35px] object-cover'/>
        </section>
    )
}

export default memo(AlbumSection)