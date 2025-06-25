import React, { useEffect, useState } from 'react';
import Picture1 from '../../../assets/images/templates/sangtrong/timeline.jpg';  
import Each from '../../../layouts/Each'; 
import ComponentToolbar from '../../common/ComponentToolbar';
import { useConfirmModal } from '../../../hooks/modals';
import FormField from '../../common/FormField';
import Button from '../../common/Button';
import { formatDateLocal } from '../../../utils';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';
import { availableColorsCodien } from '../../../config';
import TimelinesDeco1 from '../../../assets/images/templates/codien/timelinesDeco1.png';
import TimelinesDeco2 from '../../../assets/images/templates/codien/timelinesDeco2.png';
import TimelinesDeco3 from '../../../assets/images/templates/codien/timelinesDeco3.png';

import TimelineDeco1 from '../../../assets/images/templates/codien/timlineDeco1.png';
import TimelineDeco2 from '../../../assets/images/templates/codien/timlineDeco2.png';
import TimelineDeco3 from '../../../assets/images/templates/codien/timlineDeco3.png';

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
    style: number;
    contentFont: string;
    onSectionChange:  (name: string, newValue: TimelineProps | TimelineProps[], subField?: string, i?: number) => void;
}


const TimelineSection: React.FC<TimeLineSectionProps> = ({ id, elements, titleFont, contentFont, disabled, style, onSectionChange }) => {
    const [currentSection, setCurrentSection] = useState<number>(-1); 
    const [data, setData] = useState<TimelineProps[]>([]); 
    const [isEdit, setIsEdit] = useState<TimelineProps | null>(null); 
    const { onOpen } = useConfirmModal();
    const timelinesDecos: string[] = [TimelinesDeco1, TimelinesDeco2, TimelinesDeco3];
    const timelineDecos: string[] = [TimelineDeco1, TimelineDeco2, TimelineDeco3];
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
        <section className='relative w-full bg-white py-[150px]'>
            <section className='max-w-9xl mx-auto flex flex-col justify-center items-center font-beVietnamPro px-[15px]'> 
                <div className='space-y-8 pb-14 flex flex-col justify-center items-center'>
                    <img src={timelinesDecos[style]} className=' md:h-[102px]'/>
                    <p className='text-[48px] uppercase' style={{ color: availableColorsCodien[style][0] }}>Cột mốc</p>
                </div>
                <div className='relative flex flex-col justify-center items-end md:items-center gap-[64px] md:gap-[161px] w-full'>                
                    <div className='w-[1px] h-full absolute top-4 left-3 md:left-[51%]' style={{ backgroundColor: availableColorsCodien[style][1] }}></div> 
                    {/* <Each 
                        of={data}
                        render={(item: TimelineProps, index: number) => (
                            <div className={`max-w-full border border-transparent ${ !disabled && "hover:border-[#855515]" }  md:relative w-full font-beVietnamPro flex flex-col justify-center items-center`} onClick={(e) => handleTimelineClick(e, index)}>
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
                                <div className='absolute left-0 md:left-1/2 top-2 w-[25px] h-[25px] rounded-full' style={{ backgroundColor: availableColorsCodien[style][1] }}></div>
                                <div className={`max-w-[253px] w-[253px] md:w-full md:px-[193px] flex flex-col ${index %2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} justify-center items-center relative gap-[60px]`}> 
                                    <div className="w-[253px] md:min-w-[483px] h-[213px] md:h-[375px] overflow-hidden">
                                        <div className={`flex items-center w-full ${index%2 === 0 ? "justify-end" : "justify-start"}  pb-[26px]`}>
                                            <h1 className='text-[24px] uppercase  ' style={{ color: availableColorsCodien[style][1] }}>{formatDateLocal(item.date)}</h1> 
                                        </div>
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
                                    <div className="md:col-start-14 md:col-end-24 row-start-1 md:py-9 md:ps-8 relative md:inline-block md:min-w-[512px] w-full z-10">
                                        <div className='flex justify-start items-center gap-4'>
                                            <h3 className='border-y-[1px] text-lg md:text-[32px] font-playfairDisplay break-words text-start py-4' style={{borderColor: availableColorsCodien[style][0], color: availableColorsCodien[style][0], fontFamily: titleFont }}>{item.title}</h3>
                                            <img src={timelineDecos[style]} alt='icon deco' className='w-[48px] h-[56px] md:w-[87px] md:h-[100px] mb-[15px]'/>
                                        </div> 
                                        <p className='text-base font-openSans text-start pt-6 text-dark-100' style={{ fontFamily: contentFont }}>{item.content}</p>
                                    </div> 
                                </div>
                            </div>
                        )}
                    /> */}
                    <Each 
                        of={data}
                        render={(item: TimelineProps, index: number) => (
                            <div 
                            className={`group relative max-w-full border border-transparent 
                                ${!disabled ? "hover:border-[#855515]" : ""} 
                                w-full font-beVietnamPro flex flex-col justify-center items-center`} 
                            onClick={(e) => handleTimelineClick(e, index)}
                            >
                            {/* Toolbar hiện khi đang chọn */}
                            {currentSection === index && !disabled && (
                                <div className="absolute -top-[160px] left-0 w-full h-full flex justify-center items-center font-sans z-20">
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
                            )}

                            {/* Dấu chấm tròn */}
                            <div className="absolute left-0 md:left-1/2 top-2 w-[25px] h-[25px] rounded-full z-10" 
                                style={{ backgroundColor: availableColorsCodien[style][1] }} 
                            />

                            {/* Nội dung */}
                            <div className={`max-w-[253px] w-[253px] md:w-full md:px-[193px] flex flex-col 
                                ${index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} 
                                justify-center items-center relative gap-[60px]`}
                            > 
                                {/* Hình ảnh và ngày */}
                                <div className="w-[253px] md:min-w-[483px] h-[213px] md:h-[375px] overflow-hidden">
                                <div className={`flex items-center w-full ${index % 2 === 0 ? "justify-end" : "justify-start"} pb-[26px]`}>
                                    <h1 className="text-[24px] uppercase" style={{ color: availableColorsCodien[style][1] }}>
                                    {formatDateLocal(item.date)}
                                    </h1>
                                </div>
                                {typeof item.image === 'string' && item.image.length > 0 ? (
                                    <img src={`${API_BASE_URL}/${item.image}`} alt="image" className="w-full h-full object-cover" />
                                ) : typeof item.image === 'object' && item.image !== null ? (
                                    <img src={URL.createObjectURL(item.image)} className="w-full h-full object-cover" alt="uploaded" />
                                ) : (
                                    <img src={Picture1} className="w-full h-full object-cover" alt="default" />
                                )}
                                </div>

                                {/* Tiêu đề và nội dung */}
                                <div className="md:col-start-14 md:col-end-24 row-start-1 md:py-9 md:ps-8 relative md:inline-block md:min-w-[512px] w-full z-10">
                                <div className="flex justify-start items-center gap-4">
                                    <h3 
                                    className="border-y-[1px] text-lg md:text-[32px] font-playfairDisplay break-words text-start py-4" 
                                    style={{ 
                                        borderColor: availableColorsCodien[style][0], 
                                        color: availableColorsCodien[style][0], 
                                        fontFamily: titleFont 
                                    }}
                                    >
                                    {item.title}
                                    </h3>
                                    <img 
                                    src={timelineDecos[style]} 
                                    alt="icon deco" 
                                    className="w-[48px] h-[56px] md:w-[87px] md:h-[100px] mb-[15px]" 
                                    />
                                </div>
                                <p 
                                    className="text-base font-openSans text-start pt-6 text-dark-100" 
                                    style={{ fontFamily: contentFont }}
                                >
                                    {item.content}
                                </p>
                                </div>
                            </div>
                            </div>
                        )}
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