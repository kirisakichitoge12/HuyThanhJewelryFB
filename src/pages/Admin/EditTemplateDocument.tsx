import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../../config/api.config';

interface Template {
  id: number;
  name: string;
}

interface TemplateSection {
  id: number;
  type: string;
  props: Record<string, unknown>;
  code: string | null;
}

const EditTemplateDocument = () => {
  const [templates] = useState<Template[]>([
    { id: 1, name: 'Cô Ba' },
    { id: 2, name: 'Ngày Mộng Mơ' },
    { id: 3, name: 'Sang Trọng' },
    { id: 4, name: 'Cổ Điển' },
    { id: 5, name: 'Tình Yêu' },
    { id: 6, name: 'Nhẹ Nhàng' },
    { id: 7, name: 'Hoạt họa' },
  ]);

  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [templateData, setTemplateData] = useState<TemplateSection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(new Set());

  const fetchTemplateContent = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/documents/${id}`);
      const data = res.data.json_data.data;
      console.log('JSON Structure from API:', data); // Debug log
      setTemplateData(data);
      setEditorContent(JSON.stringify(data, null, 2));
      // Mặc định ẩn tất cả sections
      setCollapsedSections(new Set(data.map((section: TemplateSection) => section.id)));
    } catch (err) {
      toast.error('Lỗi khi lấy nội dung template');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTemplate = (id: number) => {
    setSelectedTemplateId(id);
    fetchTemplateContent(id);
  };

  const handleSave = async () => {
    if (!selectedTemplateId) return;

    try {
      const parsedContent = JSON.parse(editorContent);
      const res = await axios.put(
        `${API_BASE_URL}/api/admin/updatedocuments/${selectedTemplateId}`,
        {
          json_data: { data: parsedContent },
          doc_name: templates.find((t) => t.id === selectedTemplateId)?.name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        toast.success('Cập nhật thành công!');
        setTemplateData(parsedContent);
      } else {
        toast.error(res.data.message || 'Cập nhật thất bại');
      }
    } catch (err) {
      toast.error('JSON không hợp lệ. Vui lòng kiểm tra cú pháp JSON.');
      console.error(err);
    }
  };

  // Hàm cập nhật field thông minh - xử lý mọi cấu trúc JSON
  const updateField = (sectionId: number, fieldPath: string[], value: string | number) => {
    const updatedData = templateData.map(section => {
      if (section.id === sectionId) {
        const newProps = { ...section.props };
        let current = newProps;
        
        // Điều hướng đến field cần cập nhật
        for (let i = 0; i < fieldPath.length - 1; i++) {
          const key = fieldPath[i];
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key] as Record<string, unknown>;
        }
        
        // Cập nhật giá trị cuối cùng
        const lastKey = fieldPath[fieldPath.length - 1];
        current[lastKey] = value;
        
        return {
          ...section,
          props: newProps
        };
      }
      return section;
    });
    
    setTemplateData(updatedData);
    setEditorContent(JSON.stringify(updatedData, null, 2));
  };

  
  const renderField = (section: TemplateSection, fieldPath: string[], value: unknown, depth: number = 0) => {
    // Labels cơ bản cho các field phổ biến
    const fieldLabels: { [key: string]: string } = {
      bride: 'Tên cô dâu',
      groom: 'Tên chú rể',
      date: 'Ngày cưới',
      time: 'Giờ',
      location: 'Địa điểm',
      description: 'Mô tả',
      title: 'Tiêu đề',
      contentBridge: 'Nội dung cô dâu',
      contentGroom: 'Nội dung chú rể',
      mainTitle: 'Tiêu đề chính',
      nameBridge: 'Tên cô dâu',
      nameGroom: 'Tên chú rể',
      bankNameBridge: 'Ngân hàng cô dâu',
      bankNameGroom: 'Ngân hàng chú rể',
      bankNumberBridge: 'Số tài khoản cô dâu',
      bankNumberGroom: 'Số tài khoản chú rể',
      name: 'Tên',
      content: 'Nội dung',
      number: 'Số thứ tự',
      phone: 'Số điện thoại'
    };

    const currentField = fieldPath[fieldPath.length - 1];
    const label = fieldLabels[currentField] || currentField;
    const isCustomField = !fieldLabels[currentField];
    const indentClass = `ml-${depth * 4}`;

    // Xử lý string/number
    if (typeof value === 'string' || typeof value === 'number') {
      return (
        <div key={fieldPath.join('.')} className={`mb-4 ${indentClass}`}>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              {label}
              {isCustomField && <span className="text-xs text-blue-600 ml-2">(Tùy chỉnh)</span>}
            </label>
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => updateField(section.id, fieldPath, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      );
    }

    // Xử lý object
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return (
          <div key={fieldPath.join('.')} className={`mb-6 ${indentClass}`}>
            <h4 className="text-lg font-medium text-gray-800 mb-3">
              {label} <span className="text-sm text-gray-500">({value.length} mục)</span>
            </h4>
            {value.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-3">
                <h5 className="font-medium text-gray-700 mb-2">Mục {index + 1}</h5>
                <div className="space-y-3">
                  {Object.entries(item as Record<string, unknown>).map(([subField, subValue]) => 
                    renderField(section, [...fieldPath, index.toString(), subField], subValue, depth + 1)
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div key={fieldPath.join('.')} className={`mb-4 ${indentClass}`}>
            <h4 className="text-lg font-medium text-gray-800 mb-3">
              {label} <span className="text-sm text-gray-500">(Object)</span>
            </h4>
            <div className="space-y-3">
              {Object.entries(value as Record<string, unknown>).map(([subField, subValue]) => 
                renderField(section, [...fieldPath, subField], subValue, depth + 1)
              )}
            </div>
          </div>
        );
      }
    }

    return null;
  };

  const toggleSection = (sectionId: number) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const renderSection = (section: TemplateSection) => {
  
    const getSectionLabel = (type: string) => {
      const sectionLabels: { [key: string]: string } = {
        Banner: 'Banner',
        Invitation: 'Lời mời',
        Introduction: 'Giới thiệu',
        StorySection: 'Câu chuyện',
        AlbumSection: 'Album ảnh',
        TimelineSection: 'Timeline',
        EventsSection: 'Sự kiện',
        MessageSection: 'Lời chúc',
        BankSection: 'Thông tin ngân hàng'
      };
      
      return sectionLabels[type] || type;
    };

    const label = getSectionLabel(section.type);
    const fieldCount = Object.keys(section.props).length;
    const isCollapsed = collapsedSections.has(section.id);

    return (
      <div key={section.id} className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div 
          className="flex items-center justify-between mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
          onClick={() => toggleSection(section.id)}
        >
          <div className="flex items-center space-x-3">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              {isCollapsed ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              )}
            </button>
            <h3 className="text-xl font-semibold text-gray-800">{label}</h3>
          </div>
          <div className="text-sm text-gray-500">
            ID: {section.id} | {fieldCount} field{fieldCount !== 1 ? 's' : ''}
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="space-y-4">
            {Object.entries(section.props).map(([field, value]) => 
              renderField(section, [field], value)
            )}
          </div>
        )}
      </div>
    );
  };

  // Hàm hiển thị cấu trúc JSON
  const renderJsonStructure = (data: unknown, path: string = '', depth: number = 0) => {
    const indent = '  '.repeat(depth);
    
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
      return (
        <div key={path} className="font-mono text-sm text-gray-600">
          {indent}{path}: {typeof data} = "{data}"
        </div>
      );
    }
    
    if (data === null) {
      return (
        <div key={path} className="font-mono text-sm text-gray-600">
          {indent}{path}: null
        </div>
      );
    }
    
    if (Array.isArray(data)) {
      return (
        <div key={path}>
          <div className="font-mono text-sm text-blue-600">
            {indent}{path}: Array[{data.length}]
          </div>
          {data.map((item, index) => 
            renderJsonStructure(item, `${path}[${index}]`, depth + 1)
          )}
        </div>
      );
    }
    
    if (typeof data === 'object') {
      const keys = Object.keys(data as Record<string, unknown>);
      return (
        <div key={path}>
          <div className="font-mono text-sm text-green-600">
            {indent}{path}: Object{`{${keys.length} fields}`}
          </div>
          {keys.map(key => 
            renderJsonStructure((data as Record<string, unknown>)[key], `${path}.${key}`, depth + 1)
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="w-full p-4 space-y-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Template</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {templates.map((template) => (
              <tr
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className={`cursor-pointer hover:bg-gray-50 ${selectedTemplateId === template.id ? 'bg-blue-50' : ''}`}
              >
                <td className="p-3 text-sm text-gray-900">{template.id}</td>
                <td className="p-3 text-sm text-gray-700">{template.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTemplateId && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Chỉnh sửa Template ID: {selectedTemplateId}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowStructure(!showStructure)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {showStructure ? 'Ẩn cấu trúc' : 'Xem cấu trúc'}
              </button>
              <button
                onClick={() => setShowJsonEditor(!showJsonEditor)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {showJsonEditor ? 'Form Editor' : 'JSON Editor'}
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>

          {showStructure && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Cấu trúc JSON thực tế:</h3>
              <div className="bg-white p-4 rounded border font-mono text-xs overflow-auto max-h-60">
                {templateData.map((section, index) => 
                  renderJsonStructure(section, `Section[${index}]`, 0)
                )}
              </div>
            </div>
          )}

          {showJsonEditor ? (
            <textarea
              className="w-full h-80 p-3 border border-gray-300 rounded-md font-mono text-sm"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              disabled={isLoading}
            />
          ) : (
            <div className="space-y-6">
              {templateData.map(section => renderSection(section))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditTemplateDocument;