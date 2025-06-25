import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { API_BASE_URL } from '../../config/api.config';
import axios from 'axios';
import toast from 'react-hot-toast';

type CreateCardModalProps = {
  userId: string;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    slug: string;
    thumbnail: File | null;
    userId: string;
  }) => void;
};

const CreateCardModal: React.FC<CreateCardModalProps> = ({ userId, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailDisplayPath, setThumbnailDisplayPath] = useState<string>('');

  const cleanUserId = userId.replace('/', '');

  // Hàm chuyển file thành Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Xử lý khi chọn file ảnh
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnail(file);
      const base64Image = await convertToBase64(file);
      setThumbnailPreview(base64Image); // Cập nhật preview
      setThumbnailDisplayPath(file.name); // Hiển thị tên file trong input
    }
  };

  // Xử lý submit form
  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Vui lòng nhập tên thiệp');
      return;
    }
    if (!description.trim()) {
      toast.error('Vui lòng nhập mô tả');
      return;
    }
    if (!slug.trim()) {
      toast.error('Vui lòng nhập URL slug');
      return;
    }
    if (!thumbnail && !thumbnailPreview) {
      toast.error('Vui lòng chọn ảnh thumbnail');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('slug', slug);
    formData.append('user_id', cleanUserId);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
     await axios.post(`${API_BASE_URL}/api/admin/postcardshare`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Tạo thiệp thành công!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      // Lưu slug và ảnh vào localStorage
      const storedSlug = localStorage.getItem(`template_slug_${cleanUserId}`);
      if (slug !== storedSlug) {
        localStorage.setItem(`template_slug_${cleanUserId}`, slug);
      }

      if (thumbnail) {
        const base64Image = await convertToBase64(thumbnail);
        localStorage.setItem(`template_image_${cleanUserId}`, base64Image); // Lưu ảnh Base64
      }

      // Gọi onSubmit với dữ liệu
      onSubmit({
        title,
        description,
        slug,
        thumbnail,
        userId: cleanUserId,
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error('❌ Lỗi từ server:', error.response.data);
        toast.error('Lỗi: ' + (error.response.data.message || 'Đã xảy ra lỗi'));
      } else {
        console.error('❌ Lỗi kết nối:', error);
        // toast.error('Không thể kết nối đến máy chủ');
      }
    }
  };

  // Tải dữ liệu thiệp từ API và localStorage
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/getcardshare/${cleanUserId}`);
        const data = response.data.cardshare;

        if (data) {
          setTitle(data.title || '');
          setDescription(data.description || '');
          setSlug(data.slug || localStorage.getItem(`template_slug_${cleanUserId}`) || '');

          // Ưu tiên ảnh từ API, nếu không thì từ localStorage
          if (data.thumbnail) {
            const thumbnailUrl = `${API_BASE_URL}/storage/${data.thumbnail}`;
            setThumbnailPreview(thumbnailUrl);
            setThumbnailDisplayPath(thumbnailUrl);
          } else {
            const storedImage = localStorage.getItem(`template_image_${cleanUserId}`);
            if (storedImage) {
              setThumbnailPreview(storedImage);
              setThumbnailDisplayPath('Ảnh từ localStorage');
            }
          }
        }
      } catch (error) {
        console.error('❌ Lỗi khi tải dữ liệu thiệp:', error);
      }
    };

    fetchCardData();
  }, [cleanUserId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 relative grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Form */}
        <div>
          <button className="absolute top-3 right-4 text-red-500 text-xl" onClick={onClose}>
            ✕
          </button>
          <h2 className="text-xl font-bold text-primary mb-4">Tên Thiệp</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tên thiệp"
            className="w-full border text-primary rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-primary"
          />

          <label className="block text-primary font-bold mb-2">Ảnh thumbnail</label>
          <div className="flex items-center space-x-3 border-gray-300 shadow-sm p-3 mb-4">
            <label htmlFor="thumbnail-upload" className="cursor-pointer text-pink-600">
              <FaCloudUploadAlt className="w-6 h-6" />
            </label>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <input
              type="text"
              readOnly
              value={thumbnailDisplayPath || 'Vui lòng chọn ảnh'}
              placeholder="Chưa có file nào"
              className="flex-1 px-3 py-1 rounded border border-gray-300 text-sm bg-gray-50 focus:outline-none focus:border-primary"
            />
          </div>

          <label className="block text-primary font-bold mb-2">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full border text-primary rounded-md px-3 py-2 mb-4 focus:outline-none focus:border-primary"
          />

          <label className="block text-primary font-bold mb-2">URL</label>
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm text-gray-500">{API_BASE_URL}</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 border text-primary rounded-md px-2 py-1 focus:outline-none focus:border-primary"
              placeholder="link-thiep"
            />
          </div>

          <div className="flex justify-between">
            <button onClick={onClose} className="text-primary px-4 py-2 rounded">
              Đóng
            </button>
            <button
              onClick={handleSubmit}
              className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition duration-200"
            >
              Lưu & Tiếp tục
            </button>
          </div>
        </div>

        {/* Right - Preview */}
        <div
          className="text-primary rounded-lg p-4 text-center m-6"
          style={{ boxShadow: '0 4px 10px rgb(237, 130, 130)' }}
        >
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="mx-auto h-48 object-contain mb-4"
            />
          )}
          <h3 className="text-primary font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-primary whitespace-pre-line mb-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CreateCardModal;