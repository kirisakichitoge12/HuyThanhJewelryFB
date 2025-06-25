import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config/api.config';


const PasswordChange: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Profile must be used within a UserProvider");
  }
    
  const { user } = context;

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
 
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };

    // Validate current password
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Mật khẩu cũ không được để trống!';
      valid = false;
    }

    // Validate new password
    if (!formData.newPassword) {
      newErrors.newPassword = 'Mật khẩu mới không được để trống!';
      valid = false;
    }
    else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Mật khẩu mới phải có ít nhất 8 ký tự!';
      valid = false;
    }

    // Validate confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        // Gửi yêu cầu đến API đổi mật khẩu
        const response = await axios.post(`${API_BASE_URL}/api/resetpassaccount`, {
          email: user ? user.email : '',  // Gửi thêm email
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        });

        if (response.data.success) {
          Swal.fire({
            icon: 'success',
            title: '<h3 class="text-lg">Thành công</h3>', 
            html: '<p style="font-size:16px">Mật khẩu đã được thay đổi thành công!</p>',
            timer: 3000,
            showConfirmButton: false,
            timerProgressBar: true,
            customClass: {
              popup: 'custom-swal-popup', 
              icon: 'custom-swal-icon',   
            },
          }); 
          setTimeout(() => {
            window.location.href = "/user/account";
          }, 3000); 
        } else {
          // Xử lý lỗi từ API
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        // Xử lý lỗi nếu có
      }
    }
  };

  return (
    <div className="h-fit p-6 border border-primary rounded-lg">
      <h2 className="text-xl font-medium mb-4 text-primary">Đổi mật khẩu</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={user ? user.email : ''}
              className="hidden"
              readOnly
            />
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              name="currentPassword"
              placeholder="Mật khẩu cũ *"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full border rounded p-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-xs text-red-500 mt-1">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              placeholder="Mật khẩu mới *"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full border rounded p-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu mới *"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full border rounded p-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <Link to="https://demo.hungthinhsecurity.com/authentication/reset-password" className="underline mr-20 text-primary">
          Bạn quên mật khẩu?
        </Link>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded text-sm hover:bg-secondary transition-colors"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
