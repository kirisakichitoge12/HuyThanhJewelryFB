import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../config/api.config';

// Define interfaces for Template, Widget, and API Response
interface Template {
  id: number;
  name: string;
}

interface Widget {
  id: number;
  name: string;
  templateId: number;
  isHidden: boolean;
}

interface HiddenWidgetResponse {
  id: string;
  template_id: string;
  component_prop_id: string;
  created_at: string;
}

const HiddenWidgets = () => {
  // State for templates, widgets, and selected template
  const [templates] = useState<Template[]>([
    { id: 1, name: 'Cô Ba' },
    { id: 2, name: 'Ngày Mộng Mơ' },
    { id: 3, name: 'Sang trọng' },
    { id: 4, name: 'Cổ Điển' },
    { id: 5, name: 'Tình yêu' },
    { id: 6, name: 'Nhẹ nhàng' },
    { id: 7, name: 'Hoạt họa' },
  ]);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  // Fetch all hidden widgets on component mount
  useEffect(() => {
    fetchHiddenWidgets();
  }, []);

  // Fetch widgets when a template is selected
  useEffect(() => {
    if (selectedTemplate) {
      const mockWidgets: Widget[] = [
        { id: 1, name: 'Banner', templateId: selectedTemplate, isHidden: false },
        { id: 2, name: 'Invitation', templateId: selectedTemplate, isHidden: false },
        { id: 3, name: 'Introduction', templateId: selectedTemplate, isHidden: false },
        { id: 4, name: 'StorySection', templateId: selectedTemplate, isHidden: false },
        { id: 5, name: 'AlbumSection', templateId: selectedTemplate, isHidden: false },
        { id: 6, name: 'TimelineSection', templateId: selectedTemplate, isHidden: false },
        { id: 7, name: 'EventsSection', templateId: selectedTemplate, isHidden: false },
        { id: 8, name: 'MessageSection', templateId: selectedTemplate, isHidden: false },
        { id: 9, name: 'BankSection', templateId: selectedTemplate, isHidden: false },
      ];
      // Update isHidden based on API data
      const fetchWidgetsWithHiddenStatus = async () => {
        try {
          const response = await axios.get<HiddenWidgetResponse[]>(`${API_BASE_URL}/api/template-components`);
          const hiddenWidgetIds = response.data
            .filter((hw) => Number(hw.template_id) === selectedTemplate)
            .map((hw) => Number(hw.component_prop_id));
          const updatedWidgets = mockWidgets.map((widget) => ({
            ...widget,
            isHidden: hiddenWidgetIds.includes(widget.id),
          }));
          setWidgets(updatedWidgets);
        } catch (error) {
          toast.error('Lỗi khi tải trạng thái widget');
          console.error(error);
          setWidgets(mockWidgets); // Fallback to mock data if API fails
        }
      };
      fetchWidgetsWithHiddenStatus();
    } else {
      setWidgets([]);
    }
  }, [selectedTemplate]);

  const fetchHiddenWidgets = async () => {
    try {
      const response = await axios.get<HiddenWidgetResponse[]>(`${API_BASE_URL}/api/template-components`);
      // Trigger re-render of widgets if a template is selected
      if (selectedTemplate) {
        const hiddenWidgetIds = response.data
          .filter((hw) => Number(hw.template_id) === selectedTemplate)
          .map((hw) => Number(hw.component_prop_id));
        setWidgets((prev) =>
          prev.map((widget) => ({
            ...widget,
            isHidden: hiddenWidgetIds.includes(widget.id),
          }))
        );
      }
    } catch (error) {
      toast.error('Lỗi khi tải widget ẩn');
      console.error(error);
    }
  };

  const handleHideWidget = async (templateId: number, widgetId: number) => {
    try {
      const widgetToHide = widgets.find((w) => w.id === widgetId);
      if (!widgetToHide) return;

      await axios.post(`${API_BASE_URL}/api/createhiddentemplate`, {
        template_id: templateId,
        component_prop_id: widgetId,
      });

      toast.success('Ẩn widget thành công');
      setWidgets((prev) =>
        prev.map((w) =>
          w.id === widgetId ? { ...w, isHidden: true } : w
        )
      );
      fetchHiddenWidgets();
    } catch (error) {
      toast.error('Widgets đã được thêm vào danh sách ẩn');
      console.error(error);
    }
  };

  const handleUnhideWidget = async (templateId: string, componentId: string) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn hiển thị lại widget này không?');
    if (!confirm) return;

    try {
      await axios.post(`${API_BASE_URL}/api/template-components/${templateId}/${componentId}`);
      toast.success('Hiển thị widget thành công');
      setWidgets((prev) =>
        prev.map((w) =>
          w.id === Number(componentId) ? { ...w, isHidden: false } : w
        )
      );
      fetchHiddenWidgets();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi hiển thị widget');
      console.error(error);
    }
  };

  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const titleTemplateTable = ['Id', 'Tên Template', 'Action'];
  const titleWidgetTable = ['Id', 'Tên Widget', 'Trạng thái', 'Action'];

 return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-xl shadow-2xl transform hover:scale-102 transition-transform duration-300">
      {/* Table of Templates */}
      <div className="bg-white/20 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl mb-6">
        <table className="w-full table-fixed text-black">
          <thead className="bg-gradient-to-r ">
            <tr>
              {titleTemplateTable.map((item: string, index: number) => (
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
            {templates.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-black">
                  Không có template nào.
                </td>
              </tr>
            ) : (
              templates.map((template, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700/30 transition-colors duration-200 cursor-pointer"
                >
                  <td className="p-4 text-sm font-medium">{template.id}</td>
                  <td className="p-4 text-sm">{template.name}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleSelectTemplate(template.id)}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                    >
                      Chọn
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table of Widgets for Selected Template */}
      {selectedTemplate && (
        <div className="bg-white/20 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl mb-6">
          <h3 className="text-black text-lg font-bold p-4">
            Widgets của Template: {templates.find((t) => t.id === selectedTemplate)?.name}
          </h3>
          <table className="w-full table-fixed text-black">
            <thead className="bg-gradient-to-r from-blue-700 to-purple-700">
              <tr>
                {titleWidgetTable.map((item: string, index: number) => (
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
              {widgets.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-black">
                    Không có widget nào khả dụng.
                  </td>
                </tr>
              ) : (
                widgets.map((widget, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-700/30 transition-colors duration-200 cursor-pointer"
                  >
                    <td className="p-4 text-sm font-medium">{widget.id}</td>
                    <td className="p-4 text-sm">{widget.name}</td>
                    <td className="p-4 text-sm">
                      {widget.isHidden ? 'Ẩn' : 'Hiển thị'}
                    </td>
                    <td className="p-4">
                      {widget.isHidden ? (
                        <button
                          onClick={() => handleUnhideWidget(widget.templateId.toString(), widget.id.toString())}
                          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                        >
                          Hiển thị
                        </button>
                      ) : (
                        <button
                          onClick={() => handleHideWidget(widget.templateId, widget.id)}
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
      )}
    </div>
  );
};

export default HiddenWidgets;