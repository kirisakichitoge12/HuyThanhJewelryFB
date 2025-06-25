import React from 'react';
import Picture from '../../../assets/images/templates/sangtrong/picture1.png';
import { availableColorsTemplate2 } from '../../../config';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

import Deco1 from '../../../assets/images/templates/sangtrong/6.png';
import Deco2 from '../../../assets/images/templates/sangtrong/32.png';
import Deco3 from '../../../assets/images/templates/sangtrong/16.png';
interface StorySectionProps {
    id: string; 
    title: string;
    titleFont: string;
    contentFont: string;
    style: number;
    image?: File;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File) => void;
    content: string;
} 

const StorySection: React.FC<StorySectionProps> = ({
    style,
    id,
    onSectionChange,
    title, 
    titleFont, 
    disabled, 
    image,
    content
}) => {
    const deco = [Deco1, Deco2, Deco3];
    return ( 
        <section className={`relative grid text-center`} style={{ backgroundColor: availableColorsTemplate2[style][2] }}>
            <div className='hidden md:block uppercase absolute top-1/3 -left-[335px] font-prata rotate-90 text-[110px]' style={{ color: availableColorsTemplate2[style][1] }}>
            Love story
            </div>
            <div className='max-w-9xl mx-auto pt-[95px]'>
                <EditableField 
                    initialValue={title} 
                    name='title' 
                    id={`story-title-${id}`} 
                    disabled={disabled}  
                    styleThemes={{fontFamily: titleFont, color: availableColorsTemplate2[style][0] }}
                    className={`text-center text-[56px] md:text-[72px] md:leading-[90px] font-pinyonScript md:mb-10`}
                    onChangeBlur={onSectionChange}  
                />      
                <div className='w-full max-w-[836px] mx-auto'>
                    <EditableField 
                        initialValue={content} 
                        name='content' 
                        id={`story-content-${id}`} 
                        disabled={disabled}  
                        styleThemes={{fontFamily: content}}
                        className='text-base mt-4 font-beVietnamPro text-dark-200 '
                        onChangeBlur={onSectionChange}  
                    />       
                </div> 
                <div className='relative mt-[41px] md:mt-14 max-w-[1054px] h-[220px] md:h-[500px] px-[12px]'>
                    <RichImageEditor
                        id={`story-image-${id}`} 
                        name='image'
                        src={image ? `${API_BASE_URL}/${image}` : Picture} 
                        onChange={onSectionChange} 
                        classNameImage='rounded-tl-[100px] rounded-tr-[100px] md:rounded-tl-[263px] md:rounded-tr-[263px] object-cover'
                        className='z-30 absolute  right-4 w-[350px] h-auto md:w-full md:h-full max-w-[90%] md:max-w-none'

                        style={{padding:0 }}
                    > 
                        <div className='absolute  z-10 border-[1px] top-0 rounded-tl-[100px] rounded-tr-[100px] md:rounded-tl-[263px] md:rounded-tr-[263px] w-[99%] md:w-full h-full' style={{ borderColor: availableColorsTemplate2[style][0]} }></div>
                        <div className='absolute bg-transparent left-[14px] md:left-[44px] top-0 z-20 border-r-[1px] rounded-tl-[100px] rounded-tr-[100px] md:rounded-tl-[263px] md:rounded-tr-[263px] border-red-800 w-full h-full'style={{ borderColor: availableColorsTemplate2[style][0], 
    height: '100%'
 }}></div>
                        <img src={deco[style]} className='z-30 absolute -bottom-12 right-0 md:-right-20 w-[173px] h-[151px] md:w-[361px] md:h-[269px]'/>
                    </RichImageEditor> 
                </div>
            </div>  
        </section> 
    )
}

export default StorySection 