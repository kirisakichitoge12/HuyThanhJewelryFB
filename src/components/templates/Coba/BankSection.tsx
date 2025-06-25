import React from 'react';
import StampLeft from '../../../assets/images/templates/coba/stampTimeline.png';
import StampRight from '../../../assets/images/templates/coba/stampTimeline.png';
import FlowerIcon from '../../../assets/images/templates/coba/iconFollower1.png';
import Man from '../../../assets/images/templates/coba/man.png';
import Woman from '../../../assets/images/templates/coba/women.png';
import { availableColors } from '../../../config';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';

export interface BankProps{
    nameBridge: string;
    bankNumberBridge: string;
    bankNameBridge: string; 
    nameGroom: string;
    bankNumberGroom: string;
    bankNameGroom: string;
    imageBankGroom?: string | File;
    imageBankBridge?: string | File;
}


interface BankSectionProps extends BankProps{ 
    id: string;
    style: number;
    titleFont: string;
    contentFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

const BankSection: React.FC<BankSectionProps> = ({
    bankNameBridge,
    bankNameGroom,
    bankNumberBridge,
    bankNumberGroom,
    nameBridge,
    nameGroom,
    imageBankGroom,
    imageBankBridge,
    id,
    style,
    titleFont,
    contentFont,
    disabled = false,
    onSectionChange
}) => {  
    return (
        <section className="relative bg-default-coba">
            <section className='z-10 relative max-w-[1443px] mx-auto font-phudu overflow-hidden grid xl:grid-cols-3 w-full gap-0 justify-center items-center text-center px-[15px] py-16 full:px-[90px] full:pt-[73px] full:pb-[65px]'>
                <div className='relative min-w-[390.18px] min-h-[493.95px] text-center'>
                    <img src={StampLeft} className='absolute w-full h-full rotate-[-4.73deg] '/>
                    <div className='w-[77%] xl:w-4/5 max-w-[320px] mt-9 ml-12 text-secondary-coba z-20'> 
                        <RichImageEditor 
                            src={imageBankGroom ? `${API_BASE_URL}/${imageBankGroom}` : Man} 
                            id={`imageBankGroom-${id}`}
                            alt="image-bank-groom"
                            disabled={disabled}
                            name='imageBankGroom'
                            classNameImage='rotate-[-4.73deg]'
                            onChange={onSectionChange} 
                            className={` w-[323px] h-[300px]`}  
                        >
                            <h2 className='text-[42px] leading-[37px] font-birthstone rotate-[-4.73deg]'>Mừng cưới đến chú rể </h2>
                            <div className="uppercase text-base font-bold font-phudu leading-[19.6px]">
                                <EditableField 
                                    initialValue={bankNameGroom} 
                                    name='bankNameGroom'
                                    id={`bankNameGroom-${id}`}
                                    disabled={disabled}  
                                    onChangeBlur={onSectionChange} 
                                    className='text-center h-5 rotate-[-4.73deg]'
                                />  
                                <EditableField 
                                    initialValue={nameGroom} 
                                    name='nameGroom'
                                    id={`nameGroom-${id}`} 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange} 
                                    className='text-center h-5 rotate-[-4.73deg]'
                                />  
                                <EditableField 
                                    initialValue={bankNumberGroom} 
                                    name='bankNumberGroom'
                                    id={`bankNumberGroom-${id}`} 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange} 
                                    className='text-center h-5 rotate-[-4.73deg]'
                                />   
                            </div>
                        </RichImageEditor>
                    </div>
                </div>

                <div className='max-w-[404px] flex flex-col items-center justify-center '>
                    <h1 
                        className="text-title-coba-mobile md:text-tilte-coba text-3d drop-shadow-3d tracking-wide uppercase full:whitespace-nowrap" 
                        style={{ fontFamily: titleFont, color: availableColors[style][4] }}
                    > 
                        Mừng cưới
                    </h1>
                    <p className='text-base font-trirong mt-6 mb-8' style={{ fontFamily: contentFont }}>Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha ^^. Cảm ơn bạn rất nhiều!</p>
                    <img src={FlowerIcon} className='max-w-[231px] max-h-[189px]'/>
                </div>

                <div className='relative min-w-[390.18px] min-h-[493.95px]'>
                    <img src={StampRight} className='-z-10 absolute w-full h-full rotate-[4.73deg] '/>
                    <div className='w-[77%] xl:w-4/5 max-w-[320px] mt-9 ml-[44px] text-secondary-coba'>
                        <div className='z-50'>
                            <RichImageEditor 
                                src={imageBankBridge ? `${API_BASE_URL}/${imageBankBridge}` : Woman} 
                                id={`imageBankBridge-${id}`}
                                name='imageBankBridge'
                                alt="image-bank-bridge"
                                onChange={onSectionChange} 
                                disabled={disabled}
                                classNameImage='rotate-[4.73deg]'
                                className={` w-[323px] h-[300px] translate-x-2`}  
                            >
                                <h2 className='text-[42px] leading-[47px] font-birthstone rotate-[4.73deg]'>Mừng cưới đến cô dâu</h2>
                                <div className="uppercase text-base font-bold font-phudu leading-[19.6px]">
                                    <EditableField 
                                        initialValue={bankNameBridge} 
                                        name='bankNameBridge'
                                        id={`bankNameBridge-${id}`} 
                                        disabled={disabled} 
                                        onChangeBlur={onSectionChange} 
                                        className='text-center h-5 rotate-[4.73deg]'
                                    />  
                                    <EditableField 
                                        initialValue={nameBridge} 
                                        name='nameBridge'
                                        id={`nameBridge-${id}`} 
                                        disabled={disabled} 
                                        onChangeBlur={onSectionChange} 
                                        className='text-center h-5 rotate-[4.73deg]'
                                    />   
                                    <EditableField 
                                        initialValue={bankNumberBridge} 
                                        name='bankNumberBridge'
                                        id={`bankNumberBridge-${id}`} 
                                        disabled={disabled} 
                                        onChangeBlur={onSectionChange} 
                                        className='text-center h-5 rotate-[4.73deg]'
                                    />    
                                </div>
                            </RichImageEditor>
                        </div> 
                    </div>
                </div>
            </section>
        </section>
    )
}

export default BankSection