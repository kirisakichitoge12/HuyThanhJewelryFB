import React from 'react';
import FlashIcon from '../assets/icons/flash.svg';
import SendIcon from '../assets/icons/send.svg';
import SaveMoneyIcon from '../assets/icons/save-money.svg';
import GiftIcon from '../assets/icons/gift.svg';
import ManamentCustomerIcon from '../assets/icons/manament-customer.svg';
import EcoEnviromentIcon from '../assets/icons/eco-enviroment.svg';
import { motion } from 'framer-motion';

interface FeatureProps{
    icon: string;
    title: string;
    description: string;
}

const featureBoxVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            type: 'spring',
            stiffness: 80,
            damping: 15
        }
    })
};

const Feature = ({ icon, title, description, index }: FeatureProps & { index: number }) => (
    <motion.div
        className="bg-white p-6 md:pt-10 md:pb-8 md:px-8 rounded-2xl lg:min-h-[278px] shadow-sm"
        custom={index}
        variants={featureBoxVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
            scale: 1.05,
          
            transition: { type: 'spring', stiffness: 200, damping: 12 }
        }}
        style={{ cursor: 'pointer' }}
    >
        <motion.div
            className="w-12 h-12 md:w-[66px] mb-4 md:h-[66px] md:mb-6 flex items-center justify-center"
        >
            <img src={icon} alt={title} className="w-full h-full object-cover" />
        </motion.div>
        <h3 className="md:text-2xl text-xl font-bold mb-2 text-[#ec6c61] transition-colors duration-200">{title}</h3>
        <p className="text-gray-600 text-content-1 md:text-base">{description}</p>
    </motion.div>
);

const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: FlashIcon,
            title: 'Thao tác nhanh chóng',
            description: 'Chỉ cần vài thao tác đơn giản, dễ dàng chỉnh sửa thông tin tùy cơ thế hợp với giới thiệu cuối ngày lập tức mà không mất thời gian chờ đợi trễ.'
        }, {
            icon: SendIcon,
            title: 'Tiện lợi',
            description: 'Gửi thiệp mời qua email, mạng xã hội hoặc tin nhắn, phù hợp với những khách mời ở xa hoặc không thể gặp trực tiếp.'
        },{
            icon: SaveMoneyIcon,
            title: 'Tiết kiệm chi phí',
            description: 'Không cần in ấn và vận chuyển, giúp giảm đáng kể chi phí so với thiệp cưới truyền thống.'
        },{
            icon: GiftIcon,
            title: 'Linh hoạt cho khách mời',
            description: 'Khách mời có thể gói tiện nắng bắt cử lúc nào, kế cả khi không thể tham dự trực tiếp.'
        },{
            icon: ManamentCustomerIcon,
            title: 'Quản lý khách mời dễ dàng',
            description: 'Theo dõi số lượng khách mời tham dự và lưu giữ lời chúc từ bạn bè, người thân.'
        },{
            icon: EcoEnviromentIcon,
            title: 'Thân thiện với môi trường',
            description: 'Giảm thiểu việc sử dụng giấy và in ấn, góp phần bảo vệ môi trường.'
        }
    ];

    return (
        <section className=" bg-pink-default">
            <section className='max-w-9xl mx-auto py-16 px-[15px] sm:p-5 full:px-default full:py-[130px]'> 
                    <h2 className="text-[28px] leading-[42px] md:text-[36px] md:leading-[54px]  font-bold mb-[42px] max-w-xl">
                        Thiệp cưới online của Huy Thanh
                        có gì đặc biệt?
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[30px]">
                        {features.map((feature, index) => (
                            <Feature
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                index={index}
                            />
                        ))}
                    </div> 
                </section>
        </section>
    );
};

export default FeaturesSection;