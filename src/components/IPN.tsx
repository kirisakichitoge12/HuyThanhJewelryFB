import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const formatAmount = (amount: string | null) => {
  if (!amount) return '';
  // Loại bỏ phần thập phân nếu có
  const num = parseFloat(amount);
  return num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 });
};

const IPN: React.FC = () => {
  const location = useLocation();
  const query = useQuery();
  const errorCode = query.get('error_code');
  const amount = query.get('pg_amount');
  const paymentChannel = query.get('pg_payment_channel');
  const orderInfo = query.get('pg_order_info');
  const orderReference = query.get('pg_order_reference');
  const isSuccess = errorCode === '00';

  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Gọi API khi vào trang
  useEffect(() => {
    const fetchIPN = async () => {
      try {
        const apiUrl = `https://apii.hungthinhsecurity.com/api/mb/ipn${location.search}`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data && data.status === 'success') {
          setUpdateSuccess(true);
        }
      } catch (e) {
        // Có thể log lỗi nếu cần
      }
    };
    fetchIPN();
  }, [location.search]);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center">
          {/* Icon check hoặc dấu X */}
          <div className={`rounded-full p-3 mb-4 ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
            {isSuccess ? (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#4CAF50"/>
                <path d="M34 18L22 30L14 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#F44336"/>
                <path d="M16 16L32 32M32 16L16 32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          {/* Tiêu đề */}
          <h2 className={`text-2xl font-bold mb-2 text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {isSuccess ? 'Giao Dịch Thanh Toán Thành Công' : 'Giao Dịch Thanh Toán Chưa Thành Công'}
          </h2>
          {/* Thông tin giao dịch */}
          <div className="w-full mt-4">
            <h3 className="text-gray-700 font-semibold text-center mb-4 tracking-wide">THÔNG TIN GIAO DỊCH</h3>
            <div className="grid grid-cols-2 gap-y-3 text-gray-700 text-base">
              <div className="font-normal">Nội dung thanh toán</div>
              <div className="font-semibold text-right">{orderInfo || '-'}</div>
              <div className="font-normal">Cổng thanh toán</div>
              <div className="font-semibold text-right">{paymentChannel || '-'}</div>
              <div className="font-normal">Mã đơn hàng</div>
              <div className="font-semibold text-right">{orderReference || '-'}</div>
              <div className="font-normal">Số tiền thanh toán</div>
              <div className="font-bold text-right text-lg">{formatAmount(amount) || '-'}</div>
            </div>
          </div>
          {/* Nút trở về trang chủ và đếm ngược */}
          <button
            onClick={handleBackHome}
            style={{ backgroundColor: "rgb(237 131 131)" }}
            className="mt-8 px-6 py-2 text-white rounded hover:opacity-90 transition flex flex-col items-center"
          >
            Trở về trang chủ
            {updateSuccess && (
              <span className="block text-xs mt-1 text-white font-semibold">Cập nhật hệ thống thành công</span>
            )}
          </button>
          <div className="mt-2 text-gray-500 text-sm">
            Tự động trở về trang chủ sau {countdown} giây
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPN; 