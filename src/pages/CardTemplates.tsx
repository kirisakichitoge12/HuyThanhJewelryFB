import React, { useEffect, useState } from 'react'; 
import Banner from '../assets/images/banner.png'; 
import ArrowDown from '../assets/icons/angle-down.svg';
import { IconButton } from '../components/common/IconButton';
import Each from '../layouts/Each';
import CardTemplate from '../components/CardTemplate';
import Button from '../components/common/Button';
import Template1 from '../assets/images/template1.png';
import Template2 from '../assets/images/photo2.jpeg';
import Template3 from '../assets/images/template3.png';
import { API_BASE_URL } from '../config/api.config';
import { motion } from 'framer-motion';

interface TemplateListProps{
   id: number;
    name: string;
    image?: string;
    isFree?: boolean;
    isHidden: number | null | string;
    created_at: string;
}

const CardTemplates: React.FC = () => {
    const [templateList, setTemplateList] = useState<TemplateListProps[]>([]);
    const photos = [Template1, Template2, Template3];

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

    useEffect(() => {
      const fetchTemplates = async () => {
            const response = await fetch(`${API_BASE_URL}/api/getalltemplate`);
            const result = await response.json();
            const data = result.data;
            if(data && data.length > 0) {
                const filteredTemplates: TemplateListProps[] = data
            .filter((item: any) => item.isHidden === null)
            .map((item: any) => ({
              id: Number(item.id),
              name: item.name,
              image: item.image,
              isFree: item.isFree,
              isHidden: item.isHidden,
              created_at: item.created_at,
            }));
            setTemplateList(filteredTemplates);
            } 
        };
        fetchTemplates();
    }, [])

    return (
        <section> 
            <motion.section 
                className="relative w-full bg-gradient-to-b from-[#ec6c61]/10 via-[#ec6c61]/5 to-white"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <section className='max-w-9xl mx-auto flex flex-col lg:flex-row md:py-8 md:gap-[30px] items-center'> 
                    {/* Left Content */}
                    <motion.div 
                        className="w-full lg:w-[56%] py-0 sm:py-16 px-[15px] sm:p-5 full:px-[85px]vflex sm:px-[85px] flex-col justify-center items-start max-h-[635px]"
                        variants={textVariants}
                    >
                        <motion.h1 
                            className="text-[33px] leading-[49.5px] md:text-title-2 font-bold text-[rgb(93,93,93)] mb-4 uppercase font-['Phudu'] hover:text-[#ec6c61] transition-colors duration-300"
                            variants={titleVariants}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            Thư viện mẫu thiệp
                        </motion.h1> 
                        <motion.p 
                            className="text-content-1 md:text-base mb-8 md:mb-10 md:max-w-[403px] text-gray-700 font-['Open_Sans']"
                            variants={textVariants}
                          
                        >
                            Thiệp cưới online miễn phí từ Huy Thanh với thao tác đơn giản, giúp bạn dễ dàng quản lý khách mời và tạo dấu ấn cá nhân cho ngày cưới thêm trọn vẹn!
                        </motion.p>

                        <motion.div 
                            className='hidden md:flex justify-center items-center gap-4'
                            variants={textVariants}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                        >       
                            <motion.div
                                whileHover={{ 
                                    rotate: 180,
                                    transition: { duration: 0.3 }
                                }}
                                onClick={() => {
                                    const templateSection = document.getElementById('templateList');
                                    if (templateSection) {
                                        const offset = templateSection.offsetTop;
                                        window.scrollTo({
                                            top: offset,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                                className="cursor-pointer"
                            >
                                <IconButton icon={ArrowDown}/> 
                            </motion.div>
                            <motion.p 
                                className="text-gray-600 hover:text-[#ec6c61] transition-colors duration-300 cursor-pointer"
                                whileHover={{ 
                                    x: 5,
                                    transition: { duration: 0.2 }
                                }}
                                onClick={() => {
                                    const templateSection = document.getElementById('templateList');
                                    if (templateSection) {
                                        const offset = templateSection.offsetTop;
                                        window.scrollTo({
                                            top: offset,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                            >
                                Cuộn xuống
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
            <section id="templateList" className='bg-gray-light'>
                <section className='max-w-9xl mx-auto full:px-[85px] full:py-[130px] px-[15px] py-16'>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 full:grid-cols-4 gap-10 sm:gap-[30px] '>
                        <Each 
                            of={templateList}
                            render={(item: TemplateListProps, index: number) => 
                                <CardTemplate 
                                    {...item}
                                    image={item.image || photos[index]} 
                                />
                            }
                        /> 
                    </div>
                    <div className='flex justify-center items-center mt-[88px]'>
                        <Button 
                            style={{ width: '293px' }} 
                            onClick={() => {}}
                        >
                            Xem thêm
                        </Button>
                    </div>
                </section>
                
            </section>
        </section>
    )
}

export default CardTemplates;