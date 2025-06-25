import React from 'react'
import { availableColorsTemplate2 } from '../../../config';
import EventIcon1 from '../../../assets/images/templates/sangtrong/eventIcon1.png';
import EventIcon2 from '../../../assets/images/templates/sangtrong/eventIcon2.png';
import EventIcon3 from '../../../assets/images/templates/sangtrong/eventIcon3.png'; 
import Each from '../../../layouts/Each'; 
import EditableField from '../../common/EditableField';

import DecoLeft1 from '../../../assets/images/templates/sangtrong/img/left.png';
import DecoLeft2 from '../../../assets/images/templates/sangtrong/img/03.png';
import DecoLeft3 from '../../../assets/images/templates/sangtrong/15.png';

import DecoRight1 from '../../../assets/images/templates/sangtrong/img/right.png';
import DecoRight2 from '../../../assets/images/templates/sangtrong/img/01.png';
import DecoRight3 from '../../../assets/images/templates/sangtrong/16.png';
export interface EventProps{ 
    id: number;
    number: string;
    image?: string;
    title: string;
    address: string;
    dateTime: string;
    day: string;
    month: string;
    year: string;
    link: string;
}

interface EventSectionProps{
    id: string,
    title: string;
    events: EventProps[];
    style: number;
    titleFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File | EventProps | EventProps[], subField?: string, i?: number) => void;
} 

const EventsSection: React.FC<EventSectionProps> = ({
    id,
    events,
    title,
    style,
    titleFont,
    disabled = false, 
    onSectionChange
}) => { 
    const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
    const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
    const icons = [EventIcon1, EventIcon2, EventIcon3];   
    return (
        <section className={`relative grid py-[88px] text-center`} style={{ backgroundColor: availableColorsTemplate2[style][2] }}>
            <img  src={decoLefts[style]} className='absolute -top-0 -left-0 md:w-[280px] md:h-[356px] w-[199px] h-[208px]'/>
            <img  src={decoRights[style]} className='absolute -bottom-0 -right-0 md:w-[280px] md:h-[356px] w-[199px] h-[208px]'/> 
            <div className='max-w-9xl mx-auto pt-[95px] w-full' >  
                <EditableField 
                    id={`${id}-title`}
                    initialValue={title} 
                    name='title' 
                    disabled={disabled}  
                    onChangeBlur={onSectionChange}
                    styleThemes={{ color: availableColorsTemplate2[style][0], fontFamily: titleFont }}
                    className={`text-center text-[56px] md:text-[72px] md:leading-[90px] font-pinyonScript md:mb-10`}
                />    
                {/* Events */}
                <div className='flex flex-col md:flex-row relative gap-14 md:gap-0'>
                    <div className='absolute w-2/4 h-1 left-1/4 top-1/2 z-0' style={{ background: availableColorsTemplate2[style][0] }}></div>
                    <Each 
                        of={events}
                        render={(item: EventProps, index) => (  
                            <div className='z-20 flex-1 flex flex-col justify-center items-center gap-[34px]'>
                                <img src={icons[index]} className='w-[110px] h-[110px]'/> 
                                <div className="flex justify-center">
                                    <EditableField 
                                        id={`${id}-title-${index}`}
                                        initialValue={item.title} 
                                        name='events'
                                        subField='title' 
                                        disabled={disabled} 
                                        index={index} 
                                        onChangeBlur={onSectionChange}
                                        className='rounded-full text-white font-pinyonScript  text-[32px] md:text-[40px] min-w-[194px] md:min-w-[250px] px-[10px] pt-[10px] pb-2'
                                        styleThemes={{ backgroundColor: availableColorsTemplate2[style][0] }}
                                    />   
                                </div> 
                                <div className='px-9'>
                                    <div className='flex text-2xl gap-5 justify-center items-center text-dark-200'>
                                        <EditableField 
                                            id={`${id}-dateTime-${index}`}
                                            initialValue={item.dateTime} 
                                            name='events'
                                            subField='dateTime' 
                                            disabled={disabled} 
                                            index={index} 
                                            onChangeBlur={onSectionChange}
                                        />   
                                        <p className='w-[15px] h-[2px] bg-dark-200'></p>
                                        <div className='flex space-x-3 md:space-x-[35px] items-center h-auto '> 
                                            <EditableField 
                                                id={`${id}-day-${index}`}
                                                initialValue={item.day} 
                                                name='events'
                                                subField='day' 
                                                disabled={disabled} 
                                                index={index} 
                                                className='leading-none'
                                                onChangeBlur={onSectionChange}
                                            />   
                                            <div className='self-stretch w-[1.66px] bg-dark-200'></div> 
                                            <EditableField 
                                                id={`${id}-month-${index}`}
                                                initialValue={item.month} 
                                                name='events'
                                                subField='month' 
                                                disabled={disabled} 
                                                index={index} 
                                                className='leading-none'
                                                onChangeBlur={onSectionChange}
                                            />   
                                            <div className='self-stretch w-[1.66px] bg-dark-200'></div>
                                            <EditableField 
                                                id={`${id}-year-${index}`}
                                                initialValue={item.year} 
                                                name='events'
                                                subField='year' 
                                                disabled={disabled} 
                                                index={index} 
                                                className='leading-none'
                                                onChangeBlur={onSectionChange}
                                            />   
                                        </div> 
                                    </div>
                                    <div className='font-prata text-base text-dark-200 pt-4 leading-[170%]'> 
                                        <EditableField 
                                            id={`${id}-address-${index}`}
                                            initialValue={item.address} 
                                            name='events'
                                            subField='address' 
                                            disabled={disabled} 
                                            index={index} 
                                            className='leading-none'
                                            onChangeBlur={onSectionChange}
                                        />    
                                    </div>
                                </div>
                            </div> 
                        )}
                    /> 
                </div>
            </div>
        </section>
    )
}

export default EventsSection