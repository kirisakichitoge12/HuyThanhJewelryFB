import React from "react";
import { availableColorsTemplate7 } from "../../../config";
import EventIcon1 from "../../../assets/images/templates/template7/events/deco11.png";
import EventIcon2 from "../../../assets/images/templates/template7/events/deco12.png";
import EventIcon3 from "../../../assets/images/templates/template7/events/deco13.png";
import EventIcon4 from "../../../assets/images/templates/template7/events/deco21.png";
import EventIcon5 from "../../../assets/images/templates/template7/events/deco22.png";
import EventIcon6 from "../../../assets/images/templates/template7/events/deco23.png";
import EventIcon7 from "../../../assets/images/templates/template7/events/deco31.png";
import EventIcon8 from "../../../assets/images/templates/template7/events/deco32.png";
import EventIcon9 from "../../../assets/images/templates/template7/events/deco33.png";

import Bg1 from "../../../assets/images/templates/template7/events/bg1.png";
import Bg2 from "../../../assets/images/templates/template7/events/bg2.png";
import Bg3 from "../../../assets/images/templates/template7/events/bg3.png";

import Image1 from "../../../assets/images/templates/template7/events/image1.png";
import Image2 from "../../../assets/images/templates/template7/events/image2.png";
import Image3 from "../../../assets/images/templates/template7/events/image3.png";

import Frame1 from "../../../assets/images/templates/template7/events/frame1.png";
import Frame2 from "../../../assets/images/templates/template7/events/frame2.png";
import Frame3 from "../../../assets/images/templates/template7/events/frame3.png";

import Each from "../../../layouts/Each";
import EditableField from "../../common/EditableField";
import { API_BASE_URL } from "../../../config/api.config";
import RichImageEditor from "../../common/RichImageEditor";
export interface EventProps {
  id: number;
  number: string;
  image?: string;
  title: string;
  subTitle: string;
  address: string;
  dateTime: string;
  link: string;
}

interface EventSectionProps {
  id: string;
  image?: File | string;
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
  image,
  style,
  // titleFont,
  disabled = false,
  onSectionChange,
}) => {
  const icons = [
    [EventIcon1, EventIcon2, EventIcon3],
    [EventIcon4, EventIcon5, EventIcon6],
    [EventIcon7, EventIcon8, EventIcon9],
  ];
  const bg = [Bg1, Bg2, Bg3];
  const images: string[] = [Image1, Image2, Image3];
  const frames: string[] = [Frame1, Frame2, Frame3];
  return (
    <section
      className={`relative grid text-center object-bottom  md:h-auto font-meowScript `}
      style={{
        backgroundImage: `url(${bg[style]})`,
        backgroundPosition: "bottom",
      }}
    >
      <div className="max-w-9xl mx-auto px-[15px] md:px-[85px] py-[51px] w-full h-full z-20 md:pb-[101px] pb-[450px]">
        {/* Events */}
        <div className="relative gap-14 flex flex-col md:gap-[96px]">
          <Each
            of={events}
            render={(item: EventProps, index) => (
              <div
                className={`grid grid-cols-[3fr,1fr] justify-center items-center gap-[30px] max-w-[725px]
                  ${index === 1 ? "md:translate-x-[200px]" : ""}
                  ${index === 2 ? "md:translate-x-[400px]" : ""}
                  ${index === 3 ? "md:translate-x-[600px]" : ""}
                `}
              >
                <div className="flex flex-col justify-end text-end items-end w-full py-[11px]">
                  <EditableField
                    id={`${id}-title-${index}`}
                    initialValue={item.title}
                    name="events"
                    subField="title"
                    disabled={disabled}
                    index={index}
                    onChangeBlur={onSectionChange}
                    className=" text-[56px] md:text-[80px] h-[67px] md:h-[96px]"
                    styleThemes={{ color: availableColorsTemplate7[style][0] }}
                  />
                  <div
                    className="w-full h-[1px]"
                    style={{ background: availableColorsTemplate7[style][0] }}
                  ></div>
                  <EditableField
                    id={`${id}-dateTime-${index}`}
                    initialValue={item.dateTime}
                    name="events"
                    subField="dateTime"
                    disabled={disabled}
                    index={index}
                    className="text-[18px] font-montserrat font-bold italic text-dark-100 mt-4"
                    onChangeBlur={onSectionChange}
                  />
                  <EditableField
                    id={`${id}-address-${index}`}
                    initialValue={item.address}
                    name="events"
                    subField="address"
                    disabled={disabled}
                    index={index}
                    className="text-base md:text-xl font-montserrat italic text-dark-100"
                    onChangeBlur={onSectionChange}
                  />
                </div>
                <img
                  src={icons[style][index]}
                  className="size-[80px] md:size-[183px] object-contain"
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="relative md:absolute bottom-0 left-0 w-full z-30 h-full">
         <RichImageEditor
            id={`event-image-${id}`} 
            name='image'
            src={image ? `${API_BASE_URL}/${image}` : Image1} 
            onChange={onSectionChange}
            className="w-[278px] h-[345px] rounded-lg absolute bottom-20 left-20 border p-0 rotate-[-2.78deg]" 
          classNameImage="rounded-xl "
          style={{ borderColor: availableColorsTemplate7[style][0], padding: 0 }}
          />  
        <img src={frames[style]} className="z-10 absolute bottom-0" />
      </div>
    </section>
  );
};

export default EventsSection;
