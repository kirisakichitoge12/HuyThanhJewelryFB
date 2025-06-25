import React from "react";
import { availableColorsTemplate7 } from "../../../config";
import EditableField from "../../common/EditableField";
import RichImageEditor from "../../common/RichImageEditor";
import { API_BASE_URL } from "../../../config/api.config";

import Image1 from "../../../assets/images/templates/template7/story/image1.jpg";
import Image2 from "../../../assets/images/templates/template7/story/image2.jpg";
import Image3 from "../../../assets/images/templates/template7/story/image3.jpg";


import Deco1 from "../../../assets/images/templates/template7/story/deco1.png";
import Deco2 from "../../../assets/images/templates/template7/story/deco2.png";
import Deco3 from "../../../assets/images/templates/template7/story/deco3.png";

// import Image11 from "../../../assets/images/templates/template7/story/image11.png";
// import Image12 from "../../../assets/images/templates/template7/story/image12.png";
// import Image13 from "../../../assets/images/templates/template7/story/image13.png";

// import Image21 from "../../../assets/images/templates/template7/story/image21.png";
// import Image22 from "../../../assets/images/templates/template7/story/image22.png";
// import Image23 from "../../../assets/images/templates/template7/story/image23.png";

// import Image31 from "../../../assets/images/templates/template7/story/image31.png";
// import Image32 from "../../../assets/images/templates/template7/story/image32.png";
// import Image33 from "../../../assets/images/templates/template7/story/image33.png";

interface StorySectionProps {
  id: string;
  title: string;
  titleFont: string;
  descriptionFont: string;
  style: number;
  image?: File;
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
  image,
  description,
}) => {
  const decos: string[] = [Deco1, Deco2, Deco3];
  const images: string[] = [Image1, Image2, Image3];
  // const images1: string[] = [Image11, Image21, Image31];
  // const images2: string[] = [Image12, Image22, Image32];
  // const images3: string[] = [Image13, Image23, Image33];
  return (
    <section className={`relative grid text-center font-meowScript`} style={{ backgroundColor: availableColorsTemplate7[style][2] }}>
      <div className="z-20 max-w-9xl md:mx-auto px-[15px] py-[100px] md:pt-[84px] md:pb-[109px] md:px-[85px]">
        <div className="w-full md:max-w-[620px]  mx-auto flex justify-center items-center flex-col space-y-4">
          <p
            className="font-montserrat text-[20px] md:text-2xl"
            style={{ color: availableColorsTemplate7[style][1] }}
          >
            Kể bạn nghe
          </p>
          <EditableField
            initialValue={title}
            name="title"
            id={`story-title-${id}`}
            disabled={disabled}
            styleThemes={{
              fontFamily: titleFont,
              color: availableColorsTemplate7[style][0],
            }}
            className={`text-center text-[56px] md:text-[80px]`}
            onChangeBlur={onSectionChange}
          />
          <EditableField
            initialValue={description}
            name="description"
            id={`story-description-${id}`}
            disabled={disabled}
            styleThemes={{ fontFamily: description }}
            className="text-base mt-6 font-montserrat text-dark-100"
            onChangeBlur={onSectionChange}
          />
        </div>
        <div className="mt-8 md:mt-[61px] md:px-[85px] px-[15px] grid md:grid-cols-3 justify-center">
          <RichImageEditor
            id={`story1-image-${id}`}
            name="image"
            src={image ? `${API_BASE_URL}/${image}` : images[0]}
            onChange={onSectionChange}
            className="relative rounded-[20px] w-[300px] h-[188px] md:w-[439px] md:h-[275px] rotate-[3deg] z-10"
            style={{ border: `2px solid ${availableColorsTemplate7[style][1]}`, padding: 0 }}
            classNameImage="w-full h-full object-cover object-top rounded-[20px]"
          />
          <RichImageEditor
            id={`story2-image-${id}`}
            name="image"
            src={image ? `${API_BASE_URL}/${image}` : images[1]}
            onChange={onSectionChange}
            className="relative rounded-[20px] w-[300px] h-[188px] md:w-[439px] md:h-[275px] rotate-[-3deg] md:-translate-y-10"
            style={{ border: `2px solid ${availableColorsTemplate7[style][1]}`, padding: 0 }}
            classNameImage="w-full h-full object-cover object-top rounded-[20px]"
          >
            <div className="w-full flex justify-center items-end">
              <img src={decos[style]} className="absolute -bottom-10 z-20" />
            </div>
          </RichImageEditor>
          <RichImageEditor
            id={`story3-image-${id}`}
            name="image"
            src={image ? `${API_BASE_URL}/${image}` : images[2]}
            onChange={onSectionChange}
            className="relative rounded-[20px] w-[300px] h-[188px] md:w-[439px] md:h-[275px] rotate-[3deg]"
            style={{ border: `2px solid ${availableColorsTemplate7[style][1]}`, padding: 0 }}
            classNameImage="w-full h-full object-cover object-top rounded-[20px]"
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
