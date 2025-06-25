import React from "react";
import { availableColorsTemplate6 } from "../../../config/index.tsx";
import EditableField from "../../common/EditableField.tsx";

import GroomImage from "../../../assets/images/templates/template6/introduction/groom.jpg";
import BrideImage from "../../../assets/images/templates/template6/introduction/bride.jpg";
import { API_BASE_URL } from "../../../config/api.config.ts";
import RichImageEditor from "../../common/RichImageEditor.tsx";

import GroomBank from "../../../assets/images/templates/template6/groomBank.png";
import BrideBank from "../../../assets/images/templates/template6/brideBank.png";

import BackgroundGroom1 from "../../../assets/images/templates/template6/bank/bg11.png";
import BackgroundGroom2 from "../../../assets/images/templates/template6/bank/bg21.png";
import BackgroundGroom3 from "../../../assets/images/templates/template6/bank/bg31.png";

import BackgroundBride1 from "../../../assets/images/templates/template6/bank/bg12.png";
import BackgroundBride2 from "../../../assets/images/templates/template6/bank/bg22.png";
import BackgroundBride3 from "../../../assets/images/templates/template6/bank/bg32.png";

import DecoLeft1 from "../../../assets/images/templates/template6/bank/decoLeft1.png";
import DecoLeft2 from "../../../assets/images/templates/template6/bank/decoLeft2.png";
import DecoLeft3 from "../../../assets/images/templates/template6/bank/decoLeft3.png";

import DecoRight1 from "../../../assets/images/templates/template6/bank/decoRight1.png";
import DecoRight2 from "../../../assets/images/templates/template6/bank/decoRight2.png";
import DecoRight3 from "../../../assets/images/templates/template6/bank/decoRight3.png";

import Background1 from "../../../assets/images/templates/template6/bank/background1.png";
import Background2 from "../../../assets/images/templates/template6/bank/background2.png";
import Background3 from "../../../assets/images/templates/template6/bank/background3.png";

export interface BankProps {
  title: string;
  description: string;
  nameBridge: string;
  bankNumberBridge: string;
  bankNameBridge: string;
  nameGroom: string;
  bankNumberGroom: string;
  bankNameGroom: string;
  imageGroom?: string | File;
  imageBride?: string | File;
  groomBank?: string | File;
  brideBank?: string | File;
}

interface BankSectionProps extends BankProps {
  id: string;
  titleFont: string;
  contentFont: string;
  disabled?: boolean;
  onSectionChange: (name: string, newValue: string | File) => void;
  style: number;
}

const BankSection: React.FC<BankSectionProps> = ({
  id,
  titleFont,
  contentFont,
  disabled,
  onSectionChange,
  style,
  imageGroom,
  imageBride,
  ...bankProps
}) => {
  const backgrounds: string[] = [Background1, Background2, Background3];
  const backgroundGroom: string[] = [
    BackgroundGroom1,
    BackgroundGroom2,
    BackgroundGroom3,
  ];
  const backgroundBride: string[] = [
    BackgroundBride1,
    BackgroundBride2,
    BackgroundBride3,
  ];
  const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
  const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
  return (
    <div
      className="w-full relative font-CormorantUnicase grid md:grid-cols-[1fr,2fr,1fr]"
      style={{ backgroundImage: `url(${backgrounds[style]})` }}
    >
      <RichImageEditor
        id={`introduction-imageGroom`}
        name="imageGroom"
        alt="Wedding couple"
        onChange={onSectionChange}
        src={imageGroom ? `${API_BASE_URL}${imageGroom}` : GroomImage}
        className="w-full h-full object-cover md:block hidden"
        disabled={disabled}
        toolbarPosition="top"
      />
      <section className="relative py-[50px] px-[15px] md:py-[130px] md:px-[30px]">
        <img
          src={decoLefts[style]}
          className="md:block  hidden absolute left-0 bottom-0 md:w-fit md:h-fit w-[131px] h-[184px]"
        />
        <img
          src={decoRights[style]}
          className="md:block  hidden absolute right-0 bottom-0  md:w-fit md:h-fit w-[131px] h-[184px]"
        />
        <div className="w-full flex flex-col justify-center items-center">
          <div
            className={
              "flex flex-col justify-center items-center text-center md:max-w-[620px]"
            }
          >
            <EditableField
              initialValue={bankProps.title}
              name="title"
              id={`title-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              styleThemes={{ color: availableColorsTemplate6[style][0] }}
              className="text-[40px] md:text-[48px] mt-4 mb-6"
            />
            <EditableField
              initialValue={bankProps.description}
              name="description"
              id={`description-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className="text-dark-200 text-base max-w-5/6 font-beVietnamPro"
            />
          </div>

          <div className="flex flex-col justify-between pt-16 gap-[32px] w-full">
            <div className="relative max-w-[594px] mx-auto grid grid-cols-[3fr,1fr] py-[31px] md:pr-[83px] md:my-10 md:ml-10 w-full font-EncodeSans z-30">
              <img
                src={backgroundGroom[style]}
                className="absolute top-0 left-0 w-full h-full object-fill opacity-80"
              />
              <div className="flex flex-col justify-center items-end">
                <h3
                  className="z-20 text-2xl text-right md:text-[24px]"
                  style={{ color: availableColorsTemplate6[style][0] }}
                >
                  Mừng cưới đến chú rể
                </h3>
                <EditableField
                  initialValue={bankProps.bankNameGroom}
                  name="bankNameGroom"
                  id={`bankNameGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-right text-[16px]"}
                />
                <EditableField
                  initialValue={bankProps.nameGroom}
                  name="nameGroom"
                  id={`nameGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-right text-[16px]"}
                />
                <EditableField
                  initialValue={bankProps.bankNumberGroom}
                  name="bankNumberGroom"
                  id={`bankNumberGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-right text-[16px]"}
                />
              </div>
              <RichImageEditor
                id={`introduction-groomBank`}
                name="groomBank"
                alt="Wedding couple"
                onChange={onSectionChange}
                src={
                  bankProps.groomBank
                    ? `${API_BASE_URL}${bankProps.groomBank}`
                    : GroomBank
                }
                className="size-[150px] md:size-[100px] object-cover"
                disabled={disabled}
                toolbarPosition="top"
              />
            </div>

            <div className="relative max-w-[594px] mx-auto grid grid-cols-[1fr,3fr] md:mr-[83px] md:my-10 md:ml-10 w-full py-[31px] font-EncodeSans z-30">
              <RichImageEditor
                id={`introduction-groomBank`}
                name="groomBank"
                alt="Wedding couple"
                onChange={onSectionChange}
                src={
                  bankProps.groomBank
                    ? `${API_BASE_URL}${bankProps.groomBank}`
                    : BrideBank
                }
                className="size-[150px] md:size-[100px] object-cover"
                disabled={disabled}
                toolbarPosition="top"
              />
              <img
                src={backgroundBride[style]}
                className="absolute top-0 left-0 w-full h-full object-fill opacity-30"
              />
              <div className="flex flex-col justify-center items-start"> 
                <h3
                  className="z-20 text-2xl text-left md:text-[24px]"
                  style={{ color: availableColorsTemplate6[style][0] }}
                >
                  Mừng cưới đến chú rể
                </h3>
                <EditableField
                  initialValue={bankProps.bankNumberBridge}
                  name="bankNameBridge"
                  id={`bankNameBridge-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-left text-[16px]"}
                />
                <EditableField
                  initialValue={bankProps.nameBridge}
                  name="nameBridge"
                  id={`nameBridge-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-left text-[16px]"}
                />
                <EditableField
                  initialValue={bankProps.bankNumberBridge}
                  name="bankNumberBridge"
                  id={`bankNumberBridge-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-left text-[16px]"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden flex w-[full]">
          <img
            src={imageGroom ? `${API_BASE_URL}${imageGroom}` : GroomImage}
            className="flex-1 w-[50%] object-cover h-[422px]"
          />
          <img
            src={imageBride ? `${API_BASE_URL}${imageBride}` : BrideImage}
            className="flex-1 w-[50%] object-cover h-[422px]"
          />
        </div>
      </section>
      <RichImageEditor
        id={`introduction-imageBride`}
        name="imageBride"
        alt="Wedding couple"
        onChange={onSectionChange}
        src={imageBride ? `${API_BASE_URL}${imageBride}` : BrideImage}
        className="w-full h-full object-cover md:block hidden"
        disabled={disabled}
        toolbarPosition="top"
      />
    </div>
  );
};

export default BankSection;
