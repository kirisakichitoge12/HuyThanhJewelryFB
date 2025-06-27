import React, { memo, useEffect, useState } from 'react';
import Picture1 from '../../../assets/images/templates/template4/picture1.jpg';
import Picture2 from '../../../assets/images/templates/template4/picture2.jpg';
import Picture3 from '../../../assets/images/templates/template4/picture3.jpg';
import Picture4 from '../../../assets/images/templates/template4/picture4.jpg';
import Deco1 from '../../../assets/images/templates/template4/albumsDeco1.png';
import Deco2 from '../../../assets/images/templates/template4/albumsDeco2.png';
import Deco3 from '../../../assets/images/templates/template4/albumsDeco3.png';


import Each from '../../../layouts/Each';
import AngleLeft from '../../../assets/icons/angle-left.svg';
import AngleRight from '../../../assets/icons/angle-right.svg';
import { availableColorsTemplate4 } from '../../../config';
import { useImagesModal } from '../../../hooks/modals';
import { CustomFile } from '../../../types';
import { FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../../config/api.config';
import EditableField from '../../common/EditableField';

export interface AlbumProps{
  albums: File[] | string[],
}

interface AlbumSectionProps extends AlbumProps{
  id: string;
  title: string;
  style: number;
  titleFont: string;
  disabled?: boolean;
  onSectionChange:  (name: string, newValue: string | File | CustomFile[]) => void;
}

const AlbumSection: React.FC<AlbumSectionProps> = ({
  id,
  title,
                                                     albums,
                                                     style,
                                                     titleFont,
                                                     disabled = false,
                                                     onSectionChange
                                                   }) => {
  const initialPhotos: string[] = [Picture1, Picture2, Picture3, Picture4];
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [photos, setPhotos] = useState<string[]>(initialPhotos);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { onOpen, listImage, id: idImage } = useImagesModal();
  const decos: string[] = [Deco1, Deco2, Deco3];
  const handleDisplayEditBtn = () =>  setIsEdit(true);
  const handleHiddenEditBtn = () =>  setIsEdit(false);
  const handleChooseImages = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => prev < 3 ? prev + 1 : 0);
  const prevSlide = () => setCurrentSlide((prev) => prev > 0 ? prev - 1 : 3);
  useEffect(()=>{
    if(idImage === `albums-${id}`){
      if(listImage && listImage.length > 0){
        setPhotos(listImage.map(item => item.preview || ""));
        onSectionChange("albums", listImage);
      }else{
        toast.error("Bạn cần phải chọn đủ 4 ảnh")
      }
    }
  },[listImage]);

  useEffect(()=>{
    if(albums && albums.length > 0 ){
      setPhotos(albums.map(item => `${API_BASE_URL}/${item}`));
    }
  },[]);
  return (
      <section
          id="album-section"
          onMouseEnter={handleDisplayEditBtn}
          onMouseLeave={handleHiddenEditBtn}
          className={`relative overflow-hidden`}
          style={{ background: availableColorsTemplate4[style][2] }}
      >
        <section
            onClick={(event) => event.stopPropagation()}
            className='z-10 relative max-w-[1443px] mx-auto flex flex-col text-center justify-center items-center font-phudu px-[15px] pt-[55px] pb-[43px] full:py-[103px] full:px-[194px]'
        >
          <div className={"flex flex-col justify-center items-center"}>
            <img src={decos[style]} className='mb-4'/> 
          
          <EditableField
            initialValue={title}
            name="title"
            id={`timline-title-${id}`}
            disabled={disabled}
                className="text-[52px] font-pacifico mb-[45px]  "
                styleThemes={{fontFamily: titleFont,  color: availableColorsTemplate4[style][0] }} 
            onChangeBlur={onSectionChange}
          />
          </div>
          <div
              className='relative w-full md:max-w-[1054px] mb-6 lg:mb-[41px]'
          >
            {!disabled && isEdit
                ? <button className='absolute top-2 right-2 z-20 text-black bg-white px-8 py-4 rounded-md font-svn-sans' onClick={() => onOpen(`albums-${id}`)}>
                  <p>Sửa Album</p>
                  <div className='text-gray-400 flex flex-col justify-center items-center hover:bg-gray-200 p-1'>
                    <FiEdit size={25}/>
                    <p>sửa</p>
                  </div>
                </button>
                : null
            }
            <div className='relative w-full h-auto aspect-[16/10] p-6 bg-white rounded-xl'>
              <img
                  src={photos[currentSlide]}
                  className='absolute top-[6%] left-[4%]
                                        w-[94%] h-[92%]
                                        object-cover'
                  alt="Inner Picture"
              />
            </div>


            {/* Navigation Buttons */}
            <div className='block w-full absolute h-full'>
              <button
                  onClick={prevSlide}
                  className="absolute hover:bg-pink-default -top-[60%] -left-3 lg:-left-[80px] bg-white p-3 rounded-full border-2 border-primary text-primary shadow-lg"
              >
                <img alt="angle left" src={AngleLeft} className="w-8 h-8" />
              </button>
              <button
                  onClick={nextSlide}
                  className="absolute hover:bg-pink-default -top-[60%] -right-3 lg:-right-[80px] bg-white p-3 rounded-full border-2 border-primary text-primary shadow-lg"
              >
                <img alt="angle right" src={AngleRight} className="w-8 h-8" />
              </button>
            </div>
          </div>
          <div className='flex justify-center overflow-hidden w-[488px] sm:w-full space-x-4 full:space-x-6 z-40'>
            <Each
                of={photos}
                render={(item: string, index: number) =>
                    <img
                        src={item}
                        className='w-[110px] h-[65px] sm:w-[245px] sm:h-[145px] rounded-xl object-top
                                object-cover cursor-pointer'
                        onClick={() => handleChooseImages(index)}
                    />
                }
            />
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6 z-50">
            <Each
                of={Array(4).fill(4)}
                render={(_, index) =>
                    <div
                        onClick={() => handleChooseImages(index)}
                        className={`cursor-pointer ${
                            currentSlide === index ? "bg-secondary" : "bg-primary"
                        } w-3 h-3 rounded-full`}
                    />
                }
            />
          </div>
        </section>
      </section>
  )
}

export default memo(AlbumSection)