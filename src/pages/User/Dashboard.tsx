import React, { useContext, useEffect, useState } from 'react';
import Photo from '../../assets/images/photo1.jpeg';
import Button from '../../components/common/Button';
import Switch from '../../components/common/Switch';
import CreateCardModal from '../../components/common/CreateCardModal';
import GuestList from './CustomersList';
import { UserContext } from '../../context/UserContext';
import { fetchTemplatesUser } from '../../api/template';
import { Link, useNavigate } from 'react-router-dom';
import Each from '../../layouts/Each';
import { MdContentCopy, MdEdit,MdTrendingUp } from 'react-icons/md';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../../config/api.config';
import axios from 'axios';

interface OverviewProps {
  onChangeActivetab: () => void;
  setListguest: React.Dispatch<React.SetStateAction<any[]>>;
}
interface NavTabsProps {
  activeTab: 'overview' | 'recent';
  onTabChange: (tab: 'overview' | 'recent') => void;
}
// interface StatisticCardProps {
//   title: string;
//   value: string;
//   infoTooltip?: string;
//   textColor?: string;
// }
interface PageDataProps {
  title: string;
  url: string;
  imageUrl: string;
  createdAt: string;
  eventDate: string;
  isPublic: boolean;
  stats: {
    visits: number;
    interactions: number;
    donations: number;
    participations: number;
  };
}

const NavTabs: React.FC<NavTabsProps> = ({ activeTab, onTabChange }) => (
  <div className="flex space-x-6 px-4 mt-3">
    <button
      className={`pb-2 flex items-center space-x-2 ${
        activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'
      }`}
      onClick={() => onTabChange('overview')}
    >
      <span className="text-primary">📊</span>
      <span>Tổng quan</span>
    </button>
    <button
      className={`pb-2 flex items-center space-x-2 ${
        activeTab === 'recent' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'
      }`}
      onClick={() => onTabChange('recent')}
    >
      <span>🎁</span>
      <span>Lượt khách mời gần đây</span>
    </button>
  </div>
);

// const StatisticCard: React.FC<StatisticCardProps> = ({
//   title,
//   value,
//   infoTooltip,
//   textColor = 'text-primary',
// }) => (
//   <div className="flex justify-between items-center p-4 border-b">
//     <div className="flex items-center">
//       <span className="text-gray-600">{title}</span>
//       {infoTooltip && (
//         <div className="ml-1 text-gray-400 cursor-help" title={infoTooltip}>
//           ⓘ
//         </div>
//       )}
//     </div>
//     <span className={`font-medium ${textColor}`}>{value}</span>
//   </div>
// );

const Overview: React.FC<OverviewProps> = ({ onChangeActivetab, setListguest }) => {
  const context = useContext(UserContext);
  const { user } = context;
  const userId = user?.id ? `/${user.id}` : '';
  const pageData: PageDataProps = {
    title: 'Thiệp cưới online',
    url: `${API_BASE_URL}/guest/template`,
    imageUrl: Photo,
    createdAt: '09:16 ngày 16/11/2024',
    eventDate: '16/11/2024',
    isPublic: true,
    stats: {
      visits: 5,
      interactions: 0,
      donations: 0,
      participations: 1,
    },
  };

  const [isPublic, setIsPublic] = useState<boolean>(pageData.isPublic);
  const [templates, setTemplates] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleCopyToClipboard = (link: any) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success('Đã copy đường dẫn thành công!');
      })
      .catch((err) => {
        console.error('Lỗi khi copy:', err);
        toast.error('Lỗi khi copy đường dẫn!');
      });
  };

  // Lấy slug và ảnh từ localStorage và dữ liệu từ API
  useEffect(() => {
    if (!user) {
      navigate('/authentication');
      return;
    }

    let isMounted = true;

    const fetchTemplatesAndGuest = async () => {
      try {
        setLoading(true);
        const data = await fetchTemplatesUser(user.id.toString());
        if (data && data.length > 0 && isMounted) {
          const storedSlug = localStorage.getItem(`template_slug_${user.id}`);
          const storedImage = localStorage.getItem(`template_image_${user.id}`);
          const updatedTemplates = data.map((template: any) => ({
            ...template,
            slug: template.slug || storedSlug || '',
            image: template.image ? `${API_BASE_URL}/${template.image}` : storedImage || pageData.imageUrl,
          }));
          setTemplates(updatedTemplates);
          const response = await axios.get(
            `${API_BASE_URL}/api/guest/getconfirm/${user.id}/${data[0].template_id}`
          );
          if (isMounted) setListguest(response.data);
        }
      } catch (err) {
        console.error('Lỗi khi fetch templates hoặc guest:', err);
        toast.error('Không thể tải dữ liệu');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTemplatesAndGuest();

    return () => {
      isMounted = false;
    };
  }, [user, navigate, setListguest]);

  // Lấy trạng thái isFree
  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const fetchIsFree = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/user/package-info/${user.id}`);
        const { isFree } = res.data;
        if (isMounted) setIsPublic(isFree == 1);
      } catch (err) {
        console.error('Lỗi khi lấy trạng thái isFree', err);
      }
    };

    fetchIsFree();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleToggle = async () => {
    const newIsPublic = !isPublic;
    setIsPublic(newIsPublic);

    try {
      await axios.post(`${API_BASE_URL}/api/user/update-isfree`, {
        userId: user?.id,
        isFree: newIsPublic ? 1 : 0,
      });
      toast.success(`Trạng thái hiện tại: ${newIsPublic ? 'Công khai' : 'Riêng tư'}`);
    } catch (err) {
      console.error('Lỗi khi cập nhật isFree:', err);
    }
  };

  // Xử lý submit slug và ảnh từ CreateCardModal
  const handleSubmit = (data: any) => {
    const newSlug = data.data.slug;
    const storedSlug = localStorage.getItem(`template_slug_${user?.id}`);

    if (newSlug !== storedSlug) {
      setTemplates((prev) =>
        prev.map((t) => ({
          ...t,
          slug: newSlug,
        }))
      );
      localStorage.setItem(`template_slug_${user?.id}`, newSlug);
      toast.success('Đã cập nhật đường dẫn thành công!');
    } else {
      toast.success('Đường dẫn không thay đổi!');
    }

    // Cập nhật ảnh nếu có
    if (data.data.thumbnail) {
      convertToBase64(data.data.thumbnail).then((base64Image) => {
        setTemplates((prev) =>
          prev.map((t) => ({
            ...t,
            image: base64Image,
          }))
        );
        localStorage.setItem(`template_image_${user?.id}`, base64Image);
        toast.success('Đã cập nhật ảnh thành công!');
      });
    }

    setShowModal(false);
  };

  // Hàm chuyển file thành Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (templates.length === 0) {
    return <div>Chưa có template nào được tạo.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      {/* Left Column - Statistics */}
      <div className="space-y-6">
        {/* <div className="bg-white rounded-lg shadow">
          <StatisticCard title="Tổng số lượt truy cập" value="20" infoTooltip="Tổng số tiền đã nhận" />
          <StatisticCard title="Khách mời" value="10" textColor="text-pink-500" />
        </div> */}

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-4">Lượt khách mời xác nhận tham dự</h3>
          <Button onClick={() => onChangeActivetab()}>Xem tất cả</Button>
        </div>
      </div>

      <Each
        of={templates}
        render={(template: any) => (
          <div className="bg-white rounded-lg shadow">
            <div className="relative">
              <img
                src={template.image}
                alt={pageData.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded text-xs">
                Sự kiện
              </span>
            </div>

            <div className="p-4">
              <div className="space-y-2 mb-4">
                <h2 className="text-lg font-medium">{template.template_name}</h2>
               <div className="flex items-center gap-2">
 <Link
                  to={`/theme/${template.template_id}`}
                  className="text-primary text-sm hover:underline"
                >
                  {template.slug && template.slug !== ''
                    ? `${pageData.url}/${template.slug}`
                    : `${pageData.url}/(Vui lòng cập nhật đường dẫn)`}
                </Link>
                
               {/* Tooltip wrapper */}
              <div className="relative group">
                <Button
                  onClick={() => handleCopyToClipboard(`${pageData.url}/${template.slug}`)}
                  color="none"
                >
                  <MdContentCopy className="w-5 h-5" />
                </Button>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2
                                bg-primary text-white text-xs px-2 py-1 rounded 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                whitespace-nowrap z-10">
                  Sao chép đường dẫn
                </div>
              </div>
                </div>
              </div>

              <div className="flex items-center justify-start mb-4 gap-3">
                <div className="text-sm text-gray-500">
                  <p>Tạo lúc {template.created_at}</p>
                </div>
                <Switch checked={isPublic} onToggle={handleToggle} />
                <span>{isPublic ? 'Công khai' : 'Riêng tư'}</span>
              </div>
              <div className="flex space-x-4 md:grid-cols-8 sm:grid-cols-8">
                {/* <Button onClick={() => {}} color="none">
                  <Link to={`/theme/${template.template_id}`}>
                    <MdEdit className="w-5 h-5" />
                  </Link>
                </Button> */}
                <div className="relative group">
                    <Button onClick={() => {}} color="none">
                      <Link to={`/theme/${template.template_id}`}>
                        <MdEdit className="w-5 h-5" />
                      </Link>
                    </Button>

                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 
                                    bg-primary text-white text-sm px-2 py-1 rounded 
                                    opacity-0 group-hover:opacity-100 font-medium transition-opacity duration-200
                                    whitespace-nowrap z-10">
                     Sửa chi tiết thiệp
                    </div>
                  </div>

{/* 
                <Button
                  onClick={() => handleCopyToClipboard(`${pageData.url}/${template.slug}`)}
                  color="none"
                >
                  <MdShare className="w-5 h-5" />
                </Button> */}
                <div className="relative group">
                  <Button onClick={() => setShowModal(true)} color="none">
                    <MdTrendingUp className="w-5 h-5" />
                  </Button>
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-6 
                                    bg-primary text-white text-sm px-2 py-1 rounded 
                                    opacity-0 group-hover:opacity-100 font-medium transition-opacity duration-200
                                    whitespace-nowrap z-10">
                     Sửa thumbnail thiệp
                    </div>
                  </div>

              </div>
            </div>
          </div>
        )}
      />
      {showModal && (
        <CreateCardModal userId={userId} onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

interface RecentProps {
  guestList: any;
}
const Recent: React.FC<RecentProps> = ({ guestList }) => {
  return (
    <div className="mx-10 text-end">
      <hr />
      <GuestList ListGuest={guestList} />
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'recent'>('overview');
  const [Listguest, setListguest] = useState<any[]>([]);
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'overview' ? (
        <Overview onChangeActivetab={() => setActiveTab('recent')} setListguest={setListguest} />
      ) : (
        <Recent guestList={Listguest} />
      )}
    </div>
  );
};

export default Dashboard;