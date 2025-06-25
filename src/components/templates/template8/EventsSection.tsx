import React, { useEffect, useState } from 'react'; 
import FrameLeft1 from '../../../assets/images/templates/coba/frameEventLeft1.png';
import FrameLeft2 from '../../../assets/images/templates/coba/frameEventLeft2.png';
import FrameLeft3 from '../../../assets/images/templates/coba/frameEventLeft3.png';
import FrameRight1 from '../../../assets/images/templates/coba/frameEventRight1.png';
import FrameRight2 from '../../../assets/images/templates/coba/frameEventRight2.png';
import FrameRight3 from '../../../assets/images/templates/coba/frameEventRight3.png';

import Icon11 from '../../../assets/images/templates/coba/IconEvent1_1.png';
import Icon12 from '../../../assets/images/templates/coba/IconEvent1_2.png';
import Icon13 from '../../../assets/images/templates/coba/IconEvent1_3.png';
import Icon14 from '../../../assets/images/templates/coba/IconEvent1_4.png';

import Icon21 from '../../../assets/images/templates/coba/IconEvent2_1.png';
import Icon22 from '../../../assets/images/templates/coba/IconEvent2_2.png';
import Icon23 from '../../../assets/images/templates/coba/IconEvent2_3.png';
import Icon24 from '../../../assets/images/templates/coba/IconEvent2_4.png';

import Icon31 from '../../../assets/images/templates/coba/IconEvent3_1.png';
import Icon32 from '../../../assets/images/templates/coba/IconEvent3_2.png';
import Icon33 from '../../../assets/images/templates/coba/IconEvent3_3.png';
import Icon34 from '../../../assets/images/templates/coba/IconEvent3_4.png'; 

import Each from '../../../layouts/Each';
import { availableColors } from '../../../config'; 
import EventElement from '../../common/EventElement';
import ComponentToolbar from '../../common/ComponentToolbar';
import { useConfirmModal } from '../../../hooks/modals';
import LocationSearch, { SuggestionLocation } from '../../common/LocationSearch';
import FormField from '../../common/FormField';
import Button from '../../common/Button';
import hoatietdc1_01 from '../../../assets/images/templates/template8/event/hoatiet02.png'; 
import hoatietdc1_02 from '../../../assets/images/templates/template8/event/hoatiet03.png'; 
import hoatietdc1_03 from '../../../assets/images/templates/template8/event/hoatiet01.png'; 
import hoatietbndc1_01 from '../../../assets/images/templates/template8/event/demo.png'; 
import hoatietbndc1_02 from '../../../assets/images/templates/template8/event/demo01.png'; 
import hoatietbndc1_03 from '../../../assets/images/templates/template8/event/demo02.png'; 
import EditableField from '../../common/EditableField';
export interface EventProps{ 
    id: number;
    number: string;
    image?: string;
    title: string;
    address: SuggestionLocation;
    dateTime: string;
    link: string;
}
export interface EventdemoProps{ 
    id: number;
    title: string;
    address: SuggestionLocation;
    dateTime: string;
}

interface EventSectionProps{
    events: EventProps[];
    eventstemplate8:EventdemoProps[]
    style: number;
    titleFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File | EventProps | EventProps[], subField?: string, i?: number) => void;
}

const EventsSection: React.FC<EventSectionProps> = ({
    events,
    eventstemplate8,
    style,
    titleFont,
    disabled = false, 
    onSectionChange
}) => {  
    const icons: string[][] = [ 
        [Icon11, Icon12, Icon13, Icon14],
        [Icon21, Icon22, Icon23, Icon24],
        [Icon31, Icon32, Icon33, Icon34]
    ]
    const framesLeft: string[] = [FrameLeft1, FrameLeft2, FrameLeft3];
    const framesRight: string[] =[FrameRight1, FrameRight2, FrameRight3]; 
    const [eventsSection, setEventsSection] = useState<EventProps[]>([]); 
    const [currentSection, setCurrentSection] = useState<number>(-1);
    const [isEdit, setIsEdit] = useState<EventProps | null>(null);
    const { onOpen } = useConfirmModal();

    const handleCopy = (index: number): void => {
        const newSection: EventProps = { ...eventsSection[index]};  
        const oldEvents = [...eventsSection];
        const newEvents = [...oldEvents.slice(0, index + 1), newSection, ...oldEvents.slice(index + 1)];
        setEventsSection(newEvents);
        onSectionChange("events", newEvents);
    };
    const handleMoveUp = (index: number): void => {
        if (index === 0) return;
        const oldEvents = [...eventsSection];
        [oldEvents[index - 1], oldEvents[index]] = [oldEvents[index], oldEvents[index - 1]]; 
        setEventsSection(oldEvents);
        onSectionChange("events", oldEvents);
    };

    const handleMoveDown = (index: number): void => {
        if (index === eventsSection.length - 1) return;
        const oldEvents = [...eventsSection];
        [oldEvents[index], oldEvents[index + 1]] = [oldEvents[index + 1], oldEvents[index]];
        setEventsSection(oldEvents);
        onSectionChange("events", oldEvents);
    };

    const handleDelete = (index: number): void => {
        const oldEvents = [...eventsSection];
        const newEvents = oldEvents.filter((_, i) => i !== index);
        setEventsSection(newEvents);
        onSectionChange("events", newEvents);
    };

    const handleClickOpenToolbar = (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>, index: number) => { 
        event.stopPropagation();  
        setCurrentSection(index);  
    };

    const handleSave = () => {
        if(isEdit) {  
            const update: EventProps = { ...isEdit};
            const oldEvents = [...eventsSection];
            if(currentSection > -1){
                oldEvents[currentSection] = update;
                setEventsSection(oldEvents);
                onSectionChange("events", update, undefined, currentSection);
            }
        }
        setIsEdit(null);
    }
    useEffect(() => {
        if (events.length > 0) { 
            const newEvents: EventProps[] = events.map((event, index) => ({ ...event, image: icons[style][index] }));
            setEventsSection(newEvents);
        }
    }, []); 
    console.log("demoo",eventstemplate8)
    return (
        <>
        <section className='relative hidden bg-white' > 
            <img src={framesLeft[style]} className='hidden lg:block absolute left-0 max-w-[261px] h-full'/>
            <img src={framesRight[style]} className='hidden lg:block absolute right-0 max-w-[261px] h-full'/>
            <section className='z-10 relative max-w-[1443px] mx-auto font-phudu overflow-hidden'>
                <div className='pt-[64px] pb-[70px] px-[15px] md:px-0 md:pt-[106px] md:pb-[159px] space-y-[49px] text-center'>
                    <h1 className="text-title-coba-mobile md:text-tilte-coba text-3d drop-shadow-3d tracking-wide uppercase"
                        style={{ fontFamily: titleFont, color: availableColors[style][4] }}    
                    > 
                        Sự kiện
                    </h1>
                    <div className='flex flex-col justify-center items-center max-w-[620px] w-full mx-auto'>
                        <Each 
                            of={eventsSection}
                            render={(event: EventProps, index: number) => 
                                <>
                                    <div 
                                        onClick={(e) => handleClickOpenToolbar(e, index)} 
                                        className={`relative border-2 border-transparent ${!disabled && "hover:border-primary"}`}
                                    >
                                        <EventElement 
                                            event={event} 
                                            style={style} 
                                            icon={icons[style][event.id - 1]}
                                        />
                                        {
                                            currentSection === index && !disabled ? (
                                                <div className="absolute -top-[160px] left-0 w-full h-full flex justify-center items-center font-sans">
                                                    <ComponentToolbar 
                                                        title="Sửa mốc thời gian"
                                                        isMoveUp={index !== 0}
                                                        isMoveDown={index !== eventsSection.length - 1}
                                                        onCopy={() => handleCopy(index)}
                                                        onMoveUp={() => handleMoveUp(index)}
                                                        onEdit={() => setIsEdit(event)}
                                                        onMoveDown={() => handleMoveDown(index)}
                                                        onDelete={() => onOpen("", () => handleDelete(index))}
                                                    />
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                    { index !== eventsSection.length - 1 && <div className='w-[5px] h-[100px] md:h-[200px] bg-[#DDCCB6] mt-2'></div> }
                                </>
                            }
                        /> 
                    </div>
                </div>
            </section> 
            {
                isEdit !== null && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
                    >
                        <div className={`relative w-full max-w-2xl bg-white rounded-lg shadow-lg px-8 py-4 space-y-5`}> 
                            <h2 className="text-xl font-semibold text-gray-800">
                                Sửa sự kiện
                            </h2> 
                            <div className='space-y-5'>
                                <div className='flex justify-center items-center gap-2'>
                                    <FormField 
                                        type='phone'
                                        value={isEdit.number.toString()} 
                                        onChange={(e) => setIsEdit({ ...isEdit, number: e.target.value})}
                                    />
                                    <input 
                                        type='datetime-local' 
                                        value={isEdit.dateTime} 
                                        className='shadow px-4 outline-none py-2 rounded-lg'
                                        onChange={(e) => setIsEdit({ ...isEdit, dateTime: e.target.value })}
                                    />
                                </div>
                                <FormField value={isEdit.title} onChange={(e) => setIsEdit({ ...isEdit, title: e.target.value })}/>
                                <FormField value={isEdit.link} onChange={(e) => setIsEdit({ ...isEdit, link: e.target.value })}/>
                                <LocationSearch
                                    intialValue={{ description: isEdit.address.description, latitude: isEdit.address.latitude, longitude: isEdit.address.longitude }}
                                    onChange={(value: SuggestionLocation) => setIsEdit({ ...isEdit, address: value })}
                                    disabled={disabled}
                                />
                            </div> 

                            <div className='flex justify-end gap-5'>
                                <Button onClick={()=>setIsEdit(null)} color='none'>Hủy</Button>
                                <Button onClick={handleSave} style={{ padding: "10px 40px"}}>Lưu</Button>
                            </div>
                        </div> 
                    </div> 
                )
            }
        </section>

 <section
  onClick={(e) => e.stopPropagation()}
  className="relative bg-[#fafbf7] bg-cover bg-center bg-no-repeat pt-2"
>
  <div className="max-w-[1443px] mx-auto px-4 md:px-10 py-10 md:pt-[150px]">
    <h2 className="text-center text-[#5A713F] text-3xl md:text-[65px] font-medium font-chamon mb-10">Sự kiện</h2>

    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-[80px]">
      {/* Item: Ăn hỏi */}
     <div className="flex flex-col items-center text-center max-w-[300px]">
        {/* Họa tiết trang trí */}
        <img src={hoatietdc1_01} alt="leaf-red" className="mb-[-60px] z-20" />

        {/* Hình nền + Tên sự kiện (Ăn hỏi) */}
        <div className="relative">
            <img src={hoatietbndc1_01} alt="Ăn hỏi" className="w-full" />
            <EditableField
            id="event-title-1"
            initialValue={eventstemplate8[0].title}
            name="eventstemplate8[0].title"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="absolute -top-[40px] w-full mt-2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#854739] font-chamon text-[40px] font-medium"
            styleThemes={{
                color: "#854739",
                lineHeight: "1.6"
            }}
            />
        </div>

        {/* Thời gian diễn ra sự kiện */}
        <EditableField
            id="event-datetime-1"
            initialValue={eventstemplate8[0].dateTime}
            name="eventstemplate8[0].dateTime"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="text-[#4B7264] mt-2 font-aleo text-bold text-[22px]"
            styleThemes={{
            color: "#4B7264",
            lineHeight: "1.4"
            }}
        />

        {/* Địa chỉ */}
        <EditableField
            id="event-address-1"
            initialValue={eventstemplate8[0].address.description}
            name="eventstemplate8[0].address.description"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="text-[#4B7264] font-aleo text-sm"
            styleThemes={{
            color: "#4B7264",
            lineHeight: "1.4"
            }}
        />
        </div>
    <div className="flex flex-col items-center text-center max-w-[300px]">
        {/* Họa tiết trang trí */}
        <img src={hoatietdc1_02} alt="leaf-red" className="mb-[-36px] z-20" />

        {/* Hình nền + Tên sự kiện (Ăn hỏi) */}
        <div className="relative">
            <img src={hoatietbndc1_02} alt="Ăn hỏi" className="w-full" />
            <EditableField
            id="event-title-1"
            initialValue={eventstemplate8[1].title}
            name="eventstemplate8[0].title"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="absolute -top-[40px]  w-full mt-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#854739] font-chamon text-[40px] font-medium"
            styleThemes={{
                color: "#854739",
                lineHeight: "2"
            }}
            />
        </div>

        {/* Thời gian diễn ra sự kiện */}
        <EditableField
            id="event-datetime-1"
            initialValue={eventstemplate8[1].dateTime}
            name="eventstemplate8[0].dateTime"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="text-[#4B7264] mt-5 font-aleo text-bold text-[22px]"
            styleThemes={{
            color: "#4B7264",
            lineHeight: "1.4"
            }}
        />

        {/* Địa chỉ */}
        <EditableField
            id="event-address-1"
            initialValue={eventstemplate8[1].address.description}
            name="eventstemplate8[0].address.description"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="text-[#4B7264] font-aleo text-sm"
            styleThemes={{
            color: "#4B7264",
            lineHeight: "1.4"
            }}
        />
        </div>
     <div className="flex flex-col items-center text-center max-w-[300px]">
        {/* Họa tiết trang trí */}
        <img src={hoatietdc1_03} alt="leaf-red" className="mb-[-50px] z-20" />

        {/* Hình nền + Tên sự kiện (Ăn hỏi) */}
        <div className="relative">
            <img src={hoatietbndc1_03} alt="Ăn hỏi" className="w-full" />
            <EditableField
            id="event-title-1"
            initialValue={eventstemplate8[2].title}
            name="eventstemplate8[2].title"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="absolute -top-[40px]  w-full  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#854739] font-chamon text-[40px] font-medium"
            styleThemes={{
                color: "#854739",
                lineHeight: "2"
            }}
            />
        </div>

        {/* Thời gian diễn ra sự kiện */}
        <EditableField
            id="event-datetime-1"
            initialValue={eventstemplate8[2].dateTime}
            name="eventstemplate8[0].dateTime"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="text-[#4B7264] mt-5 font-aleo text-bold text-[22px]"
            styleThemes={{
            color: "#4B7264",
            lineHeight: "1.4"
            }}
        />

        {/* Địa chỉ */}
        <EditableField
            id="event-address-1"
            initialValue={eventstemplate8[2].address.description}
            name="eventstemplate8[0].address.description"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="text-[#4B7264] font-aleo text-sm"
            styleThemes={{
            color: "#4B7264",
            lineHeight: "1.4"
            }}
        />
        </div>

     
    </div>
  </div>
</section>

        </>
    )
}

export default EventsSection