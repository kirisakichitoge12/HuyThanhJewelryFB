import React from "react";
import { availableColorsTemplate6 } from "../../../config";
import GroomImage from "../../../assets/images/templates/template6/introduction/groom.jpg";
import BrideImage from "../../../assets/images/templates/template6/introduction/bride.jpg";

import BackgroundGroom1 from "../../../assets/images/templates/template6/introduction/bg-groom-1.png";
import BackgroundGroom2 from "../../../assets/images/templates/template6/introduction/bg-groom-2.png";
import BackgroundGroom3 from "../../../assets/images/templates/template6/introduction/bg-groom-3.png";

import BackgroundBride1 from "../../../assets/images/templates/template6/introduction/bg-bride-1.png";
import BackgroundBride2 from "../../../assets/images/templates/template6/introduction/bg-bride-2.png";
import BackgroundBride3 from "../../../assets/images/templates/template6/introduction/bg-bride-3.png";

import DecoLeft1 from "../../../assets/images/templates/template6/introduction/decoLeft1.png";
import DecoLeft2 from "../../../assets/images/templates/template6/introduction/decoLeft2.png";
import DecoLeft3 from "../../../assets/images/templates/template6/introduction/decoLeft3.png";

import DecoRight1 from "../../../assets/images/templates/template6/introduction/decoRight1.png";
import DecoRight2 from "../../../assets/images/templates/template6/introduction/decoRight2.png";
import DecoRight3 from "../../../assets/images/templates/template6/introduction/decoRight3.png";

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
  const bgGroom: string[] = [
    BackgroundGroom1,
    BackgroundGroom2,
    BackgroundGroom3,
  ];
  const bgBride: string[] = [
    BackgroundBride1,
    BackgroundBride2,
    BackgroundBride3,
  ];
  const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
  const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
  return (
    <section
      className={`relative`}
      style={{ background: availableColorsTemplate6[style][2] }}
    >
      <img src={decoLefts[style]} className="absolute bottom-0 left-0" />

      <img src={decoRights[style]} className="absolute top-0 right-0" />
      <section className="max-w-[837px] mx-auto py-[50px] px-[15px] md:py-[219px] relative space-y-[56px] md:space-y-[100px] font-CormorantUnicase">
        <div className="w-full flex flex-col md:grid md:grid-cols-2 items-center">
          <div className="relative w-full h-[422px] md:h-[487px]">
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
          <div className="w-full md:pl-[30px]">
            <div className="relative py-[37px] text-center">
              <img
                src={bgGroom[style]}
                className="absolute top-0 left-0 w-[454px] h-[200px] opacity-30"
              />
              <p
                className="uppercase text-base md:text-2xl font-EncodeSans relative"
                style={{ color: availableColorsTemplate6[style][0] }}
              >
                Chú rể
              </p>
              <EditableField
                id={`introduction-nameGroom-${id}`}
                initialValue={nameGroom}
                name="nameGroom"
                disabled={disabled}
                onChangeBlur={onSectionChange}
                className="text-[40px] md:text-[48px]  uppercase"
                styleThemes={{
                  fontFamily: titleFont,
                  color: availableColorsTemplate6[style][0],
                }}
              />
            </div>
            <EditableField
              id={`introduction-contentGroom-${id}`}
              initialValue={contentGroom}
              name="contentGroom"
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-dark-300 text-[16px] text-center font-beVietnamPro mt-[8px]"
              styleThemes={{ fontFamily: contentFont }}
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:grid md:grid-cols-2 items-center">
          <div className="w-full md:pr-[30px]">
            <div className="relative py-[37px] text-center">
              <img
                src={bgBride[style]}
                className="absolute top-0 left-0 w-[454px] h-[200px] opacity-30"
              />
              <p
                className="uppercase text-base md:text-2xl font-EncodeSans relative"
                style={{ color: availableColorsTemplate6[style][0] }}
              >
                Cô dâu
              </p>
              <EditableField
                id={`introduction-nameBride-${id}`}
                initialValue={nameBride}
                name="nameBride"
                disabled={disabled}
                onChangeBlur={onSectionChange}
                className="text-[40px] md:text-[48px] uppercase"
                styleThemes={{
                  fontFamily: titleFont,
                  color: availableColorsTemplate6[style][0],
                }}
              />
            </div>
            <EditableField
              id={`introduction-contentBride-${id}`}
              initialValue={contentBride}
              name="contentBride"
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-dark-300 text-[16px] text-center font-beVietnamPro mt-[8px]"
              styleThemes={{ fontFamily: contentFont }}
            />
          </div>
          <div className="relative w-full h-[422px] md:h-[487px]">
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
        </div>
      </section>
    </section>
  );
};

export default Introduction;
