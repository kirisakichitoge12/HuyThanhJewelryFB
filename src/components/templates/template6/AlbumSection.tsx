import React, { memo, useEffect, useState } from "react";
import Picture1 from "../../../assets/images/templates/template6/albums/picture1.jpg";
import Picture2 from "../../../assets/images/templates/template6/albums/picture2.jpg";
import Picture3 from "../../../assets/images/templates/template6/albums/picture3.jpg";
import Picture4 from "../../../assets/images/templates/template6/albums/picture4.jpg";
import Picture5 from "../../../assets/images/templates/template6/albums/picture5.jpg";

import Each from "../../../layouts/Each";
import { availableColorsTemplate6 } from "../../../config";
import { useImagesModal } from "../../../hooks/modals";
import { CustomFile } from "../../../types";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../../config/api.config";
import EditableField from "../../common/EditableField";

export interface AlbumProps {
  albums: File[] | string[];
}

interface AlbumSectionProps extends AlbumProps {
  id: string;
  style: number;
  title: string;
  description: string;
  titleFont: string;
  disabled?: boolean;
  onSectionChange: (
    name: string,
    newValue: string | File | CustomFile[]
  ) => void;
}

const AlbumSection: React.FC<AlbumSectionProps> = ({
  id,
  albums,
  title,
  description,
  style,
  titleFont,
  disabled = false,
  onSectionChange,
}) => {
  const initialPhotos: string[] = [
    Picture1,
    Picture2,
    Picture3,
    Picture4,
    Picture5,
  ];
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { onOpen, listImage, id: idImage } = useImagesModal();
  const handleDisplayEditBtn = () => setIsEdit(true);
  const handleHiddenEditBtn = () => setIsEdit(false);
  const handleChooseImages = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev < 3 ? prev + 1 : 0));
  const prevSlide = () => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 3));
  useEffect(() => {
    if (idImage === `albums-${id}`) {
      if (listImage && listImage.length > 0) {
        setPhotos(listImage.map((item) => item.preview || ""));
        onSectionChange("albums", listImage);
      } else {
        toast.error("Bạn cần phải chọn đủ 5 ảnh");
      }
    }
  }, [listImage]);

  useEffect(() => {
    if (albums && albums.length >0) {
      setPhotos(albums.map((item) => `${API_BASE_URL}/${item}`));
    }
  }, []);
  return (
    <section
      id="album-section"
      onMouseEnter={handleDisplayEditBtn}
      onMouseLeave={handleHiddenEditBtn}
      className={`relative overflow-hidden bg-white`} 
    >
      <section
        onClick={(event) => event.stopPropagation()}
        className="z-10 relative max-w-[1443px] mx-auto flex flex-col text-center justify-center items-center font-CormorantUnicase px-[15px] p-[100px] full:py-[130px] full:px-[190px]"
      >
        <div className="text-center space-y-6">
             <EditableField
            initialValue={title}
            name="title"
            id={`timline-title-${id}`}
            disabled={disabled}
            className="text-[40px] md:text-[48px] uppercase"
            styleThemes={{
              fontFamily: titleFont,
              color: availableColorsTemplate6[style][0],
            }}
            onChangeBlur={onSectionChange}
          /> 
          <EditableField
            initialValue={description}
            name="description"
            id={`timline-description-${id}`}
            disabled={disabled}
            styleThemes={{ fontFamily: description }}
            className="text-[16px] font-EncodeSans text-dark-300 md:px-[115px]"
            onChangeBlur={onSectionChange}
          />
        </div>
        <div className="relative w-full md:max-w-[1054px] mt-[56px] mb-6 lg:mb-[41px]">
          {!disabled && isEdit ? (
            <button
              className="absolute top-2 right-2 z-20 text-black bg-white px-8 py-4 rounded-md font-svn-sans"
              onClick={() => onOpen(`albums-${id}`)}
            >
              <p>Sửa Album</p>
              <div className="text-gray-400 flex flex-col justify-center items-center hover:bg-gray-200 p-1">
                <FiEdit size={25} />
                <p>sửa</p>
              </div>
            </button>
          ) : null}
          <div className="relative w-full h-auto aspect-[16/10] bg-white">
            <img
              src={photos[currentSlide]}
              className="absolute  w-full h-full object-cover"
              alt="Inner Picture"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="block w-full absolute h-full">
            <button
              onClick={prevSlide}
              className="absolute hover:bg-pink-default -top-[60%] -left-3 lg:-left-[150px] bg-white p-3 rounded-full border-2 shadow-lg"
              style={{
                borderColor: availableColorsTemplate6[style][0],
                color: availableColorsTemplate6[style][0],
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 26.6667C19.6587 26.6667 19.3173 26.5361 19.0573 26.2761L9.72401 16.9428C9.20267 16.4214 9.20267 15.5787 9.72401 15.0573L19.0573 5.72401C19.5787 5.20267 20.4214 5.20267 20.9428 5.72401C21.4641 6.24534 21.4641 7.08809 20.9428 7.60942L12.5521 16L20.9428 24.3907C21.4641 24.912 21.4641 25.7548 20.9428 26.2761C20.6828 26.5361 20.3414 26.6667 20 26.6667Z"
                  fill={availableColorsTemplate6[style][0]}
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute hover:bg-pink-default -top-[60%] -right-3 lg:-right-[150px] bg-white p-3 rounded-full border-2 shadow-lg"
              style={{
                borderColor: availableColorsTemplate6[style][0],
                color: availableColorsTemplate6[style][0],
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 26.6667C11.6586 26.6667 11.3173 26.5361 11.0573 26.2761C10.5359 25.7548 10.5359 24.912 11.0573 24.3907L19.4479 16L11.0573 7.60942C10.5359 7.08809 10.5359 6.24534 11.0573 5.72401C11.5786 5.20267 12.4213 5.20267 12.9427 5.72401L22.276 15.0573C22.7973 15.5787 22.7973 16.4214 22.276 16.9428L12.9427 26.2761C12.6827 26.5361 12.3413 26.6667 12 26.6667Z"
                  fill={availableColorsTemplate6[style][0]}
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center overflow-hidden w-[488px] sm:w-full space-x-4 full:space-x-6 z-40">
          <Each
            of={photos}
            render={(item: string, index: number) => (
              <img
                src={item}
                className="w-[110px] h-[65px] sm:w-[245px] sm:h-[145px] object-center object-cover cursor-pointer"
                onClick={() => handleChooseImages(index)}
              />
            )}
          />
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6 z-50">
          <Each
            of={Array(5).fill(5)}
            render={(_, index) => (
              <div
                onClick={() => handleChooseImages(index)}
                className={`cursor-pointer w-3 h-3 rounded-full`}
                style={{
                  background:
                    currentSlide === index
                      ? availableColorsTemplate6[style][0]
                      : availableColorsTemplate6[style][0],
                  opacity: currentSlide === index ? 1 : 0.5,
                }}
              />
            )}
          />
        </div>
      </section>
    </section>
  );
};

export default memo(AlbumSection);
