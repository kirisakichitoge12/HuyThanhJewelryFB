import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

// Price Card Component
interface PriceCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    ctaText: string;
    consultText: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
    title,
    price,
    description,
    features,
    isPopular,
    ctaText,
    consultText
}) => {
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgradeClick = () => {
        if (ctaText === 'Nâng cấp ngay') {
            setShowPaymentModal(true);
        }
    };

    const handleConfirmPayment = async () => {
        setIsLoading(true);
        try {
            // Lấy user.id từ localStorage
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : null;
            
            if (!user || !user.id) {
                alert('Vui lòng đăng nhập để thanh toán');
                setShowPaymentModal(false);
                setIsLoading(false);
                return;
            }

            const response = await axios.post(`${API_BASE_URL}/api/mb/create-order`, {
                paymentPrice: 2000,
                orderId: user.id
            });

            if (response.status === 200) {
                const { payment_url } = response.data;
                // Chuyển trang thanh toán
                window.location.href = payment_url;
            } else {
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Lỗi thanh toán:', error);
            setShowErrorModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <div className={`bg-white rounded-lg p-6 shadow-md flex flex-col transition-transform transition-shadow duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ${isPopular ? 'border-2 border-red-600' : ''}`}>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <div className="text-red-600 font-bold text-xl mb-2">{price}</div>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>

            <div className="flex-grow">
                <ul className="space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                    <svg
                        className="w-5 h-5 text-red-600 mr-2 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                ))}
                </ul>
            </div>

            <div className="mt-6 space-y-3">
                <button
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors transform hover:scale-105 duration-300"
                    onClick={handleUpgradeClick}
                >
                {ctaText}
                </button>
                <button className="w-full text-gray-600 py-2 text-sm transition-colors transform hover:scale-105 duration-300">
                {consultText}
                </button>
            </div>
        </div>

        {/* Modal hệ thống đang cập nhật */}
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center relative animate-fade-in-up">
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                        onClick={() => setShowModal(false)}
                        aria-label="Đóng"
                    >
                        ×
                    </button>
                    <div className="mb-4">
                        <svg className="mx-auto mb-2 w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2 text-red-600">Hệ thống đang cập nhật</h2>
                        <p className="text-gray-600">Tính năng nâng cấp sẽ sớm ra mắt. Vui lòng quay lại sau!</p>
                    </div>
                    <button
                        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => setShowModal(false)}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        )}

        {/* Modal xác nhận thanh toán */}
        {showPaymentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center relative animate-fade-in-up">
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                        onClick={() => setShowPaymentModal(false)}
                        aria-label="Đóng"
                    >
                        ×
                    </button>
                    <div className="mb-4">
                        <svg className="mx-auto mb-2 w-12 h-12" style={{color: 'rgb(237,131,131)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2 text-gray-800">Xác nhận thanh toán</h2>
                        <p className="text-gray-600">Bạn có chắc chắn muốn thanh toán gói {title} với giá {price}?</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            className="flex-1 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                            onClick={() => setShowPaymentModal(false)}
                            disabled={isLoading}
                        >
                            Không
                        </button>
                        <button
                            className="flex-1 px-6 py-2 text-white rounded-lg transition-colors disabled:opacity-50"
                            style={{backgroundColor: 'rgb(237,131,131)'}}
                            onClick={handleConfirmPayment}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Đang xử lý...
                                </div>
                            ) : (
                                'Có'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Modal lỗi thanh toán */}
        {showErrorModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center relative animate-fade-in-up">
                    <button
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                        onClick={() => setShowErrorModal(false)}
                        aria-label="Đóng"
                    >
                        ×
                    </button>
                    <div className="mb-4">
                        <svg className="mx-auto mb-2 w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2 text-red-600">Thanh toán bận</h2>
                        <p className="text-gray-600">Hệ thống thanh toán đang bận, vui lòng chờ trong ít phút!</p>
                    </div>
                    <button
                        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => setShowErrorModal(false)}
                    >
                        Đóng
                    </button>
                </div>
            </div>
        )}
        </>
    );
};

// Main Pricing Page Component
const PricingPage: React.FC = () => {
const pricingData = [
    {
    title: 'Cơ bản',
    price: 'Miễn phí',
    description: 'Có ngay "website" chỉ với vài thao tác đơn giản',
    features: [
        'Miễn phí tạo trang trên',
        'Không giới hạn số trang được tạo',
        'Tạo link dịch danh cho từng khách mời'
    ],
    ctaText: 'Tạo thiệp ngay',
    consultText: 'Gặp chuyên viên tư vấn'
    },
    {
    title: 'Pro',
    price: '990.000đ',
    description: 'Sử dụng theme không giới hạn, lưu trữ trọn đời',
    features: [
        'Truy cập toàn bộ theme trên Huy Thanh jewelry',
        'Miễn phí giao diện mừng cưới',
        'Trọn đời lưu trữ thiệp cưới trên Huy Thanh jewelry'
    ],
    
    ctaText: 'Nâng cấp ngay',
    consultText: 'Gặp chuyên viên tư vấn'
    },
    {
    title: 'VIP',
    price: '10.000.000đ',
    description: 'In đám dấu ấn cá nhân với "website" được thiết kế riêng theo yêu cầu của bạn',
    features: [
        'Thiết kế thiệp riêng theo mẫu bạn muốn',
        'Hỗ trợ thiết kế thiệp giấy',
        'Link website tự đặt theo sở thích của bạn'
    ],
    ctaText: 'Nâng cấp ngay',
    consultText: 'Gặp chuyên viên tư vấn'
    }
];

return (  
    <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 ml-1">
            Tạo thiệp cưới cùng
            <span className="text-red-600"> Huy Thanh jewelry</span>
        </h1>
        <p className="text-gray-600">
            Biến đám cưới của bạn trở nên độc đáo hơn cùng những gói thiết kế siêu hấp dẫn từ Huy Thanh jewelry
        </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
        {pricingData.map((plan, index) => (
            <PriceCard key={index} {...plan} />
        ))}
        </div>
    </main> 
);
};

export default PricingPage;