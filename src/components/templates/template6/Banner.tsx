import React from "react";
import BannerImage1 from "../../../assets/images/templates/template6/BannerImage1.png";
import BannerImage2 from "../../../assets/images/templates/template6/BannerImage2.jpg";
import BannerImage3 from "../../../assets/images/templates/template6/BannerImage3.jpg";
import Image1 from "../../../assets/images/templates/template6/banner-2.png";
import Image2 from "../../../assets/images/templates/template6/banner-1.jpg";
import { availableColorsTemplate6 } from "../../../config";
import { API_BASE_URL } from "../../../config/api.config";

import DateBg1 from "../../../assets/images/templates/template6/bg-date-banner-1.png";
import DateBg2 from "../../../assets/images/templates/template6/bg-date-banner-2.png";
import DateBg3 from "../../../assets/images/templates/template6/bg-date-banner-3.png";

import DecoLeft1 from "../../../assets/images/templates/template6/banner/decoLeft1.png";
import DecoLeft2 from "../../../assets/images/templates/template6/banner/decoLeft2.png";
import DecoLeft3 from "../../../assets/images/templates/template6/banner/decoLeft3.png";

import DecoRight1 from "../../../assets/images/templates/template6/banner/decoRight1.png";
import DecoRight2 from "../../../assets/images/templates/template6/banner/decoRight2.png";
import DecoRight3 from "../../../assets/images/templates/template6/banner/decoRight3.png";

import { FaUpload } from "react-icons/fa";
import EditableField from "../../common/EditableField";
import RichImageEditor from "../../common/RichImageEditor";

export interface BannerProps {
  bride: string;
  groom: string;
  image?: File;
  imageBanner1?: string;
  imageBanner2?: string;
  date: string;
}

interface BannerSectionProps extends BannerProps {
  id: string;
  disabled?: boolean;
  titleFont?: string;
  contentFont?: string;
  style: number;
  onSectionChange: (name: string, newValue: string | File) => void;
}

const Banner: React.FC<BannerSectionProps> = ({
  id,
  disabled,
  style,
  imageBanner1,
  imageBanner2,
  onSectionChange,
  titleFont,
  contentFont,
  ...props
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const background: string[] = [BannerImage1, BannerImage2, BannerImage3];
  const backgroundDate: string[] = [DateBg1, DateBg2, DateBg3];
  const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
  const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setPreview(URL.createObjectURL(file));
      onSectionChange("image", file);
    }
  };
  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={`relative font-EncodeSans h-full `}
      style={{
        backgroundImage: `url(${
          preview
            ? preview
            : props.image
            ? `${API_BASE_URL}/${props.image}`
            : background[style]
        })`,
      }}
    >
      <div>
        {disabled ? null : (
          <label
            htmlFor="file-input"
            className="absolute hidden z-10 opacity-70 hover:opacity-100 transition-opacity duration-300 top-36 right-10 w-32s  justify-center items-center rounded-lg h-11 cursor-pointer bg-white "
          >
            <FaUpload />
            Tải Ảnh
          </label>
        )}
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleUploadImage}
        />
      </div>
      <section
        className="max-h-[745px] w-full grid md:grid-cols-[1fr,2fr,1fr]"
        style={{
          color: availableColorsTemplate6[style][0],
        }}
      >
       <RichImageEditor
          id="banner-image-1"
          name="bannerImage1"
          alt="Banner image 1"
          src={imageBanner1 ? `${API_BASE_URL}${imageBanner1}` : Image1}
          onChange={onSectionChange}
          className="md:block hidden  w-full  object-cover  "
          classNameImage="!p-0 object-cover max-h-[745px]"
          disabled={disabled}
        />

        <div className="relative flex flex-col justify-between items-center px-[30px] h-full pt-[88px] md:pt-[225px] pb-[84px]">
          <img
            src={decoLefts[style]}
            className="absolute left-0 bottom-0 md:w-fit md:h-fit w-[131px] h-[184px]"
          />
          <img
            src={decoRights[style]}
            className="absolute right-0 top-0 md:top-[140px] md:w-fit md:h-fit w-[131px] h-[184px]"
          />

          <h3
            className="text-base md:text-2xl uppercase z-40 mt-6"
            style={{
              color: availableColorsTemplate6[style][0],
            }}
          >
            Chúng tôi cưới
          </h3>
          <div className="text-[40px] md:text-[64px] lg:w-[620px] mt-[56px] md:mt-[14px] text-center font-CormorantUnicase leading-none uppercase">
            <EditableField
              initialValue={props.groom}
              name="groom"
              id={`banner-groom-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              styleThemes={{ fontFamily: titleFont }}
            />
            <p
              className="h-[50px] font-Corinthia text-[96px]"
              style={{
                color: availableColorsTemplate6[style][1],
              }}
            >
              &
            </p>
            <EditableField
              initialValue={props.bride}
              name="bride"
              id={`banner-bridge-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              styleThemes={{ fontFamily: titleFont, lineHeight: "1.6" }}
            />
          </div>
          <div className="relative px-[41px] md:px-[92px] pt-[15px] pb-[22px] mb-2 rounded-[14px] mt-[38px] z-10">
            <img
              src={backgroundDate[style]}
              alt="Background date"
              className="absolute top-0 left-5 w-full md:w-[368px] h-[111px] rotate-180 opacity-30"
            />
            <EditableField
              initialValue={props.date}
              name="date"
              id={`banner-date-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              styleThemes={{
                fontFamily: contentFont,
                color: availableColorsTemplate6[style][0],
              }}
              className="uppercase md:text-[48px] font-bold text-[48px] font-CormorantUnicase"
            />
          </div>
        </div>
        <div className="md:hidden mb-20 grid grid-cols-2 h-[367px]">
          <img
            src={imageBanner1 ? `${API_BASE_URL}${imageBanner1}` : Image1}
            alt="Banner image 2"
            className="w-full h-full object-cover  "
          />
          <img
            src={imageBanner2 ? `${API_BASE_URL}${imageBanner2}` : Image2}
            alt="Banner image 2"
            className="w-full h-full object-cover"
          />
        </div>
        <RichImageEditor
          id="banner-image-2"
          name="bannerImage2"
          alt="Banner image 2"
          src={imageBanner2 ? `${API_BASE_URL}${imageBanner2}` : Image2}
          onChange={onSectionChange}
          className="md:block hidden w-full object-cover"
          classNameImage="!p-0 object-cover max-h-[745px]"
          disabled={disabled}
        />
      </section>
    </section>
  );
};

export default Banner;
