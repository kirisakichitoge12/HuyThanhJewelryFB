import React, { ChangeEvent, useEffect, useState } from 'react';
import { availableColorsTemplate2 } from '../../../config';
import { InviGuestProps } from '../Coba/Invitation';
import EditableField from '../../common/EditableField';
import toast from 'react-hot-toast';
import { MdKeyboardArrowDown } from 'react-icons/md';
import DecoLeft1 from '../../../assets/images/templates/sangtrong/img/left.png';
import DecoLeft2 from '../../../assets/images/templates/sangtrong/img/03.png';
import DecoLeft3 from '../../../assets/images/templates/sangtrong/11.png';

import DecoRight1 from '../../../assets/images/templates/sangtrong/8.png';
import DecoRight2 from '../../../assets/images/templates/sangtrong/img/01.png';
import DecoRight3 from '../../../assets/images/templates/sangtrong/12.png';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api.config';
export interface InvitationProps{ 
    time: string;
    day: string; 
    month: string; 
    year: string;  
    location: string;
    description: string; 
    user_id:number;
    theme_id:number;
    congratulations: InviGuestProps;
    subDescription: string;
}

interface InvitationSectionProps extends InvitationProps {
    id: string;
    style: number;
    disabled?: boolean; 
    onSectionChange:  (name: string, newValue: string | File | InviGuestProps) => void; 
}

const Invitation: React.FC<InvitationSectionProps> = ({
    id, 
    time,
    day,
    month,
    year, 
    location,
    description,  
    congratulations,
    subDescription,
    user_id,
    theme_id,
    style,
    disabled = false,
    onSectionChange
}) => {
    const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
    const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false); 
    const [dataGuest, setDataGuest] = useState<InviGuestProps>({
            name: congratulations.name,
            phone: congratulations.phone,
            isAttending: congratulations.isAttending,
            isCeremony: congratulations.isCeremony,
            isWedding: congratulations.isWedding,
            moreOne: congratulations.moreOne
        });
    const scrollInView = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.stopPropagation();
        const section = document.getElementById('sangtrong-message-id');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }  
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };
    const confirmAttendance = async () => {
        try {
            const payload = {
                user_id,
                theme_id,
                name: dataGuest.name,
                phone: dataGuest.phone,
                is_attending: dataGuest.isAttending ? 1 : 0,
                is_ceremony: dataGuest.isCeremony ? 1 : 0,
                is_wedding: dataGuest.isWedding ? 1 : 0,
                more_one: dataGuest.moreOne ? 1 : 0,
            };
    
            const response = await axios.post(`${API_BASE_URL}/api/guest/confirm`, payload);
    
            if (response.status !== 200) {
                throw new Error("Xác nhận thất bại");
            }
    
            // toast.success("Xác nhận tham dự thành công!");
            toast.success("Xác nhận tham dự thành công!"
                            ,{
                                iconTheme: {
                                  primary: 'rgb(237,131,131)', // Màu của icon
                                  secondary: '#ffffff', // Màu nền của icon
                                },
                              }
                        );  
            // console.log("Dữ liệu xác nhận:", response.data);
        } catch (error) {
            console.error("Lỗi gửi xác nhận:", error);
            toast.error("Chỉ có khách mời mới có thể xác nhận tham dự");
        }
    };
    
       const handleConfirm = async () => {
        setIsOpen(false);
        onSectionChange("congratulations", dataGuest); 
        await confirmAttendance();
    }
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
            };

            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
            }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, setIsOpen]);
    return ( 
        <section className="relative bg-white grid  pt-[72px]  md:pt-[164px] text-center">
            <div className='text-dark-200 max-w-[1443px] md:mx-auto mx-[15px]'>
                <h3 className='text-[40px] md:text-[48px] leading-[60px] font-pinyonScript'>Trân trọng kính mời </h3> 
                <EditableField  
                    id={`invite-description-${id}`}
                    initialValue={description} 
                    name='description' 
                    disabled={disabled} 
                    onChangeBlur={onSectionChange}
                    className='text-base mt-1 font-beVietnamPro'
                />
            </div> 
            <div className={`relative px-[15px] mt-[28px] py-[28px]  grid justify-center items-center`}
                style={{ background: availableColorsTemplate2[style][2], color: availableColorsTemplate2[style][0] }}
            >
                <img src={decoLefts[style]} className='absolute left-0 top-0 w-[272px] h-[100%] hidden md:block'/>
                <img src={decoRights[style]} className='absolute right-0 bottom-0 w-[272px] h-[100%] hidden md:block'/> 
                <div className='max-w-[1443px] mx-auto '>
                    <EditableField 
                        id={`invite-time-${id}`}
                        initialValue={time} 
                        name='time' 
                        disabled={disabled} 
                        onChangeBlur={onSectionChange}
                        className='text-2xl md:text-[32px] leading-[44px] font-prata'
                    />  
                    <div className='flex space-x-[35px] text-[40px] md:text-[56px] items-center h-auto pt-10 pb-[35px]'>
                        <EditableField 
                            id={`invite-day-${id}`}
                            initialValue={day} 
                            name='day' 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            className='leading-none'
                        />    
                        <div className='self-stretch w-[1.66px] bg-[#F4DBCE]'></div>
                        <EditableField 
                            id={`invite-month-${id}`}
                            initialValue={month} 
                            name='month' 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            className='leading-none'
                        />   
                        <div className='self-stretch w-[1.66px] bg-[#F4DBCE]'></div>
                        <EditableField 
                            id={`invite-year-${id}`}
                            initialValue={year} 
                            name='year' 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            className='leading-none'
                        />   
                    </div> 
                </div>
                <EditableField 
                    id={`invite-location-${id}`}
                    initialValue={location} 
                    name='location' 
                    disabled={disabled}     
                    onChangeBlur={onSectionChange}
                    className='text-2xl md:text-[32px] leading-[44px] font-prata'
                />   
            </div>
            <EditableField 
                id={`invite-subDescription-${id}`}
                initialValue={subDescription} 
                name='subDescription' 
                disabled={disabled}  
                onChangeBlur={onSectionChange} 
                className='text-base pt-[30px] pb-10 md:pb-[56px] text-dark-200 mx-[15px]'
            />   
            <div className='flex md:mb-10 md:flex-row flex-col justify-center items-center gap-4 md:gap-8 mx-[15px]'>
                <button 
                    onClick={scrollInView} 
                    style={{ background: availableColorsTemplate2[style][0] }}
                    className={`uppercase rounded-full text-white font-prata text-[18px] w-full md:max-w-[250px] p-6`}>
                    Gửi lời chúc
                </button>
                <button 
                    style={{ background: availableColorsTemplate2[style][1] , color: availableColorsTemplate2[style][0]}}
                    onClick={()=> setIsOpen(true)} 
                    className={`uppercase rounded-full font-prata text-[18px] w-full md:max-w-[250px] p-6`}>
                    Xác nhận tham dự
                </button>
            </div>
            {
                isOpen && 
                <div 
                    onClick={handleOverlayClick}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033] bg-opacity-40 overflow-hidden font-svn-sans"   
                >
                    <div className={`relative w-full max-w-[836px] space-y-[60px] bg-default-coba h-[632px] shadow-lg px-[15px] py-10 md:px-[108px] md:py-16 text-center`}>
                        <h1 
                            className="text-title-coba-mobile full:text-[72px] full:leading-[73px] font-bold tracking-wide font-pinyonScript" 
                            style={{ color: availableColorsTemplate2[style][0] }} 
                        > 
                            Xác nhận tham dự
                        </h1>
                        {/* Form confirm   */}
                        <div className='space-y-10'>
                            <div className='space-y-6'>
                                <input
                                    name='name' 
                                    placeholder='Tên của bạn *'
                                    value={dataGuest.name} 
                                    className='bg-transparent w-full h-12 ps-4 border-[1px] border-dark-300' 
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest(prev => ({ ...prev, name: e.target.value }))}
                                />
                                <input 
                                    name='phone'
                                    value={dataGuest.phone}
                                    type='number'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest(prev => ({ ...prev, phone: String(e.target.value) }))}
                                    placeholder='Số điện thoại của bạn *'
                                    className='bg-transparent w-full h-12 ps-4 border-[1px] border-dark-300' 
                                />
                                <div className='space-y-4 text-start'>
                                    <p className='text-dark-400 font-bold'>Sự kiện bạn sẽ tham gia </p>
                                    <div className='flex gap-6'>
                                        <label className='flex items-center gap-[11p]'>
                                            <input 
                                                type='checkbox'
                                                name="isWedding" 
                                                checked={dataGuest.isWedding} 
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest(prev => ({ ...prev, isWedding: e.target.checked }))}
                                            />
                                            <p>Lễ thành hôn</p>                                         
                                        </label>
                                        <label className='flex items-center gap-[11p]'>
                                            <input 
                                                name="isCeremony" 
                                                checked={dataGuest.isCeremony} 
                                                type='checkbox' 
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest(prev => ({ ...prev, isCeremony: e.target.checked }))}
                                            />
                                            <p>Lễ vu quy</p>                                         
                                        </label>
                                    </div>
                                </div>
                                <div className='relative' >
                                    <input className='bg-transparent w-full h-12 ps-4 border-[1px] border-dark-300' 
                                        name='moreOne' 
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest(prev => ({ ...prev, moreOne: e.target.value === "Có" }))}
                                        value={dataGuest.moreOne ? "Có" : "Không"}  
                                        disabled 
                                        placeholder=' bạn có người đi cùng không *'
                                    />
                                    <MdKeyboardArrowDown 
                                        onClick={() => setIsOpenDropDown(!isOpenDropDown)} 
                                        size={30} className={`absolute right-2 top-2 cursor-pointer transition-transform ${isOpenDropDown ? "rotate-180" : ""}`}
                                    />
                                    {
                                        isOpenDropDown && 
                                            <div className='absolute w-full  items-center'>
                                                <button onClick={() => setDataGuest(prev => ({ ...prev, moreOne: true }))} className='bg-white w-full h-12 p-3 text-start border-[1px] border-dark-300'>Có</button>
                                                <button onClick={() => setDataGuest(prev => ({ ...prev, moreOne: false }))} className='bg-white w-full h-12 p-3 text-start border-[1px] border-dark-300'>Không</button>
                                            </div>
                                    }
                                </div> 
                            </div>
                            <button 
                                onClick={handleConfirm} 
                                className='uppercase text-[#EEDED1] px-[15px] py-4 font-bold text-base rounded-full w-full md:w-[250px]' 
                                style={{ background: availableColorsTemplate2[style][0] }}
                            >
                                Xác Nhận
                            </button>
                        </div>
                    </div>
                    </div>
            }
        </section> 
    )
}

export default Invitation