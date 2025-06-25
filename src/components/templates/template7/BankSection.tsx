import React from "react";
import { availableColorsTemplate7 } from "../../../config/index.tsx";
import EditableField from "../../common/EditableField.tsx";

import Image1 from "../../../assets/images/templates/template7/bank/image1.png";
import Image2 from "../../../assets/images/templates/template7/bank/image2.png";
import Image3 from "../../../assets/images/templates/template7/bank/image3.png";

import Bg1 from "../../../assets/images/templates/template7/bank/bg1.png";
import Bg2 from "../../../assets/images/templates/template7/bank/bg2.png";
import Bg3 from "../../../assets/images/templates/template7/bank/bg3.png";

import Bank from "../../../assets/images/templates/template7/bank/bank.png";


import { API_BASE_URL } from "../../../config/api.config.ts";
import RichImageEditor from "../../common/RichImageEditor.tsx";

export interface BankProps {
  title: string;
  description: string;
  nameBridge: string;
  bankNumberBridge: string;
  bankNameBridge: string;
  nameGroom: string;
  groom: string;
  bride: string;
  bankNumberGroom: string;
  bankNameGroom: string;
  imageGroom?: string | File;
  imageBride?: string | File;
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

  const bg: string[] = [Bg1, Bg2, Bg3];
  const images: string[] = [Image1, Image2, Image3];
  return (
    <div
      className="w-full relative font-meowScript"
      style={{
        backgroundImage: `url(${bg[style]})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <section className="max-w-9xl mx-auto py-[56px] lg:px-[302px] lg:pt-[74px] lg:pb-[46px] relative">
        <div
          className={
            "md:absolute top-[22%] left-0 flex flex-col justify-center items-center md:items-start "
          }
        >
          <RichImageEditor
            id={`introduction-imageGroom`}
            name="imageGroom"
            alt="Wedding couple"
            onChange={onSectionChange}
            src={imageGroom ? `${API_BASE_URL}${imageGroom}` : Bank}
            classNameImage="rounded-xl"
            disabled={disabled}
            toolbarPosition="top"
          />
          <div className="flex flex-col justify-start h-full mt-8">
            <h3
              className="z-20 text-2xl md:text-2xl font-montserrat italic text-center"
              style={{ color: availableColorsTemplate7[style][1] }}
            >
              Chú rể
            </h3>

            <EditableField
              initialValue={bankProps.groom}
              name="groom"
              id={`groom-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className={"text-center md:text-start text-[56px] md:text-[80px]"}
              styleThemes={{ color: availableColorsTemplate7[style][0] }}
            />
            <EditableField
              initialValue={bankProps.bankNameGroom}
              name="bankNameGroom"
              id={`bankNameGroom-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className={
                "text-center md:text-start text-lg font-montserrat font-medium leading-0"
              }
            />
            <EditableField
              initialValue={bankProps.nameGroom}
              name="nameGroom"
              id={`nameGroom-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className={
                "text-center md:text-start text-lg font-montserrat font-medium leading-0"
              }
            />
            <EditableField
              initialValue={bankProps.bankNumberGroom}
              name="bankNumberGroom"
              id={`bankNumberGroom-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className={
                "text-center md:text-start text-lg font-montserrat font-medium leading-0"
              }
            />
          </div>
        </div>
        <img src={images[style]} />
        <div
          className={
            "md:absolute top-[22%] right-0 flex flex-col justify-center items-center md:items-end "
          }
        >
          <RichImageEditor
            id={`introduction-imageBride`}
            name="imageBride"
            alt="Wedding couple"
            onChange={onSectionChange}
            src={imageBride ? `${API_BASE_URL}${imageBride}` : Bank}
            classNameImage="rounded-xl"
            disabled={disabled}
            toolbarPosition="top"
          />
          <div className="flex flex-col justify-end h-full mt-8">
            <h3
              className="z-20 text-2xl md:text-2xl font-montserrat text-center md:text-end italic"
              style={{ color: availableColorsTemplate7[style][1] }}
            >
              Cô dâu
            </h3>

            <EditableField
              initialValue={bankProps.bride}
              name="bride"
              id={`bride-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className={"text-center md:text-end text-[56px] md:text-[80px]"}
              styleThemes={{ color: availableColorsTemplate7[style][0] }}
            />
            <EditableField
              initialValue={bankProps.bankNameBridge}
              name="bankNameBridge"
              id={`bankNameBridge-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className={
                "text-center md:text-end text-lg font-montserrat font-medium leading-0"
              }
            />
            <EditableField
              initialValue={bankProps.nameBridge}
              name="nameBridge"
              id={`nameBridge-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className={
                "text-center md:text-end text-lg font-montserrat font-medium leading-0"
              }
            />
            <EditableField
              initialValue={bankProps.bankNumberBridge}
              name="bankNumberBridge"
              id={`bankNumberBridge-${id}`}
              disabled={disabled}
              onChangeBlur={onSectionChange}
              className={
                "text-center md:text-end text-lg font-montserrat font-medium leading-0"
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BankSection;
