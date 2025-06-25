import React, { ChangeEvent, useEffect, useState } from 'react';
import EditableField from '../../common/EditableField';
import IconSectionImage from '../../../assets/images/templates/template1/iconSectionWhite.svg';
import IconDeco from '../../../assets/images/templates/template1/iconInvitation.svg';
import Each from '../../../layouts/Each';
import IconLeaves from '../../../assets/images/templates/template1/leavesIcon.svg';
import EventBg from '../../../assets/images/templates/template1/eventBg.webp';
import ButtonTemplate from './ButtonTemplate';
import { scrollInView } from '../../../utils';
import { MdKeyboardArrowDown } from 'react-icons/md';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api.config';

export interface InvitationProps {
  bridge?: string;
  groom?: string;
  date: string;
  description: string;
  title: string;
}

export interface InviGuestProps {
  name: string;
  phone: string;
  isAttending: boolean;
  isCeremony: boolean;
  isWedding: boolean;
  moreOne: boolean;
}

interface InvitationSectionProps extends InvitationProps {
  id: string;
  style: number;
  disabled?: boolean;
  titleFont: string;
  contentFont: string;
  user_id?: number; // Added for API payload
  theme_id?: number; // Added for API payload
  onSectionChange: (name: string, newValue: string | File | InviGuestProps) => void;
}

const Invitation: React.FC<InvitationSectionProps> = ({
  id,
  bridge,
  groom,
  date,
  title,
  disabled,
  description,
  onSectionChange,
  titleFont,
  contentFont,
  user_id,
  theme_id,
}) => {
  const titleDate: string[] = ['Ngày', 'Giờ', 'Phút', 'Giây'];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const [dataGuest, setDataGuest] = useState<InviGuestProps>({
    name: '',
    phone: '',
    isAttending: false,
    isCeremony: false,
    isWedding: false,
    moreOne: false,
  });

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
        throw new Error('Xác nhận thất bại');
      }
      toast.success('Xác nhận tham dự thành công!', {
        iconTheme: {
          primary: 'rgb(237,131,131)',
          secondary: '#ffffff',
        },
      });
    //   console.log('Dữ liệu xác nhận:', response.data);
    } catch (error) {
      console.error('Lỗi gửi xác nhận:', error);
      toast.error('Chỉ khách mời mới có thể gửi xác nhận tham dự.');
    }
  };

  const handleConfirm = async () => {
    setIsOpen(false);
    onSectionChange('congratulations', dataGuest);
    await confirmAttendance();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

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
  }, [isOpen]);

  return (
    <section
      style={{ background: `url(${EventBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      className="relative pt-[170px] pb-[130px]"
    >
      <div className="bg-[#ee8584] opacity-30 z-0 w-full h-full absolute top-0"></div>
      <section className="max-w-9xl mx-auto flex flex-col justify-center items-center text-white pb-[130px]">
        <EditableField
          id={`invite-title-${id}`}
          name="title"
          initialValue={title}
          disabled={disabled}
          className="w-full text-[42pt] font-marmelad"
          onChangeBlur={onSectionChange}
          styleThemes={{ fontFamily: titleFont }}
        />
        <img className="mb-[70px] z-10" src={IconSectionImage} alt="icon section image" />
        <div className="relative max-w-[856px] mb-[70px] mx-10 md:mx-0">
          <div className="border-[1px] absolute top-0 left-3 w-[96%] h-full border-white"></div>
          <div className="border-[1px] absolute top-3 w-full h-[97%] border-white"></div>
          <div className="grid md:grid-cols-2 m-3">
            <div className="relative px-5 py-[30px]">
              <img src={IconLeaves} alt="icon leaves" className="absolute top-20 right-0" />
              <img src={IconLeaves} alt="icon leaves" className="absolute bottom-20 rotate-180" />
              <div className="text-[70pt] px-[80px] py-[130px] text-center font-marmelad leading-none">
                <h1>Save </h1>
                <p className="text-[16pt]">The</p>
                <h1> Date</h1>
              </div>
            </div>
            <div className="px-6 py-10 bg-[#ee8584] text-white flex flex-col justify-center items-center">
              <div className="text-[2.5rem] text-center leading-none mb-4">
                <EditableField
                  id={`invite-groom-${id}`}
                  initialValue={groom}
                  name="groom"
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                />
                <p className="text-[16pt]">&</p>
                <EditableField
                  id={`invite-bridge-${id}`}
                  initialValue={bridge}
                  name="bridge"
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                />
              </div>
              <EditableField
                id={`invite-description-${id}`}
                initialValue={description}
                name="description"
                disabled={disabled}
                styleThemes={{ fontFamily: contentFont }}
                onChangeBlur={onSectionChange}
                className="text-center"
              />
              <ButtonTemplate onClick={(e) => scrollInView(e, 'message-section')}>
                Gửi lời chúc
              </ButtonTemplate>
              <ButtonTemplate onClick={() => setIsOpen(true)}>
                Xác nhận tham dự
              </ButtonTemplate>
              <img src={IconDeco} alt="icon deco" className="mt-5" />
              <EditableField
                id={`invite-date-${id}`}
                initialValue={date}
                name="date"
                onChangeBlur={onSectionChange}
                className="text-[20pt] py-5 font-marmelad"
              />
              <img src={IconDeco} alt="icon deco" className="mb-5 rotate-180" />
              <div className="flex font-marmelad w-full">
                <Each
                  of={[10, 15, 3, 5]}
                  render={(item: number, index: number) => (
                    <div className="flex-1 flex flex-col justify-center items-center font-light">
                      <p className="text-[40pt]">{item}</p>
                      <p className="text-[11pt]">{titleDate[index]}</p>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="absolute bottom-0 w-full h-0 border-l-[100vw] border-l-transparent border-r-0 border-b-[150px] border-b-white z-20"></div>

      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033] bg-opacity-20 overflow-hidden font-svn-sans"
        >
          <div className="relative w-full max-w-[836px] space-y-[60px] bg-[#ee8584] h-[632px] shadow-lg px-[15px] py-10 md:px-[108px] md:py-16 text-center text-white">
            <h1
              className="text-[42pt] font-marmelad tracking-wide"
              style={{ textShadow: '-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white' }}
            >
              Xác nhận tham dự
            </h1>
            <div className="space-y-10">
              <div className="space-y-6">
                <input
                  name="name"
                  placeholder="Tên của bạn *"
                  value={dataGuest.name}
                  className="bg-transparent w-full h-12 ps-4 border-[1px] border-white text-white placeholder-white"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                  name="phone"
                  value={dataGuest.phone}
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDataGuest((prev) => ({ ...prev, phone: String(e.target.value) }))}
                  placeholder="Số điện thoại của bạn *"
                  className="bg-transparent w-full h-12 ps-4 border-[1px] border-white text-white placeholder-white"
                />
                <div className="space-y-4 text-start">
                  <p className="font-bold">Sự kiện bạn sẽ tham gia</p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-[11px]">
                      <input
                        type="checkbox"
                        name="isWedding"
                        checked={!!dataGuest.isWedding}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const updated = { ...dataGuest, isWedding: e.target.checked };
                          setDataGuest(updated);
                        //   console.log('Dữ liệu sau khi chọn Lễ thành hôn:', updated);
                        }}
                      />
                      <p>Lễ thành hôn</p>
                    </label>
                    <label className="flex items-center gap-[11px]">
                      <input
                        type="checkbox"
                        name="isCeremony"
                        checked={!!dataGuest.isCeremony}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const updated = { ...dataGuest, isCeremony: e.target.checked };
                          setDataGuest(updated);
                        //   console.log('Dữ liệu sau khi chọn Lễ vu quy:', updated);
                        }}
                      />
                      <p>Lễ vu quy</p>
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <input
                    className="bg-transparent w-full h-12 ps-4 border-[1px] border-white cursor-pointer text-white placeholder-white"
                    name="moreOne"
                    value={dataGuest.moreOne ? 'Có' : 'Không'}
                    readOnly
                    placeholder="Bạn có người đi cùng không *"
                    onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                  />
                  <MdKeyboardArrowDown
                    onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                    size={30}
                    className={`absolute right-2 top-2 cursor-pointer transition-transform text-white ${isOpenDropDown ? 'rotate-180' : ''}`}
                  />
                  {isOpenDropDown && (
                    <div className="absolute w-full items-center z-10">
                      <button
                        type="button"
                        onClick={() => {
                          setDataGuest((prev) => ({ ...prev, moreOne: true }));
                          setIsOpenDropDown(false);
                        }}
                        className="bg-white w-full h-12 p-3 text-start border-[1px] border-dark-300 text-dark-400"
                      >
                        Có
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDataGuest((prev) => ({ ...prev, moreOne: false }));
                          setIsOpenDropDown(false);
                        }}
                        className="bg-white w-full h-12 p-3 text-start border-[1px] border-dark-300 text-dark-400"
                      >
                        Không
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <ButtonTemplate onClick={handleConfirm}>Xác Nhận</ButtonTemplate>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Invitation;