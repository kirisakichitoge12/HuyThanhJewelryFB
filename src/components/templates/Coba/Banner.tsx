import React from 'react';
import IconFollower1 from '../../../assets/images/templates/coba/iconFollower1.png';
import IconFollower2 from '../../../assets/images/templates/coba/iconFollower2.png';
import IconFollower3 from '../../../assets/images/templates/coba/iconFollower3.png';

import Deco2 from '../../../assets/images/templates/coba/deco2.png';
import BannerImage from '../../../assets/images/templates/coba/banner.png'; 
import FrameBanner1 from '../../../assets/images/templates/coba/frameBanner1.png';
import FrameBanner2 from '../../../assets/images/templates/coba/frameBanner2.png';
import FrameBanner3 from '../../../assets/images/templates/coba/frameBanner3.png'; 
import StampBanner1 from '../../../assets/images/templates/coba/stampBanner1.png';
import { availableColors } from '../../../config';
import EditableField from '../../common/EditableField'; 
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';


export interface BannerProps{ 
    bride: string;
    groom: string;
    image?: File;
    date: string
}

interface BannerSectionProps extends BannerProps{
    id: string,
    style?: number;
    titleFont?: string; 
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

const Banner: React.FC<BannerSectionProps> = ({
    id,
    bride = "Thanh Tuấn", 
    groom = "& Ngọc Anh", 
    image,
    date = "12-11-2024",
    style = 0,
    titleFont = "",
    disabled = false, 
    onSectionChange,
}) => {   
    const framesBg: string[] = [FrameBanner1, FrameBanner2, FrameBanner3];
    const icons: string[] = [IconFollower1, IconFollower2, IconFollower3];
    const stamps: string[] = [StampBanner1, StampBanner1, StampBanner1]; 
    return (
        <section onClick={(e) => e.stopPropagation()} className={`relative ${style === 0 ? "bg-[#EFE7DE]" : "bg-[#F9F6F2]"}`}>
            <section className="max-w-[1443px] mx-auto font-phudu"> 
                <div className="relative flex flex-col lg:flex-row justify-center items-center lg:items-start px-10 pt-10 pb-[131px] md:pt-[120px] md:mb-10 lg:gap-[35px]">
                    {/* Left side content */}
                    <div className="flex-1 space-y-6 mb-11 md:mb-0 full:ml-[95px] ">
                        <div className="relative space-y-2 min-w-[295px] md:min-w-[565px] flex flex-col justify-end items-end"> 
                            <img className='absolute -top-5 md:-top-14 left-0  w-[72px] h-[81px] md:w-fit md:h-full md:left-16 z-10' src={Deco2} />
                            <div className={`border-y-2 z-20 py-[6px] w-5/6`} style={{ borderColor: availableColors[style][4] }}>
                                <h1 
                                    className="text-[16px] leading-[20px] sm:text-content-coba font-semibold tracking-wider text-[#EFE7DE] whitespace-nowrap"
                                    style={{ textShadow:  "-2px -2px 0 #b91c1c, 2px -2px 0 #b91c1c, -2px 2px 0 #b91c1c, 2px 2px 0 #b91c1c", wordSpacing: "-1px" }}    
                                >
                                        LOA LOA LOA... BÀ CON CHÚ Ý
                                </h1> 
                            </div>   
                            <div 
                                className="relative w-[90%] sm:w-[514px] px-4 min-h-[61.33px] shadow-3d text-[#DDCCB6] flex items-center justify-end"
                                style={{ backgroundColor: availableColors[style][2] }}
                            >
                                <span className='absolute left-2 md:-top-3 rotate-[-7.04deg] text-[28.99px] sm:text-[60px] font-birthstone'>Cô dâu chú rể</span>
                                <span className="font-extrabold text-[13px] sm:text-title-mobile uppercase">Về chung một nhà</span>
                            </div>
                        </div> 
                            <EditableField 
                                initialValue={bride} 
                                name='bride'
                                id={`banner-bridge-${id}`} 
                                disabled={disabled}  
                                onChangeBlur={onSectionChange}
                                styleThemes={{color: availableColors[style][4], fontFamily: titleFont, textShadow: "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white"}} 
                                className="uppercase ml-5 w-full bg-transparent font-bold tracking-wide drop-shadow-3d text-[45px] lg:text-[95px]"
                            />  
                            <EditableField  
                                id={`banner-groom-${id}`}
                                initialValue={groom} 
                                name='groom' 
                                disabled={disabled} 
                                onChangeBlur={onSectionChange}
                                styleThemes={{ color: availableColors[style][4], fontFamily: titleFont, textShadow:  "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white"}} 
                                className="uppercase ml-5 text-[45px] lg:text-[95px] w-full bg-transparent font-bold drop-shadow-3d tracking-wide md:text-end"
                            /> 
                    </div>

                    {/* Right side image */}
                    <div className="flex-1 relative"> 
                        <div className='relative w-[319px] h-[393px] md:w-[577.2px] md:h-[730px] z-30'>
                            <img src={stamps[style]} className='absolute w-full h-full rotate-[4.16deg] '/> 
                            <RichImageEditor 
                                id={`imageBanner-${id}`}
                                name='image'
                                src={image ? `${API_BASE_URL}${image}` : BannerImage}
                                alt="Wedding couple"
                                classNameImage='rotate-[4.16deg]'
                                className="absolute top-6 md:top-10 left-4 md:left-7 rounded w-[90%]  h-[90%]"
                                onChange={onSectionChange}
                                disabled={disabled}
                            >
                                <img src={icons[style]} className='absolute -bottom-10 md:-bottom-36 rotate-[-9deg] z-20 -right-5 md:-right-32 max-w-[127px] max-h-[104px] md:max-w-[382px] md:max-h-[312px]'/>
                            </RichImageEditor>  
                        </div>
                    </div> 
                </div>
            </section>  
                <div className="absolute bottom-0 md:relative w-full lg:-mt-40 h-[260px]">
                    <div 
                        className={`absolute z-10 px-7 pt-[15px] pb-5 bottom-9 lg:-top-10 shadow-3d w-[280px] sm:w-[384px] h-[77px] flex justify-center items-center gap-5`} 
                        style={{ backgroundColor: availableColors[style][0] }}
                    >
                        <span 
                            style={{ color: availableColors[style][4] }}
                            className={`font-birthstone rotate-[-7.04deg] text-[40px] md:text-[60px] leading-[81.6px]`}>
                            Ngày
                        </span>
                        <EditableField  
                            id={`banner-date-${id}`}
                            initialValue={date} 
                            name='date' 
                            disabled={disabled} 
                            onChangeBlur={onSectionChange}
                            className='text-center md:max-w-[200px] bg-transparent text-[24px] h-12 md:text-content-coba font-bold'
                            styleThemes={{ color: availableColors[style][2] }}
                        />  
                    </div>  
                    <img src={framesBg[style]} className='w-full h-full object-cover object-top'/>
                </div>
        </section>
    )
}

export default Banner