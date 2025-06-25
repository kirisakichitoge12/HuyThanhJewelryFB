import React from 'react'
import { availableColorsCodien } from '../../../config';
import EventIcon1 from '../../../assets/images/templates/codien/eventDeco (3).png'; 
import EventIcon2 from '../../../assets/images/templates/codien/eventDeco (2).png';
import EventIcon3 from '../../../assets/images/templates/codien/eventDeco (1).png';
import EventIcon4 from '../../../assets/images/templates/codien/eventDeco (4).png';
import EventIcon5 from '../../../assets/images/templates/codien/eventDeco (5).png';
import EventIcon6 from '../../../assets/images/templates/codien/eventDeco (6).png'; 
import EventIcon7 from '../../../assets/images/templates/codien/eventDeco (7).png';
import EventIcon8 from '../../../assets/images/templates/codien/eventDeco (8).png';
import EventIcon9 from '../../../assets/images/templates/codien/eventDeco (9).png'; 
import Each from '../../../layouts/Each'; 
import EditableField from '../../common/EditableField'; 
export interface EventProps{ 
    id: number;
    number: string;
    image?: string;
    title: string;
    subTitle:string;
    address: string;
    dateTime: string; 
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
    console.log({ 
        events, title
    })
    const icons = [[EventIcon1, EventIcon2, EventIcon3],[EventIcon4, EventIcon5, EventIcon6], [EventIcon7, EventIcon8, EventIcon9]];   
    return (
        <section className={`relative grid py-[80px] text-center`} style={{ backgroundColor: availableColorsCodien[style][2] }}> 
            <div className='max-w-9xl mx-auto w-full' >  
                <EditableField 
                    id={`${id}-event-title`}
                    initialValue={title} 
                    name='title' 
                    disabled={disabled}  
                    onChangeBlur={onSectionChange}
                    styleThemes={{ color: availableColorsCodien[style][0], fontFamily: titleFont }}
                    className={`text-center text-[40px] md:text-[48px] font-playfairDisplay md:mb-10`}
                />    
                {/* Events */}
                <div className='flex flex-col md:flex-row relative gap-14 md:gap-0'>
                    <Each 
                        of={events}
                        render={(item: EventProps, index) => (  
                            <div className='z-20 flex-1 flex flex-col justify-center items-center gap-[34px]'>
                                <img src={icons[style][index]} className='w-[136px] h-[170px]'/> 
                                <div className="flex justify-center border-y-[1px] w-full" style={{ borderColor: availableColorsCodien[style][0] }}>
                                    <EditableField 
                                        id={`${id}-title-${index}`}
                                        initialValue={item.title} 
                                        name='events'
                                        subField='title' 
                                        disabled={disabled} 
                                        index={index} 
                                        onChangeBlur={onSectionChange}
                                        className='font-playfairDisplay text-2xl md:text-[32px] py-4'
                                        styleThemes={{ color: availableColorsCodien[style][0] }}
                                    />   
                                </div>  
                                <div className='flex justify-center items-center text-dark-100 flex-col '>
                                    <EditableField 
                                        id={`${id}-subTitle-${index}`}
                                        initialValue={item.subTitle} 
                                        name='events'
                                        subField='subTitle' 
                                        disabled={disabled} 
                                        index={index} 
                                        className='text-base md:text-2xl font-playfairDisplay'
                                        onChangeBlur={onSectionChange}
                                    />    
                                    <EditableField 
                                        id={`${id}-address-${index}`}
                                        initialValue={item.address} 
                                        name='events'
                                        subField='address' 
                                        disabled={disabled} 
                                        index={index} 
                                        className='text-base font-playfairDisplay mb-[17px]'
                                        onChangeBlur={onSectionChange}
                                    />    
                                    <EditableField 
                                        id={`${id}-dateTime-${index}`}
                                        initialValue={item.dateTime} 
                                        name='events'
                                        subField='dateTime' 
                                        disabled={disabled} 
                                        index={index} 
                                        className='font-beVietnamPro text-2xl'
                                        onChangeBlur={onSectionChange}
                                    />     
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