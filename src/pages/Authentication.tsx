import React, { useState,useContext  } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/images/logo (1).png';
import LoadingDots from '../components/common/LoadingDots';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config/api.config';

const Authentication: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);

    // Xử lý khi context bị undefined
    if (!context) {
        return null; // Có thể trả về UI khác hoặc null nếu cần
    }

    // Nếu context có giá trị, lấy setUser từ context
    const { setUser } = context;
    
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const [errors, setErrors] = useState<string[]>([]);
    const showErrors = () => {
        return errors.length > 0 ? (
            <ul className="text-red-500 text-left">
                {errors.map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </ul>
        ) : null;
    };

    const clearErrors = () => {
        setErrors([]);
    };

    const validatePassword = (password: string, confirmPassword: string, phone: string): boolean => {
        let isValid = true; // Biến kiểm tra hợp lệ

        if (!isLogin) {
            // Kiểm tra khi đăng ký
            if (password.length < 8) {
                toast.error("Mật khẩu phải có ít nhất 8 ký tự.");
                isValid = false;
            }

            if (password !== confirmPassword) {
                toast.error("Xác nhận mật khẩu không khớp.");
                isValid = false;
            }

            if (phone.length < 10 || phone.length >= 11 ||!/^\d+$/.test(phone)) {
                toast.error("Số điện thoại không hợp lệ .");
                isValid = false;
            }
        } else {
            // Kiểm tra khi đăng nhập
            if (password.length < 8) {
                toast.error("Mật khẩu phải có ít nhất 8 ký tự.");
                isValid = false;
            }
        }

        return isValid;
    };

    // Hàm xử lý submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors(); // Xóa lỗi cũ
        setIsSubmit(true);
        const isValid = validatePassword(
            formData.password,
            formData.confirmPassword,
            formData.phone
        );

        if (!isValid) {
            // Nếu không hợp lệ, dừng tại đây
            setTimeout(() => {
                setIsSubmit(false)
            }, 1500)
            return;
        }

        // URL API và payload
        const url = isLogin
            ? `${API_BASE_URL}/api/login`
            : `${API_BASE_URL}/api/register`;

        const payload = isLogin 
            ? { email: formData.email, password: formData.password }
            : {
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  password: formData.password,
                  confirmPassword: formData.confirmPassword,
              };

        try {
           
            const response = await axios.post(url, payload);
            if (isLogin) {
                if (response.data.message === "Success") {
                    toast.success("Đăng nhập thành công!"
                        ,{
                            iconTheme: {
                              primary: 'rgb(237,131,131)', // Màu của icon
                              secondary: '#ffffff', // Màu nền của icon
                            },
                          }
                    );
                    const user = response.data.user.original.user;
                    console.log("user nè",user);
                    if(user.isadmin==1)
                    {
                        navigate('/admin/home');
                    }
                    else{   
                    navigate('/');  
                    }
                    localStorage.setItem('user',JSON.stringify(user));
                    setUser(user);
                   
                } else if (response.data.message === "Error") {
                    setTimeout(() => {
                        setIsSubmit(false)
                    }, 2000)
                    toast.error(response.data.error);
                }
            } else {
                if (response.data.message === "Success") {
                    Swal.fire({
                        icon: 'success',
                        title: '<h2 class="text-lg font-semibold text-gray-800">Đăng kí thành công</h2>',
                        html:'<p style="font-size:16px;line-height:1.5;" >Vui lòng làm theo hướng dẫn được gửi đến hòm thư để tiến hành kích hoạt tài khoản của bạn.</hp>',
                        timer: 5000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        customClass: {
                            popup: 'custom-swal-popup', // Thêm lớp CSS tùy chỉnh
                            icon: 'custom-swal-icon',
                          },
                      });
                      setTimeout(() => {
                        setIsLogin(true)
                    }, 5000)
               
                } else if (response.data.message === "Error") {
                    setTimeout(() => {
                        setIsSubmit(false)
                    }, 2000)
                    toast.error(response.data.error);
                }
            }
        } catch (error:any) {
            if (isLogin) {
                if (error.response.data.message === "Success") {
                    toast.success("Đăng nhập thành công!"
                        ,{
                            iconTheme: {
                              primary: 'rgb(237,131,131)', // Màu của icon
                              secondary: '#ffffff', // Màu nền của icon
                            },
                          }
                    );
                    navigate("/home")
                } else if (error.response.data.message === "Error") {
                    toast.error(error.response.data.error);
                }
            } else {
                toast.error("Đăng ký thất bại");
                setTimeout(() => {
                    setIsSubmit(false)
                }, 2000)
            }
            
        }
        finally{
            setTimeout(() => {
                setIsSubmit(false)
            }, 1500)
        } 
    };

    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="h-20 shadow-md w-full flex justify-center">
                <img
                    src={Logo}
                    alt="Logo"
                    className="w-[125px] h-[125px] -translate-y-5"
                />
            </div>
            <div className="w-full max-w-[490px] p-5 text-center">
                <h2 className="text-lg pt-8 pb-[5px] font-semibold text-gray-800 mb-2">
                    {isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
                </h2>
                <h5 className="text-gray-600 mt-[10px] mb-[30px] mx-auto font-light">
                    Kết nối và chia sẻ những điều hạnh phúc
                </h5>
                <form
                    className="space-y-[10px] text-gray-500"
                    onSubmit={handleSubmit}
                >
                    {!isLogin && (
                        <>
                           <div className="relative">
                            {/* Icon */}
                            <svg
                                className="absolute top-1/2 left-3 transform -translate-y-1/2"
                                width="18"
                                height="22"
                                viewBox="0 0 18 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M17.3995 20.6L17.3998 17.0003C17.4 15.012 15.7881 13.4 13.7998 13.4H4.2005C2.21244 13.4 0.600726 15.0115 0.600502 16.9996L0.600098 20.6M12.6001 4.99999C12.6001 6.98822 10.9883 8.59999 9.0001 8.59999C7.01187 8.59999 5.4001 6.98822 5.4001 4.99999C5.4001 3.01177 7.01187 1.39999 9.0001 1.39999C10.9883 1.39999 12.6001 3.01177 12.6001 4.99999Z"
                                    stroke="#999999"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {/* Input */}
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Tên của bạn"
                                className="w-full shadow px-10 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            />
                        </div>

                            <div className="relative">
                            <svg className="absolute top-1/2 left-3 transform -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M20.6633 18.771C20.6633 18.771 19.5047 19.909 19.2207 20.2427C18.7582 20.7363 18.2132 20.9693 17.4988 20.9693C17.4301 20.9693 17.3568 20.9693 17.2881 20.9648C15.9279 20.8779 14.6639 20.3478 13.7159 19.8953C11.1238 18.643 8.84771 16.8652 6.95629 14.612C5.39461 12.7336 4.35044 10.9969 3.65891 9.13217C3.233 7.99415 3.07729 7.1075 3.14598 6.27113C3.19178 5.7364 3.39787 5.29308 3.77798 4.91374L5.33966 3.35526C5.56406 3.14502 5.80221 3.03076 6.03577 3.03076C6.32429 3.03076 6.55786 3.20443 6.70441 3.35069C6.70899 3.35526 6.71357 3.35983 6.71815 3.3644C6.99751 3.62491 7.26313 3.89456 7.54249 4.18249C7.68446 4.32874 7.83101 4.47499 7.97756 4.62581L9.22782 5.87351C9.71327 6.35797 9.71327 6.80586 9.22782 7.29032C9.09501 7.42286 8.96678 7.5554 8.83397 7.68337C8.44927 8.07642 8.75147 7.77483 8.35304 8.13132C8.34388 8.14046 8.33472 8.14503 8.33014 8.15417C7.93629 8.54722 8.00956 8.93113 8.092 9.19164C8.09658 9.20535 8.10116 9.21906 8.10573 9.23277C8.43089 10.0189 8.88886 10.7593 9.58498 11.6413L9.58956 11.6459C10.8536 13.1998 12.1862 14.411 13.6563 15.3387C13.8441 15.4576 14.0364 15.5536 14.2196 15.645C14.3845 15.7272 14.5402 15.8049 14.673 15.8872C14.6913 15.8963 14.7097 15.91 14.728 15.9192C14.8837 15.9969 15.0302 16.0334 15.1814 16.0334C15.5615 16.0334 15.7996 15.7958 15.8775 15.7181L16.7752 14.8222C16.9309 14.6668 17.1782 14.4795 17.4667 14.4795C17.7506 14.4795 17.9842 14.6577 18.1262 14.8131C18.1308 14.8177 18.1308 14.8177 18.1353 14.8222L20.6587 17.3405C21.1305 17.8067 20.6633 18.771 20.6633 18.771Z" stroke="#999999" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Nhập số điện thoại"
                                    className="w-full shadow px-10 outline-none py-3 text-content-2 bg-[#fdfdfd] transition-all duration-800 rounded-lg border-[1px] focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </>
                    )}
                    <div className="relative">
                    <svg className="absolute top-1/2 left-3 transform -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.6875 6.75L11.3596 11.5403C11.7449 11.8168 12.2551 11.8168 12.6404 11.5403L19.3125 6.75M5.25 19H18.75C19.9926 19 21 17.9553 21 16.6667V7.33333C21 6.04467 19.9926 5 18.75 5H5.25C4.00736 5 3 6.04467 3 7.33333V16.6667C3 17.9553 4.00736 19 5.25 19Z" stroke="#999999" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email dùng để đăng nhập"
                            className="w-full shadow px-10 outline-none py-3 text-content-2 bg-[#fdfdfd] transition-all duration-800 rounded-lg border-[1px] focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div className="relative">
                    <svg className="absolute top-1/2 left-3 transform -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M6.5998 8.79999V7.88571C6.5998 4.8468 9.00838 2.39999 11.9998 2.39999C14.9912 2.39999 17.3998 4.8468 17.3998 7.88571V8.79999M6.5998 8.79999C5.6098 8.79999 4.7998 9.62285 4.7998 10.6286V19.7714C4.7998 20.7771 5.6098 21.6 6.5998 21.6H17.3998C18.3898 21.6 19.1998 20.7771 19.1998 19.7714V10.6286C19.1998 9.62285 18.3898 8.79999 17.3998 8.79999M6.5998 8.79999H17.3998" stroke="#999999" stroke-linecap="round"></path>
                    </svg>
                        <input
                            required
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            className="w-full shadow px-10 outline-none py-3 text-content-2 bg-[#fdfdfd] transition-all duration-800 rounded-lg border-[1px] focus:ring-primary focus:border-primary"
                            autoComplete="new-password"
                        />
                    </div>
                    {!isLogin && (
                        <div className="relative">
                            <svg className="absolute top-1/2 left-3 transform -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M6.5998 8.79999V7.88571C6.5998 4.8468 9.00838 2.39999 11.9998 2.39999C14.9912 2.39999 17.3998 4.8468 17.3998 7.88571V8.79999M6.5998 8.79999C5.6098 8.79999 4.7998 9.62285 4.7998 10.6286V19.7714C4.7998 20.7771 5.6098 21.6 6.5998 21.6H17.3998C18.3898 21.6 19.1998 20.7771 19.1998 19.7714V10.6286C19.1998 9.62285 18.3898 8.79999 17.3998 8.79999M6.5998 8.79999H17.3998" stroke="#999999" stroke-linecap="round"></path>
                            </svg>
                            <input
                                required
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Xác nhận mật khẩu"
                                className="w-full shadow px-10 outline-none py-3 text-content-2 bg-[#fdfdfd] transition-all duration-800 rounded-lg border-[1px] focus:ring-primary focus:border-primary"
                                autoComplete="new-password"
                            />
                        </div>
                    )}
                    <div className="text-authentication flex justify-between ml-[23px] mr-[25px] text-sm">
                        <button
                            type="button"
                            onClick={() => setIsLogin((prev) => !prev)}
                        >
                            <span>
                                {!isLogin && ' Bạn đã có tài khoản?'}
                            </span>
                            <span className="text-primary underline ml-1">
                                {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                            </span>
                        </button>
                        <Link to="reset-password" className="underline">
                            Bạn quên mật khẩu?
                        </Link>
                    </div>
                    <div className="flex w-full justify-center items-center flex-col">
                        <span className='hidden'>{showErrors()}</span>
                        <div className='flex w-full justify-center items-center'> 
                    <button
                        type="submit"
                        className="w-[182px] bg-[#FFCECE] text-black font-light mt-[51px] py-3 px-4 rounded-full hover:bg-[#FFA5A5] transition-colors flex items-center justify-center group"
                        disabled={isSubmit}
                    >
                        {
                            isSubmit 
                                ? <LoadingDots color='bg-white'/>
                                : <>
                                <span>{isLogin ? "Đăng nhập" : "Đăng ký"}</span>
                                    <svg 
                                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                                        fill="none" 
                                        strokeWidth="1.5" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </>
                        } 
                    </button>
                </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Authentication;
