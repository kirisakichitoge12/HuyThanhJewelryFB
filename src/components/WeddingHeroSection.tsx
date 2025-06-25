import React from 'react';
import Banner from '../assets/images/banner.png';
import { MdOutlineArrowForward } from 'react-icons/md';
import Button from './common/Button';
import Photo1 from '../assets/images/items/items.jpg';
import Photo2 from '../assets/images/items/item2.png';
import Photo3 from '../assets/images/items/item3.png';
import Photo4 from '../assets/images/items/item4.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const WeddingHeroSection: React.FC = () => {
    const images = [Photo1, Photo2, Photo3, Photo4];
    const navigate = useNavigate();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const titleVariants = {
        hidden: { 
            y: 50,
            opacity: 0,
            scale: 0.8
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            }
        }
    };

    const textVariants = {
        hidden: { 
            y: 30,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20,
                duration: 0.6
            }
        }
    };

    const bannerVariants = {
        hidden: { 
            opacity: 0,
            scale: 0.8,
            rotate: -5,
            x: 100
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20,
                duration: 1
            }
        }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: { 
            scale: 0.95,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    return (
        <motion.section 
            className="relative w-full bg-gradient-to-b from-[#ec6c61]/10 via-[#ec6c61]/5 to-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <section className='max-w-9xl mx-auto flex lg:flex-row flex-col-reverse md:py-8 md:gap-[30px]'> 
                {/* Left Content */}
                <motion.div 
                    className="w-full lg:w-[56%] py-0 sm:py-16 px-[15px] sm:p-5 full:px-[85px]vflex sm:px-[85px] flex-col justify-center items-start max-h-[635px] md:mt-12"
                    variants={textVariants}
                >
                    <motion.h1 
                        className="text-se text-[32px] leading-[1.2] md:text-[48px] md:leading-[1.2] font-bold mb-6 font-['Phudu'] tracking-wide"
                        variants={titleVariants}
                    >
                        <motion.span
                            className="block text-[rgb(93,93,93)] hover:text-[#ec6c61] transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            transition={{ delay: 0.2 }}
                        >
                            TỰ THIẾT KẾ THIỆP CƯỚI
                        </motion.span>
                        <motion.span
                            className="block text-[rgb(93,93,93)] hover:text-[#ec6c61] transition-colors duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            transition={{ delay: 0.4 }}
                        >
                            CỦA BẠN CHỈ TRONG 5 PHÚT
                        </motion.span>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-sub-heading text-gray-700 md:text-lg mb-8 md:mb-12 font-['Open_Sans'] leading-relaxed"
                        variants={textVariants}
                    >
                        Thiệp cưới online miễn phí từ Huy Thanh với thao tác đơn giản, giúp bạn dễ dàng quản lý khách mời và tạo dấu ấn cá nhân cho ngày cưới thêm trọn vẹn!
                    </motion.p>

                    <motion.div
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        className="relative group"
                    >
                        <Button 
                            onClick={() => navigate('guest/templates')}
                            className="relative overflow-hidden bg-[#ec6c61] hover:bg-[#d45a4f] text-white"
                        >
                            <span className="relative z-10">Tạo thiệp ngay</span>
                            <motion.span
                                className="relative z-10 ml-2"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <MdOutlineArrowForward size={24} />
                            </motion.span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#ec6c61] to-[#d45a4f]"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Button>
                    </motion.div>

                    <motion.div 
                        className="flex items-center space-x-4 pb-16 md:pb-0 mt-8 md:mt-12"
                        variants={textVariants}
                    >
                        <div className="flex -space-x-4">
                            {images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-lg"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: index * 0.1
                                    }}
                                    whileHover={{ 
                                        scale: 1.2,
                                        rotate: 5,
                                        zIndex: 1
                                    }}
                                    style={{ 
                                        backgroundImage: `url(${image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            ))}
                        </div>

                        <motion.p 
                            className="text-sm text-gray-600 font-['Open_Sans']"
                            variants={textVariants}
                        >
                            <span className="font-bold text-[#ec6c61]">360+</span> cô dâu chú rể đã sở hữu<br />
                            Thiệp cưới miễn phí từ Huy Thanh
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Right Content */}
                <motion.div 
                    className="lg:w-[44%] relative max-w-[705px] max-h-[635px] px-[15px] py-4 md:p-0"
                    variants={bannerVariants}
                    initial="hidden"
                    animate="visible"
                > 
                    <motion.div
                        className="relative overflow-hidden rounded-2xl"
                        whileHover={{ 
                            scale: 1.02,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img 
                            src={Banner} 
                            className="w-full h-full object-cover mix-blend-overlay"
                        />
                    </motion.div>
                </motion.div>  
            </section>  
        </motion.section>
    );
};

export default WeddingHeroSection;