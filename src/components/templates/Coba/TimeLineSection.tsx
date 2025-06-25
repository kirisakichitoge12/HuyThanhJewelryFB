import React from 'react'
import Picture1 from '../../../assets/images/templates/coba/picture1.png';
import Picture2 from '../../../assets/images/templates/coba/picture2.png';
import Picture3 from '../../../assets/images/templates/coba/picture3.png';  
import StampTimeLine from '../../../assets/images/templates/coba/stampBanner1.png'; 
import Frame1 from '../../../assets/images/templates/coba/frameTimeline1.png';
import Frame2 from '../../../assets/images/templates/coba/frameTimeline2.png';
import Frame3 from '../../../assets/images/templates/coba/frameTimeline3.png'; 
import Each from '../../../layouts/Each';
import { availableColors } from '../../../config';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

interface TimelineProps{
    date: string;
    title: string;
    content: string;
    picture?: File | string; 
}

interface ItemDisplayProps{
    bgDateColor: string;
    textDateColor: string;
    bgColor: string;
    textColor: string;
    contentColor: string;
}

interface TimeLineSectionProps {
    id: string;
    mainTitle: string;
    elements: TimelineProps[];  
    style: number;
    titleFont: string;
    contentFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File, subField?: string, i?: number) => void;
}

const TimelineSection: React.FC<TimeLineSectionProps> = ({
    id,
    mainTitle,
    elements, 
    style, 
    contentFont,
    disabled = false, 
    onSectionChange 
}) => { 
    const image = [Picture1, Picture2, Picture3]; 
    const frames: string[] = [Frame1, Frame2, Frame3];  
    const colors: ItemDisplayProps[] = [
        {
            bgDateColor: "bg-third-coba",
            textDateColor: "text-secondary-coba",
            bgColor: "#345D61",
            textColor: "text-third-coba",
            contentColor: "text-[#EFE7DE]", 
        },{
            bgDateColor: "bg-secondary-coba",
            textDateColor: "text-third-coba",
            bgColor: "#982218",
            textColor: "text-third-coba",
            contentColor: "text-[#EFE7DE]", 
        },{
            bgDateColor: "bg-primary-coba",
            textDateColor: "text-[#EFE7DE]",
            bgColor: "#F9B124",
            textColor: "text-primary-coba",
            contentColor: "text-secondary-coba", 
        }
    ]
    return (
        <section className={`bg-[#F9F6F2] `}>
            <section className='z-10 relative max-w-[1443px] mx-auto font-phudu pt-[49px] pl-[15px] pr-[17px] pb-[42px] lg:pt-[80px] lg:pl-[85px] lg:pr-[83px] lg:pb-[50px] overflow-hidden'>
                <EditableField 
                    id={`${id}-mainTitle`}
                    initialValue={mainTitle}  
                    disabled={disabled} 
                    onChangeBlur={onSectionChange}
                    name='mainTitle'  
                    styleThemes={{ textShadow:  "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white", color: availableColors[style][4]}}
                    className="max-h-[60px] md:max-h-[70px] max-w-80 bg-transparent text-title-coba-mobile md:text-tilte-coba text-3d drop-shadow-3d tracking-wide uppercase"
                />   
                <div className='flex flex-col justify-center items-center lg:items-start md:gap-[131px]'>
                    <Each 
                        of={elements}
                        render={(item: TimelineProps, index: number) =>
                            <div className='relative'>
                                {/* Timeline */}
                                <div className={` 
                                        ${index % 2 === 0 ? "relative rotate-[-6.64deg] translate-x-5 md:translate-x-0 lg:translate-y-20" : "absolute right-5 lg:-right-14 -top-7  rotate-[6.64deg]"}
                                        z-10 max-w-[220px] md:max-w-[315px] text-end shadow-3d w-fit md:pl-[18px] md:pr-[28px] md:pt-[15px] md:pb-[20px] max-h-12 md:max-h-20
                                    `}
                                    style={{ color: availableColors[style][3], backgroundColor: availableColors[style][0] }}
                                >
                                    <h2  className='absolute -top-2 left-5 text-[40px] leading-[54.4px] md:text-[60px] md:leading-[81.6px] font-birthstone rotate-[-7.04deg]'>Ngày</h2>  
                                    <EditableField 
                                        id={`${id}-date-${index}`}
                                        initialValue={item.date} 
                                        name='elements' 
                                        subField='date'
                                        disabled={disabled} 
                                        index={index} 
                                        onChangeBlur={onSectionChange}
                                        className='text-2xl md:text-[34px] leading-[41.65px] font-bold bg-transparent pl-24 md:pl-28 w-full '     
                                    />   
                                </div>

                                <div className={`
                                    flex justify-center items-center -translate-y-8 z-10 flex-col-reverse full:translate-x-[108px]
                                    ${index % 2 ? "lg:flex-row-reverse" : "lg:flex-row"}
                                `}>
                                    <div className={` 
                                        ${colors[index].bgColor}
                                        ${index % 2 === 0 ? "lg:pl-[111px] lg:pr-[230px]" : "lg:pl-[181px] lg:pr-[160px] full:-translate-x-[20%]"}
                                        max-w-[801px] min-w-[400px] lg:min-w-[801px] lg:max-h-[415px] pl-[25px] pr-[23px] pb-[18px] pt-[178px] lg:pt-[151px] lg:pb-[80px] space-y-[22px] lg:translate-y-0 -translate-y-40
                                    `}
                                        style={{ backgroundImage: `url(${frames[style]})` }}
                                    >
                                        <EditableField 
                                            id={`${id}-title-${index}`}
                                            initialValue={item.title} 
                                            name='elements'
                                            subField='title' 
                                            disabled={disabled} 
                                            index={index} 
                                            onChangeBlur={onSectionChange}
                                            className={`${colors[index].textColor} text-2xl md:text-content-coba uppercase font-bold bg-transparent max-h-10 md:max-h-12`}
                                            styleThemes={{ color: availableColors[style][0]}} 
                                        />   
                                        <EditableField 
                                            id={`${id}-content-${index}`}
                                            initialValue={item.content} 
                                            name='elements'  
                                            index={index}
                                            subField='content'
                                            disabled={disabled}
                                            onChangeBlur={onSectionChange}
                                            className={`text-white-default text-base font-trirong bg-transparent w-full overflow-hidden resize-none h-auto min-h-[100px]`}
                                            styleThemes={{ fontFamily: contentFont }}
                                        />       
                                        <div className='bg-white w-[295px] h-[2px]'></div>
                                    </div>
                                    <div className={`max-w-[390px] z-10 relative`}>
                                        <img src={StampTimeLine} className={`w-full ${ index % 2 === 0 ? "full:-translate-x-[25%] rotate-[4.16deg]" : "rotate-[-4.16deg]" }`}/>
                                        <RichImageEditor 
                                            id={`picture-${id}-${index}`}
                                            name="elements"
                                            index={index}
                                            subField="picture"
                                            alt="Wedding couple" 
                                            src={item.picture? `${API_BASE_URL}/${item.picture}` : image[index]} 
                                            disabled={disabled}
                                            onChange={onSectionChange}
                                            classNameImage={`${ index % 2 === 0 ? "rotate-[4.16deg]" : "rotate-[-4.16deg]" } `}
                                            className={`absolute top-[4%] left-[6%] w-[90%] h-[92%] object-cover ${ index % 2 === 0 ? "full:-translate-x-[30%]" : "" } `}  
                                        />  
                                    </div>
                                </div> 
                            </div>
                        }
                    /> 
                </div>
            </section>
        </section>
    )
}

export default TimelineSection