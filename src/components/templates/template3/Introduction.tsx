import React from 'react';
import { availableColorsCodien } from '../../../config';
import GroomImage from '../../../assets/images/templates/codien/GroomImageright.jpg'; 
import BrideImage from '../../../assets/images/templates/codien/BrideImageleft.jpg';

import GroomDeco1 from '../../../assets/images/templates/codien/introDecoGroom1.png';
import BrideDeco1 from '../../../assets/images/templates/codien/introDecoBride1.png';

import GroomDeco2 from '../../../assets/images/templates/codien/introDecoGroom2.png';
import BrideDeco2 from '../../../assets/images/templates/codien/introDecoBride2.png';

import GroomDeco3 from '../../../assets/images/templates/codien/introDecoGroom3.png';
import BrideDeco3 from '../../../assets/images/templates/codien/introDecoBride3.png';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';
import EditableField from '../../common/EditableField';


export interface IntroductionProps{
    nameGroom: string;
    nameBride: string;
    imageBride?: File | string;
    imageGroom?: File | string;
    contentBride: string;
    contentGroom: string;
}

interface IntroductionSectionProps extends IntroductionProps{
    id: string;
    style: number;
    titleFont: string;
    contentFont: string;
    disabled?: boolean;
    code:string;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

const Introduction: React.FC<IntroductionSectionProps> = ({ 
    id,
    nameBride,
    nameGroom,
    contentBride,
    contentGroom,
    imageBride, 
    imageGroom,
    style,
    titleFont,
    contentFont,
    // code,
    disabled = false, 
    onSectionChange
}) => {
    const groomDecos: string[] = [GroomDeco1, GroomDeco2, GroomDeco3];
    const brideDecos: string[] = [BrideDeco1, BrideDeco2, BrideDeco3];

    return (
        <section  
            className={`relative bg-white`}    
        >   
            <section className="max-w-9xl mx-auto px-[15px] md:px-[85px] md:py-[50px] pt-[100px] relative font-beVietnamPro space-y-[56px] md:space-y-[100px]" style={{ color: availableColorsCodien[style][0] }}> 
                <div className='w-full grid md:grid-cols-[1fr,2.5fr]' >
                    <div className='relative  md:w-[512px] h-[421px] md:h-[625px] '>
                        <RichImageEditor 
                            id={`introduction-imageGroom`} 
                            name='imageGroom'
                            alt="Wedding couple" 
                            onChange={onSectionChange}
                            src={imageGroom ? `${API_BASE_URL}${imageGroom}` : GroomImage} 
                            classNameImage='!p-0'
                            className='absolute w-full h-full object-cover object-to'
                            disabled={disabled} 
                        />  
                    </div>
                    <div className='w-full md:my-[55px] md:py-[55px] md:pr-[107px] md:pl-[138px] px-[15px] py-8' style={{ background: availableColorsCodien[style][2] }}>
                        <div className='space-y-8'>
                            <img src={groomDecos[style]}/>
                            <div className='space-y-2'>
                                <p className='uppercase text-base'>Chú rể</p>
                                <EditableField 
                                    id={`introduction-nameGroom-${id}`}
                                    initialValue={nameGroom} 
                                    name='nameGroom' 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange}
                                    className='text-[40px] md:text-[48px] font-playfairDisplay'
                                    styleThemes={{ fontFamily: titleFont || "Trirong"}}
                                />    
                            </div>
                            <div className='h-[1px] w-full' style={{ background: availableColorsCodien[style][0] }}></div>
                            <EditableField 
                                id={`introduction-contentGroom-${id}`}
                                initialValue={contentGroom} 
                                name='contentGroom' 
                                disabled={disabled} 
                                onChangeBlur={onSectionChange}
                                className='text-dark-100 text-base'
                                styleThemes={{ fontFamily: contentFont || "Trirong"}}
                            />    
                        </div>
                    </div>
                </div>

                <div className='w-full grid md:grid-cols-[2.5fr,1fr]' >
                     <div className="relative md:hidden  md:w-[512px] h-[421px] md:h-[625px]">
                        <RichImageEditor 
                            id={`introduction-imageBride`} 
                            name='imageBride'
                            alt="Wedding couple" 
                            onChange={onSectionChange}
                            classNameImage='!p-0'
                            src={imageBride ? `${API_BASE_URL}${imageBride}` : BrideImage} 
                            className='absolute w-full h-full object-cover object-top'
                            disabled={disabled} 
                        />  
                    </div>
                    <div className='w-full md:my-[55px] md:py-[55px] md:pr-[107px] md:pl-[138px] px-[15px] py-8' style={{ background: availableColorsCodien[style][2] }}>
                      
                        <div className='space-y-8'>
                            <img src={brideDecos[style]}/>
                            <div className='space-y-2'>
                                <p className='uppercase text-base'>Cô dâu</p>
                                <EditableField 
                                    id={`introduction-nameBride-${id}`}
                                    initialValue={nameBride} 
                                    name='nameBride' 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange}
                                    className='text-[40px] md:text-[48px] font-playfairDisplay'
                                    styleThemes={{ fontFamily: titleFont || "Trirong"}}
                                />   
                            </div>
                            <div className='h-[1px] w-full' style={{ background: availableColorsCodien[style][0] }}></div>
                            <EditableField 
                                id={`introduction-contentBride-${id}`}
                                initialValue={contentBride} 
                                name='contentBride' 
                                disabled={disabled}  
                                onChangeBlur={onSectionChange}
                                className='text-dark-100 text-base'
                                styleThemes={{ fontFamily: contentFont || "Trirong"}}
                            />   
                        </div>
                    </div>
                    
                    <div className="relative hidden md:block md:w-[512px] h-[421px] md:h-[625px]">
                        <RichImageEditor 
                            id={`introduction-imageBride`} 
                            name='imageBride'
                            alt="Wedding couple" 
                            onChange={onSectionChange}
                            classNameImage='!p-0'
                            src={imageBride ? `${API_BASE_URL}${imageBride}` : BrideImage} 
                            className='absolute w-full h-full object-cover object-top'
                            disabled={disabled} 
                        />  
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Introduction