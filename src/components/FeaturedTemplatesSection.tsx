import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable'; // Import thư viện
import Button from './common/Button';
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineArrowForward } from 'react-icons/md';
import Photo1 from '../assets/images/photo1.jpeg';
import Photo2 from '../assets/images/photo2.jpeg';
import Photo3 from '../assets/images/photo3.jpeg';
import Photo4 from '../assets/images/photo4.jpeg';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const FeaturedTemplatesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [itemsPerSlide, setItemsPerSlide] = useState<number>(1);
  const [slides, setSlides] = useState<{id: number, image: string, title: string}[][]>([]);

  const themes = [
    { id: 1, image: Photo1, title: 'Theme 1' },
    { id: 2, image: Photo2, title: 'Theme 2' },
    { id: 3, image: Photo3, title: 'Theme 3' },
    { id: 4, image: Photo4, title: 'Theme 4' },
    { id: 5, image: Photo1, title: 'Theme 5' },
    { id: 6, image: Photo3, title: 'Theme 6' },
    { id: 7, image: Photo4, title: 'Theme 7' },
    { id: 8, image: Photo1, title: 'Theme 8' },
  ];

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(3);
      else setItemsPerSlide(4);
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  useEffect(() => {
    const newSlides = [];
    for (let i = 0; i < themes.length; i += itemsPerSlide) {
      newSlides.push(themes.slice(i, i + itemsPerSlide));
    }
    setSlides(newSlides);
    setCurrentSlide(0);
  }, [itemsPerSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const navigate = useNavigate();

  const handellink = () => {
    navigate("/guest/templates");
  };
  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true, // Correct property to prevent scroll during swipe
    trackTouch: true,
  });

  return (
    <section
      className="mx-auto max-w-9xl py-16 px-[15px] md:px-[85px] md:py-[100px]"
      {...swipeHandlers}
    >
      <h2 className="text-[28px] leading-[42px] md:text-[36px] md:leading-[54px] text-heading font-bold mb-8 md:mb-14 text-start max-w-2/3 md:max-w-1/2 lg:max-w-[625px]">
        Thư viện thiệp cưới thiết kế dễ dàng <br /> Dành riêng cho bạn
      </h2>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div className="min-w-full flex gap-5 px-5" key={slideIndex}>
                {slide.map((theme) => (
                  <div
                    className={`w-full ${
                      itemsPerSlide === 1
                        ? 'sm:w-full'
                        : itemsPerSlide === 3
                        ? 'md:w-1/3'
                        : 'xl:w-1/4'
                    } px-2`}
                    key={theme.id}
                  >
                    <motion.div
                      className="bg-gray-100 w-full h-[394px] overflow-hidden mx-auto rounded-xl shadow-md"
                      whileHover={{
                        scale: 1.04,
                        // boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        filter: 'brightness(1.05)'
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      <img
                        src={theme.image}
                        alt={theme.title}
                        className="h-full object-cover w-full"
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute md:left-[-50px] hover:text-secondary hover:bg-pink-default left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full border-2 border-primary text-primary shadow-lg"
        >
          <MdOutlineKeyboardArrowLeft size={32} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute md:right-[-50px] hover:text-secondary hover:bg-pink-default right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full border-2 border-primary text-primary shadow-lg"
        >
          <MdKeyboardArrowRight size={32} />
        </button>
      </div>

      <div className="sm:hidden flex justify-center items-center gap-2 mt-6">
      {Array.from({ length: Math.min(4, slides.length) }).map((_, index) => (
        <div
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`cursor-pointer ${
            index === currentSlide ? 'bg-secondary' : 'bg-primary'
          } w-3 h-3 rounded-full`}
        />
      ))}
    </div>


      <div className="flex justify-center mt-8">
        <Button onClick={handellink} style={{ padding: '16px 39.5px' }}>
          Khám phá thư viện thiệp
          <MdOutlineArrowForward size={25} />
        </Button>
      </div>
    </section>
  );
};

export default FeaturedTemplatesSection;
