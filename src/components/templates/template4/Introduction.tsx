import React from "react";
import { availableColorsTemplate4 } from "../../../config";
import GroomImage from "../../../assets/images/templates/codien/GroomImageright.jpg";
import BrideImage from "../../../assets/images/templates/codien/BrideImageleft.jpg";

import Background1 from "../../../assets/images/templates/template4/introductionBg1.png";
import Background2 from "../../../assets/images/templates/template4/introductionBg2.png";
import Background3 from "../../../assets/images/templates/template4/introductionBg3.png";

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
  const backgroundImages: string[] = [Background1, Background2, Background3];
  return (
    <section className={`relative`}>
      <img
        src={backgroundImages[style]}
        className="absolute z-0 w-full h-full object-cover"
      />
      <section
        className="max-w-9xl mx-auto px-[15px] md:px-[85px] py-[160px] relative font-beVietnamPro space-y-[56px] md:space-y-[100px]"
        style={{ color: availableColorsTemplate4[style][1] }}
      >
        <div className="w-full flex flex-col-reverse md:grid md:grid-cols-[2.5fr,1fr] items-center">
          <div
            className="w-full px-8 pb-10 pt-20 md:py-10 md:pl-8 md:pr-[160px] rounded-xl shadow md:translate-x-40"
            style={{ background: availableColorsTemplate4[style][2] }}
          >
            <div className="space-y-2">
              <p className="uppercase text-xl">Chú rể</p>
              <EditableField
                id={`introduction-nameGroom-${id}`}
                initialValue={nameGroom}
                name="nameGroom"
                disabled={disabled}
                onChangeBlur={onSectionChange}
                className="text-[40px] md:text-[52px]"
                styleThemes={{ fontFamily: titleFont || "pacifico" }}
              />
            </div>
            <EditableField
              id={`introduction-contentGroom-${id}`}
              initialValue={contentGroom}
              name="contentGroom"
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-dark-300 text-base mt-[10px]"
              styleThemes={{ fontFamily: contentFont }}
            />
          </div>
          <div className="relative w-[270px] md:w-[326px] h-[335px] md:h-[403px] rotate-[-5.23deg]">
            <RichImageEditor
              id={`introduction-imageGroom`}
              name="imageGroom"
              alt="Wedding couple"
              onChange={onSectionChange}
              src={imageGroom ? `${API_BASE_URL}${imageGroom}` : GroomImage}
              className="absolute w-full rounded-xl h-full object-cover object-top"
              classNameImage="rounded-xl"
              disabled={disabled}
            />
          </div>
        </div>

        <div className="w-full grid md:grid-cols-[1fr,2.5fr] items-center">
          <div className="relative w-[270px] md:w-[326px] h-[335px] md:h-[403px] rotate-[-5.23deg] z-10">
            <RichImageEditor
              id={`introduction-imageBride`}
              name="imageBride"
              alt="Wedding couple"
              onChange={onSectionChange}
              src={imageBride ? `${API_BASE_URL}${imageBride}` : BrideImage}
              className="absolute w-full rounded-xl h-full object-cover object-top"
              classNameImage="rounded-xl"
              disabled={disabled}
            />
          </div>
          <div
            className="w-full md:py-10 md:pr-8 md:pl-[160px] px-8 pb-10 pt-20s rounded-xl shadow md:-translate-x-40"
            style={{ background: availableColorsTemplate4[style][2] }}
          >
            <div className="space-y-2">
              <p className="uppercase text-xl">Cô dâu</p>
              <EditableField
                id={`introduction-nameBride-${id}`}
                initialValue={nameBride}
                name="nameBride"
                disabled={disabled}
                onChangeBlur={onSectionChange}
                className="text-[40px] md:text-[52px]"
                styleThemes={{ fontFamily: titleFont || "pacifico" }}
              />
            </div>
            <EditableField
              id={`introduction-contentBride-${id}`}
              initialValue={contentBride}
              name="contentBride"
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-dark-100 text-base mt-[10px]"
              styleThemes={{ fontFamily: contentFont }}
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Introduction;
