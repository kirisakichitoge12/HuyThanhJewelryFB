import React, { ChangeEvent, useEffect, useRef, useState } from 'react'; 
import IconInvite1 from '../../../assets/images/templates/coba/iconInvite1.png';  
import IconInvite2 from '../../../assets/images/templates/coba/iconInvite2.png';  
import IconInvite3 from '../../../assets/images/templates/coba/iconInvite3.png';  
 
import { availableColors } from '../../../config';
import StampInvite1 from '../../../assets/images/templates/coba/stampInvite1.png';  
import { MdKeyboardArrowDown } from 'react-icons/md';
import EditableField from '../../common/EditableField'; 
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api.config';

export interface InvitationProps{
    bridge?: string;
    groom?: string;
    time: string;
    date: string; 
    location: string;
    description: string; 
    congratulations: InviGuestProps;
}

interface InvitationSectionProps extends InvitationProps {
    id: string;
    style: number;
    user_id:number;
    theme_id:number;
    disabled?: boolean; 
    onSectionChange:  (name: string, newValue: string | File | InviGuestProps) => void; 
}

export interface InviGuestProps{
    name: string;
    phone: string;
    isAttending: boolean;
    isCeremony: boolean;
    isWedding: boolean;
    moreOne: boolean;
}

const Invitation: React.FC<InvitationSectionProps> = ({
    id,
    bridge,
    groom,
    time,
    date, 
    location,
    description,  
    congratulations,
    user_id,
    theme_id,
    style,
    disabled = false,
    onSectionChange
}) => { 
    const framesBg: string[] = [StampInvite1, StampInvite1, StampInvite1];
    const icons: string[] = [ IconInvite1, IconInvite2, IconInvite3];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false); 
    const sectionRef = useRef<HTMLDivElement>(null);
   const [dataGuest, setDataGuest] = useState<InviGuestProps>({
    name: congratulations.name ?? '',
    phone: congratulations.phone ?? '',
    isAttending: congratulations.isAttending ?? false,
    isCeremony: congratulations.isCeremony ?? false,
    isWedding: congratulations.isWedding ?? false,
    moreOne: congratulations.moreOne ?? false
});

    const handleScrollToSection = () => {
        if (sectionRef.current) {
            const offset = -200; // Khoảng cách cách phía trên 50px
            const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: sectionTop + offset,
                behavior: 'smooth',
            });
        }
    };
    const scrollInView = (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.stopPropagation();
        const section = document.getElementById('message-id');
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
        toast.success("Xác nhận tham dự thành công!"
                ,{
                    iconTheme: {
                    primary: 'rgb(237,131,131)', // Màu của icon
                    secondary: '#ffffff', // Màu nền của icon
                    },
                }
            );       
        // toast.success("Xác nhận tham dự thành công!");
        
        // console.log("Dữ liệu xác nhận:", response.data);
    } catch (error) {
        // console.error("Lỗi gửi xác nhận:", error);
        toast.error("Chỉ khách mời mới có thể gửi xác nhận tham dự.");
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
        <section
            ref={sectionRef}
            className={`${style === 0 ? "bg-[#EFE7DE]" : "bg-[#F9F6F2]"}`}
            onClick={handleScrollToSection}
        >
            <section className='max-w-[1443px] mx-auto font-phudu py-[56px] px-[15px] lg:py-[95px] lg:px-[85px] flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-end'>
                <div className='flex-1 h-fit relative'>
                        <img src={framesBg[style]} className='h-[400px] sm:w-full sm:h-full md:min-w-[488.73px] md:h-[535px]'/>
                        <div className='px-5 absolute top-[53px] md:px-[79.45px] text-center w-full md:min-w-[488.73px]'>
                            <EditableField 
                                id={`invite-time-${id}`}
                                initialValue={time} 
                                name='time' 
                                disabled={disabled} 
                                onChangeBlur={onSectionChange}
                                className='bg-transparent text-center w-full h-[42px] md:h-[80px] text-[35px] leading-[42.88px] md:text-[60px] md:leading-[73.5px] font-bold'
                                styleThemes={{ textShadow:  `-2px -2px 0 ${availableColors[style][3]}, 2px -2px 0 ${availableColors[style][3]}, -2px 2px 0 ${availableColors[style][3]}, 2px 2px 0 ${availableColors[style][3]}`, color:"#efece1"}}  
                            />  
                            <EditableField 
                                id={`invite-date-${id}`}
                                initialValue={date} 
                                name='date' 
                                disabled={disabled}  
                                onChangeBlur={onSectionChange}
                                className='bg-transparent text-center w-full text-[25px] leading-[30.63px] md:text-[34px] md:leading-[41.5px] pt-[9px] h-[43px] lg:h-[53px]'
                                styleThemes={{ color: availableColors[style][3] }}
                            />   
                            <div className='pt-4'>
                                <p className='font-birthstone rotate-[7.04deg] text-[32px] md:text-title-2' style={{ color: availableColors[style][4] }}>Tại</p>
                                <EditableField 
                                    id={`invite-location-${id}`}
                                    initialValue={location} 
                                    name='location' 
                                    disabled={disabled}     
                                    onChangeBlur={onSectionChange}
                                    className='bg-transparent text-center w-full text-2xl md:text-[34px] md:leading-[41.5px] font-bold resize-none text-wrap overflow-x-hidden'
                                    styleThemes={{ color: availableColors[style][4] }}
                                />    
                            </div>
                            <div className='flex justify-center item-center translate-y-5'>
                                <img src={icons[style]} className='w-[300px] h-[125px] md:w-[527px] md:h-[220px] '/>
                            </div>
                        </div>
                </div>
                <div className='flex-1 space-y-12 h-fit md:pl-10 text-center md:text-left'>
                    <div className="space-y-5" >
                        <h1 
                            className="text-title-coba-mobile full:text-[60px] full:leading-[73px] drop-shadow-3d font-bold tracking-wide" 
                            style={{ textShadow:  "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white", color: availableColors[style][4]}}
                        > 
                            Trân trọng kính mời
                        </h1>  
                        <p className='text-lg md:text-content-4 text-dark-400 font-trirong'>tới dự hôn lễ của 2 vợ chồng chúng tôi</p> 
                        <div className='h-[2px] w-100 bg-primary-coba'></div>
                    </div>
                    <div className='space-y-4'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4' style={{ color: availableColors[style][3]}}>
                            <div className='flex-1'>
                                <p className='text-content-coba-mobile md:text-title-2 font-birthstone rotate-[-7.04deg]'>Chú rể</p>
                                <EditableField 
                                    id={`invite-groom-${id}`}
                                    initialValue={groom} 
                                    name='groom' 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange}                                
                                    className='bg-transparent w-full md:text-start text-center uppercase font-bold text-[28px] leading-[34.3px] md:text-[48px] md:leading-[58.8px]'
                                />    
                            </div>
                            <div className='flex-1'>
                                <p className='text-content-coba-mobile md:text-title-2 font-birthstone rotate-[-7.04deg]'>Cô dâu</p>
                                <EditableField 
                                    id={`invite-bridge-${id}`}
                                    initialValue={bridge} 
                                    name='bridge' 
                                    disabled={disabled} 
                                    onChangeBlur={onSectionChange}
                                    className='bg-transparent w-full md:text-start text-center uppercase font-bold text-[28px] leading-[34.3px] md:text-[48px] md:leading-[58.8px]'
                                />     
                            </div>
                        </div>
                        <EditableField  
                            id={`invite-description-${id}`}
                            initialValue={description} 
                            name='description' 
                            disabled={disabled} 
                            onChangeBlur={onSectionChange}
                            className='h-[35px] bg-transparent text-start w-full text-base md:text-xl text-dark-400 font-trirong'
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                        <button onClick={scrollInView} className='uppercase text-[#EEDED1] px-[15px] py-4 font-bold text-base w-full md:w-[172px]' style={{ backgroundColor: availableColors[style][3]}}>
                            Gửi lời chúc
                        </button>
                        <button onClick={()=> setIsOpen(true)} className='uppercase text-[#EEDED1] px-[15px] py-4 font-bold text-base w-full md:w-[172px]' style={{ backgroundColor: availableColors[style][4]}}>
                            Xác nhận tham dự
                        </button>
                    </div>
                </div>
            </section>
            {
                isOpen && 
                <div 
                    onClick={handleOverlayClick}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033] bg-opacity-20 overflow-hidden font-svn-sans"   
                >
                    <div className={`relative w-full max-w-[836px] space-y-[60px] bg-default-coba h-[632px] shadow-lg px-[15px] py-10 md:px-[108px] md:py-16 text-center`}>
                        <h1 
                            className="text-title-coba-mobile full:text-[60px] full:leading-[73px] drop-shadow-3d font-bold tracking-wide" 
                            style={{ textShadow:  "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white", color: availableColors[style][4]}}
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
                                    type='text'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest(prev => ({ ...prev, phone: String(e.target.value) }))}
                                    placeholder='Số điện thoại của bạn *'
                                    className='bg-transparent w-full h-12 ps-4 border-[1px] border-dark-300' 
                                />
                                <div className='space-y-4 text-start'>
                                <p className='text-dark-400 font-bold'>Sự kiện bạn sẽ tham gia</p>
                                <div className='flex gap-6'>
  <label className='flex items-center gap-[11px]'>
    <input
      type='checkbox'
      name='isWedding'
      checked={!!dataGuest.isWedding}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const updated = { ...dataGuest, isWedding: e.target.checked };
        setDataGuest(updated);
        // console.log("Dữ liệu sau khi chọn Lễ thành hôn:", updated);
      }}
    />
    <p>Lễ thành hôn</p>
  </label>

  <label className='flex items-center gap-[11px]'>
    <input
      type='checkbox'
      name='isCeremony'
      checked={!!dataGuest.isCeremony}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const updated = { ...dataGuest, isCeremony: e.target.checked };
        setDataGuest(updated);
        // console.log("Dữ liệu sau khi chọn Lễ vu quy:", updated);
      }}
    />
    <p>Lễ vu quy</p>
  </label>
</div>

                                </div>

                               <div className='relative'>
                                    <input
                                        className='bg-transparent w-full h-12 ps-4 border-[1px] border-dark-300 cursor-pointer'
                                        name='moreOne'
                                        value={dataGuest.moreOne ? "Có" : "Không"}
                                        readOnly
                                        placeholder='Bạn có người đi cùng không *'
                                        onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                                    />
                                    <MdKeyboardArrowDown 
                                        onClick={() => setIsOpenDropDown(!isOpenDropDown)} 
                                        size={30} 
                                        className={`absolute right-2 top-2 cursor-pointer transition-transform ${isOpenDropDown ? "rotate-180" : ""}`}
                                    />
                                    
                                    {isOpenDropDown && (
                                        <div className='absolute w-full items-center z-10'>
                                        <button 
                                            type='button'
                                            onClick={() => {
                                            setDataGuest(prev => ({ ...prev, moreOne: true }));
                                            setIsOpenDropDown(false);
                                            }} 
                                            className='bg-white w-full h-12 p-3 text-start border-[1px] border-dark-300'
                                        >
                                            Có
                                        </button>
                                        <button 
                                            type='button'
                                            onClick={() => {
                                            setDataGuest(prev => ({ ...prev, moreOne: false }));
                                            setIsOpenDropDown(false);
                                            }} 
                                            className='bg-white w-full h-12 p-3 text-start border-[1px] border-dark-300'
                                        >
                                            Không
                                        </button>
                                        </div>
                                    )}
                                    </div>

                            </div>
                            <button 
                                onClick={handleConfirm}
                                style={{ backgroundColor: availableColors[style][3]}}
                                className='uppercase text-[#EEDED1] px-[15px] py-4 font-bold text-base w-full md:w-[406px]' 
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