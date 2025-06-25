import React from "react";
import { availableColorsTemplate7 } from "../../../config";

import Background1 from "../../../assets/images/templates/template7/introduction/bg1.png";
import Background2 from "../../../assets/images/templates/template7/introduction/bg2.png";
import Background3 from "../../../assets/images/templates/template7/introduction/bg3.png";

import GroomImage1 from "../../../assets/images/templates/template7/introduction/groom1.png";
// import GroomImage2 from "../../../assets/images/templates/template7/introduction/groom2.png";
// import GroomImage3 from "../../../assets/images/templates/template7/introduction/groom3.png";

import BrideImage1 from "../../../assets/images/templates/template7/introduction/bride1.png";
// import BrideImage2 from "../../../assets/images/templates/template7/introduction/bride2.png";
// import BrideImage3 from "../../../assets/images/templates/template7/introduction/bride3.png";

import Deco1 from "../../../assets/images/templates/template7/introduction/deco1.png";
import Deco2 from "../../../assets/images/templates/template7/introduction/deco2.png";
import Deco3 from "../../../assets/images/templates/template7/introduction/deco3.png";

import RichImageEditor from "../../common/RichImageEditor";
import { API_BASE_URL } from "../../../config/api.config";
import EditableField from "../../common/EditableField";

export interface IntroductionProps {
  nameGroom: string;
  nameBride: string;
  imageBride?: File | string;
  imageGroom?: File | string;
  contentBride: string;
  contentGroom: string;
}

interface IntroductionSectionProps extends IntroductionProps {
  id: string;
  style: number;
  titleFont: string;
  contentFont: string;
  disabled?: boolean;
  code: string;
  onSectionChange: (name: string, newValue: string | File) => void;
}

const Introduction: React.FC<IntroductionSectionProps> = ({
  id,
  nameBride,
  nameGroom,
  contentBride,
  contentGroom,
  imageBride,
  imageGroom,
  style,
  titleFont,
  contentFont,
  disabled = false,
  onSectionChange,
}) => {
  const bg: string[] = [Background1, Background2, Background3];
  // const groomImages: string[] = [GroomImage1, GroomImage2, GroomImage3];
  // const brideImages: string[] = [BrideImage1, BrideImage2, BrideImage3];
  const decos: string[] = [Deco1, Deco2, Deco3];
  return (
    <section
      className={`relative font-meowScript`}
      style={{
        backgroundImage: `url(${bg[style]})`,
        backgroundPosition: "bottom",
      }}
    >
      <section className="max-w-9xl mx-auto px-[15px] md:px-[85px] py-[160px] relative space-y-[56px] md:space-y-[215px]">
        <div className="w-full flex md:flex-row flex-col justify-center gap-[34px] items-center">
          <div className="max-w-[509px] justify-center items-center">
            <div className="space-y-2">
              <p
                className="uppercase text-2xl font-montserrat"
                style={{ color: availableColorsTemplate7[style][1] }}
              >
                Chú rể
              </p>
              <EditableField
                id={`introduction-nameGroom-${id}`}
                initialValue={nameGroom}
                name="nameGroom"
                disabled={disabled}
                onChangeBlur={onSectionChange}
                className="text-[56px] md:text-[80px]"
                styleThemes={{
                  fontFamily: titleFont,
                  color: availableColorsTemplate7[style][0],
                }}
              />
            </div>
            <EditableField
              id={`introduction-contentGroom-${id}`}
              initialValue={contentGroom}
              name="contentGroom"
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-[#8C8C8C] text-base mt-6 font-montserrat max-w-[445px] mr-[64px]"
              styleThemes={{ fontFamily: contentFont }}
            />
          </div>
          <div className="relative flex flex-col justify-center items-center">
            <RichImageEditor
              id={`introduction-imageGroom`}
              name="imageGroom"
              alt="Wedding couple"
              onChange={onSectionChange}
              src={
                imageGroom ? `${API_BASE_URL}${imageGroom}` : GroomImage1
              }
              className="rounded-[20px] w-[240px] h-[290px] md:h-[491px] md:w-[404px] "
              classNameImage="rounded-[20px] border-1 p-1"
              style={{ borderColor: availableColorsTemplate7[style][1], padding:0 }}
              disabled={disabled}
            >
              <img
                src={decos[style]}
                className="absolute z-30 min-w-[345px] md:!min-w-[620px] -left-14 md:-left-24 -bottom-12 md:-bottom-24"
              />
              <p className="absolute left-2 md:left-10 -bottom-4 md:-bottom-9 z-30 italic text-white text-[12px] md:text-[20px] font-montserrat max-w-[250px] md:max-w-[371px] mx-auto">Ngày cưới là sự khởi đầu của một hành trình mới của chúng tôi</p>
            </RichImageEditor>
          </div>
        </div>

        <div className="w-full flex md:flex-row flex-col justify-center gap-[34px] items-center">
          <div className="relative flex flex-col justify-center items-center">
            <RichImageEditor
              id={`introduction-imageBride`}
              name="imageBride"
              alt="Wedding couple"
              onChange={onSectionChange}
              src={
                imageBride ? `${API_BASE_URL}${imageBride}` : BrideImage1
              }
              className="rounded-[20px] w-[240px] h-[290px] md:h-[491px] md:w-[404px] "
              classNameImage="rounded-[20px] border-1 p-1"
              style={{ borderColor: availableColorsTemplate7[style][1], padding:0 }}
              disabled={disabled}
            >
              <img
                src={decos[style]}
                className="absolute z-20 min-w-[345px] md:!min-w-[620px] -left-14 md:-left-24 -bottom-12 md:-bottom-24"
              />
              <p className="absolute left-2 md:left-10 -bottom-4 md:-bottom-9 z-30 italic text-white text-[12px] md:text-[20px] font-montserrat max-w-[250px] md:max-w-[371px] mx-auto">Ngày cưới là sự khởi đầu của một hành trình mới của chúng tôi</p>
            </RichImageEditor>
          </div>
          <div className="pt-[50px] md:pt-auto max-w-[509px] justify-center items-center">
            <div className="space-y-2">
              <p
                className="uppercase text-2xl font-montserrat"
                style={{ color: availableColorsTemplate7[style][1] }}
              >
                Cô dâu
              </p>
              <EditableField
                id={`introduction-nameBride-${id}`}
                initialValue={nameBride}
                name="nameBride"
                disabled={disabled}
                onChangeBlur={onSectionChange}
                className="text-[56px] md:text-[80px]"
                styleThemes={{
                  fontFamily: titleFont,
                  color: availableColorsTemplate7[style][0],
                }}
              />
            </div>
            <EditableField
              id={`introduction-contentBride-${id}`}
              initialValue={contentBride}
              name="contentBride"
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-[#8C8C8C] text-base mt-6 font-montserrat max-w-[445px] mr-[64px]"
              styleThemes={{ fontFamily: contentFont }}
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Introduction;
