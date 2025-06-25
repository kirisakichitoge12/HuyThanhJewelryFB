import React, { useState, useRef, useCallback, useEffect } from 'react'; 
import { FaImage, FaRedo, FaSave, FaUndo } from 'react-icons/fa';
import { FiType } from 'react-icons/fi'; 
import { toast } from 'react-hot-toast'; 
import { ElementPosition } from '../../types/widget.interface';
import { useAdminContext } from '../../context/AdminContext';
import { WidgetElement } from '../../types/widget.interface';
import { useWidgetEditorModal } from '../../hooks/modals';
import { CustomFile } from '../../types';
import Modal from './Modal';
import Button from '../common/Button';
import { convertWidgetDataToFormData } from '../../utils/widgetUtils';
import { createWidget, fetchWidgetList, updateWidget } from '../../api/widget';


const WidgetCustomizerModal: React.FC = () => {    
  const [widgetElements, setWidgetElements] = useState<WidgetElement[]>([]); 
  const [selectedElement, setSelectedElement] = useState<WidgetElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<ElementPosition>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useAdminContext();
  const [backgroundImage, setBackgroundImage] = useState<CustomFile | null>(null); 
  const { isOpen, currentWidget, onClose } = useWidgetEditorModal();
  const [history, setHistory] = useState<WidgetElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const handleMouseDown = useCallback((e: React.MouseEvent, element: WidgetElement) => {
    if (!canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    
    const offsetX = e.clientX - (canvasRect.left + (element.position.x * canvasRect.width / 100));
    const offsetY = e.clientY - (canvasRect.top + (element.position.y * canvasRect.height / 100));

    setSelectedElement(element);
    setIsDragging(true);
    setOffset({ x: offsetX, y: offsetY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current || !selectedElement) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();

    let newX = ((e.clientX - canvasRect.left - offset.x) / canvasRect.width) * 100;
    let newY = ((e.clientY - canvasRect.top - offset.y) / canvasRect.height) * 100;

    let elementWidthPercent = 0;
    let elementHeightPercent = 0;
    
    if (selectedElement.type === 'image') {
      elementWidthPercent = (selectedElement.style.imageSize || 200) / canvasRect.width * 100;
      elementHeightPercent = (selectedElement.style.imageSize || 200) / canvasRect.height * 100;
    } 
    if (selectedElement.type === 'text' && typeof selectedElement.content === "string" && selectedElement.style.fontSize) {
      elementWidthPercent = (selectedElement.content.length * (selectedElement.style.fontSize / 2)) / canvasRect.width * 100;
      elementHeightPercent = selectedElement.style.fontSize / canvasRect.height * 100;
    }

    newX = Math.max(0, Math.min(newX, 100 - elementWidthPercent));
    newY = Math.max(0, Math.min(newY, 100 - elementHeightPercent)); 
    setWidgetElements(prev => 
      prev.map(el => 
        el._id === selectedElement._id 
          ? { ...el, position: { x: newX, y: newY } } 
          : el
      )
    );
  }, [isDragging, selectedElement, offset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const saveToHistory = (newElements: WidgetElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const addTextElement = () => {
    const newElement: WidgetElement = {
      _id: `text-${Date.now()}`,
      type: 'text',
      content: 'Nhập văn bản',
      position: { x: 10, y: 10 },
      style: {
        imageSize: 12,
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: "normal",
        textDecoration: "none"
      },
      isTitle: false,
    };
    const newWidgetElements = [...widgetElements, newElement];
    setWidgetElements(newWidgetElements);
    saveToHistory(newWidgetElements);
    setSelectedElement(newElement);
  };

  const addImageElement = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return; 
      const newImages =   Object.assign(file, {
          preview: URL.createObjectURL(file)
      }); 

        const newElement: WidgetElement = {
          _id: `image-${Date.now()}`,
          type: 'image',
          content: newImages as CustomFile,
          position: { x: 10, y: 10 },
          style: { 
            imageSize: 200
          }
        };
        const newWidgetElements = [...widgetElements, newElement];
        setWidgetElements(newWidgetElements);
        saveToHistory(newWidgetElements);
        setSelectedElement(newElement) 
    };
    input.click();
  };

  const updateElementStyle = (style: Partial<WidgetElement['style']>) => {
    if (!selectedElement) return; 
    const updatedElements = widgetElements.map(el => 
      el._id === selectedElement._id 
        ? { ...el, style: { ...el.style, ...style } } 
        : el
    );
    
    setWidgetElements(updatedElements);
    saveToHistory(updatedElements);
    setSelectedElement(updatedElements.find(el => el._id === selectedElement._id) || null);
  };

  const updateElementContent = (content: string) => {
    if (!selectedElement) return;
    
    const updatedElements = widgetElements.map(el => 
      el._id === selectedElement._id 
        ? { ...el, content } 
        : el
    );
    
    setWidgetElements(updatedElements);
    setSelectedElement(updatedElements.find(el => el._id === selectedElement._id) || null);
  };

  const renderTemplateElement = (element: WidgetElement) => { 
    const isSelected = selectedElement?._id === element._id;
    const elementStyle = {
      position: 'absolute' as const,
      left: `${element.position.x}%`,
      top: `${element.position.y}%`,
      cursor: 'move',
      border: isSelected ? '2px solid blue' : 'none'
    };

    if (element.type === 'text' && typeof element.content === "string") {
      return (
        <div 
          key={element._id}
          style={{
            ...elementStyle,
            color: element.style.color,
            fontSize: `${element.style.fontSize}px`,
            fontFamily: element.style.fontFamily,
            fontWeight: element.style.fontWeight,
            fontStyle: element.style.fontStyle,
            textDecoration: element.style.textDecoration
          }}
          onMouseDown={(e) => handleMouseDown(e, element)}
          onClick={() => setSelectedElement(element)}
        >
          {element.content}
        </div>
      );
    }
    if (element.type === 'image') {
      return ( 
        <img 
          key={element._id}
          src={typeof element.content === "string" ? element.content :element.content.preview}
          style={{
            ...elementStyle,
            width: `${element.style.imageSize}px`,
            height: `${element.style.imageSize}px`,
            objectFit: 'contain'
          }}
          onMouseDown={(e) => handleMouseDown(e, element)}
          onClick={() => setSelectedElement(element)}
        />
      );
    }
  };

  const saveTemplate = async() => {  
    if(widgetElements.length < 1) toast.error("Template empty"); 
    const data: FormData = convertWidgetDataToFormData({ 
      _id: "", 
      backgroundImage: backgroundImage,
      elements: widgetElements
    })
    try {
      const result = currentWidget ? await updateWidget(currentWidget._id, data) : await createWidget(data);  
      if(result){
        setWidgetElements([]);
        setBackgroundImage(null);
        toast.success(result);
        fetchWidgetList(dispatch);
        onClose();
      }
    } catch (error: unknown) {  
        toast.error(error instanceof Error ? error.message : "An unknown error occurred"); 
    }
  };

  const deleteElement = useCallback(() => {
    if (!selectedElement) return;
    const newWidgetElements = widgetElements.filter(el => el._id !== selectedElement._id);
    setWidgetElements(newWidgetElements);
    saveToHistory(newWidgetElements);
    setSelectedElement(null);
  }, [selectedElement, widgetElements]);

  const handleBackgroundImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
      
      if (backgroundImage?.preview) {
        URL.revokeObjectURL(backgroundImage.preview);
      }
      
      const customFile: CustomFile = Object.assign(file, {
        preview: URL.createObjectURL(file)
      }); 
      setBackgroundImage(customFile);
    };
    input.click();
  };

  const updatedElementTitle = (isChecked: boolean) => {
    if (!selectedElement) return; 
    const updatedElements = widgetElements.map(el => 
      el._id === selectedElement._id 
        ? { ...el, isTitle: isChecked}
        : el
    );
    setWidgetElements(updatedElements);
    setSelectedElement(updatedElements.find(el => el._id === selectedElement._id) || null);
  } 
  useEffect(() => {
    return () => {
      if (backgroundImage?.preview) {
        URL.revokeObjectURL(backgroundImage.preview);
      }
    };
  }, [backgroundImage]);
  
  useEffect(() => { 
    if (currentWidget) { 
      if (currentWidget.backgroundImage) {
        setBackgroundImage(currentWidget.backgroundImage);
      }
      if (currentWidget.elements) {
        setWidgetElements(currentWidget.elements);
      } 
    } else { 
      setBackgroundImage(null);
      setWidgetElements([]);
    }
  }, [currentWidget]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setWidgetElements(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setWidgetElements(history[historyIndex + 1]);
    }
  };

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      size='max-w-screen-2xl'
    >
    <div 
      className="w-full h-full flex md:flex-row flex-col border rounded-lg shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Công Cụ Chỉnh Sửa</h2>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={handleUndo} disabled={historyIndex <= 0}>
              <FaUndo />
            </Button>
            <Button onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
              <FaRedo />
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Thiết Kế</h3>
            <button 
              className="w-full p-2 border rounded hover:bg-gray-100 flex items-center justify-center" 
              onClick={addTextElement}
            >
              <FiType className="mr-2" /> Thêm văn bản
            </button>
            <button 
              className="w-full p-2 border rounded hover:bg-gray-100 flex items-center justify-center" 
              onClick={addImageElement}
            >
              <FaImage className="mr-2" /> Thêm Hình Ảnh
            </button> 
            <div>
              <label className="block mb-2">Màu nền</label>
              <div className="space-y-2"> 
                <button 
                  className="w-full p-2 border rounded hover:bg-gray-100 flex items-center justify-center"
                  onClick={handleBackgroundImageUpload}
                >
                  <FaImage className="mr-2" /> Thêm Ảnh Nền
                </button>
                {backgroundImage && (
                  <button 
                    className="w-full p-2 border rounded hover:bg-gray-100 text-red-500"
                    onClick={() => setBackgroundImage(null)}
                  >
                    Xóa Ảnh Nền
                  </button>
                )}
              </div>
            </div>
          </div>
          {selectedElement && (
            <div className="space-y-2">
              <h3 className="font-semibold">Chỉnh Sửa Phần Tử</h3>
              {selectedElement.type === 'text' && typeof selectedElement.content === "string" && (
                <>
                  <div>
                    <label className="block mb-1">Nội Dung</label>
                    <input 
                      type="text"
                      value={selectedElement.content}
                      onChange={(e) => updateElementContent(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Màu Chữ</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        value={selectedElement.style.color}
                        onChange={(e) => updateElementStyle({ color: e.target.value })}
                        className="h-10 w-10 p-0 border-none"
                      />
                      <span>{selectedElement.style.color}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1">Cỡ Chữ</label>
                    <input 
                      type="number"
                      value={selectedElement.style.fontSize}
                      onChange={(e) => updateElementStyle({ 
                        fontSize: parseInt(e.target.value) 
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Font Chữ</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={selectedElement.style.fontFamily}
                      onChange={(e) => updateElementStyle({ 
                        fontFamily: e.target.value 
                      })}
                    >
                      {['Arial', 'Times New Roman', 'Courier', 'Verdana'].map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Kiểu Chữ</label>
                    <button 
                      onClick={() => updateElementStyle({ fontWeight: selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold' })}
                      className={`mr-2 px-4 py-1 font-bold ${selectedElement.style.fontWeight === 'bold' ? 'text-blue-500' : ''}`}
                    >
                      B
                    </button>
                    <button 
                      onClick={() => updateElementStyle({ fontStyle: selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic' })}
                      className={`mr-2 px-4 py-1 italic ${selectedElement.style.fontStyle === 'italic' ? 'text-blue-500' : ''}`}
                    >
                      I
                    </button>
                    <button 
                      onClick={() => updateElementStyle({ textDecoration: selectedElement.style.textDecoration === 'underline' ? 'none' : 'underline' })}
                      className={`mr-2 px-4 py-1 underline ${selectedElement.style.textDecoration === 'underline' ? 'text-blue-500' : ''}`}
                    >
                      U
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type='checkbox' 
                      checked={selectedElement.isTitle || false} 
                      onChange={(e) => updatedElementTitle(e.target.checked)} 
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="font-semibold">Là tiêu đề?</label>
                  </div>
                  <hr className='py-2'/>
                  <div>
                    <button 
                      onClick={deleteElement}
                      className="block mb-1 bg-red-500 text-white p-2 rounded w-full hover:bg-red-600"
                    >
                      Xóa
                    </button> 
                  </div>
                </>
              )}
              {selectedElement.type === 'image' && (
                <>
                  <div>
                    <label className="block mb-1">Kích thước ảnh</label>
                    <input 
                      type="number"
                      value={selectedElement.style.imageSize || 200}
                      onChange={(e) => updateElementStyle({ 
                        imageSize: Math.max(50, Math.min(800, parseInt(e.target.value) || 200))
                      })}
                      min="50"
                      max="800"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <hr className='py-3'/>
                  <div>
                    <button 
                      onClick={deleteElement}
                      className="block mb-1 bg-red-500 text-white p-2 rounded w-full hover:bg-red-600"
                    >
                      Xóa
                    </button> 
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full p-4 relative">
        <div 
          ref={canvasRef}
          className='shadow rounded-md'
          style={{  
            backgroundImage: backgroundImage ? `url(${backgroundImage.preview || backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '1200px',
            height: '820px', 
            position: 'relative' 
          }}
        >
          {widgetElements.map(renderTemplateElement)}
        </div>
        <div className="flex justify-end mt-5 gap-5">
          <Button onClick={onClose} color='default'>
            Đóng
          </Button>
          <Button
            disabled={widgetElements.length < 1}
            onClick={saveTemplate}
          > 
            <FaSave className="mr-2" /> Lưu Template
          </Button> 
        </div>
      </div>
    </div>
    </Modal>
  );
};

export default WidgetCustomizerModal;