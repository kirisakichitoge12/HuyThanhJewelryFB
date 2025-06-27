import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Picture1 from "../../../assets/images/templates/sangtrong/picture1.png";
import { CustomFile } from "../../../types";
import { useImagesModal } from "../../../hooks/modals";
import { API_BASE_URL } from "../../../config/api.config";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { availableColorsTemplate2 } from "../../../config";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import EditableField from "../../common/EditableField";

export interface AlbumProps {
  title: string;
  albums: File[] | string[];
}

interface AlbumSectionProps extends AlbumProps {
  id: string;
  style: number;
  titleFont: string;
  disabled?: boolean;
  onSectionChange: (
    name: string,
    newValue: string | File | CustomFile[]
  ) => void;
}

const AlbumSection: React.FC<AlbumSectionProps> = ({
  id,
  title,
  albums,
  titleFont,
  disabled = false,
  onSectionChange,
  style,
}) => { 
  const [isEdit, setIsEdit] = useState(false);
  const { onOpen, listImage, id: idImage } = useImagesModal();
  const [showAllPhotos, setShowAllPhotos] = useState<boolean>(false); 
  const [photos, setPhotos] = useState<string[]>([
    Picture1,
    Picture1,
    Picture1,
    Picture1,
    Picture1,
    Picture1,
    Picture1,
    Picture1,
    Picture1,
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDisplayEditBtn = () => setIsEdit(true);
  const handleHiddenEditBtn = () => setIsEdit(false);

  useEffect(() => {
    if (idImage === `albums-${id}`) {
      if (listImage && listImage.length > 0) {
        setPhotos(listImage.map((item) => item.preview || ""));
        onSectionChange("albums", listImage);
      } else {
        toast.error("Bạn cần phải chọn đủ 4 ảnh");
      }
    }
  }, [listImage]);

  useEffect(() => {
    if (albums && albums.length > 0) {
      setPhotos(albums.map((item) => `${API_BASE_URL}/${item}`));
    }
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentSlide((prev) => (prev + 1) % photos.length),
    onSwipedRight: () =>
      setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length),
    trackTouch: true,
    preventScrollOnSwipe: true,
  });
const layoutClasses = [
  "col-span-2 row-span-4",
  "col-span-2 row-span-2",
  "col-span-2 row-span-3",
  "col-span-2 row-span-4",
  "col-span-2 row-span-1 md:col-span-2 md:row-span-3",
  "col-span-2 row-span-1 md:col-span-2 md:row-span-2",
  ];
  
const visiblePhotos = showAllPhotos ? photos : photos.slice(0, 6);
  return (
    <div
      onMouseEnter={handleDisplayEditBtn}
      onMouseLeave={handleHiddenEditBtn}
      className="relative max-w-9xl mx-auto py-[72px]"
    >
      {!disabled && isEdit && (
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
      )}
      <EditableField
        initialValue={title}
        name="title"
        id={`timline-title-${id}`}
        disabled={disabled}
        className="text-center text-[72px] leading-[90px] font-pinyonScript text-amber-800 mb-10"
        styleThemes={{
          fontFamily: titleFont,
        }}
        onChangeBlur={onSectionChange}
      />

      {/* Slide ảnh ở mobile */}
      <div
        className="md:hidden relative w-full overflow-hidden"
        {...swipeHandlers}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {photos.map((photo, index) => (
            <div key={index} className="min-w-full flex justify-center px-2">
              <div className="w-full max-w-[400px]">
                <img
                  src={photo}
                  alt={`Ảnh cưới ${index + 1}`}
                  className="w-full h-[400px] object-cover rounded shadow-md"
                  onClick={(e) => e.stopPropagation()} // ✅ Chặn click mặc định
                />
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều hướng trái */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide(
              (prev) => (prev - 1 + photos.length) % photos.length
            );
          }}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-[#f66] hover:bg-[#ffe6e6] p-2 rounded-full border-2 border-[#f66] shadow transition"
        >
          <MdOutlineKeyboardArrowLeft size={24} />
        </button>

        {/* Nút điều hướng phải */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide((prev) => (prev + 1) % photos.length);
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-[#f66] hover:bg-[#ffe6e6] p-2 rounded-full border-2 border-[#f66] shadow transition"
        >
          <MdKeyboardArrowRight size={24} />
        </button>

        {/* Chấm tròn chuyển ảnh */}
        <div
          className="flex justify-center mt-4 gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === currentSlide ? "bg-[#f66]" : "bg-[#ffd6d6]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Grid ảnh ở md trở lên */}
      <div className="hidden md:grid grid-cols-6 grid-rows-6 gap-[30px]">
        {visiblePhotos.map((photo, i) => (
          <div
            key={i}
            className={layoutClasses[i] || "col-span-2 row-span-1 md:col-span-2 md:row-span-1"}
          >
            <img
              src={photo}
              alt={`Ảnh cưới ${i + 1}`}
              className="w-full h-full object-cover rounded shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              onClick={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div> 

      {/* Nút xem thêm */}
      <div className="hidden md:flex justify-center mt-[72px]">
        {!showAllPhotos && (
          <button
            onClick={() => setShowAllPhotos(true)}
            className="uppercase rounded-full text-white font-prata text-[18px] min-w-[250px] p-6"
            style={{ background: availableColorsTemplate2[style][0] }}
          >
            Xem thêm ảnh
          </button>
        )}
      </div>
    </div>
  );
};

export default AlbumSection;
