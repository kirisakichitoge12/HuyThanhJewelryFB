import React from "react";
import BannerImage1 from "../../../assets/images/templates/template4/bannerBg1.jpg";
import BannerImage2 from "../../../assets/images/templates/template4/bannerBg2.jpg";
import BannerImage3 from "../../../assets/images/templates/template4/bannerBg3.jpg";

import BannerDeco1 from "../../../assets/images/templates/template4/bannerDeco1.png";
import BannerDeco2 from "../../../assets/images/templates/template4/bannerDeco2.png";
import BannerDeco3 from "../../../assets/images/templates/template4/bannerDeco3.png";
import { availableColorsTemplate4 } from "../../../config";
import { API_BASE_URL } from "../../../config/api.config";
import { FaUpload } from "react-icons/fa";
import EditableField from "../../common/EditableField";

export interface BannerProps {
  bride: string;
  groom: string;
  image?: File;
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
  onSectionChange,
  titleFont,
  contentFont,
  ...props
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const decos: string[] = [BannerDeco1, BannerDeco2, BannerDeco3];
  const background: string[] = [BannerImage1, BannerImage2, BannerImage3];
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
      className={`relative`}
    >
      <img
        src={
          preview
            ? preview
            : props.image
            ? `${API_BASE_URL}/${props.image}`
            : background[style]
        }
        className="absolute w-full h-full object-cover"
      />
      <div>
        {disabled ? null : (
          <label
            htmlFor="file-input"
            className="absolute z-10 opacity-70 hover:opacity-100 transition-opacity duration-300 top-36 right-10 w-32s flex justify-center items-center rounded-lg h-11 cursor-pointer bg-white "
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
        className="max-w-9xl h-screen flex flex-col justify-center items-center mx-auto lg:w-[620px]"
        style={{
          color: availableColorsTemplate4[style][0],
        }}
      >
        <h3
          className="text-base md:text-2xl font-beVietnamPro uppercase z-40 mt-6"
          style={{
            color: availableColorsTemplate4[style][1],
          }}
        >
          Chúng tôi cưới
        </h3>
        <div className="text-[56px] md:text-[80px] font-pacifico lg:w-[620px] mt-[14px]">
          <div className="flex justify-start w-full">
            <EditableField
              initialValue={props.groom}
              name="groom"
              id={`banner-groom-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              styleThemes={{ fontFamily: titleFont }}
            />
          </div>
          <div className="flex justify-end items-center w-full relative md:flex-row flex-col-reverse">
            <img
              src={decos[style]}
              className="w-[151px] h-[119px] rotate-[-12.38deg]"
            />
            <EditableField
              initialValue={props.bride}
              name="bride"
              id={`banner-bridge-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              styleThemes={{ fontFamily: titleFont,lineHeight:  "1.6" }}
            />
          </div>
        </div>
        <div className="bg-white px-[63px] md:px-[92px] pt-[15px] pb-[22px] rounded-[14px] shadow-md mt-[38px] z-10">
          <EditableField
            initialValue={props.date}
            name="date"
            id={`banner-date-${id}`}
            disabled={disabled}
            onChangeBlur={onSectionChange}
            styleThemes={{ fontFamily: contentFont, color: availableColorsTemplate4[style][1] }}
            className="uppercase text-4xl font-pacifico"
          />
        </div>
        <div
          className="pt-9 px-[38px] pb-[25px] rounded-xl text-white text-[23px] font-pacifico rotate-[-3.79deg] -translate-y-5"
          style={{ backgroundColor: availableColorsTemplate4[style][0] }}
        >
          Save the date
        </div>
      </section>
    </section>
  );
};

export default Banner;
