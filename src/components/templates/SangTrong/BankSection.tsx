import React from 'react';
import { availableColorsTemplate2 } from '../../../config';
import DefaultImage from '../../../assets/images/templates/sangtrong/picture2.png';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

import DecoLeft1 from '../../../assets/images/templates/sangtrong/9.png';
import DecoLeft2 from '../../../assets/images/templates/sangtrong/img/02.png';
import DecoLeft3 from '../../../assets/images/templates/sangtrong/29.png';

import DecoRight1 from '../../../assets/images/templates/sangtrong/8.png';
import DecoRight2 from '../../../assets/images/templates/sangtrong/img/01.png';
import DecoRight3 from '../../../assets/images/templates/sangtrong/28.png';

import QR from '../../../assets/images/templates/sangtrong/qr.jpg';

export interface BankProps{
    description: string;
    nameBridge: string;
    bankNumberBridge: string;
    bankNameBridge: string; 
    nameGroom: string;
    bankNumberGroom: string;
    bankNameGroom: string;
    image?: string | File; 
    imageBankGroom?: string | File;
    imageBankBridge?: string | File;
}

interface BankSectionProps extends BankProps{ 
    id: string; 
    titleFont: string;
    contentFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File ) => void;
    style: number;
 
}
const BankSection: React.FC<BankSectionProps> = ({id, titleFont, contentFont, disabled, onSectionChange, style, ...bankProps}) => {
    const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
    const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
    const { imageBankGroom,imageBankBridge  } = bankProps;
    return (
        <div className="w-full relative  bg-[#FBF7F5] md:bg-transparent"  >
            <div style={{ background: "#FBF7F5" }} className='absolute w-screen left-0 top-0 md:h-80'></div>
                <img  src={decoLefts[style]} className='absolute bottom-[35%] -left-2 md:w-[260px] md:h-[305px] w-[100%] h-[133px] hidden md:block'/>
                <img  src={decoRights[style]} className='absolute bottom-[35%] -right-2 md:w-[260px] md:h-[305px] w-[100%] h-[133px] hidden md:block'/> 
            <div className="max-w-9xl mx-auto relative"> 
                    
                {/* Central content */}
                <div className="grid grid-cols-1 md:grid-cols-2 full:grid-cols-3 justify-center items-end pt-[100px]  h-auto md:gap-8">
                    {/* Groom's bank info */}
                    
                    <div className="md:flex flex-col items-center md:items-end text-center md:text-left pb-16 px-[15px] hidden ">
                        <h3 className="z-20 text-xl md:text-2xl font-prata mb-4" style={{ color: availableColorsTemplate2[style][0] }}>Mừng cưới đến chú rể</h3>
                       
                          <div className="w-full flex flex-row  md:flex-row items-start gap-4">
                           
                                <div className="w-full md:w-[60%] flex justify-end items-end">
                                <RichImageEditor 
                                        src={
                                            imageBankGroom
                                            ? typeof imageBankGroom === 'string'
                                                ? `${API_BASE_URL}/${imageBankGroom}`
                                                : URL.createObjectURL(imageBankGroom)
                                            : QR
                                        } 
                                        id={`imageBankGroom-${id}`}
                                        name='imageBankGroom'
                                        alt="image-bank-groom"
                                        onChange={onSectionChange} 
                                        disabled={disabled}
                                        className="w-[100px] h-[100px] object-cover relative  hover:border-primary "
                                        classNameImage="w-full h-full"
                                        style={{ padding: 0}}
                                    >
                                        
                                    </RichImageEditor>
                                </div>
                                <div className="w-full md:w-[40%] flex flex-col items-start md:items-end text-center md:text-left gap-2">
                                <EditableField 
                            initialValue={bankProps.bankNameGroom} 
                            name='bankNameGroom'
                            id={`bankNameGroom-${id}`}
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            className='font-prata'
                        />  
                                <EditableField 
                                    initialValue={bankProps.nameGroom} 
                                    name='nameGroom'
                                    id={`nameGroom-${id}`} 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange} 
                                    className='font-prata'
                                />  
                                <EditableField 
                                    initialValue={bankProps.bankNumberGroom} 
                                    name='bankNumberGroom'
                                    id={`bankNumberGroom-${id}`} 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange} 
                                    className='font-prata'
                                />   
                                </div>
                            </div>
                    </div>
                    {/* Photo frame with circular border */}  
                    <div className="relative  md:w-[402px]  mx-auto pt-[72px] bg-[#FBF7F5] overflow-visible z-10">
                        <div className="relative z-30">
                            <RichImageEditor 
                            src={bankProps.image ? `${API_BASE_URL}/${bankProps.image}` : DefaultImage} 
                            id={`image-${id}`}
                            name='image'
                            alt="image-bank-bridge"
                            onChange={onSectionChange} 
                            disabled={disabled}
                            className="rounded-t-full md:w-[402px] w-[342px] h-[465px] object-cover  hover:border-primary"
                            classNameImage="rounded-t-full w-full h-full"
                            style={{ padding: 0}}
                            >
                            <div 
                                className="absolute inset-0 rounded-t-full border-2 z-20" 
                                style={{ borderColor: availableColorsTemplate2[style][0] }}
                            ></div>
                            </RichImageEditor> 
                        </div>
                    </div>


                    
                    <div style={{ background: "#FBF7F5" }} className='md:hidden block text-center'>
                        <h2 className="text-[56px] md:text-[72px] font-pinyonScript italic " style={{ color: availableColorsTemplate2[style][0] }}>Mừng cưới</h2> 
                        <div className="mt-6 max-w-xl mx-auto text-center text-dark-200">
                            <p>Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nhé ^^. Cảm ơn bạn rất nhiều!</p>
                        </div>
                    </div>
                    {/* Bride's bank info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left py-16">
                        {/* Tiêu đề nằm trên */}
                        <h3
                            className="z-20 text-xl md:text-2xl font-prata mb-4"
                            style={{ color: availableColorsTemplate2[style][0] }}
                        >
                            Mừng cưới đến cô dâu
                        </h3>

                        {/* Nội dung bên trái + ảnh bên phải */}
                        <div className="w-full flex flex-row  md:flex-row items-start gap-4">
                            {/* Trái: Thông tin ngân hàng */}
                            <div className="w-full md:w-[40%] flex flex-col items-end md:items-end text-center md:text-left gap-2">
                            <EditableField 
                                initialValue={bankProps.bankNameBridge} 
                                name='bankNameBridge'
                                id={`bankNameBridge-${id}`} 
                                disabled={disabled} 
                                onChangeBlur={onSectionChange}
                                className='font-prata'
                            />  
                            <EditableField 
                                initialValue={bankProps.nameBridge} 
                                name="nameBridge"
                                id={`nameBridge-${id}`} 
                                disabled={disabled} 
                                onChangeBlur={onSectionChange} 
                                className="font-prata"
                            />   
                            <EditableField 
                                initialValue={bankProps.bankNumberBridge} 
                                name="bankNumberBridge"
                                id={`bankNumberBridge-${id}`} 
                                disabled={disabled} 
                                onChangeBlur={onSectionChange} 
                                className="font-prata"
                            />     
                            </div>

                            {/* Phải: Ảnh */}
                            <div className=" relative w-full md:w-[60%] flex justify-left items-center">
                            <RichImageEditor 
                                src={imageBankBridge ? `${API_BASE_URL}/${imageBankBridge}` : QR} 
                              
                                id={`imageBankBridge-${id}`}
                                name='imageBankBridge'
                                alt="image-bank-bridge"
                                onChange={onSectionChange} 
                                disabled={disabled}
                                className="w-[100px] h-[100px] object-cover hover:border-primary"
                                classNameImage="w-full h-full"
                                style={{ padding: 0}}
                      
                            />
                          
                            </div>
                        </div>
                        </div>


                    {/* Groom's bank info */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-left pb-16 px-[15px] md:hidden">
                        <h3 className="z-20 text-xl md:text-2xl font-prata mb-4" style={{ color: availableColorsTemplate2[style][0] }}>Mừng cưới đến chú rể</h3>
                        <div className="w-full flex flex-row  md:flex-row items-start gap-4">
                           
                                <div className="w-full md:w-[60%] flex justify-end items-end">
                                <RichImageEditor 
                                        src={imageBankGroom ? `${API_BASE_URL}/${imageBankGroom}` : QR} 
                                                                    id={`imageBankGroomMobile-${id}`}
                                                                    alt="image-bank-groom"
                                                                    disabled={disabled}
                                                                    name='imageBankGroom'
                                        onChange={onSectionChange} 
                                        // disabled={disabled}
                                        className="w-[100px] h-[100px] object-cover"
                                        classNameImage="w-full h-full"
                                       
                                        style={{ padding: 0}}
                                    >
                                       
                                    </RichImageEditor>
                                </div>
                                <div className="w-full md:w-[40%] flex flex-col items-start md:items-end text-center md:text-left gap-2">
                                <EditableField 
                            initialValue={bankProps.bankNameGroom} 
                            name='bankNameGroom'
                            id={`bankNameGroom-${id}`}
                            
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            className='font-prata'
                        />  
                                <EditableField 
                                    initialValue={bankProps.nameGroom} 
                                    name='nameGroom'
                                    id={`nameGroom-${id}`} 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange} 
                                    className='font-prata'
                                />  
                                <EditableField 
                                    initialValue={bankProps.bankNumberGroom} 
                                    name='bankNumberGroom'
                                    id={`bankNumberGroom-${id}`} 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange} 
                                    className='font-prata'
                                />   
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div style={{ background: "#FBF7F5" }} className='py-[75px] text-center px-[15px] md:block hidden'> 
                {/* Wedding congratulations title */} 
                <h2 className="text-[56px] md:text-[72px] font-pinyonScript italic " style={{ color: availableColorsTemplate2[style][0] }}>Mừng cưới</h2> 
                <div className="mt-6 max-w-xl mx-auto text-center text-dark-200">
                    <EditableField 
                        initialValue={bankProps.description} 
                        name='description'
                        id={`description-${id}`} 
                        disabled={disabled} 
                        onChangeBlur={onSectionChange} 
                    />     
                </div>
            </div>
        </div>
    );
};

export default BankSection;