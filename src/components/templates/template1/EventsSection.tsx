import React, { useEffect, useState } from 'react';
import EmptyImage from '../../../assets/images/templates/template1/empty.png';
import { FaClock } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import Each from '../../../layouts/Each';
import EventBg from '../../../assets/images/templates/template1/eventBg.webp';
import LocationSearch, { SuggestionLocation } from '../../common/LocationSearch';
import EditableField from '../../common/EditableField';
import ComponentToolbar from '../../common/ComponentToolbar';
import { useConfirmModal } from '../../../hooks/modals';
import FormField from '../../common/FormField';
import Button from '../../common/Button';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

export interface EventProps{ 
    id: number;
    number: string;
    image?: string | File;
    title: string;
    address: SuggestionLocation;
    dateTime: string;
    link: string;
}

interface EventSectionProps{
    id: string;
    titleFont: string;
    contentFont: string;
    events: EventProps[];
    Titlevents?: string;
    description: string; 
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File | EventProps | EventProps[], subField?: string, i?: number) => void;
}

const Event: React.FC<{eventData: EventProps}>  = ({eventData}) => { 
    return (
        <div className='w-full bg-white p-[35px] mt-10 mb-[35px]'>
            <div className='relative  group'>
                <div className='grid grid-cols-[2fr,5fr] gap-4 py-8 px-4 justify-center items-center group-hover:pb-40 md:group-hover:pb-32 transition-all duration-500'>
                    { typeof eventData.image === 'string' && eventData.image.length > 0 ? (
                        <img src={`${API_BASE_URL}/${eventData.image}`} alt="image" className='w-[100px] h-[100px]' />
                        ): 
                        typeof eventData.image === 'object' && eventData.image !== null ? (
                            <img className='w-[100px] h-[100px]'src={URL.createObjectURL(eventData.image)} alt="" />
                        ) : (
                            <img className='w-[100px] h-[100px]'src={EmptyImage} alt="" />
                        )
                    } 
                    <div className='text-[#ee8584] text-start'>
                        <h1 className='text-[26pt] font-marmelad'>{eventData.title}</h1>
                        <p className='flex items-center gap-2 my-2'>
                            <FaClock />
                            <span>{eventData.dateTime}</span>
                        </p>
                        <p className='flex items-start gap-2 my-2'>
                            <FaLocationPin/> 
                            <span>{eventData.address.description}</span>
                        </p> 
                    </div>
                    {/* <div className='group-hover:opacity-100 absolute bottom-0 opacity-0 flex justify-center items-center pb-10 transition-all duration-300 z-20'>
                        <ButtonTemplate variant='secondary' borderColor='#ee8584'>Thêm vào lịch</ButtonTemplate>
                    </div> */}
                </div>
                <div className='border-[1px] absolute top-2 left-0 w-[100%] h-[93%] border-[#ee8584]'></div>
                <div className='border-[1px] absolute top-0 left-2 w-[94%] md:w-[97%] h-[100%] border-[#ee8584]'></div>
            </div>
        </div>
    )
}

const EventsSection: React.FC<EventSectionProps> = ({
    id,
    events,
    Titlevents,
    description,
    disabled,
    titleFont,
    contentFont,
    onSectionChange,
}) => {
    const [currentSection, setCurrentSection] = useState<number>(-1);
    const [data, setData] = useState<EventProps[]>([]); 
    const [isEdit, setIsEdit] = useState<EventProps | null>(null);  
    
    const { onOpen } = useConfirmModal();
    const handleCopy = (index: number): void => {
        const newSection: EventProps = { ...data[index]};  
        const oldEvents = [...data];
        const newEvents = [...oldEvents.slice(0, index + 1), newSection, ...oldEvents.slice(index + 1)];
        setData(newEvents);
        onSectionChange("events", newEvents);
    };
    const handleMoveUp = (index: number): void => {
        if (index === 0) return;
        const oldEvents = [...data];
        [oldEvents[index - 1], oldEvents[index]] = [oldEvents[index], oldEvents[index - 1]]; 
        setData(oldEvents);
        onSectionChange("events", oldEvents);
    };

    const handleMoveDown = (index: number): void => {
        if (index === data.length - 1) return;
        const oldEvents = [...data];
        [oldEvents[index], oldEvents[index + 1]] = [oldEvents[index + 1], oldEvents[index]];
        setData(oldEvents);
        onSectionChange("events", oldEvents);
    };

    const handleDelete = (index: number): void => {
        const oldEvents = [...data];
        const newEvents = oldEvents.filter((_, i) => i !== index);
        setData(newEvents);
        onSectionChange("events", newEvents);
    };

    // const handleSave = () =>{
    //     if(isEdit !== null){
    //         const update: EventProps = { ...isEdit };
    //         console.log(update);
    //         const oldEvents = [...data];
    //         if(currentSection > -1){
    //             oldEvents[currentSection] = update;
    //             setData(oldEvents);
    //             onSectionChange("events", update, undefined, currentSection);
    //         }
    //         setIsEdit(null);
    //     }
    // }
const handleSave = () => {
    if (isEdit !== null) {
        const update: EventProps = { ...isEdit };
        const oldEvents = [...data];

        if (currentSection > -1) {
            oldEvents[currentSection] = update;
            setData(oldEvents);

            // ✅ gửi lại toàn bộ mảng đã cập nhật
            onSectionChange("events", oldEvents); 
        }

        setIsEdit(null);
    }
}
useEffect(() => {
    if (events.length > 0 && data.length === 0) {
        setData(events);
    }
}, [events]);

    // useEffect(() => {
    //     if(events.length > 0){
    //         setData(events);
    //     }
    // }, [])
    return (
        <section style={{ background: `url(${EventBg})`, backgroundRepeat: "no-repeat", backgroundSize:"cover" }} className='object-contain'>
            <section className='max-w-9xl mx-auto grid md:grid-cols-2 py-[70px]'>
                <div className='relative h-full py-[50px] px-4 md:px-[30px] mx-[15px] text-center text-white'>
                    <div className='bg-[#ee8584] opacity-60 absolute top-0 left-0 w-full h-full z-0'></div> 
                    <EditableField 
                        id={`Titlevents`}
                        initialValue={Titlevents}
                        name='Titlevents' 
                        styleThemes={{fontFamily: titleFont}}
                        disabled={disabled}  
                        onChangeBlur={onSectionChange}
                        className='mb-[50px] text-[62pt] font-marmelad text-white z-20'
                    />      
                    <EditableField 
                        id={`events-description-${id}`}
                        initialValue={description} 
                        name='description' 
                        styleThemes={{fontFamily: contentFont}}
                        disabled={disabled}  
                        onChangeBlur={onSectionChange}
                        className='mb-[50px] px-[48px]'
                    />      
                    <Each 
                        of={data}
                        render={(event: EventProps, index: number) => 
                            <div className='relative' onClick={(e) => { e.stopPropagation(); setCurrentSection(index);}}>
                                <Event eventData={event}/>
                                {
                                    currentSection === index && !disabled ? (
                                        <div className="absolute -top-[160px] left-0 w-full h-full flex justify-center items-center font-sans text-[#ee8584]">
                                            <ComponentToolbar 
                                                title="Sửa mốc thời gian"
                                                isMoveUp={index !== 0}
                                                isMoveDown={index !== data.length - 1}
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
                        }
                    />
                </div>
            </section>
            {
                isEdit !== null && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
                    >
                        <div className={`relative w-full max-w-2xl bg-white rounded-lg shadow-lg px-8 py-4 space-y-5`}> 
                            <h2 className="text-xl font-semibold text-gray-800">Sửa sự kiện</h2> 
                            <div className='space-y-5'> 
                                <div className='relative'> 
                                <RichImageEditor 
                                    id={`introduction-image-${id}`} 
                                    name={"_"}
                                    onChange={(_, newValue) => setIsEdit({...isEdit, image: newValue})}
                                    disabled={disabled} 
                                    src={typeof isEdit.image === "string" ? `${API_BASE_URL}/${isEdit.image}` : EmptyImage}  
                                    className='w-full h-[300px] object-contain border-[1px] border-gray-100 rounded-md shadow-md'
                                    alt={`${isEdit.title}`}
                                />   
                                </div>
                                <div className='flex justify-center items-center gap-2'>
                                    <FormField 
                                        placeholder='Nhập tiêu đề' 
                                        value={isEdit.title || ""}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsEdit({...isEdit, title: e.target.value})}
                                    />
                                    <input 
                                        type='datetime-local'  
                                        className='shadow px-4 outline-none py-2 rounded-lg' 
                                        value={isEdit.dateTime || ""}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsEdit({...isEdit, dateTime: e.target.value})} 
                                    />
                                </div>
                                <LocationSearch intialValue={isEdit.address} onChange={(value: SuggestionLocation) => setIsEdit({...isEdit, address: value})} /> 
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
    )
}

export default EventsSection