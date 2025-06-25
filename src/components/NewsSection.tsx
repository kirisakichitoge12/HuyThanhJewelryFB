import React, { useState } from 'react';  
import { useSwipeable } from 'react-swipeable'; // Thêm thư viện swipeable
import Photo1 from '../assets/images/blogs/blog1.png';
import Photo2 from '../assets/images/blogs/blog2.png';
import Photo3 from '../assets/images/blogs/blog3.png';
import Photo4 from '../assets/images/blogs/blog4.png';
import ArrowRight from '../assets/icons/arrow-right.svg'; 
import AngleRight from '../assets/icons/angle-right.svg';
import AngleLeft from '../assets/icons/angle-left.svg';
import { Link } from 'react-router-dom';
import Each from '../layouts/Each'; 
import { motion } from 'framer-motion';

interface NewsCardProps {
    image: string;
    title: string;
    excerpt: string;
}

const NewsCard = ({ image, title, excerpt }: NewsCardProps) => (
    <motion.div
        className="respon1k2 bg-gray-100 w-full h-auto rounded-xl shadow-sm"
        whileHover={{
            scale: 1.04,
            // boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            filter: 'brightness(1.05)'
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        style={{ cursor: 'pointer', position: 'relative' }}
    >
        <div className="overflow-hidden rounded-xl">
            <img 
                src={image} 
                alt={title}
                className="pd-news w-full h-[190px] object-cover mb-4"
            />
        </div>
        <h3 
            style={{ fontWeight: 'bold'}} 
            className="pd-news text-[18px] leading-[25px] mb-2 line-clamp-2"
        >
            {title}
        </h3>
        <p className="pd-news text-gray-600 text-base line-clamp-3">
            {excerpt}
        </p>
    </motion.div>
);

const NewsSection: React.FC = () => {
    const news = [
        {
            id: 1,
            image: Photo1,
            title: 'Bí quyết tổ chức đám cưới trong mơ',
            excerpt: 'Từ ý tưởng sáng tạo đến kế hoạch chi tiết, chúng tôi mang đến cho bạn những mẹo hữu ích và xu hướng mới nhất để ngày cưới của bạn trở thành kỷ niệm đẹp nhất. Khả...'
        },
        {
            id: 2,
            image: Photo2,
            title: 'Lên kế hoạch cho ngày cưới hoàn hảo',
            excerpt: 'Đám cưới không chỉ là một sự kiện mà còn là hành trình yêu thương của bạn. Blog của chúng tôi cung cấp hướng dẫn chi tiết, từ việc chọn địa điểm, decor, thiệp cưới, để...'
        },
        {
            id: 3,
            image: Photo3,
            title: 'Lên kế hoạch cho ngày cưới hoàn hảo',
            excerpt: 'Đám cưới không chỉ là một sự kiện mà còn là hành trình yêu thương của bạn. Blog của chúng tôi cung cấp hướng dẫn chi tiết, từ việc chọn địa điểm, decor, thiệp cưới, để...'
        },
        {
            id: 4,
            image: Photo4,
            title: 'Những điều giúp hành trình cưới trọn vẹn',
            excerpt: 'Cùng đồng hành trên hành trình chuẩn bị ngày trọng đại của bạn. Blog chia sẻ đầy đủ kinh nghiệm tổ chức đám cưới, từ việc chọn concept, tìm nhà cung cấp đến các...'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % news.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
    };

    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: false,
    });

    return (
        <section className="bg-[#F7F7F7] py-16 px-4 lg:px-default">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-[28px] leading-[42px] md:text-[36px] md:leading-[54px] font-bold text-heading">Tin tức</h2>
                    <Link to="/guest/blog" className="flex items-center text-primary gap-1">
                        <p className="text-content-1">Xem thêm</p> 
                        <img src={ArrowRight} alt="ArrowRight" className="w-4 h-4"/>
                    </Link>
                </div>

                {/* News List (PC) */}
                <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {news.map((item) => (
                        <NewsCard
                            key={item.id}
                            image={item.image}
                            title={item.title}
                            excerpt={item.excerpt}
                        />
                    ))}
                </div>

                {/* Carousel (Mobile) */}
                <div className="sm:hidden relative" {...handlers}>
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {news.map((item) => (
                                <div className="min-w-full" key={item.id}>
                                    <NewsCard
                                        image={item.image}
                                        title={item.title}
                                        excerpt={item.excerpt}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button 
                        onClick={prevSlide}
                        className="absolute hover:bg-pink-default left-1 -translate-y-1/2 bg-white p-3 rounded-full border-2 border-primary text-primary shadow-lg"
                        style={{ top: '27.8%' }}
                    >
                        <img alt="angle left" src={AngleLeft} className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute hover:bg-pink-default right-1 -translate-y-1/2 bg-white p-3 rounded-full border-2 border-primary text-primary shadow-lg"
                        style={{ top: '27.8%' }}
                    >
                        <img alt="angle right" src={AngleRight} className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Pagination */}
            <div className="sm:hidden flex justify-center items-center gap-2 mt-6">
                <Each
                    of={Array(4).fill(news.length)}
                    render={(_, index) => 
                        <div 
                            onClick={() => setCurrentSlide(index)} 
                            className={`cursor-pointer ${
                                currentSlide === index ? "bg-secondary" : "bg-primary"
                            } w-3 h-3 rounded-full`}
                        />
                    }
                />
            </div>
        </section>
    );
};

export default NewsSection;
