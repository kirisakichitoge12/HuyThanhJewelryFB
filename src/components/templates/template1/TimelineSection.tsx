import React, { useEffect, useState } from 'react';
import Picture1 from '../../../assets/images/templates/template1/Picture1.webp'; 
import IconDeco from '../../../assets/images/templates/template1/iconSectionWhite.svg'; 
import FollowerSmall from '../../../assets/images/templates/template1/flower-large.svg';
import IconRing from '../../../assets/images/templates/template1/iconRing.png'; 
import Each from '../../../layouts/Each'; 
import ComponentToolbar from '../../common/ComponentToolbar';
import { useConfirmModal } from '../../../hooks/modals';
import FormField from '../../common/FormField';
import Button from '../../common/Button';
import { formatDateTimeLocal } from '../../../utils';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';
import EditableField from '../../common/EditableField';

export interface TimelineProps{
    date: string;
    title: string;
    content: string;
    image?: string | File; 
   
};

interface TimeLineSectionProps { 
    id: string;
    elements: TimelineProps[];   
    disabled?: boolean;
    titleFont: string;
    contentFont: string;
    heading: string; // Assuming you have a heading prop
    onSectionChangehd:  (name: string, newValue: string | File ) => void;
    onSectionChange:  (name: string, newValue: TimelineProps | TimelineProps[], subField?: string, i?: number) => void;
}


const TimelineSection: React.FC<TimeLineSectionProps> = ({ id, elements, titleFont, contentFont, disabled,heading, onSectionChange,onSectionChangehd }) => {
    const [currentSection, setCurrentSection] = useState<number>(-1); 
    const [data, setData] = useState<TimelineProps[]>([]); 
    const [isEdit, setIsEdit] = useState<TimelineProps | null>(null); 
    const { onOpen } = useConfirmModal();
    
    const handleCopy = (index: number): void => {
        const newSection: TimelineProps = { ...data[index]};  
        const oldTimelines = [...data];
        const newTimelines = [...oldTimelines.slice(0, index + 1), newSection, ...oldTimelines.slice(index + 1)];
        setData(newTimelines);
        onSectionChange("elements", newTimelines);
    };
    const handleMoveUp = (index: number): void => {
        if (index === 0) return;
        const oldTimelines = [...data];
        [oldTimelines[index - 1], oldTimelines[index]] = [oldTimelines[index], oldTimelines[index - 1]]; 
        setData(oldTimelines);
        onSectionChange("elements", oldTimelines);
    };

    const handleMoveDown = (index: number): void => {
        if (index === data.length - 1) return;
        const oldTimelines = [...data];
        [oldTimelines[index], oldTimelines[index + 1]] = [oldTimelines[index + 1], oldTimelines[index]];
        setData(oldTimelines);
        onSectionChange("elements", oldTimelines);
    };

    const handleDelete = (index: number): void => {
        const oldTimelines = [...data];
        const newTimelines = oldTimelines.filter((_, i) => i !== index);
        setData(newTimelines);
        onSectionChange("elements", newTimelines);
    };

    const handleSave = () =>{
        if(isEdit !== null){
            const update: TimelineProps = { ...isEdit };
            console.log(update);
            const oldEvents = [...data];
            if(currentSection > -1){
                oldEvents[currentSection] = update;
                setData(oldEvents);
                onSectionChange("elements", update, undefined, currentSection);
            }
            setIsEdit(null);
        }
    }
    const handleTimelineClick = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentSection(index);
    }
    useEffect(() => { 
        if(elements.length > 0 && Array.isArray(elements)){
            setData(elements); 
        }else{
            setData([]);
        }
    }, []);
    return (
        <section className='relative w-full bg-white py-[70px]'>
            <section className='max-w-9xl mx-auto flex flex-col justify-center items-center text-[#ee8584] font-marmelad'> 
                <Each 
                    of={data}
                    render={(item: TimelineProps, index: number) => (
                        <div className='relative hover:border-[#ee8584] border-[1px] mb-[100px] p-10 md:p-1 border-transparent' onClick={(e) => handleTimelineClick(e, index)}>
                            {
                                currentSection === index && !disabled ? (
                                    <div className="absolute -top-[160px] left-0 w-full h-full flex justify-center items-center font-sans">
                                        <ComponentToolbar 
                                            title="Sửa mốc thời gian"
                                            isMoveUp={index !== 0}
                                            isMoveDown={index !== data.length - 1}
                                            onCopy={() => handleCopy(index)}
                                            onMoveUp={() => handleMoveUp(index)}
                                            onEdit={() => setIsEdit(item)}
                                            onMoveDown={() => handleMoveDown(index)}
                                            onDelete={() => onOpen("", () => handleDelete(index))}
                                        />
                                    </div>
                                ) : null
                            }
                            <div className='bg-blue-200 w-[1px] h-full absolute top-0 left-1/2'></div>
                            <div className='relative md:min-w-[792px] text-center mb-[70px] bg-white'> 
                                <div className='border-[1px] absolute top-2 left-0 w-[100%] h-[88%] md:h-[80%] border-[#ee8584]'></div>
                                <div className='border-[1px] absolute top-0 left-2 w-[96%] md:w-[98%] h-[100%] border-[#ee8584]'></div>
                                <h1 className='text-[27pt] uppercase px-8 py-4'>{formatDateTimeLocal(item.date)}</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center md:grid md:grid-cols-24 relative'>
                                <div className="col-span-18 row-start-1 relative inline-block max-w-full z-10">
                                    <div className="max-w-[500px] max-h-[500px] rounded-full md:rounded-none aspect-square overflow-hidden">
                                        { typeof item.image === 'string' && item.image.length > 0 ? (
                                            <img src={`${API_BASE_URL}/${item.image}`} alt="image" className="w-full h-full object-cover" />
                                            ): 
                                            typeof item.image === 'object' && item.image !== null ? (
                                                <img className='w-full h-full object-cover' src={URL.createObjectURL(item.image)} alt="" />
                                            ) : (
                                                <img className='w-full h-full object-cover' src={Picture1} alt="" />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="md:col-start-14 md:col-end-24 row-start-1 md:mt-[10%] relative md:inline-block w-full z-10">
                                   <div className="relative bg-[#ee8584] text-white w-full h-full border-[10px] border-white p-[30px] max-w-[500px] transition-all duration-1000 md:-translate-x-10 md:hover:translate-x-10">
                                        <div className="border-[1px] absolute top-8 left-6 w-[88%] h-[87%] border-white"></div>
                                        <div className="border-[1px] absolute top-6 left-8 w-[84%] h-[90%] border-white"></div>
                                        <div className="flex flex-col justify-center items-center w-full px-[30px] pt-[30px]">
                                            <h3 className="text-[28px] break-words pb-5 text-center" style={{ fontFamily: titleFont }}>
                                            {item.title}
                                            </h3>
                                            <img src={IconDeco} alt="icon deco" className="mb-[15px]" />
                                            <p
                                            className="text-base font-openSans max-w-[272px] text-center pb-[30px] break-words"
                                            style={{ fontFamily: contentFont, wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                            >
                                            {item.content}
                                            </p>
                                        </div>
                                        </div>
                                </div>
                                <img src={FollowerSmall} className='absolute bottom-0 z-0 max-w-[424px] -rotate-90 -left-48'/>
                                <img src={FollowerSmall} className='absolute top-10 z-0 max-w-[424px] rotate-90 -right-28'/>
                            </div>
                        </div>
                    )}
                />
                <img src={IconRing} alt="ring icon"/>
               <EditableField 
                    id={`storySection-heading`}
                    name='heading'
                    initialValue={heading} // giả sử bạn đã khai báo `heading`
                    className='pb-[60px] text-[18pt] mb-[6px] uppercase'
                    onChangeBlur={onSectionChangehd}
                    disabled={disabled}
                    styleThemes={{ fontFamily: titleFont }}
                />

            </section>
            {
                isEdit !== null && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
                        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
                    >
                        <div className={`relative w-full max-w-2xl bg-white rounded-lg shadow-lg px-8 py-4 space-y-5`}> 
                            <h2 className="text-xl font-semibold text-gray-800">Sửa cột mốc</h2> 
                            <div className='space-y-5'> 
                                <div className='relative'> 
                                <RichImageEditor 
                                    id={`introduction-image-${id}`} 
                                    name={"_"}
                                    onChange={(_, newValue) => setIsEdit({...isEdit, image: newValue})}
                                    disabled={disabled} 
                                    src={typeof isEdit.image === "string" ? `${API_BASE_URL}/${isEdit.image}` : Picture1}  
                                    className='w-full h-[300px] object-contain border-[1px] border-gray-100 rounded-md shadow-md'
                                    alt={`${isEdit.content}`}
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
                                        value={isEdit.date || ""}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsEdit({...isEdit, date: e.target.value})} 
                                    />
                                </div>   
                                <textarea 
                                    className='shadow px-4 outline-none py-2 rounded-lg w-full h-[200px]' 
                                    value={isEdit.content || ""}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setIsEdit({...isEdit, content: e.target.value})}
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
    )
}

export default TimelineSection;