import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LogoAuthentication from '../../assets/images/logo_authentication.png';
import LoadingDots from '../../components/common/LoadingDots';
import { API_BASE_URL } from '../../config/api.config';

const EmailResetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // clearErrors();
        setIsSubmit(true);
        const url = `${API_BASE_URL}/api/forgot-password`; // API endpoint
        const payload = { email };

        try {
            const response = await axios.post(url, payload);
            if (response.data.message ==='Success') {
                toast.success("Gửi xác thực về mail thành công"
                    ,{
                        iconTheme: {
                          primary: 'rgb(237,131,131)', // Màu của icon
                          secondary: '#ffffff', // Màu nền của icon
                        },
                      }
                );
                navigate("/authentication/reset-password/confirm")
            } else {
                setTimeout(() => {
                    setIsSubmit(false)
                }, 1500)
                toast.error(
                    'Email không hợp lệ.'
                );
                
            }
        } catch (error: any) {
            setTimeout(() => {
                setIsSubmit(false)
            }, 1500)
            toast.error(error.response?.data?.error); 
        }
        finally{
            setTimeout(() => {
                setIsSubmit(false)
            }, 1500)
        } 
    };


    

    return (
        <section className='bg-gray-50 min-h-screen'>
            <div className="flex flex-col items-center justify-center  sm:min-h-[50vh] sm:translate-y-0 -translate-y-20">
                {/* Logo */}
                <div className="mb-8 mt-40">
                            <img 
                                src={LogoAuthentication} 
                                alt='Logo' 
                                style={{ paddingTop: '5px' }} 
                                className='w-12 h-12 bg-primary rounded-full p-1'
                            /> 
                        </div>

                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">
                
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center justify-center">
                            <button
                                className="text-primary hover:text-secondary transition-colors"
                                onClick={() => window.history.back()}
                            >
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.1667 16.375L7 12M7 12L11.1667 7.625M7 12H17"
                                        stroke="#FF8A8A"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </button>
                            <h1 className="text-lg font-medium text-gray-900 mx-auto">Đặt lại mật khẩu</h1>
                        </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full shadow px-4 outline-none py-3 text-content-2 bg-[#fdfdfd] transition-all duration-800 rounded-lg border-[1px] focus:ring-primary focus:border-primary"
                                required
                            />
                            <div className="flex justify-center items-center">
                                {/* {showErrors()} */}
                               
                                {
                                  isSubmit 
                                ? <LoadingDots color='bg-white'/>
                                : <>
                                <button
                                    type="submit"
                                    className="w-fit bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-coral-600 transition-colors font-medium text-sm"
                                >
                                    TIẾP THEO
                                </button>
                                </>
                        } 
                            </div>
                        </form>
                </div>
            </div>
        </section>
    );
};

export default EmailResetPassword;
