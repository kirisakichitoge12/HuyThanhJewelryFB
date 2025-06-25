import React from 'react'; 
import WomanImage from '../../../assets/images/templates/coba/women.png';
import ManImage from '../../../assets/images/templates/coba/man.png'; 
import IconIntroRight1 from '../../../assets/images/templates/coba/iconIntroRight1.png';
import IconIntroRight2 from '../../../assets/images/templates/coba/iconIntroRight2.png';
import IconIntroRight3 from '../../../assets/images/templates/coba/iconIntroRight3.png';
import IconIntroLeft1 from '../../../assets/images/templates/coba/iconIntroLeft1.png';
import IconIntroLeft2 from '../../../assets/images/templates/coba/iconIntroLeft2.png';
import IconIntroLeft3 from '../../../assets/images/templates/coba/iconIntroLeft3.png';

import FrameIntro1 from '../../../assets/images/templates/coba/frameIntro1.png';
import FrameIntro2 from '../../../assets/images/templates/coba/frameIntro2.png';
import FrameIntro3 from '../../../assets/images/templates/coba/frameIntro3.png';
import { availableColors } from '../../../config';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';


export interface IntroductionProps{
    imageBridge?: File | string;
    imageGroom?: File | string;
    contentBridge: string;
    contentGroom: string;
}

interface IntroductionSectionProps extends IntroductionProps{
    id: string;
    style: number;
    titleFont: string;
    contentFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

const Introduction:React.FC<IntroductionSectionProps> = ({
    id,
    contentBridge,
    contentGroom,
    imageBridge, 
    imageGroom,
    style,
    titleFont,
    contentFont,
    disabled = false, 
    onSectionChange
}) => { 
    const iconsLeft: string[] = [IconIntroLeft1, IconIntroLeft2, IconIntroLeft3];
    const iconsRight: string[] = [IconIntroRight1, IconIntroRight2, IconIntroRight3];
    const frames: string[] = [FrameIntro1, FrameIntro2, FrameIntro3]; 
    return (
        <section className={`bg-white-default py-10 `} style={{ backgroundImage: `url(${frames[style - 1]})`, minHeight: "100vh", backgroundSize: "100% auto", backgroundRepeat: "no-repeat"}}>
            <section className='relative max-w-[1443px] mx-auto font-phudu pl-[10px] pr-[17px] pt-[132px] md:px-0 md:pt-[154px] pb-[169px] space-y-[56px] md:space-y-[135px] overflow-x-hidden'>
                <div className='flex flex-col md:flex-row items-center justify-center h-fit'>
                    <div className="relative z-20 ">
                        <RichImageEditor 
                            id={`introduction-imageBridge`} 
                            name='imageBridge'
                            alt="Wedding couple" 
                            onChange={onSectionChange}
                            src={imageBridge ? `${API_BASE_URL}${imageBridge}` : WomanImage} 
                            classNameImage='rounded-full border-[5px]'
                            disabled={disabled}
                            className='w-[216px] h-[216px] lg:w-[320px] lg:h-[320px] full:w-[404px] full:h-[404px]'  
                        /> 
                    </div>
                    <div 
                        style={{ backgroundColor: availableColors[style][4] }}
                        className='relative z-10 px-[32px] md:pt-[30px] -translate-y-24 md:translate-y-0 md:px-0 md:-translate-x-32 md:w-[801px] w-full md:h-[307px] text-white-default shadow-3d' 
                    >
                        <h1 className='w-fit text-[60px] leading-[81.6px] rotate-[-7.04deg] md:ml-[150px] full:ml-[238px] pt-[108px] md:pt-0' style={{ fontFamily: titleFont || "Birthstone" }}>Cô dâu</h1>
                        <div className='md:ml-[150px] full:ml-[247px] full:pr-[109px] space-y-[19px]'> 
                            <EditableField 
                                id={`introduction-contentBridge-${id}`}
                                initialValue={contentBridge} 
                                name='contentBridge' 
                                disabled={disabled}  
                                onChangeBlur={onSectionChange}
                                className='bg-transparent font-trirong text-base w-full min-h-[100px] resize-none overflow-hidden md:w-[445px]'
                                styleThemes={{ fontFamily: contentFont || "Trirong"}}
                            />   
                            <div className='hidden md:block w-[229px] h-[2px] bg-white-default'></div>
                        </div>
                        <div className='flex justify-center md:absolute -top-32 -right-20'>
                            <img src={iconsRight[style]} className='max-w-[160px] max-h-[160px] md:max-w-[248px] md:max-h-[248px]'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col-reverse md:flex-row items-center justify-center max-h-fit'>
                    <div 
                        className='-translate-y-24 md:pt-[30px] md:translate-y-0 md:px-0 md:translate-x-32 z-10 md:w-[801px] px-[32px]  w-full md:h-[307px] text-white-default shadow-3d'
                        style={{ backgroundColor: availableColors[style][3] }}
                    >
                        <h1 className='w-fit text-[60px] leading-[81.6px] rotate-[-7.04deg] md:pl-[106px] pt-[108px] md:pt-0' style={{ fontFamily: titleFont || "Birthstone" }}>Chú rể</h1>
                        <div className='md:ml-[115px] full:mr-[241px] space-y-[19px]'> 
                            <EditableField 
                                id={`introduction-contentGroom-${id}`}
                                initialValue={contentGroom} 
                                name='contentGroom' 
                                disabled={disabled} 
                                onChangeBlur={onSectionChange}
                                className='bg-transparent font-trirong text-base w-full min-h-[100px] resize-none overflow-hidden md:w-[445px]'
                                styleThemes={{ fontFamily: contentFont || "Trirong"}}
                            />    
                            <div className='hidden md:block w-[229px] h-[2px] bg-white'></div>
                        </div>
                        <div className='flex justify-center md:absolute -top-32 -left-20 '>
                            <img src={iconsLeft[style]} className='max-w-[160px] max-h-[160px] md:max-w-[248px] md:max-h-[248px]'/>
                        </div>
                    </div> 
                    <RichImageEditor 
                        id={`introduction-imageGroom-${id}`}
                        alt="Wedding couple" 
                        name='imageGroom'
                        onChange={onSectionChange}
                        src={imageGroom ? `${API_BASE_URL}${imageGroom}` : ManImage} 
                        disabled={disabled}
                        classNameImage='rounded-full'
                        className='w-[216px] h-[216px] lg:w-[320px] lg:h-[320px] full:w-[404px] full:h-[404px] '  
                    />  
                </div> 
            </section>
        </section>
    )
}

export default Introduction