import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../config/api.config';

// Define interfaces for Template and API Response
interface Template {
  id: number;
  name: string;
  isHidden?: number | null | string;
  created_at?: string;
}

interface DisplayTemplate {
  id: string;
  name: string;
  isHidden?: number | null | string;
}

const HiddenTemplates = () => {
  // State for templates and display templates
  const [templates, setTemplates] = useState<Template[]>([
    { id: 1, name: 'Cô Ba' },
    { id: 2, name: 'Ngày Mộng Mơ' },
    { id: 3, name: 'Sang Trọng' },
    { id: 4, name: 'Cổ Điển' },
    { id: 5, name: 'Tình Yêu' },
  ]);
  const [displayTemplates, setDisplayTemplates] = useState<DisplayTemplate[]>([]);

  // Fetch all templates on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get<{ data: Template[] }>(`${API_BASE_URL}/api/getalltemplate`);
        const data = response.data.data;
        if (data && data.length > 0) {
          // Map API data to Template interface
          const mappedTemplates: Template[] = data.map((item) => ({
            id: Number(item.id),
            name: item.name,
            isHidden: item.isHidden,
            created_at: item.created_at,
          }));
          setTemplates(mappedTemplates);

          // Map for display in table
          const display = mappedTemplates.map((item) => ({
            id: item.id.toString(),
            name: item.name,
            isHidden: item.isHidden,
          }));
          setDisplayTemplates(display);
        }
      } catch (error) {
        toast.error('Lỗi khi tải danh sách template');
        console.error(error);
      }
    };
    fetchTemplates();
  }, []);

  // Handle hiding a template
  const handleHideTemplate = async (templateId: number) => {
    try {
      const templateToHide = templates.find((t) => t.id === templateId);
      if (!templateToHide) return;

      await axios.post(`${API_BASE_URL}/api/admin/posthiddentemplatenes/${templateId}`);
      toast.success('Ẩn template thành công');

      // Update templates to mark as hidden
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === templateId ? { ...t, isHidden: 1 } : t
        )
      );

      // Update displayTemplates
      setDisplayTemplates((prev) =>
        prev.map((t) =>
          t.id === templateId.toString() ? { ...t, isHidden: 1 } : t
        )
      );
    } catch (error) {
      toast.error('Có lỗi xảy ra khi ẩn template');
      console.error(error);
    }
  };

  // Handle unhiding a template
  const handleUnhideTemplate = async (templateId: string) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hiển thị lại template này không?');
    if (!confirm) return;

    try {
      await axios.post(`${API_BASE_URL}/api/admin/postblockhiddentemplates/${templateId}`);
      toast.success('Hiển thị template thành công');

      // Update templates to mark as unhidden
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === Number(templateId) ? { ...t, isHidden: null } : t
        )
      );

      // Update displayTemplates
      setDisplayTemplates((prev) =>
        prev.map((t) =>
          t.id === templateId ? { ...t, isHidden: null } : t
        )
      );
    } catch (error) {
      toast.error('Có lỗi xảy ra khi hiển thị template');
      console.error(error);
    }
  };

  const titleTable = ['Id', 'Tên Template', 'Action'];

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br rounded-xl shadow-2xl transform hover:scale-102 transition-transform duration-300">
      {/* Table of All Templates */}
      <div className="bg-white/20 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full table-fixed text-sm text-black">
          <thead>
            <tr>
              {titleTable.map((item, index) => (
                <th
                  key={index}
                  className="p-4 text-left text-sm font-bold uppercase tracking-wider transform hover:scale-105 transition-transform duration-200"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {displayTemplates.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-black">
                  Không có template nào.
                </td>
              </tr>
            ) : (
              displayTemplates.map((template, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700/30 text-black transition-colors duration-200 cursor-pointer"
                >
                  <td className="p-4 text-sm font-medium">{template.id}</td>
                  <td className="p-4 text-sm">{template.name}</td>
                  <td className="p-4">
                    {template.isHidden === 1 || template.isHidden === '1' ? (
                      <button
                        onClick={() => handleUnhideTemplate(template.id)}
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                      >
                        Hiển thị
                      </button>
                    ) : (
                      <button
                        onClick={() => handleHideTemplate(Number(template.id))}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                      >
                        Ẩn
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HiddenTemplates;