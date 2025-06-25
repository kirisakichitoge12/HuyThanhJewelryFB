import React from "react";
import { availableColorsTemplate4 } from "../../../config";
import EditableField from "../../common/EditableField";
import BankBG1 from "../../../assets/images/templates/template4/bankBg1.png";
import BankBG2 from "../../../assets/images/templates/template4/bankBg2.png";
import BankBG3 from "../../../assets/images/templates/template4/bankBg3.png";

import GroomImage from "../../../assets/images/templates/template4/groom.jpg";
import BrideImage from "../../../assets/images/templates/template4/bride.jpg";
import { API_BASE_URL } from "../../../config/api.config.ts";
import RichImageEditor from "../../common/RichImageEditor.tsx";

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
  const banks: string[] = [BankBG1, BankBG2, BankBG3];
  return (
    <div
      className="w-full relative font-pacifico"
      style={{
        backgroundImage: `url(${banks[style]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="max-w-9xl mx-auto py-[56px] lg:px-[302px] lg:py-[78px] relative">
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
              styleThemes={{ color: availableColorsTemplate4[style][1] }}
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

          <div className="flex md:flex-row flex-col justify-between pt-10 gap-[30px]">
            <div className={"flex flex-col justify-center items-center"}>
              <RichImageEditor
                id={`introduction-imageGroom`}
                name="imageGroom"
                alt="Wedding couple"
                onChange={onSectionChange}
                src={imageGroom ? `${API_BASE_URL}${imageGroom}` : GroomImage}
                className="w-[310px] h-[351px] rounded-xl rotate-[-3.45deg] translate-y-10"
                classNameImage="rounded-xl"
                disabled={disabled}
                 toolbarPosition="top"
              />
              <div className="flex flex-col justify-center min-w-[345px] bg-white rounded-2xl p-8 font-beVietnamPro z-30">
                <h3
                  className="z-20 text-2xl text-center md:text-[32px] mb-4 font-pacifico"
                  style={{ color: availableColorsTemplate4[style][0] }}
                >
                  Mừng cưới đến chú rể
                </h3>
                <EditableField
                  initialValue={bankProps.bankNameGroom}
                  name="bankNameGroom"
                  id={`bankNameGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-center"}
                />
                <EditableField
                  initialValue={bankProps.nameGroom}
                  name="nameGroom"
                  id={`nameGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-center"}
                />
                <EditableField
                  initialValue={bankProps.bankNumberGroom}
                  name="bankNumberGroom"
                  id={`bankNumberGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-center"}
                />
              </div>
            </div>
            <div className={"flex flex-col justify-center items-center"}>
              <RichImageEditor
                id={`introduction-imageBride`}
                name="imageBride"
                alt="Wedding couple"
                onChange={onSectionChange}
                src={imageBride ? `${API_BASE_URL}${imageBride}` : BrideImage}
                className="w-[310px] h-[351px] rounded-xl rotate-[3.45deg] translate-y-10"
                classNameImage="rounded-xl"
                disabled={disabled}
                 toolbarPosition="top"
              />
              <div className="flex flex-col justify-start bg-white  min-w-[345px] rounded-2xl p-8 font-beVietnamPro z-30">
                <h3
                  className="z-20 text-2xl text-center md:text-[32px] mb-4 font-pacifico"
                  style={{ color: availableColorsTemplate4[style][0] }}
                >
                  Mừng cưới đến cô dâu
                </h3>
                <EditableField
                  initialValue={bankProps.bankNameGroom}
                  name="bankNameGroom"
                  id={`bankNameGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-center"}
                />
                <EditableField
                  initialValue={bankProps.nameGroom}
                  name="nameGroom"
                  id={`nameGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-center"}
                />
                <EditableField
                  initialValue={bankProps.bankNumberGroom}
                  name="bankNumberGroom"
                  id={`bankNumberGroom-${id}`}
                  disabled={disabled}
                  onChangeBlur={onSectionChange}
                  className={"text-center"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BankSection;
