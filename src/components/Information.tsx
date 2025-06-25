import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

interface InformationProps{
  setName:  React.Dispatch<React.SetStateAction<string>>;
}

const Information: React.FC<InformationProps> = ({
  setName
}) => {
    const context = useContext(UserContext);
    const context1 = useContext(UserContext);
  
    if (!context) {
        throw new Error("Profile must be used within a UserProvider");
    }
    if (!context1) {
        return null; // Có thể trả về UI khác hoặc null nếu cần
    }
    const { setUser } = context1;
    const { user } = context;
    const [formData, setFormData] = useState({
        name: user ? user.name : "",
        weddingDate: user ? user.weddingDate: "",
        email: user ? user.email : "",
      });
    
      const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        if(name  === "name"){
          setName(value);
        }
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        // Kiểm tra điều kiện
        if (!formData.name.trim()) {
          toast.error("Vui lòng nhập họ và tên!");
          return;
        }
    
        try {
            const payload = {
              name: formData.name,
              email: formData.email,
              weddingDate: formData.weddingDate,
            };
          
            const response = await axios.post(`${API_BASE_URL}/api/resetinformation`, payload);
          
            if (response.status === 200) {
                  toast.success("Thông tin đã được cập nhật thành công!", {
                    iconTheme: {
                      primary: 'rgb(237,131,131)', // Màu của icon
                      secondary: '#ffffff', // Màu nền của icon
                    },
                  });
                    // console.log("Response data:",response.data.user );
                    const users = response.data.user;
                    localStorage.setItem('user',JSON.stringify(users));
                    setUser(response.data.user.original.user);
               // Lấy dữ liệu từ response
            } else {
              toast.error("Đã xảy ra lỗi khi cập nhật thông tin!");
              console.error("Error response:", response);
            }
          } catch (error:any) {
            if (error.response) {
              // Server phản hồi lỗi (status >= 400)
              toast.error(error.response.data.message || "Đã xảy ra lỗi từ server!");
              console.error("Error response:", error.response.data);
            } else if (error.request) {
              // Không nhận được phản hồi từ server
              toast.error("Không thể kết nối đến server!");
              console.error("No response received:", error.request);
            }
          }
      };

    return ( 
            <div className="w-full bg-white rounded-lg  border border-primary p-6">
            <h2 className="text-xl font-medium text-primary mb-6">Thay đổi thông tin cá nhân</h2>
            
            <div className="space-y-6">
          {user ? (
            // Hiển thị form có dữ liệu nếu user tồn tại
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Họ và tên *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Số điện thoại *</label>
                <input
                  type="text"
                  value={user.phone} // Hiển thị user.phone
                  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
            </div>
      
            <div>
              <label className="block text-sm mb-1">Email *</label>
              <input
                type="text"
                value={user.email} // Hiển thị user.email
                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <div className="text-right text-xs text-gray-500">0 / 250</div>
            </div>
      
            <div>
              <div className="mt-4">
                <label className="block text-sm mb-1">Ngày cưới *</label>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate ?? ""}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-right text-xs text-gray-500">0 / 25</div>
              </div>
            </div>
      
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded text-sm mt-4"
            >
              Lưu thông tin
            </button>
          </form>
        ) : (
            // Hiển thị form trống nếu không có user
            <form>
            <div>
                <label className="block text-sm mb-1">Họ và tên *</label>
                <input 
                type="text" 
                value="" // Form trống
                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div>
                <label className="block text-sm mb-1">Số điện thoại *</label>
                <input 
                type="text"
                value="" // Form trống
                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Email *</label>
                <input 
                type="text"
                value="" // Form trống
                className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-right text-xs text-gray-500">0 / 250</div>
            </div>

            <div>
                <div className="mt-4">
                <label className="block text-sm mb-1">Ngày cưới *</label>
                <input 
                    type="date"
                    value="" // Form trống
                    className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-right text-xs text-gray-500">0 / 25</div>
                </div>
            </div>

            <button className="bg-primary text-white px-6 py-2 rounded text-sm">
                Lưu thông tin
            </button>
            </form>
        )}
        </div>

            </div>  
    )
}

export default Information