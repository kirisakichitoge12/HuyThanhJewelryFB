import React from 'react'
import { availableColorsTemplate4 } from '../../../config';
import EventIcon1 from '../../../assets/images/templates/template4/eventImage11.png';
import EventIcon2 from '../../../assets/images/templates/template4/eventImage12.png';
import EventIcon3 from '../../../assets/images/templates/template4/eventImage13.png';
import EventIcon4 from '../../../assets/images/templates/template4/eventImage21.png';
import EventIcon5 from '../../../assets/images/templates/template4/eventImage22.png';
import EventIcon6 from '../../../assets/images/templates/template4/eventImage23.png';
import EventIcon7 from '../../../assets/images/templates/template4/eventImage31.png';
import EventIcon8 from '../../../assets/images/templates/template4/eventImage32.png';
import EventIcon9 from '../../../assets/images/templates/template4/eventImage33.png';
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
    const icons = [[EventIcon1, EventIcon2, EventIcon3],[EventIcon4, EventIcon5, EventIcon6], [EventIcon7, EventIcon8, EventIcon9]];   
    return (
        <section className={`relative grid py-[70px] text-center font-pacifico`} style={{ backgroundColor: availableColorsTemplate4[style][2] }}>
            <div className='max-w-9xl mx-auto px-[15px] md:px-[85px] py-[100px] w-full' >
                <EditableField 
                    id={`${id}-event-title`}
                    initialValue={title} 
                    name='title' 
                    disabled={disabled}  
                    onChangeBlur={onSectionChange}
                    styleThemes={{ color: availableColorsTemplate4[style][1], fontFamily: titleFont }}
                    className={`text-center text-[40px] md:text-[52px] md:mb-[45px]`}
                />    
                {/* Events */}
                <div className='flex flex-col md:flex-row relative gap-14 md:gap-[31px]'>
                    <Each 
                        of={events}
                        render={(item: EventProps, index) => (  
                            <div className='z-20 flex-1 flex flex-col justify-center items-center gap-[34px]'>
                                <img src={icons[style][index]} className='w-[259px] h-[173px]'/>
                                <div className="flex flex-col justify-center bg-white p-8 w-full rounded-xl shadow-md -translate-y-14">
                                    <EditableField 
                                        id={`${id}-title-${index}`}
                                        initialValue={item.title} 
                                        name='events'
                                        subField='title' 
                                        disabled={disabled} 
                                        index={index} 
                                        onChangeBlur={onSectionChange}
                                        className=' text-2xl md:text-[40px] py-4'
                                        styleThemes={{ color: availableColorsTemplate4[style][0] }}
                                    />
                                    <EditableField
                                        id={`${id}-dateTime-${index}`}
                                        initialValue={item.dateTime}
                                        name='events'
                                        subField='dateTime'
                                        disabled={disabled}
                                        index={index}
                                        className='text-[32px]'
                                        onChangeBlur={onSectionChange}
                                        styleThemes={{ color: availableColorsTemplate4[style][1] }}
                                    />
                                    <EditableField
                                        id={`${id}-address-${index}`}
                                        initialValue={item.address}
                                        name='events'
                                        subField='address'
                                        disabled={disabled}
                                        index={index}
                                        className='text-base font-beVietnamPro mb-[17px]'
                                        onChangeBlur={onSectionChange}
                                        styleThemes={{ color: availableColorsTemplate4[style][1] }}
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