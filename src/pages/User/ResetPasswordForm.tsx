import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoAuthentication from '../../assets/images/logo_authentication.png';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { API_BASE_URL } from '../../config/api.config';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Get token and email from URL
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("email");
    const tokenFromUrl = params.get("token");

    if (emailFromUrl) setEmail(emailFromUrl);
    if (tokenFromUrl) setToken(tokenFromUrl || "");
  }, []);

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

  const validateInputs = (): boolean => {
    clearErrors();
  
    let isValid = true;
  
    if (!email) {
      toast.error("Email không được để trống.");
      isValid = false;
    }
  
    if (password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự.");
      isValid = false;
    }
  
    if (password !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      isValid = false;
    }
  
    return isValid; // Trả về trạng thái hợp lệ
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateInputs()) {
      return; // Nếu không hợp lệ, thoát và hiển thị lỗi
    }
  
    const url = `${API_BASE_URL}/api/reset-password`;
    const payload = { email, password, token };
  
    try {
      const response = await axios.post(url, payload);
      if (response.data.message === "Success") {
        toast.success("Mật khẩu của bạn đã được đặt lại thành công."
          ,{
            iconTheme: {
              primary: 'rgb(237,131,131)', // Màu của icon
              secondary: '#ffffff', // Màu nền của icon
            },
          }
        );
        navigate('/authentication');
      } else {
        toast.error(response.data.error || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        // toast.error(error.response.data.error);
        navigate('/authentication/reset-password');
           Swal.fire({
                icon: 'error',
                title:'<h2 class="text-lg font-semibold text-gray-800">Email đã hết hạn</h2>',
                html:'<p style="font-size:16px;line-height:1.5;" >'+error.response.data.error+'</p>',
                timer: 5000,
                showConfirmButton: false,
                timerProgressBar: true,
                customClass: {
                    popup: 'custom-swal-popup', // Thêm lớp CSS tùy chỉnh
                    icon: 'custom-swal-icon',
                  },
              });
      }
    }
  };

  return (
    <section className='bg-gray-50 pb-40'>
      <div className="flex flex-col items-center justify-center  sm:min-h-[90vh] sm:-translate-y-20 -translate-y-20">
        {/* Logo */}
        <div className="mt-40 mb-5"> 
                  <img src={LogoAuthentication} alt='Logo'style={{ paddingTop: '5px' }}
                  className='w-12 h-12 bg-primary rounded-full p-1'/>  
              </div>

        {/* Reset Password Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hidden token input */}
            <input type="hidden" value={token} />

            {/* Email input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="w-full shadow px-4 outline-none py-3 text-content-2 bg-[#fdfdfd] transition-all duration-800 rounded-lg border-[1px] focus:ring-primary focus:border-primary"
              required
            />

            {/* Password input */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="w-full shadow px-4 outline-none py-3 text-content-2 bg-[#fdfdfd] transition-all duration-800 rounded-lg border-[1px] focus:ring-primary focus:border-primary"
              required
            />

            {/* Confirm password input */}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu mới"
              className="w-full shadow px-4 outline-none py-3 text-content-2 bg-[#fdfdfd] transition-all duration-800 rounded-lg border-[1px] focus:ring-primary focus:border-primary"
              required
            />

            <div className="flex flex-col items-center">
              <span className="hidden">{showErrors()}</span>
              <button
                type="submit"
                className="w-fit bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-coral-600 transition-colors font-medium text-sm"
              >
                Đặt lại mật khẩu
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
