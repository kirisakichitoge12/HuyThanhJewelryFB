import React, { useState } from 'react';
import GroomImage from '../../../assets/images/templates/template1/groom.webp';
import BrideImage from '../../../assets/images/templates/template1/bride.webp';
import IconHeart from '../../../assets/images/templates/template1/iconHeart.png';
import EditableField from '../../common/EditableField';
import { FaTimes } from 'react-icons/fa';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

interface IntroductionProps{
    imageBride?: File | string;
    imageGroom?: File | string;
    contentBride: string;
    contentGroom: string;
    nameGroom: string;
    nameBride: string; 
    fatherGroom: string;
    motherGroom: string;
    fatherBride: string;
    motherBride: string;
    title: string;
    description: string;
}
interface IntroductionSectionProps extends IntroductionProps{
    id: string; 
    disabled?: boolean;
    titleFont?: string;
    contentFont?: string;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

interface InvitationModal {
    type: "contentBride" | "contentGroom";
    image: string | File;
    content: string;
    name: string;
}

const Introduction:React.FC<IntroductionSectionProps> = ({id, disabled, onSectionChange, ...props}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dataDisplay, setDataDisplay] = useState<InvitationModal | null>(null);
    const [imageGroom, setImageGroom] = useState<File | null>(null);
    const [imageBride, setImageBride] = useState<File | null>(null);
    const handleClose = () => {
        setIsOpen(false);
        setDataDisplay(null);
    }
    const handleOpen = (data: InvitationModal) => {
        setIsOpen(true);
        setDataDisplay(data);
    }
    const handleUploadImage  = (newImage: string | File) => {
        if(newImage) {
            if(dataDisplay?.type === "contentGroom") {
                setImageGroom(newImage as File);
            }
            if(dataDisplay?.type === "contentBride") {
                setImageBride(newImage as File);
            }


            
        }
    }
    return (
        <section className='relative bg-white' onClick={(e) => e.stopPropagation()}>
            <section className='py-[70px] md:-mt-[210px] flex flex-col justify-center items-center relative max-w-9xl mx-auto font-marmelad text-[#ee8487] '>
                <div className='relative flex flex-col md:flex-row w-full justify-center items-center'>
                    <div className='aspect-square md:w-[416px] md:h-[416px] mb-10 px-3 group'>
                        <div className='relative bg-white w-full h-full'>
                            <img src={imageGroom ? URL.createObjectURL(imageGroom) : typeof props.imageGroom==='string' ? `${API_BASE_URL}/${props.imageGroom}` : GroomImage} alt="GroomImage" className='w-full h-full object-top object-cover p-5 group-hover:opacity-10 transition-all duration-500'/>
                            <div className='absolute top-2 left-2 border-9 h-full w-full'> 
                                <span className={`absolute top-2 left-[15px] w-[88%] h-[90%] border-y-[1px] border-[#ee8487] scale-x-0 group-hover:scale-x-100  origin-center transition-transform duration-500 ease-in-out `}></span>
                                <span className={`absolute top-[15px] left-2 w-[92%] h-[86%] border-x-[1px] border-[#ee8487] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500 ease-in-out`}></span>
                                <span className={`absolute top-2 left-[15px] w-[88%] h-[90%] border-x-[1px] border-[#ee8487] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500 ease-in-out`}></span>
                                <span className={`absolute top-[15px] left-2 w-[92%] h-[86%] border-y-[1px] border-[#ee8487] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-in-out`}></span>
                                <div className='flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 w-full h-full px-14'>
                                    <h1 className='text-[30pt] font-medium mb-5' style={{ fontFamily: props.titleFont}}><span dangerouslySetInnerHTML={{ __html: props.nameGroom }} /></h1>
                                    <h3 className='text-[12pt] uppercase font-openSans mb-[33px]'>The Groom</h3>
                                    <p className='text-base mb-5 text-[#73777b] line-clamp-3 text-center' style={{ fontFamily: props.contentFont}}>{props.contentGroom}</p>
                                    <button 
                                        className='z-10' 
                                        onClick={() => handleOpen({type: "contentGroom", image: imageGroom ? URL.createObjectURL(imageGroom) : typeof props.imageGroom==='string' ? `${API_BASE_URL}/${props.imageGroom}` : GroomImage, content: props.contentGroom, name: props.nameGroom})}
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='aspect-square max-w-full md:w-[416px] md:md:h-[416px] mb-10 px-3 group'>
                        <div className='relative bg-white w-full h-full'>
                            <img src={imageBride ? URL.createObjectURL(imageBride) : typeof props.imageBride==='string' ? `${API_BASE_URL}/${props.imageBride}` : BrideImage} alt="BrideImage" className='w-full h-full object-top object-cover p-5 group-hover:opacity-10 transition-all duration-500'/>
                            <div className='absolute top-2 left-2 border-9 h-full w-full'> 
                                <span className={`absolute top-2 left-[15px] w-[88%] h-[90%] border-y-[1px] border-[#ee8487] scale-x-0 group-hover:scale-x-100  origin-center transition-transform duration-500 ease-in-out `}></span>
                                <span className={`absolute top-[15px] left-2 w-[92%] h-[86%] border-x-[1px] border-[#ee8487] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500 ease-in-out`}></span>
                                <span className={`absolute top-2 left-[15px] w-[88%] h-[90%] border-x-[1px] border-[#ee8487] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500 ease-in-out`}></span>
                                <span className={`absolute top-[15px] left-2 w-[92%] h-[86%] border-y-[1px] border-[#ee8487] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-500 ease-in-out`}></span>
                                <div className='flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-500 w-full h-full px-14'>
                                    <h1 className='text-[30pt] font-medium mb-5' style={{ fontFamily: props.titleFont}}>  <span dangerouslySetInnerHTML={{ __html: props.nameBride }} /></h1>
                                    <h3 className='text-[12pt] uppercase font-openSans mb-[33px]'>The Bride</h3>
                                    <p className='text-base mb-5 text-[#73777b] line-clamp-3 text-center' style={{ fontFamily: props.contentFont}}>{props.contentBride}</p>
                                    <button 
                                        className='z-10'
                                        onClick={() => handleOpen({type: "contentBride", image: imageBride ? URL.createObjectURL(imageBride) : typeof props.imageBride==='string' ? `${API_BASE_URL}/${props.imageBride}` : BrideImage, content: props.contentBride, name: props.nameBride})}
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className='absolute bottom-5 p-3 bg-white rounded-full'>
                        <img src={IconHeart} alt='heart icon'/>
                    </div> 
                </div>

                <div className='text-center space-y-5 text-gray-400 mx-4'>
                    <EditableField 
                        initialValue={props.title} 
                        name='title'
                        id={`introduction-title-${id}`} 
                        disabled={disabled}  
                        onChangeBlur={onSectionChange} 
                        styleThemes={{ fontFamily: props.titleFont}}
                        className='text-[40px] font-bold text-[#ee8487]' 
                    />    
                    <EditableField 
                        initialValue={props.description} 
                        name='description'
                        id={`introduction-description-${id}`} 
                        disabled={disabled}  
                        onChangeBlur={onSectionChange} 
                        styleThemes={{ fontFamily: props.contentFont}}
                        className='text-base font-openSans max-w-[856px]' 
                    /> 
                    <h3 
                            className='font-birthstone text-5xl' 
                            style={{ fontFamily: props.titleFont }}
                            >
                                <span dangerouslySetInnerHTML={{ __html: props.nameGroom }} />
                                &nbsp;&
                                <span dangerouslySetInnerHTML={{ __html: props.nameBride }} />
                            </h3>

                </div>
            </section>
            {
                isOpen && dataDisplay && typeof dataDisplay.image === "string" && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className={`max-h-[95vh] mb-4 relative max-w-2xl bg-white rounded-lg shadow-lg p-4 space-y-4 text-center m-4`}>
                            <button onClick={handleClose} className='absolute -top-2 -right-2 bg-white p-2 rounded-full'><FaTimes/></button>
                            <div className='relative'>   
                            <RichImageEditor 
                                id={`introduction-image-${id}`} 
                                name={ dataDisplay.type === "contentGroom" ? "imageGroom" : "imageBride"}
                                onChange={(name, newValue) => {
                                    onSectionChange(name, newValue)
                                    handleUploadImage(newValue);
                                }}
                                disabled={disabled} 
                                src={dataDisplay.image} 
                                classNameImage='w-full h-[300px] object-contain object-top' 
                                className='h-[300px]'
                                alt={`${dataDisplay.content}`}
                            />  
                            </div>
                            <EditableField 
                                id={`introduction-name-${dataDisplay.type}-${id}`}
                                initialValue={dataDisplay.name} 
                                name={dataDisplay.type === "contentGroom" ? "nameGroom" : "nameBride"}  
                                onChangeBlur={onSectionChange}
                                className="text-3xl font-bold text-[#ee8487]"
                                styleThemes={{ fontFamily: props.titleFont}}
                                disabled={disabled}
                            />    
                            
                            <EditableField 
                                id={`introduction-${dataDisplay.type}-${id}`}
                                disabled={disabled}
                                initialValue={dataDisplay.content} 
                                name={dataDisplay.type === "contentGroom" ? "contentGroom" : "contentBride"}  
                                onChangeBlur={onSectionChange}
                                className="text-base  text-[#73777b] line-clamp-3 text-center max-w-md mx-auto"
                                styleThemes={{ fontFamily: props.contentFont}}
                            /> 
                          
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default Introduction