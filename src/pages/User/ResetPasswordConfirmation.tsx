import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import LogoAuthentication from '../../assets/images/logo_authentication.png';
const ResetPasswordConfirmation: React.FC = () => {
    const navigate = useNavigate();
    return (
        <section className='bg-gray-50 pb-40'>
            <div  className="flex flex-col items-center justify-center  sm:min-h-[90vh] sm:-translate-y-20 -translate-y-20">
                        {/* Logo */}
                        <div className="mt-40 mb-20"> 
                            <img src={LogoAuthentication} alt='Logo' style={{ paddingTop: '5px' }}
                            className='w-12 h-12 bg-primary rounded-full p-1'/>  
                        </div>

                        {/* Card */}
                        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                            {/* Header */}
                            <div className="flex items-center justify-center mb-6 relative">
                                <button 
                                    className="absolute left-0 text-primary hover:text-secondary transition-colors"
                                    onClick={() => window.history.back()}
                                >
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.1667 16.375L7 12M7 12L11.1667 7.625M7 12H17" stroke="#FF8A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <h1 className="text-lg font-medium text-gray-900 ml-4">Đặt lại mật khẩu</h1>
                            </div>

                            {/* Message */}
                            <p className="text-center text-authencation text-gray-600 mb-6">
                                Vui lòng làm theo hướng dẫn được gửi đến hòm thư<br />
                                để tiến hành đặt lại mật khẩu của bạn.
                            </p>

                            {/* OK Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={() => navigate('/authentication')} 
                                    className="bg-[#FFB4B4] text-white px-8 py-2 rounded-lg hover:bg-[#FFA5A5] transition-colors"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
            </div>
        </section> 
    );
};

export default ResetPasswordConfirmation;