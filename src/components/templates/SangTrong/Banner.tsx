import React from 'react';
import Picture1 from "../../../assets/images/templates/sangtrong/picture1.png";
import Picture2 from "../../../assets/images/templates/sangtrong/picture2.png";
import RichImageEditor from '../../common/RichImageEditor';
import { availableColorsTemplate2 } from '../../../config';
import BgDeco1 from '../../../assets/images/templates/sangtrong/7.png';
import BgDeco2 from '../../../assets/images/templates/sangtrong/30.png';
import BgDeco3 from '../../../assets/images/templates/sangtrong/15.png';
import Deco1 from '../../../assets/images/templates/sangtrong/img/04.png';
import Deco2 from '../../../assets/images/templates/sangtrong/39.png';
import Deco3 from '../../../assets/images/templates/sangtrong/19.png';


import EditableField from '../../common/EditableField';
import { API_BASE_URL } from '../../../config/api.config';

export interface BannerProps{ 
    title: string;
    bride: string;
    groom: string;
    image1?: File;
    image2?: File;
    day: string
    month: string;
    year: string;
}

interface BannerSectionProps extends BannerProps{
    id: string, 
    disabled?: boolean;
    titleFont?: string;
    contentFont?: string;
    style: number;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}
const Banner: React.FC<BannerSectionProps> = ({ 
    id,
    onSectionChange,
    disabled,
    titleFont,
    style ,
    ...props
}) => {
    const bgImages: string[] = [BgDeco1, BgDeco2, BgDeco3];
    const deco = [Deco1, Deco2, Deco3];
    return (
        <section onClick={(e) => e.stopPropagation()} className={`relative`} style={{ background: availableColorsTemplate2[style][2] }}>
            <img className='absolute top-0 left-0 max-w-[188px] max-h-[174px] md:max-w-[327px] md:max-h-[303px]' src={bgImages[style]}/>
            <section className="max-w-[1443px] mx-auto grid md:grid-cols-[1fr,1.5fr] md:pt-[60px] gap-[30px] px-[15px]"> 
                <div className='flex flex-col items-center justify-center md:pt-[125px]'> 
                    <EditableField 
                        initialValue={props.title} 
                        name='title'className='text-lg md:text-2xl font-prata uppercase text-dark-200'
                        id={`banner-title-${id}`} 
                        disabled={disabled}  
                        onChangeBlur={onSectionChange}  
                    />    
                    <div className='mt-6 mb-[41px] md:mb-[93px]'>
                        <EditableField 
                            initialValue={props.groom} 
                            name='groom'
                            className={`text-[56px] md:text-[72px] md:leading-[90px] font-pinyonScript text-center`}
                            id={`banner-groom-${id}`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            styleThemes={{ fontFamily: titleFont, color: availableColorsTemplate2[style][0]}}
                        />    
                        <h1 style={{ color: availableColorsTemplate2[style][0] }} className={`text-[64px] md:leading-[60px] h-[60px] md:h-auto items-center flex justify-center font-pinyonScript text-center`}>& </h1>
                        <EditableField 
                            initialValue={props.bride} 
                            name='bride'
                            className={`text-[56px] md:text-[72px] md:leading-[90px] font-pinyonScript text-center`}
                            id={`banner-bride-${id}`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            styleThemes={{ fontFamily: titleFont, color: availableColorsTemplate2[style][0]}}
                        />    
                    </div>
                    <div className={`flex space-x-[30px] text-[40px] md:text-[80px] items-center h-auto`} style={{ color: availableColorsTemplate2[style][1] }}>
                        <EditableField 
                            initialValue={props.day} 
                            name='day'
                            className='leading-none'
                            id={`banner-day`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange}  
                        />     
                        <div className={`self-stretch w-[1.66px]`} style={{ background: availableColorsTemplate2[style][1] }}></div>
                        <EditableField 
                            initialValue={props.month} 
                            name='month'
                            className='leading-none'
                            id={`banner-month`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange}  
                        />      
                        <div className={`self-stretch w-[1.66px]`} style={{ background:  availableColorsTemplate2[style][1]}}></div>
                        <EditableField 
                            initialValue={props.year} 
                            name='year'
                            className='leading-none'
                            id={`banner-year`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange}  
                        />      
                    </div> 
                </div>
                <div className='relative flex items-end pl-5 justify-between md:justify-center '>
                    <div className='relative w-[223px] h-[261px] md:w-[497px] md:h-[600px]'>
                        <RichImageEditor
                            id={`banner01-${id}`}
                            name='image1'
                            onChange={onSectionChange} 
                            src={props.image1 ? `${API_BASE_URL}/${props.image1}` : Picture1} 
                            className='absolute w-full h-full z-20 p-0'
                            classNameImage={`rounded-t-full border-[1px] `}
                            style={{ borderColor: availableColorsTemplate2[style][0],padding: 0 }}
                        />  
                        <div style={{ borderColor: availableColorsTemplate2[style][0] }} className={`z-10 absolute bottom-0 rounded-t-full border-[1px] w-[223px] h-[261px] md:w-[497px] md:h-[600px]`}></div>
                        <div style={{ borderColor: availableColorsTemplate2[style][0] }} className={`z-10 absolute bottom-0 translate-x-5 md:translate-x-10 rounded-t-full border-r-[1px] w-[223px] h-[261px] md:w-[497px] md:h-[600px]`}></div>
                    </div>
                    <div className='relative w-[134px] h-[158px] md:w-[297px] md:h-[349px] z-30 -translate-x-20'>
                        <RichImageEditor
                            id={`banner02-${id}`}
                            name='image2'
                            onChange={onSectionChange} 
                            src={props.image2 ? `${API_BASE_URL}/${props.image2}` : Picture2}  
                            className='absolute w-full h-full'
                            classNameImage={`rounded-t-full border-[1px]`}
                            style={{ borderColor: availableColorsTemplate2[style][0],padding: 0 }} 
                        />
                        <div style={{ borderColor: availableColorsTemplate2[style][0] }} className={`z-10 absolute bottom-0 rounded-t-full border-[1px] w-[134px] h-[158px] md:w-[297px] md:h-[349px]`}></div>
                    </div> 
                    <img src={deco[style]} className='absolute -bottom-10 md:-bottom-20 right-0 z-30 w-[115px] h-[96px] md:w-[256px] md:h-[213px]'/>
                </div>
            </section>
        </section>
    )
}

export default Banner