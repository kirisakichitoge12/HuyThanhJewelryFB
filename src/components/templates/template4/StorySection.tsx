import React from "react";
import Picture from "../../../assets/images/templates/template4/picture2.jpg";
import { availableColorsTemplate4 } from "../../../config";
import EditableField from "../../common/EditableField";
import RichImageEditor from "../../common/RichImageEditor";
import { API_BASE_URL } from "../../../config/api.config";
import Deco1 from "../../../assets/images/templates/template4/storyDeco1.png";
import Deco2 from "../../../assets/images/templates/template4/storyDeco2.png";
import Deco3 from "../../../assets/images/templates/template4/storyDeco3.png";

interface StorySectionProps {
  id: string;
  title: string;
  titleFont: string;
  contentFont: string;
  style: number;
  image?: File;
  disabled?: boolean;
  onSectionChange: (name: string, newValue: string | File) => void;
  content: string;
}

const StorySection: React.FC<StorySectionProps> = ({
  style,
  id,
  onSectionChange,
  title,
  titleFont,
  disabled,
  image,
  content,
}) => {
  const decos: string[] = [Deco1, Deco2, Deco3];
  return (
    <section
      className={`relative grid text-center `}
      style={{ backgroundColor: availableColorsTemplate4[style][2] }}
    >
      <div className="z-20 max-w-9xl md:mx-auto px-[15px] md:py-[100px] md:px-[193px]">
        <div className="w-full md:max-w-[836px]  mx-auto flex justify-center items-center flex-col space-y-4">
          <img src={decos[style]} />
          <EditableField
            initialValue={title}
            name="title"
            id={`story-title-${id}`}
            disabled={disabled}
            styleThemes={{
              fontFamily: titleFont,
              color: availableColorsTemplate4[style][1],
            }}
            className={`text-center text-[40px] md:text-[52px] md:leading-[90px] font-pacifico`}
            onChangeBlur={onSectionChange}
          />
          <EditableField
            initialValue={content}
            name="content"
            id={`story-content-${id}`}
            disabled={disabled}
            styleThemes={{ fontFamily: content }}
            className="text-lg mt-4 font-beVietnamPro text-dark-300"
            onChangeBlur={onSectionChange}
          />
        </div>
        <div className=" max-w-[1113px] mx-auto mt-8 md:mt-[49px] bg-white rounded-[14px] p-[10px] md:p-8 shadow-md">
          <RichImageEditor
            id={`story-image-${id}`}
            name="image"
            src={image ? `${API_BASE_URL}/${image}` : Picture}
            onChange={onSectionChange}
            className="relative md:w-full h-[190px] md:h-full rounded-xl"
            classNameImage="w-full h-full object-cover object-top rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
