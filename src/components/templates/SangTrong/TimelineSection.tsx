import React from 'react';
import { availableColorsTemplate2 } from '../../../config';
import Each from '../../../layouts/Each';
import DefaultImage from '../../../assets/images/templates/sangtrong/picture1.png';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

import Deco1 from '../../../assets/images/templates/sangtrong/1.png';
import Deco2 from '../../../assets/images/templates/sangtrong/48.png';
import Deco3 from '../../../assets/images/templates/sangtrong/14.png';
export interface TimelineProps{
    date: string;
    title: string;
    content: string;
    image?: string | File; 
    style:number;
};

interface TimeLineSectionProps { 
    id: string;
    elements: TimelineProps[];   
    disabled?: boolean;
    titleFont: string;
    contentFont: string;
    style: number;    
    mainTitle: string;
    onSectionChange:  (name: string, newValue: string | File, subField?: string, i?: number) => void;
}
 

const TimelineSection:React.FC<TimeLineSectionProps> = ({
    elements,
    id,
    mainTitle,
    onSectionChange,
    disabled,
    contentFont,
    titleFont,
    style
}) => {
    const deco: string[] = [Deco1, Deco2, Deco3];
    return (
        <section className={`relative grid text-center bg-white`}>
            <div className='max-w-9xl mx-auto pt-[60px] w-full'>
                <EditableField 
                    id={`${id}-mainTitle`}
                    initialValue={mainTitle}  
                    disabled={disabled} 
                    onChangeBlur={onSectionChange}
                    name='mainTitle'  
                    styleThemes={{ color: availableColorsTemplate2[style][0] }}
                    className={`text-center text-[56px] md:text-[72px] md:leading-[90px] font-pinyonScript md:mb-10`}
                />   
                <div className='mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-9 w-full px-[15px]'>
                    <Each 
                        of={elements}
                        render={(item, index) => 
                            <div className='grid grid-rows-2 w-full'>
                                <div className='w-full relative rounded-t-full h-full md:h-[385px] border-gray-400 border-none'>
                                    <RichImageEditor 
                                        id={`picture-${id}-${index}`}
                                        name="elements"
                                        index={index}
                                        subField="picture"
                                        alt="Wedding couple" 
                                        src={item.picture? `${API_BASE_URL}/${item.picture}` : DefaultImage} 
                                        disabled={disabled}
                                        onChange={onSectionChange}
                                        className='w-full z-30 h-full object-cover rounded-t-full'
                                        classNameImage='rounded-t-full  h-full md:h-[385px]'
                                        style={{ padding: 0 }}
                                       

                                    />  
                                </div>
                                <div style={{ backgroundColor: availableColorsTemplate2[style][2] }} className='relative h-fit'>
                                    <div className='absolute -top-20 w-full flex justify-center items-center z-20 pointer-events-none'>
                                        <img src={deco[style]} className='md:w-[210px]  md:h-[160px] w-[180px] h-[181px]'/>
                                    </div>
                                    <div className='pt-16 px-10 pb-10' >
                                        <EditableField 
                                            id={`${id}-title-${index}`}
                                            initialValue={item.title} 
                                            name='elements'
                                            subField='title' 
                                            disabled={disabled} 
                                            index={index} 
                                            onChangeBlur={onSectionChange}
                                            className='text-[40px] font-pinyonScript'
                                            styleThemes={{ color: availableColorsTemplate2[style][0] , fontFamily: titleFont}} 
                                        />    
                                        <EditableField 
                                            id={`${id}-content-${index}`}
                                            initialValue={item.content} 
                                            name='elements'  
                                            index={index}
                                            subField='content'
                                            disabled={disabled}
                                            onChangeBlur={onSectionChange}
                                            className='mt-3 text-dark-200 font-beVietnamPro '
                                            styleThemes={{ fontFamily: contentFont }}
                                        />      
                                    </div>
                                    <div className='flex justify-center items-center'>
                                        <div className='flex space-x-[35px] text-[40px] md:text-[40px] items-center h-auto' style={{ color: availableColorsTemplate2[style][1] }}>
                                            <EditableField 
                                                id={`${id}-day-${index}`}
                                                initialValue={item.day} 
                                                name='elements'  
                                                index={index}
                                                subField='day'
                                                disabled={disabled}
                                                onChangeBlur={onSectionChange}
                                                className='leading-none'
                                            />       
                                            <div className='self-stretch w-[1.66px]' style={{ backgroundColor: availableColorsTemplate2[style][1] }}></div>
                                            <EditableField 
                                                id={`${id}-month-${index}`}
                                                initialValue={item.month} 
                                                name='elements'  
                                                index={index}
                                                subField='month'
                                                disabled={disabled}
                                                onChangeBlur={onSectionChange}
                                                className='leading-none'
                                            />      
                                            <div className='self-stretch w-[1.66px]' style={{ backgroundColor: availableColorsTemplate2[style][1] }}></div>
                                            <EditableField 
                                                id={`${id}-year-${index}`}
                                                initialValue={item.year} 
                                                name='elements'  
                                                index={index}
                                                subField='year'
                                                disabled={disabled}
                                                onChangeBlur={onSectionChange}
                                                className='leading-none'
                                            />       
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </section>
    )
}

export default TimelineSection