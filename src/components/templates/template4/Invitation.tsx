import React, { ChangeEvent, useState } from "react";
import { availableColorsTemplate4 } from "../../../config";
import Deco1 from "../../../assets/images/templates/template4/invitationDeco1.png";
import Deco2 from "../../../assets/images/templates/template4/invitationDeco2.png";
import Deco3 from "../../../assets/images/templates/template4/invitationDeco3.png";

import Picture1 from "../../../assets/images/templates/template4/picture1.jpg";
import EditableField from "../../common/EditableField";
import { MdKeyboardArrowDown } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api.config";
import RichImageEditor from "../../common/RichImageEditor";

export interface InviGuestProps {
  name: string;
  phone: number;
  isAttending: boolean;
  isCeremony: boolean;
  isWedding: boolean;
  moreOne: boolean;
}
export interface InvitationProps {
  date: string;
  description: string;
  title: string;
  address: string;
  user_id: number;
  theme_id: number;
}

interface InvitationSectionProps extends InvitationProps {
  id: string;
  style: number;
  disabled?: boolean;
  titleFont: string;
  contentFont: string;
  image?: File;
  congratulations: InviGuestProps;
   onSectionChange: (name: string, newValue: string | File | InvitationProps | InviGuestProps) => void;
}

const Invitation: React.FC<InvitationSectionProps> = ({
  id,
  date,
  style,
  title,
  disabled,
  description,
  address,
  user_id,
  theme_id,
  image,
  onSectionChange,
  congratulations,
  titleFont,
  contentFont,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
  const decos: string[] = [Deco1, Deco2, Deco3];
  const [dataGuest, setDataGuest] = useState<InviGuestProps>({
    name: congratulations.name,
    phone: congratulations.phone,
    isAttending: congratulations.isAttending,
    isCeremony: congratulations.isCeremony,
    isWedding: congratulations.isWedding,
    moreOne: congratulations.moreOne,
  });
  const scrollInView = (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    const section = document.getElementById("coDien-message-id");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
        
                toast.success("Xác nhận tham dự thành công!");
                console.log("Dữ liệu xác nhận:", response.data);
            } catch (error) {
                console.error("Lỗi gửi xác nhận:", error);
                toast.error("Chỉ khách mời mới có thể gửi lời chúc.");
            }
        };
        
           const handleConfirm = async () => {
            setIsOpen(false);
            onSectionChange("congratulations", dataGuest); 
            await confirmAttendance();
        }
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };
  return (
    <section
      className={`relative bg-white`}
      style={{ background: availableColorsTemplate4[style][2] }}
    >
      <section className="max-w-9xl mx-auto px-[15px] md:px-[85px] md:py-[120px] relative grid md:grid-cols-2 gap-[30px] font-pacifico">
        <div className=" flex flex-col justify-center items-center text-center">
          {/* <img
            className="w-[526px] h-[200px] md:h-[350px] rounded-xl rotate-[-3.45deg] translate-y-10"
            src={Picture1}
          /> */}
           <RichImageEditor 
                                id={`imageBanner-${id}`}
                                name='image'
                                src={image ? `${API_BASE_URL}${image}` : Picture1}
                                alt="Wedding couple"
                                classNameImage='w-[526px] h-[200px] md:h-[350px] rounded-xl rotate-[-3.45deg] translate-y-10'
                                // className="absolute top-6 md:top-10 left-4 md:left-7 rounded w-[90%]  h-[90%]"
                                onChange={onSectionChange}
                                toolbarPosition="top"
                                disabled={disabled}
                            />
          <div className="md:min-w-[620px] p-2 bg-white md:px-[58px] md:py-[18px] rounded-xl shadow-md z-30">
            <EditableField
              id={`invite-date-${id}`}
              initialValue={date}
              name="date"
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-[48px] md:text-[64px]"
              styleThemes={{ color: availableColorsTemplate4[style][0] }}
            />
            <EditableField
              id={`invite-address-${id}`}
              initialValue={address}
              name="address"
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-2xl text-[18px] md:text-2xl"
              styleThemes={{ color: availableColorsTemplate4[style][1] }}
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col">
          <img src={decos[style]} />
          <EditableField
            id={`invite-title-${id}`}
            name="title"
            initialValue={title}
            disabled={disabled}
            className="text-[40px] md:text-[52px] mt-4"
            onChangeBlur={onSectionChange}
            styleThemes={{
              fontFamily: titleFont,
              color: availableColorsTemplate4[style][1],
              lineHeight:  "2",
            }}
          />
          <EditableField
            id={`invite-description-${id}`}
            initialValue={description}
            name="description"
            disabled={disabled}
            onChangeBlur={onSectionChange}
            className="text-dark-100 text-center font-beVietnamPro mt-4"
            styleThemes={{ fontFamily: contentFont }}
          />
          <div className="md:min-w-[580px] w-full flex md:flex-row flex-col justify-center items-center gap-4 md:gap-10 mt-10">
            <button
              className="w-full text-lg text-white px-6 py-4 rounded-full"
              onClick={scrollInView}
              style={{ background: availableColorsTemplate4[style][1] }}
            >
              Gửi lời chúc
            </button>
            <button
              className="w-full text-lg text-white px-6 py-4 rounded-full"
              onClick={() => setIsOpen(true)}
              style={{ background: availableColorsTemplate4[style][0] }}
            >
              Xác nhận tham dự
            </button>
          </div>
        </div>
      </section>
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033] bg-opacity-20 overflow-hidden font-svn-sans"
        >
          <div
            className={`relative w-full max-w-[836px] space-y-[60px] bg-default-coba h-[632px] shadow-lg px-[15px] py-10 md:px-[108px] md:py-16 text-center`}
          >
            <h1
              className="text-title-coba-mobile full:text-[60px] full:leading-[73px] drop-shadow-3d font-bold tracking-wide"
              style={{
                textShadow:
                  "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white",
                color: availableColorsTemplate4[style][0],
              }}
            >
              Xác nhận tham dự
            </h1>
            {/* Form confirm   */}
            <div className="space-y-10">
              <div className="space-y-6">
                <input
                  name="name"
                  placeholder="Tên của bạn *"
                  value={dataGuest.name}
                  className="bg-transparent w-full h-12 ps-4 border-[1px] border-dark-300"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDataGuest((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  name="phone"
                  value={dataGuest.phone}
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDataGuest((prev) => ({
                      ...prev,
                      phone: Number(e.target.value),
                    }))
                  }
                  placeholder="Số điện thoại của bạn *"
                  className="bg-transparent w-full h-12 ps-4 border-[1px] border-dark-300"
                />
                <div className="space-y-4 text-start">
                  <p className="text-dark-400 font-bold">
                    Sự kiện bạn sẽ tham gia{" "}
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-[11p]">
                      <input
                        type="checkbox"
                        name="isWedding"
                        checked={dataGuest.isWedding}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setDataGuest((prev) => ({
                            ...prev,
                            isWedding: e.target.checked,
                          }))
                        }
                      />
                      <p>Lễ thành hôn</p>
                    </label>
                    <label className="flex items-center gap-[11p]">
                      <input
                        name="isCeremony"
                        checked={dataGuest.isCeremony}
                        type="checkbox"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setDataGuest((prev) => ({
                            ...prev,
                            isCeremony: e.target.checked,
                          }))
                        }
                      />
                      <p>Lễ vu quy</p>
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <input
                    className="bg-transparent w-full h-12 ps-4 border-[1px] border-dark-300"
                    name="moreOne"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setDataGuest((prev) => ({
                        ...prev,
                        moreOne: e.target.value === "Có",
                      }))
                    }
                    value={dataGuest.moreOne ? "Có" : "Không"}
                    disabled
                    placeholder=" bạn có người đi cùng không *"
                  />
                  <MdKeyboardArrowDown
                    onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                    size={30}
                    className={`absolute right-2 top-2 cursor-pointer transition-transform ${
                      isOpenDropDown ? "rotate-180" : ""
                    }`}
                  />
                  {isOpenDropDown && (
                    <div className="absolute w-full  items-center">
                      <button
                        onClick={() =>
                          setDataGuest((prev) => ({ ...prev, moreOne: true }))
                        }
                        className="bg-white w-full h-12 p-3 text-start border-[1px] border-dark-300"
                      >
                        Có
                      </button>
                      <button
                        onClick={() =>
                          setDataGuest((prev) => ({ ...prev, moreOne: false }))
                        }
                        className="bg-white w-full h-12 p-3 text-start border-[1px] border-dark-300"
                      >
                        Không
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleConfirm}
                style={{ backgroundColor: availableColorsTemplate4[style][0] }}
                className="uppercase text-[#EEDED1] px-[15px] py-4 font-bold text-base w-full md:w-[406px]"
              >
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Invitation;
