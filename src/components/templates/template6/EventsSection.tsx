import React from "react";
import { availableColorsTemplate6 } from "../../../config";
import EventIcon1 from "../../../assets/images/templates/template6/events/deco1.png";
import EventIcon2 from "../../../assets/images/templates/template6/events/deco2.png";
import EventIcon3 from "../../../assets/images/templates/template6/events/deco3.png";
import Frame1 from "../../../assets/images/templates/template6/bg-date-banner-1.png";
import Frame2 from "../../../assets/images/templates/template6/bg-date-banner-2.png";
import Frame3 from "../../../assets/images/templates/template6/bg-date-banner-3.png";

import DecoLeft1 from "../../../assets/images/templates/template6/events/decoLeft1.png";
import DecoLeft2 from "../../../assets/images/templates/template6/events/decoLeft2.png";
import DecoLeft3 from "../../../assets/images/templates/template6/events/decoLeft3.png";

import DecoRight1 from "../../../assets/images/templates/template6/events/decoRight1.png";
import DecoRight2 from "../../../assets/images/templates/template6/events/decoRight2.png";
import DecoRight3 from "../../../assets/images/templates/template6/events/decoRight3.png";

import Bg1 from "../../../assets/images/templates/template6/events/bg1.png";
import Bg2 from "../../../assets/images/templates/template6/events/bg2.png";
import Bg3 from "../../../assets/images/templates/template6/events/bg3.png";

import Each from "../../../layouts/Each";
import EditableField from "../../common/EditableField";
export interface EventProps {
  id: number;
  number: string;
  image?: string;
  title: string;
  subTitle: string;
  address: string;
  time: string;
  date: string;
  link: string;
}

interface EventSectionProps {
  id: string;
  title: string;
  events: EventProps[];
  style: number;
  titleFont: string;
  disabled?: boolean;
  onSectionChange: (
    name: string,
    newValue: string | File | EventProps | EventProps[],
    subField?: string,
    i?: number
  ) => void;
}

const EventsSection: React.FC<EventSectionProps> = ({
  id,
  events,
  title,
  style,
  titleFont,
  disabled = false,
  onSectionChange,
}) => {
  console.log({
    events,
    title,
  });
  const bgs: string[] = [Bg1, Bg2, Bg3];
  const icons = [EventIcon1, EventIcon2, EventIcon3];
  const frames: string[] = [Frame1, Frame2, Frame3];
  const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
  const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
  return (
    <section
      className={`relative grid text-center font-pacifico`}
      style={{
        backgroundImage: `url(${bgs[style]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%", 
      }}
    >
      <img
        src={decoLefts[style]}
        className="absolute left-0 bottom-0 md:w-fit md:h-fit w-[131px] h-[184px] object-cover"
      />
      <img
        src={decoRights[style]}
        className="absolute right-0 top-0 md:w-fit md:h-fit w-[131px] h-[184px]"
      />
      <div className="max-w-[1060px] mx-auto py-[115px] w-full font-CormorantUnicase">
        <EditableField
          id={`${id}-event-title`}
          initialValue={title}
          name="title"
          disabled={disabled}
          onChangeBlur={onSectionChange}
          styleThemes={{
            color: availableColorsTemplate6[style][0],
            fontFamily: titleFont,
          }}
          className={`text-center text-[40px]  mb-[20px]  md:text-[48px] uppercase md:mb-20`}
        />
        {/* Events */}
        <div className="flex flex-col relative gap-14 md:gap-[31px] max-w-[834px] mx-auto ">
          <Each
            of={events}
            render={(item: EventProps, index) => (
              <div className="z-20 flex-1 flex flex-col justify-center items-center gap-[34px]">
                <div className="relative h-[167px] px-[133px] flex justify-center items-center">
                  <img
                    src={icons[style]}
                    className="w-full h-full absolute object-contain left-0 "
                  />
                  <EditableField
                    id={`${id}-title-${index}`}
                    initialValue={item.title}
                    name="events"
                    subField="title"
                    disabled={disabled}
                    index={index}
                    onChangeBlur={onSectionChange}
                    className="text-[32px] uppercase py-4"
                    styleThemes={{ color: availableColorsTemplate6[style][0] }}
                  />
                </div>
                <div className="relative gap-4 flex flex-col justify-center px-[19px] py-[30px] md:p-8 w-full">
                  <img
                    src={frames[style]}
                    className="absolute w-full opacity-20 h-full left-0"
                  />
                  <EditableField
                    id={`${id}-time-${index}`}
                    initialValue={item.time}
                    name="events"
                    subField="time"
                    disabled={disabled}
                    index={index}
                    className="text-base md:text-[24px]  leading-[2] font-EncodeSans font-bold"
                    onChangeBlur={onSectionChange}
                    styleThemes={{ color: availableColorsTemplate6[style][0] }}
                  />
                  <EditableField
                    id={`${id}-date-${index}`}
                    initialValue={item.date}
                    name="events"
                    subField="date"
                    disabled={disabled}
                    index={index}
                    className="text-base md:text-[24px] font-EncodeSans font-bold"
                    onChangeBlur={onSectionChange}
                    styleThemes={{ color: availableColorsTemplate6[style][0] }}
                  />
                  <EditableField
                    id={`${id}-address-${index}`}
                    initialValue={item.address}
                    name="events"
                    subField="address"
                    disabled={disabled}
                    index={index}
                    className="text-[18px] md:text-[24px] uppercase mb-[17px]"
                    onChangeBlur={onSectionChange}
                    styleThemes={{ color: availableColorsTemplate6[style][0] }}
                  />
                </div>
                {index !== events.length - 1 && (
                  <div className="flex justify-center items-center">
                    <div
                      className="w-[1px] rounded-full h-[70px] md:h-[133px] flex"
                      style={{ background: availableColorsTemplate6[style][1] }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
