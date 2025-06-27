import React, { useEffect, useState } from 'react';
import Picture1 from '../../../assets/images/templates/template1/Picture1.webp';
import ButtonTemplate from './ButtonTemplate';
import EditableField from '../../common/EditableField';
import { scrollInView } from '../../../utils'; 
// import { FaUpload } from 'react-icons/fa'; // Chưa sử dụng
// import Each from '../../../layouts/Each'; // Chưa sử dụng
import { API_BASE_URL } from '../../../config/api.config';
import { CustomFile } from '../../../types';

export interface BannerProps{ 
    bride: string;
    groom: string;
    image?: File;
    date: string;
    albums?: File[] | string[];
    sharedAlbums?: File[] | string[]; // Thêm prop mới để nhận dữ liệu từ AlbumSection
}

interface BannerSectionProps extends BannerProps{
    id: string, 
    disabled?: boolean;
    titleFont?: string;
    contentFont?: string;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

const Banner: React.FC<BannerSectionProps> = ({id, disabled, onSectionChange, titleFont, contentFont, albums, sharedAlbums, ...props}) => { 
    // const [preview, setPreview] = React.useState<string | null>(null); // Chưa sử dụng
    const [bannerImages, setBannerImages] = useState<string[]>([Picture1, Picture1, Picture1]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Ưu tiên sử dụng sharedAlbums (từ AlbumSection) nếu có
        const sourceAlbums = sharedAlbums && sharedAlbums.length > 0 ? sharedAlbums : albums;
        
        if (sourceAlbums && sourceAlbums.length > 0) {
            const imageUrls = sourceAlbums.map(item => {
                if (typeof item === 'string') {
                    // Nếu là URL đầy đủ hoặc blob URL
                    if (item.startsWith('blob:') || item.startsWith('http') || item.startsWith('data:')) {
                        return item;
                    }
                    // Nếu là đường dẫn tương đối từ server
                    return `${API_BASE_URL}/${item}`;
                }
                // Nếu là CustomFile object (có preview)
                if (item && typeof item === 'object' && 'preview' in item) {
                    return (item as CustomFile).preview;
                }
                // Nếu là File object
                if (item instanceof File) {
                    return URL.createObjectURL(item);
                }
                // Fallback
                return item;
            });
            
            // Đảm bảo luôn có ít nhất 3 ảnh
            const paddedImages = imageUrls.length < 3 
                ? [...imageUrls, ...imageUrls.slice(0, 3 - imageUrls.length)]
                : imageUrls;
            
            console.log('🎬 Banner - Source albums:', sourceAlbums);
            console.log('🎬 Banner - Processed images:', paddedImages);
            setBannerImages(paddedImages);
        }
    }, [albums, sharedAlbums]); // Thêm sharedAlbums vào dependency

    useEffect(() => {
        const interval = setInterval(() => {
            // setIsTransitioning(true); // Chưa sử dụng
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
                // setIsTransitioning(false); // Chưa sử dụng
            }, 1000); // Thời gian fade out
        }, 3000); // Thời gian hiển thị mỗi ảnh (4 giây)

        return () => clearInterval(interval);
    }, [bannerImages]);

    useEffect(() => {
        setIsLoaded(false); // Reset trạng thái mỗi lần đổi ảnh
    }, [currentIndex]);

    // const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if(event.target.files){
    //         const file = event.target.files[0];
    //         setPreview(URL.createObjectURL(file));
    //         onSectionChange('image', file);
    //     }
    // }

    return (
        <section className='relative w-full  flex flex-col justify-center items-center overflow-hidden'>
            <div className='relative w-full h-full'
             
            >
                <img 
                    src={bannerImages[currentIndex]}
                    alt='banner-main'
                    key={currentIndex}
                    onLoad={() => setIsLoaded(true)}
                    className={`w-full h-full min-h-[645px] max-h-[1000px] object-cover object-center transition-all duration-[3500ms]
                        ${isLoaded ? 'scale-100 opacity-100 visible' : 'opacity-0 invisible'}
                    `}
                    style={{
                        objectPosition: 'center 30%',
                        background: 'transparent none no-repeat 50% 50%',
                        backgroundSize: 'cover',
                        transition: 'transform 3.5s cubic-bezier(0.4,0,0.2,1), filter 1.2s cubic-bezier(0.4,0,0.2,1), opacity 3.5s cubic-bezier(0.4,0,0.2,1)',
                        WebkitTransform: isLoaded ? 'scale(1,1)' : 'scale(1.2,1.2)',
                        MozTransform: isLoaded ? 'scale(1,1)' : 'scale(1.2,1.2)',
                        msTransform: isLoaded ? 'scale(1,1)' : 'scale(1.2,1.2)',
                        OTransform: isLoaded ? 'scale(1,1)' : 'scale(1.2,1.2)',
                        transform: isLoaded ? 'scale(1,1)' : 'scale(1.2,1.2)',
                        filter: isLoaded ? 'contrast(1.15) saturate(1.15)' : 'grayscale(1%)',
                        visibility: isLoaded ? 'visible' : 'hidden',
                        opacity: isLoaded ? 1 : 0
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* <div>
                {disabled ? null:<label htmlFor="file-input" className='absolute z-10 opacity-70 hover:opacity-100 transition-opacity duration-300 top-36 right-10 w-32s flex justify-center items-center rounded-lg h-11 cursor-pointer bg-white '>
                    <FaUpload />
                    Tải Ảnh
                </label>}
                <input type='file' id='file-input' className='hidden' onChange={handleUploadImage}/>
            </div>  */}
            <section className='absolute inset-0 z-10 flex flex-col justify-center items-center text-white pointer-events-none'>
                <div className='z-40 flex flex-col justify-center items-center pointer-events-auto'>
                    <h2 className='uppercase text-[15pt] md:text-[18pt] mb-[15px] font-bold ml-2' style={{fontFamily: contentFont}}>Save the date</h2>
                    <h1 className='min-h-[55px] text-[32pt] md:text-[64pt] font-bold space-x-5 flex flex-col md:flex-row justify-center items-center'>
                        <EditableField 
                            initialValue={props.groom} 
                            name='groom'
                            id={`banner-groom-${id}`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            styleThemes={{ fontFamily: titleFont}}
                            className='!mr-8'
                        />   
                        <span className='text-2xl md:text-[36pt] !mr-14'>&</span>
                        <EditableField 
                            initialValue={props.bride} 
                            name='bride'
                            id={`banner-bridge-${id}`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            styleThemes={{ fontFamily: titleFont}}
                        />    
                    </h1>
                    <div className='bg-white w-32 h-[1px] mt-5 mb-2'></div>
                    <EditableField 
                        initialValue={props.date} 
                        name='date'
                        id={`banner-date-${id}`} 
                        disabled={disabled}  
                        onChangeBlur={onSectionChange} 
                        styleThemes={{ fontFamily: contentFont}}
                        className='uppercase text-[18pt] mb-[15px]'
                    />    
                    <ButtonTemplate
                        isBorder
                        borderColor='#f3a4a2'
                        onClick={(e) => scrollInView(e, `message-section`)}
                      
                    >
                        Gửi lời chúc
                    </ButtonTemplate>
                </div> 
            </section>
            <div className='bg-[#ee8584] opacity-30 -z-0 w-full h-full absolute top-0 pointer-events-none'></div>
            <div className="absolute bottom-0 w-full h-0 border-l-[142vw] border-l-transparent border-r-0 border-b-[138px] border-b-white"></div>  
        </section>
    )
}

export default Banner;