import React from 'react';
import StampStory from '../../../assets/images/templates/coba/stampStory.png';
import IconImage from '../../../assets/images/templates/coba/iconStory.png'; 
import Picture3 from '../../../assets/images/templates/coba/storyImage.png';
import Frame1 from '../../../assets/images/templates/coba/frameStory1.png';
import Frame2 from '../../../assets/images/templates/coba/frameStory2.png';
import Frame3 from '../../../assets/images/templates/coba/frameStory3.png';
import { availableColors } from '../../../config';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

export interface StoryProps{
    title: string;
    description: string;
    imageStory?: File | string;
}

interface StorySectionProps extends StoryProps{
    id: string;
    style: number;
    titleFont: string;
    contentFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

const StorySection: React.FC <StorySectionProps>= ({
    id,
    title,
    description,
    imageStory,
    style,
    titleFont,
    contentFont,
    disabled = false,
    onSectionChange
}) => { 
    const frames: string[] = [Frame1, Frame2, Frame3]; 
    return (
        <section className='relative overflow-hidden' style={{ backgroundColor: availableColors[style][style === 2 ? 4 : 1] }}>
            {/* Main content section with padding-bottom to accommodate frame */}
            <section className='z-10 relative mx-auto px-[15px] pt-[56px] pb-[60px] md:pt-[97px] md:pr-[96px] md:pb-[103px] md:pl-[86px] max-w-[1443px]'>
                <div className='flex flex-col lg:flex-row gap-6 lg:gap-[30px] font-phudu justify-center items-center'>
                    {/* Text Content */}
                    <div className='w-full lg:max-w-[540px] mb-16'> 
                        <EditableField 
                            id={`story-title-${id}`}
                            initialValue={title} 
                            name='title' 
                            disabled={disabled}
                            onChangeBlur={onSectionChange}
                            className="w-full bg-transparent text-title-coba-mobile md:text-tilte-coba text-3d drop-shadow-3d h-14 md:h-20"
                            styleThemes={{ fontFamily: titleFont, color: availableColors[style][3] }}
                        />  
                        <EditableField 
                            id={`story-description-${id}`}
                            initialValue={description} 
                            name='description' 
                            disabled={disabled}
                            onChangeBlur={onSectionChange} 
                            className='bg-transparent min-h-32 md:min-h-44 w-5/6 font-trirong text-base pt-4 sm:pt-5 lg:pr-[68px] overflow-hidden resize-none' 
                            styleThemes={{ fontFamily: contentFont, color: availableColors[style][3] }}
                        />   
                    </div>

                    {/* Image Container with relative positioning */}
                    <div className='relative max-w-[314px] lg:max-w-[686.34px] h-full mt-8 lg:mt-0'> 
                        <RichImageEditor 
                            id={`imageStory-${id}`} 
                            name='imageStory'
                            onChange={onSectionChange}
                            disabled={disabled} 
                            src={imageStory ? `${API_BASE_URL}${imageStory}` : Picture3} 
                            classNameImage='rotate-[4.59deg]'
                            className='absolute top-[13%] left-[7%] w-[84%] h-auto aspect-[612.6/357.35]'
                            alt="Picture 3"
                        >
                            <img 
                                src={IconImage} 
                                className='absolute -bottom-24 -left-[12%] w-[40%] sm:w-[35%] md:w-[30%] lg:w-[254px] z-40'
                                alt="Icon"
                            />
                        </RichImageEditor>
                        <img 
                            src={StampStory} 
                            className=' w-full h-full object-contain'
                            alt="Stamp Story"
                        /> 
                    </div> 
                </div>
            </section>
            <img 
                src={frames[style]} 
                className='absolute bottom-0 w-full max-h-[189px] object-cover'
                alt="Bottom Frame"
            />  
        </section>
    )
}

export default StorySection