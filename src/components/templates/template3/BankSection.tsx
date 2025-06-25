import React from 'react';
import { availableColorsCodien } from '../../../config';
import DefaultImage from '../../../assets/images/templates/codien/picture8.jpg'; 

import DecoLeft1 from '../../../assets/images/templates/codien/bankDeco (1).png';
import DecoLeft2 from '../../../assets/images/templates/codien/bankDeco (2).png';
import DecoLeft3 from '../../../assets/images/templates/codien/bankDeco (3).png';
import EditableField from '../../common/EditableField';
import RichImageEditor from '../../common/RichImageEditor';
import { API_BASE_URL } from '../../../config/api.config';
import QR from '../../../assets/images/templates/sangtrong/qr.jpg';


export interface BankProps{
    title: string;
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
const BankSection: React.FC<BankSectionProps> = ({id, titleFont, image,imageBankGroom,imageBankBridge, contentFont, disabled, onSectionChange, style, ...bankProps}) => {
    const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3]; 
    return (
        <div className="w-full relative" style={{ background: availableColorsCodien[style][2] }}> 
            <section className="max-w-9xl mx-auto py-[56px] md:px-[85px] md:py-[72px] relative" > 
                <div className='w-full grid md:flex' >
                    <div className='w-full  md:my-[55px] md:py-[55px] md:pr-[107px] md:pl-[138px] px-[15px] py-8 bg-white' >
                        <div >
                            <img src={decoLefts[style]} className='h-[153px]'/> 
                            <EditableField 
                                initialValue={bankProps.title} 
                                name='title'
                                id={`title-${id}`}
                                disabled={disabled}  
                                onChangeBlur={onSectionChange} 
                                styleThemes={{ color: availableColorsCodien[style][0] }}
                                className='text-[40px] md:text-[48px] font-playfairDisplay mt-4 mb-6'
                            />   
                            <EditableField 
                                initialValue={bankProps.description} 
                                name='description'
                                id={`description-${id}`}
                                disabled={disabled}  
                                onChangeBlur={onSectionChange} 
                                className='text-dark-200 font-beVietnamPro text-base max-w-5/6'
                            />   
                        </div>
                        <div className='flex flex-col md:flex-row justify-between pt-10'>
                            <div className="flex flex-col justify-start border-y-[1px] py-6 md:mb-0 mb-5" style={{ borderColor: availableColorsCodien[style][0] }}>
                                <h3 className="z-20 text-xl md:text-xl font-prata mb-4" style={{ color: availableColorsCodien[style][0] }}>Mừng cưới đến cô dâu</h3>
                               <div className="flex flex-row  justify-between items-start gap-4">
                                  {/* LEFT: 3 trường nhập */}
                                  <div className="flex flex-col space-y-2 flex-1">
                                    <EditableField
                                      initialValue={bankProps.bankNameBridge}
                                      name="bankNameGroom"
                                      id={`bankNameGroom-${id}`}
                                      disabled={disabled}
                                      onChangeBlur={onSectionChange}
                                      className='!p-0'
                                    />
                                    <EditableField
                                      initialValue={bankProps.nameBridge}
                                      name="nameGroom"
                                      id={`nameGroom-${id}`}
                                      disabled={disabled}
                                      onChangeBlur={onSectionChange}
                                        className='!p-0'
                                    />
                                    <EditableField
                                      initialValue={bankProps.bankNumberBridge}
                                      name="bankNumberGroom"
                                      id={`bankNumberBride-${id}`}
                                      disabled={disabled}
                                      onChangeBlur={onSectionChange}
                                      className='!p-0'
                                    />
                                  </div>

                                  {/* RIGHT: QR của cô dâu */}
                                  <div className="w-[100px] h-[100px]">
                                    <RichImageEditor
                                      src={imageBankBridge ? `${API_BASE_URL}/${imageBankBridge}` : QR}
                                      id={`imageBankBridgeMobile-${id}`}
                                      alt="image-bank-bridge"
                                      disabled={disabled}
                                      name="imageBankBridge"
                                      onChange={onSectionChange}
                                      className="relative w-full h-full"
                                      classNameImage="w-full h-full object-cover"
                                      style={{ padding: 0 }}
                                    />
                                  </div>
                                </div>

                            </div>

                        <div className="flex md:flex-col flex-row justify-start border-y-[1px] py-6" style={{ borderColor: availableColorsCodien[style][0] }}>
                         <h3 className="z-20 text-xl md:text-xl font-prata mb-4 hidden md:block " style={{ color: availableColorsCodien[style][0] }}>Mừng cưới đến chú rể</h3>
                              <div className="flex flex-row justify-between items-start gap-4">    
                          {/* LEFT: 3 EditableField dọc */}
                          <div className="flex flex-col space-y-2 flex-1">
                              <h3 className="z-20 text-xl md:text-xl font-prata mb-4 block md:hidden " style={{ color: availableColorsCodien[style][0] }}>Mừng cưới đến chú rể</h3>
                            <EditableField
                              initialValue={bankProps.bankNameGroom}
                              name="bankNameGroom"
                              id={`bankNameGroom-${id}`}
                              disabled={disabled}
                              onChangeBlur={onSectionChange}
                              className='!p-0'
                            />
                            <EditableField
                              initialValue={bankProps.nameGroom}
                              name="nameGroom"
                              id={`nameGroom-${id}`}
                              disabled={disabled}
                              onChangeBlur={onSectionChange}
                              className='!p-0'
                            />
                            <EditableField
                              initialValue={bankProps.bankNumberGroom}
                              name="bankNumberGroom"
                              id={`bankNumberGroom-${id}`}
                              disabled={disabled}
                              onChangeBlur={onSectionChange}
                              className='!p-0'
                            />
                          </div>

                          {/* RIGHT: QR code */}
                          <div className="w-[100px] h-[100px] md:mt-0 md:ml-0 mt-10 ml-12">
                            <RichImageEditor
                              src={imageBankGroom ? `${API_BASE_URL}/${imageBankGroom}` : QR}
                              id={`imageBankGroomMobile-${id}`}
                              alt="image-bank-groom"
                              disabled={disabled}
                              name="imageBankGroom"
                              onChange={onSectionChange}
                              className="relative w-full h-full"
                              classNameImage="w-full h-full object-cover"
                              style={{ padding: 0 }}
                            />
                          </div>
                        </div>

                            </div>
                        </div>
                    </div>
                    <RichImageEditor
                        id="image"
                        name="image"
                        src={image? `${API_BASE_URL}/${image}` : DefaultImage}
                        onChange={onSectionChange}
                        className=' relative w-full h-full md:h-[765px] md:w-[85%] object-cover object-top' // Đây là container ngoài (nếu có)
                        classNameImage='w-full h-[517px] !p-0 md:h-[820px] md:w-[640px] object-cover object-top' // Đây chính là <img>
                            />

                </div>

            </section>
        </div>
    );
};

export default BankSection;