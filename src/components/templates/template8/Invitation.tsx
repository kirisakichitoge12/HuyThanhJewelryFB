import React, { ChangeEvent, useEffect, useRef, useState } from 'react'; 
import IconInvite1 from '../../../assets/images/templates/coba/iconInvite1.png';  
import IconInvite2 from '../../../assets/images/templates/coba/iconInvite2.png';  
import IconInvite3 from '../../../assets/images/templates/coba/iconInvite3.png';  
 
import { availableColors } from '../../../config';
import StampInvite1 from '../../../assets/images/templates/coba/stampInvite1.png';  
import { MdKeyboardArrowDown } from 'react-icons/md';
import EditableField from '../../common/EditableField'; 
import toast from 'react-hot-toast';
import RichImageEditor from '../../common/RichImageEditor';
import BgAsset from '../../../assets/images/templates/template8/invitation/Asset.png';
import Decobnleftdecoleft from '../../../assets/images/templates/template8/invitation/Asset1.png';
import Decobnleftdecoright from '../../../assets/images/templates/template8/invitation/Asset2.png';
import Decobannerleftcontent from '../../../assets/images/templates/template8/invitation/Frame46197.png';
import Decobannerleftimgbangkeo from '../../../assets/images/templates/template8/invitation/Vector9.png';
import Decobannerrightbg from '../../../assets/images/templates/template8/invitation/Vector10.png'
import Vt11 from '../../../assets/images/templates/template8/invitation/Vector11.png';
import { API_BASE_URL } from '../../../config/api.config';

export interface InvitationProps{
    bridge?: string;
    groom?: string;
    image?: File;
    time: string;
    date: string; 
    location: string;
    description: string; 
    title?: string;
    subDescription?: string;
    timer?: string;
    day?: string;
    month?: string;
    year?: string;
    locationdemo?: string;
    congratulations: InviGuestProps;
}

interface InvitationSectionProps extends InvitationProps {
    id: string;
    style: number;
    disabled?: boolean; 
    onSectionChange:  (name: string, newValue: string | File | InviGuestProps) => void; 
}

export interface InviGuestProps{
    name: string;
    phone: number;
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
    image,
    location,
    description,  
    title,
    subDescription,
    timer,
    day,
    month,  
    year,
    locationdemo,
    congratulations,
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
        name: congratulations.name,
        phone: congratulations.phone,
        isAttending: congratulations.isAttending,
        isCeremony: congratulations.isCeremony,
        isWedding: congratulations.isWedding,
        moreOne: congratulations.moreOne
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
    const handleConfirm = () => {
        setIsOpen(false);
        toast.success("Gửi lời xác nhận thành công"); 
        onSectionChange("congratulations", dataGuest); 
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
        <>
        <section
            ref={sectionRef}
            className={`${style === 0 ? "bg-[#EFE7DE]" : "bg-[#F9F6F2]"} hidden`}
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
                                    type='number'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest(prev => ({ ...prev, phone: Number(e.target.value) }))}
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


  <section
  onClick={(e) => e.stopPropagation()}
  className={`relative ${style === 0 ? "bg-[#f9fafa]" : "bg-[#F9F6F2]"} } bg-cover bg-center bg-no-repeat pt-2`}
  style={{
    backgroundImage: BgAsset ? `url(${BgAsset})` : 'none',
  }}
>
  {/* Wrapper có background toàn bộ */}
  <div className="max-w-[1443px]  mx-auto px-4 md:px-10 py-10 md:pt-[150px] ">
    <div className="flex flex-col mb-10 lg:flex-row items-center lg:items-start lg:gap-[35px]">
      
      {/* Left Content - chiếm 40% trên desktop */}
      <div className="w-full lg:basis-[40%] ml-5 mb-11 md:mb-0 ">
        <div className="space-y-6 full:ml-[95px]">
          <div className="relative w-full max-w-[349px] max-h-[469px]">
  {/* Ảnh cưới */}
 <RichImageEditor
  id={`imageBanner-${id}`}
  name="image"
  src={image ? `${API_BASE_URL}${image}` : Vt11}
  alt="Thiệp cưới"
  className="relative z-20"
  classNameImage="rounded-md shadow-lg p-5 bg-[#ffffff]"
  onChange={onSectionChange}
  toolbarPosition='top'
  disabled={disabled}
/>


  {/* Băng keo decor (ảnh PNG) */}
  <img
    src={Decobannerleftimgbangkeo}
    alt="băng keo"
    className="absolute -top-3 -left-5 w-[117px] rotate-[-15deg] z-30"
  />

  {/* Lá cây trái */}
  <img
    src={Decobnleftdecoleft}
    alt="lá trái"
    className="absolute top-8 -left-20 w-[150px] h-[202px] z-6"
  />

  {/* Lá cây phải */}
  <img
    src={Decobnleftdecoright}
    alt="lá phải"
    className="absolute bottom-8 -right-20 w-[150px] h-[202px] "
  />

  {/* Khung giấy chứa chữ */}
  <img
    src={Decobannerleftcontent}
    alt="khung chữ"
    className="absolute bottom-8 left-2/3 transform -translate-x-1/2 translate-y-1/2 w-[365px] h-auto z-30"
  />
  <EditableField
  id={`invite-honor-${id}`}
  initialValue={description}
  name="description"
  disabled={disabled}
  onChangeBlur={onSectionChange}
  className="absolute -bottom-0 left-2/3 transform -translate-x-1/2 text-center w-[300px] px-4 z-30 font-chamon  text-[22px] text-[#4B7264] leading-tight whitespace-pre-line"
  styleThemes={{ 
    color: "#4B7264" ,
    lineHeight: "1.5", // hoặc thử 1.2 - 1.3 nếu vẫn bị cắt
    paddingTop: "2.2rem",}}
/>

</div>

        </div>
      </div>
 {/* Left Content - chiếm 60% trên desktop */}
<div className="w-full lg:basis-[60%]  relative">
  {/* Ảnh nền trắng là một hình có họa tiết */}
    <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 w-4 h-4 bg-[#9c9553] rounded-full shadow-lg"></div>
  <img
    src={Decobannerrightbg} // ← ảnh bạn gửi (nền trắng có viền rách)
    alt="Nền trắng"
    className="absolute top-[4rem]  left-1/2 -translate-x-1/2 z-10 "
  />
  
  {/* Nội dung chính */}
  <div className="relative z-30 mx-auto flex flex-col items-center justify-center text-center px-4 md:px-8">
  {/* Tiêu đề: Trân trọng kính mời */}
  <EditableField
    id={`invite-title-${id}`}
    initialValue={title}
    name="title"
    disabled={disabled}
    onChangeBlur={onSectionChange}
    className="text-[#4B7264] font-normal italic -mt-12 md:text-[48px] text-[28px] font-chamon"
  />

  {/* Mô tả phụ: tới dự hôn lễ... */}
  <EditableField
    id={`invite-sub-${id}`}
    initialValue={subDescription}
    name="subDescription"
    disabled={disabled}
    onChangeBlur={onSectionChange}
    className="font-aleo mt-1 text-[#8C8C8C]"
  />

  {/* Thời gian */}
  <div className="mt-16">
    <EditableField
      id={`invite-time-${id}`}
      initialValue={timer}
      name="timer"
      disabled={disabled}
      onChangeBlur={onSectionChange}
      className="text-[#854739]  p-2 md:text-[42px] font-chamon font-bold"
    />
  </div>

  {/* Ngày / Tháng / Năm */}
  <div className="flex justify-center items-stretch gap-10 mt-6 px-4 text-brown-700 text-xl font-medium">
    {/* Ngày */}
    <div className="flex flex-col items-center pl-[1.5rem] pr-[2.5rem]">
      <p className="text-2xl text-[#8C8C8C]">Ngày</p>
      <EditableField
        id={`invite-day-${id}`}
        initialValue={day}
        name="day"
        disabled={disabled}
        onChangeBlur={onSectionChange}
        className="text-[#854739] p-5 text-xl md:text-[80px] font-chamon font-bold"
      />
    </div>

    {/* Tháng */}
    <div className="flex flex-col items-center px-10 border-l-[5px] border-r-[5px] border-[#854739]">
      <p className="text-2xl text-[#8C8C8C] ml-5">Tháng</p>
      <EditableField
        id={`invite-month-${id}`}
        initialValue={month}
        name="month"
        disabled={disabled}
        onChangeBlur={onSectionChange}
        className="text-[#854739] p-5  text-xl md:text-[80px] font-chamon font-bold"
      />
    </div>

    {/* Năm */}
    <div className="flex flex-col items-center">
      <p className="text-2xl text-[#8C8C8C]">Năm</p>
      <EditableField
        id={`invite-year-${id}`}
        initialValue={year}
        name="year"
        disabled={disabled}
        onChangeBlur={onSectionChange}
        className="text-[#854739] p-5  text-xl md:text-[80px] font-chamon font-bold"
      />
    </div>
  </div>

  {/* Địa điểm */}
  <EditableField
    id={`invite-location-${id}`}
    initialValue={locationdemo}
    name="locationdemo"
    disabled={disabled}
    onChangeBlur={onSectionChange}
    className="md:mt-8 mt-1 text-[#4B7264] font-bold md:text-[25px] text-[14px] font-aleo"
  />

  {/* Nút hành động */}
  <div className="absolute -bottom-[85px] flex justify-center gap-4">
    <button className="bg-[#4B7264] text-[#FFFEFB] px-4 p-3 md:w-[244px] font-aleo rounded-full text-sm md:text-base">
      GỬI LỜI CHÚC
    </button>
    <button className="bg-[#B1D26D] text-[#FFFEFB] px-4 p-3 md:w-[244px] font-aleo rounded-full text-sm md:text-base">
      XÁC NHẬN THAM DỰ
    </button>
  </div>
</div>


  {/* Ảnh nền trang trí dưới cùng (đã có sẵn)
  <img
    src="/nen-duoi.png" // ← ảnh nền dưới cùng bạn đã có
    alt="Nền dưới"
    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[577.2px] h-auto z-0"
  /> */}
</div>




    </div>
  </div>
   

</section>

</>

    )
}

export default Invitation