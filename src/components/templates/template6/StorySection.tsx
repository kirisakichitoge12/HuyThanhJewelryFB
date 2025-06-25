import React from "react";
import Picture1 from "../../../assets/images/templates/template6/story/image1.jpg";
import Picture2 from "../../../assets/images/templates/template6/story/image2.jpg";
import Picture3 from "../../../assets/images/templates/template6/story/image3.jpg";

import { availableColorsTemplate6 } from "../../../config";
import EditableField from "../../common/EditableField";
import RichImageEditor from "../../common/RichImageEditor";
import { API_BASE_URL } from "../../../config/api.config";

interface StorySectionProps {
  id: string;
  title: string;
  titleFont: string;
  contentFont: string;
  style: number;
  image1?: File;
  image2?: File;
  image3?: File;
  disabled?: boolean;
  onSectionChange: (name: string, newValue: string | File) => void;
  description: string;
}

const StorySection: React.FC<StorySectionProps> = ({
  style,
  id,
  onSectionChange,
  title,
  titleFont,
  disabled,
  image1,
  image2,
  image3,
  description,
}) => {
  return (
    <section className={`relative text-center bg-white`}>
      <div className="relative z-20 max-w-9xl h-auto md:mx-auto px-[15px] py-[50px] md:pt-[130px] md:pb-[154px] md:px-[85px]">
        <div className="w-full md:max-w-[1060px] mx-auto flex justify-center items-center flex-col space-y-4 ">
          <EditableField
            initialValue={title}
            name="title"
            id={`story-title-${id}`}
            disabled={disabled}
            styleThemes={{
              fontFamily: titleFont,
              color: availableColorsTemplate6[style][0],
            }}
            className={`text-center text-[40px] md:text-[48px]   font-CormorantUnicase`}
            onChangeBlur={onSectionChange}
          />
          <EditableField
            initialValue={description}
            name="description"
            id={`story-description-${id}`}
            disabled={disabled}
            styleThemes={{ fontFamily: description }}
            className="text-[16px] font-EncodeSans text-dark-300 md:px-[115px]"
            onChangeBlur={onSectionChange}
          />
        </div>
        <div className="max-w-[1270px] mx-auto mt-8 md:mt-[56px] h-fit md:h-[463px] bg-white md:grid md:grid-cols-[1fr,2fr,1fr]">
          <RichImageEditor
            id={`story-image1-${id}`}
            name="image1"
            src={image1 ? `${API_BASE_URL}/${image1}` : Picture1}
            onChange={onSectionChange}
            className="relative md:w-full h-[555px] md:h-[463px]"
            classNameImage="w-full h-full object-cover object-top rounded-xl"
          />
          <RichImageEditor
            id={`story-image2-${id}`}
            name="image2"
            src={image2 ? `${API_BASE_URL}/${image2}` : Picture2}
            onChange={onSectionChange}
            className="relative md:w-full h-[257px] md:h-[463px]"
            classNameImage="w-full h-full object-cover object-center rounded-xl"
          />
          <RichImageEditor
            id={`story-image3-${id}`}
            name="image3"
            src={image3 ? `${API_BASE_URL}/${image3}` : Picture3}
            onChange={onSectionChange}
            className="relative md:w-full h-[541px] md:h-[463px]"
            classNameImage="w-full h-full object-cover object-top rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
