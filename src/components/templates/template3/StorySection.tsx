import React from 'react';
import Picture from '../../../assets/images/templates/sangtrong/dV0rxtR.png';
import { availableColorsCodien } from '../../../config';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';
import Deco1 from '../../../assets/images/templates/codien/storyDeco1.png';
import Deco2 from '../../../assets/images/templates/codien/storyDeco2.png';
import Deco3 from '../../../assets/images/templates/codien/storydeco4.png';

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
    const decos: string[] = [Deco1, Deco2, Deco3];
    return ( 
        <section className={`relative grid text-center `} style={{ backgroundColor: availableColorsCodien[style][2] }}> 
            <div className='z-20 max-w-9xl md:mx-auto pt-[80px] px-[15px]'>
                <div className='w-full md:max-w-[836px] mx-auto flex justify-center items-center flex-col bg-white space-y-8'>
                    <img src={decos[style]}/>
                    <EditableField 
                        initialValue={title} 
                        name='title' 
                        id={`story-title-${id}`} 
                        disabled={disabled}  
                        styleThemes={{fontFamily: titleFont, color: availableColorsCodien[style][0] }}
                        className={`text-center text-[40px] md:text-[58px] md:leading-[90px] font-playfairDisplay`}
                        onChangeBlur={onSectionChange}  
                    />      
                    <div className='h-[1px] w-4/5 md:w-[410px]' style={{ background: availableColorsCodien[style][0] }}></div>
                    <EditableField 
                        initialValue={content} 
                        name='content' 
                        id={`story-content-${id}`} 
                        disabled={disabled}  
                        styleThemes={{fontFamily: content, color: availableColorsCodien[style][0] }}
                        className='text-base mt-4 font-beVietnamPro max-w-[690px] !text-dark-200'
                        onChangeBlur={onSectionChange}  
                    />       
                </div> 
                <div className='border max-w-[1113px] mx-auto mt-8 md:mt-[49px] mb-[57px]' style={{ borderColor: availableColorsCodien[style][0] }}>
                    <RichImageEditor
                        id={`story-image-${id}`} 
                        name='image'
                        src={image ? `${API_BASE_URL}/${image}` : Picture} 
                        onChange={onSectionChange} 
                        classNameImage='!p-5'
                        className='relative md:w-[1054px] h-[300px] md:h-[526px]'
                    /> 
                </div>
            </div>  
            <div className='w-full h-52 bg-white absolute top-0 z-0'></div>
            
        </section> 
    )
}

export default StorySection