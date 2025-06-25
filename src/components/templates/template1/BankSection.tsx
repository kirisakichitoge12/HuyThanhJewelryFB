import React from 'react'; 
import Icon from '../../../assets/images/templates/template1/weddingGiftEnvelope.svg';
import BankImage from '../../../assets/images/templates/template1/bank.png';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import ImageDeco from '../../../assets/images/templates/template1/leavesIcon.svg';
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
    titleFont: string;
    contentFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}
const BankSection: React.FC<BankSectionProps> = ({id, titleFont, contentFont, disabled, onSectionChange, ...bankProps}) => {
    return (
        <section className='bg-white w-full'>
            <section className=" relative max-w-9xl mx-auto py-[70px] flex flex-col justify-start items-center">
            {/* Header */}
                <div className='flex flex-col justify-center items-center mb-[70px]'>
                    <h2 className='text-[#FF8A8A] font-medium text-[36pt] font-marmelad' style={{fontFamily: titleFont}}>Mừng cưới</h2>
                    <img src={Icon} alt="Wedding Gift Envelope"/>
                </div>
                <p className='font-openSans text-[#73777b] mb-10 text-center' style={{fontFamily: contentFont}}>Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha ^^. Cảm ơn bạn rất nhiều! </p>
                <div className='grid md:grid-cols-2 justify-center items-center mb-[50px] gap-[50px]'>
                    <div className='relative bg-[#FF8A8A] text-center '>
                        <div className='border-[1px] absolute top-4 left-7 w-[86%] h-[92%] border-white'></div>
                        <div className='border-[1px] absolute top-7 left-4 w-[92%] h-[86%] border-white'></div>
                        <div className='px-24 pt-14 pb-36 flex flex-col justify-center items-center text-white'>
                            <h4 className='font-marmelad mb-[25px] text-[1.25rem]'>Mừng cưới đến cô dâu</h4>
                            <RichImageEditor 
                                src={bankProps.imageBankGroom ? `${API_BASE_URL}/${bankProps.imageBankGroom}` : BankImage} 
                                id={`imageBankGroom-${id}`}
                                alt="image-bank-groom"
                                name='imageBankGroom'
                                onChange={onSectionChange} 
                                disabled={disabled}
                                className='w-[150px] h-[150px]'
                            > 
                                <EditableField 
                                    initialValue={bankProps.bankNameGroom} 
                                    name='bankNameGroom'
                                    id={`bankNameGroom-${id}`}
                                    disabled={disabled}  
                                    onChangeBlur={onSectionChange} 
                                    className='font-openSans text-base'
                                />  
                                <EditableField 
                                    initialValue={bankProps.nameGroom} 
                                    name='nameGroom'
                                    id={`nameGroom-${id}`} 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange} 
                                    className='font-openSans text-base'
                                />  
                                <EditableField 
                                    initialValue={bankProps.bankNumberGroom} 
                                    name='bankNumberGroom'
                                    id={`bankNumberGroom-${id}`} 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange} 
                                    className='font-openSans text-base'
                                />    
                            </RichImageEditor>
                        </div> 
                    </div>
                    <div className='relative bg-[#FF8A8A] text-center '>
                        <div className='border-[1px] absolute top-4 left-7 w-[86%] h-[92%] border-white'></div>
                        <div className='border-[1px] absolute top-7 left-4 w-[92%] h-[86%] border-white'></div>
                        <div className='px-24 pt-14 pb-36 flex flex-col justify-center items-center text-white font-openSans'>
                            <h4 className='font-marmelad mb-[25px] text-[1.25rem]'>Mừng cưới đến cô dâu</h4>
                            <RichImageEditor 
                                src={bankProps.imageBankBridge ? `${API_BASE_URL}/${bankProps.imageBankBridge}` : BankImage} 
                                id={`imageBankBridge-${id}`}
                                name='imageBankBridge'
                                alt="image-bank-bridge"
                                onChange={onSectionChange} 
                                disabled={disabled}
                                className='w-[150px] h-[150px]'
                            > 
                                    <EditableField 
                                        initialValue={bankProps.bankNameBridge} 
                                        name='bankNameBridge'
                                        id={`bankNameBridge-${id}`} 
                                        disabled={disabled} 
                                        className='font-openSans text-base'
                                        onChangeBlur={onSectionChange}  
                                    />  
                                    <EditableField 
                                        initialValue={bankProps.nameBridge} 
                                        name='nameBridge'
                                        id={`nameBridge-${id}`} 
                                        disabled={disabled} 
                                        onChangeBlur={onSectionChange}  
                                    className='font-openSans text-base'
                                    />   
                                    <EditableField 
                                        initialValue={bankProps.bankNumberBridge} 
                                        name='bankNumberBridge'
                                        id={`bankNumberBridge-${id}`} 
                                        disabled={disabled} 
                                        onChangeBlur={onSectionChange}  
                                    className='font-openSans text-base'
                                    />     
                            </RichImageEditor> 
                        </div> 
                    </div>
                </div>
            </section>
                <div className='bg-[#FF8A8A]'>
                    <div className='max-w-9xl mx-auto flex justify-center py-[15px] text-[30pt] text-center'>
                        <img src={ImageDeco} alt=""  className='max-w-[130px] rotate-[225deg]'/> 
                        <p className='font-marmelad text-white py-7 px-2'>
                            {bankProps.nameGroom} <br/> {bankProps.nameBridge}
                        </p>
                        <img src={ImageDeco} alt="" className='max-w-[130px] rotate-45'/>
                    </div>
                </div>
        </section>
    );
};

export default BankSection;