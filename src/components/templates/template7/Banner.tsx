import React from "react";
import BannerImage1 from "../../../assets/images/templates/template7/banner/bg1.png";
import BannerImage2 from "../../../assets/images/templates/template7/banner/bg2.png";
import BannerImage3 from "../../../assets/images/templates/template7/banner/bg3.png";

import Image1 from "../../../assets/images/templates/template7/banner/image1.png";
import Image2 from "../../../assets/images/templates/template7/banner/image2.png";
import Image3 from "../../../assets/images/templates/template7/banner/image3.png";

import BannerDeco1 from "../../../assets/images/templates/template7/banner/deco1.png";
import BannerDeco2 from "../../../assets/images/templates/template7/banner/deco2.png";
import BannerDeco3 from "../../../assets/images/templates/template7/banner/deco3.png";
import { availableColorsTemplate7 } from "../../../config";
import { API_BASE_URL } from "../../../config/api.config";
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
  const decos: string[] = [BannerDeco1, BannerDeco2, BannerDeco3];
  const background: string[] = [BannerImage1, BannerImage2, BannerImage3];
  const images: string[] = [Image1, Image2, Image3];
  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={`relative h-[80vh] font-meowScript`}
    >
      <img
        src={props.image ? `${API_BASE_URL}/${props.image}` : background[style]}
        className="absolute z-0 w-full h-full object-cover object-bottom"
      />
      <section
        className="max-w-9xl grid md:grid-cols-2 gap-[30px] justify-center items-center mx-auto h-full"
        style={{
          color: availableColorsTemplate7[style][0],
        }}
      >
        <div className="md:pt-[161px] md:w-[512px] w-full mx-auto z-10">
          <h3
            className="text-2xl font-montserrat italic mt-2"
            style={{
              color: availableColorsTemplate7[style][1],
            }}
          >
            Chúng tôi cưới
          </h3>
          <div className="text-[70px] md:text-[90px] mt-[20px]">
            <div className="flex justify-start w-full">
              <EditableField
                initialValue={props.groom}
                name="groom"
                id={`banner-groom-${id}`}
                disabled={disabled}
                onChangeBlur={onSectionChange}
                className="font-meowScript"
                styleThemes={{ fontFamily: titleFont }}
              />
            </div>
            <div className="flex justify-end -translate-y-10">
              <EditableField
                initialValue={props.bride}
                name="bride"
                id={`banner-bridge-${id}`}
                disabled={disabled}
                onChangeBlur={onSectionChange}
                className="font-meowScript md:pr-[15px]"
                styleThemes={{ fontFamily: titleFont, lineHeight: "1.6"}}
              />
            </div>
          </div>
          <div className="absolute top-[32%] md:top-[75%] md:bottom-0">
            <img src={decos[style]} />
            <div className="absolute top-14 left-20 rotate-[11.48deg] ">
              <EditableField
                initialValue={props.date}
                name="date"
                id={`banner-date-${id}`}
                disabled={disabled}
                onChangeBlur={onSectionChange}
                styleThemes={{
                  fontFamily: contentFont,
                }}
                className="uppercase text-2xl text-white font-montserrat"
              />
            </div>
          </div>
        </div>
        <div className="relative w-full h-full flex justify-start items-end">
          <img src={images[style]} className="w-auto h-auto" />
        </div>
      </section>
    </section>
  );
};

export default Banner;
