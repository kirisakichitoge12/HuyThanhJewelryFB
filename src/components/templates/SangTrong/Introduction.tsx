import React from 'react'
import { availableColorsTemplate2 } from '../../../config'
import GroomImage from '../../../assets/images/templates/sangtrong/introGroom.png';
import BridgeImage from '../../../assets/images/templates/sangtrong/introBride.png';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

import DecoLeft1 from '../../../assets/images/templates/sangtrong/4.png';
import DecoLeft2 from '../../../assets/images/templates/sangtrong/37.png';
import DecoLeft3 from '../../../assets/images/templates/sangtrong/11-removebg-preview.png';

import DecoRight1 from '../../../assets/images/templates/sangtrong/5.png';
import DecoRight2 from '../../../assets/images/templates/sangtrong/38.png';
import DecoRight3 from '../../../assets/images/templates/sangtrong/16.png';

interface Props {
    id: string;
    nameGroom: string;
    nameBridge: string;
    imageGroom?: File;
    imageBridge?: File;
    disabled?: boolean;
    titleFont?: string; 
    style: number;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

const Introduction: React.FC<Props> = ({
    id,
    nameBridge,
    nameGroom,
    imageGroom,
    imageBridge,
    onSectionChange,
    style,  
    disabled,
    titleFont
}) => {
    const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
    const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
    return (
        <section onClick={(e) => e.stopPropagation()} className={`relative   mx-auto`}  style={{ background: availableColorsTemplate2[style][2] }}>
            <div className='absolute left-0 bottom-0 w-full h-[574px]' style={{ background: availableColorsTemplate2[style][2] }}>
                <h1 className='hidden md:block absolute top-1/3 -left-[12%] text-[110px] font-prata rotate-90' style={{ color: availableColorsTemplate2[style][1] }}>GROOM</h1>
            </div>
            <div className='z-0 absolute right-0 bottom-0 w-[488px] h-[574px]' style={{ background: availableColorsTemplate2[style][2] }}>
                <h1 className='hidden md:block absolute top-1/3 -right-[40%] text-[110px] font-prata -rotate-90' style={{ color: availableColorsTemplate2[style][1] }}>BRIDGE</h1>
            </div>
            <div className='z-20 grid md:grid-cols-2 justify-center items-center lg:px-[300px] gap-8 px-[15px] pb-[59px]'>
                <div className='relative text-center mt-4 md:mt-0'>
                    <img src={decoLefts[style]} className='md:block md:w-[206px] md:h-[209px]   w-[150px] h-[150px]  absolute bottom-20 md:-left-20 -left-12'/>
                    <RichImageEditor 
                        id={`introduction-imageGroom-${id}`} 
                        name={"imageGroom"}
                        onChange={onSectionChange}
                        disabled={disabled} 
                        src={imageGroom ? `${API_BASE_URL}/${imageGroom}` : GroomImage}   
                        className='border-[1px] rounded-t-[300px]  md:max-w-[500px]  mx-auto block  w-full max-w-[300px]' 
                        style={{ borderColor: availableColorsTemplate2[style][0],padding:0 }}
                        classNameImage='rounded-t-[300px]'
                        toolbarPosition='top'
                    />  
                    <p className='text-lg md:text-2xl text-dark-200 font-prata mt-8'>Chú rể</p>
                    <EditableField 
                        initialValue={nameGroom} 
                        name='nameGroom'
                        id={`introduction-nameGroom-${id}`} 
                        disabled={disabled}  
                        onChangeBlur={onSectionChange} 
                        styleThemes={{ fontFamily: titleFont, color: availableColorsTemplate2[style][0]}}
                        className='text-[56px] md:text-[72px] mt-3 font-pinyonScript'  
                    />     
                </div>
                <div className='relative text-center'>
                    <img src={decoRights[style]} className='md:block md:w-[206px] md:h-[209px] w-[150px] h-[150px] absolute bottom-20 md:-right-20 -right-12'/>
                    <RichImageEditor 
                        id={`introduction-imageBridge-${id}`} 
                        name={"imageBridge"}
                        onChange={onSectionChange}
                        disabled={disabled} 
                        src={imageBridge ? `${API_BASE_URL}/${imageBridge}` : BridgeImage}   
                        className='border-[1px] rounded-t-[300px] md:mt-0 mt-5 md:max-w-[500px]  mx-auto block  w-full max-w-[300px]' 
                        style={{ borderColor: availableColorsTemplate2[style][0],padding:0 }}
                        classNameImage='rounded-t-[300px]'
                        toolbarPosition='top'
                    />  
                    <p className='text-lg md:text-2xl text-dark-200 font-prata mt-8'>Cô dâu</p>
                    <EditableField 
                        initialValue={nameBridge} 
                        name='nameBridge'
                        id={`introduction-nameBridge-${id}`} 
                        disabled={disabled}  
                        onChangeBlur={onSectionChange} 
                        styleThemes={{ fontFamily: titleFont, color: availableColorsTemplate2[style][0]}}
                        className='text-[56px] md:text-[72px] mt-3 font-pinyonScript'  
                    />     
                </div>
            </div>  

        </section>
    )
}

export default Introduction