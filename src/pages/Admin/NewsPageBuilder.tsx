import React, { useState, useRef, useEffect } from 'react';
import DefaultImage from '../../assets/images/news.png';
import { useNavigate, useParams } from 'react-router-dom';
type ContentType = 'heading' | 'text' | 'image'; 
import { 
    createNewsPage, 
    updateNewsPage, 
    getNewsPage,  
} from '../../api/blog';
  import {ContentItem as ApiContentItem } from '../../types/news.dto'; 
import toast from 'react-hot-toast';
import FormField from '../../components/common/FormField';
interface BaseContentItem {
    id: number;
    type: ContentType;
    content: string;
}

interface ImageContentItem extends BaseContentItem {
    type: 'image';
    caption: string;
    file?: File;
}

interface TextContentItem extends BaseContentItem {
    type: 'text';
}

interface HeadingContentItem extends BaseContentItem {
    type: 'heading';
}

type ContentItem = ImageContentItem | TextContentItem | HeadingContentItem;

const NewsPageBuilder: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [pageTitle, setPageTitle] = useState<string>('Tên bài viết');
    const [content, setContent] = useState<ContentItem[]>([
        { id: 1, type: 'heading', content: 'Chào mừng đến với trang tạo bài viết tin tức' },
        { id: 2, type: 'text', content: 'Đây là phần nội dung mẫu' },
        { id: 3, type: 'image', content: DefaultImage, caption: 'Sample image' }
    ]);
    const [activeElement, setActiveElement] = useState<number | null>(null);
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [editorContent, setEditorContent] = useState<string>('');
    const [editorType, setEditorType] = useState<ContentType>('text');
    const [editorId, setEditorId] = useState<number | null>(null);
    const [imageCaption, setImageCaption] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate unique ID for new content blocks
  const generateId = (): number => Math.max(0, ...content.map(item => item.id)) + 1;

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setSelectedFile(file);
    
    // Create a preview URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    setEditorContent(fileUrl); // Use the preview URL as content
  };

  // Trigger file input click
  const triggerFileInput = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Add new content block
  const addContent = (type: ContentType): void => {
    const newId = generateId();
    let newContent = '';
    let newCaption = '';
    
    switch(type) {
      case 'heading':
        newContent = 'New Heading';
        break;
      case 'text':
        newContent = 'New paragraph text';
        break;
      case 'image':
        newContent = DefaultImage;
        newCaption = 'Image caption';
        break;
      default:
        newContent = '';
    }
    
    if (type === 'image') {
      setContent([...content, { 
        id: newId, 
        type: 'image',
        content: newContent,
        caption: newCaption
      }]);
    } else if (type === 'heading') {
      setContent([...content, { 
        id: newId, 
        type: 'heading',
        content: newContent
      }]);
    } else {
      setContent([...content, { 
        id: newId, 
        type: 'text',
        content: newContent
      }]);
    }
  };

  // Open editor for content editing
  const openEditor = (id: number): void => {
    const item = content.find(item => item.id === id);
    if (!item) return;
    
    setEditorId(id);
    setEditorType(item.type);
    setEditorContent(item.content);
    
    // Reset file state
    setSelectedFile(null);
    setPreviewUrl('');
    
    if (item.type === 'image') {
      setImageCaption((item as ImageContentItem).caption || '');
      // If it's an image, set the preview URL to the current content
      setPreviewUrl(item.content);
    }
    
    setShowEditor(true);
  };

  // Save edited content
  const saveContent = (): void => {
    if (editorId === null) return;
    
    const updatedContent = content.map(item => {
      if (item.id === editorId) {
        if (item.type === 'image') {
          return {
            ...item,
            content: previewUrl || item.content, // Use preview URL if available
            caption: imageCaption,
            ...(selectedFile && { file: selectedFile }) // Add file if selected
          } as ImageContentItem;
        } else {
          return {
            ...item,
            content: editorContent
          };
        }
      }
      return item;
    });
    
    setContent(updatedContent);
    setShowEditor(false);
    setEditorContent('');
    setImageCaption('');
    setSelectedFile(null);
    setPreviewUrl('');
  };

  // Delete content block
  const deleteContent = (id: number): void => {
    setContent(content.filter(item => item.id !== id));
  };

  // Move content up
  const moveUp = (index: number): void => {
    if (index === 0) return;
    const newContent = [...content];
    [newContent[index], newContent[index - 1]] = [newContent[index - 1], newContent[index]];
    setContent(newContent);
  };

  // Move content down
  const moveDown = (index: number): void => {
    if (index === content.length - 1) return;
    const newContent = [...content];
    [newContent[index], newContent[index + 1]] = [newContent[index + 1], newContent[index]];
    setContent(newContent);
  }; 

  // Render content based on type
  const renderContent = (item: ContentItem, index: number): React.ReactNode => {
    switch(item.type) {
      case 'heading':
        return (
          <div 
            className={`p-4 my-2 rounded ${activeElement === item.id ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
            onClick={() => setActiveElement(item.id)}
            key={item.id}
          >
            <h2 className="text-2xl font-bold">{item.content}</h2>
            {renderControls(item, index)}
          </div>
        );
      case 'text':
        return (
          <div 
            className={`p-4 my-2 rounded ${activeElement === item.id ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
            onClick={() => setActiveElement(item.id)}
            key={item.id}
          >
            <p>{item.content}</p>
            {renderControls(item, index)}
          </div>
        );
      case 'image':
        const imageItem = item as ImageContentItem;
        return (
          <div 
            className={`p-4 my-2 rounded ${activeElement === item.id ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
            onClick={() => setActiveElement(item.id)}
            key={item.id}
          >
            <div className="flex flex-col items-center">
              <img src={item.content} alt={imageItem.caption || 'News image'} className="max-w-full h-auto rounded" />
              {imageItem.caption && <p className="mt-2 text-sm text-gray-500 italic">{imageItem.caption}</p>}
            </div>
            {renderControls(item, index)}
          </div>
        );
      default:
        return null;
    }
  };

  // Render control buttons for each content block
  const renderControls = (item: ContentItem, index: number): React.ReactNode => {
    if (activeElement !== item.id) return null;
    
    return (
      <div className="flex mt-2 gap-2 justify-end">
        <button 
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            openEditor(item.id);
          }}
        >
          Edit
        </button>
        <button 
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            deleteContent(item.id);
          }}
        >
          Delete
        </button>
        <button 
          className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            moveUp(index);
          }}
          disabled={index === 0}
        >
          ↑
        </button>
        <button 
          className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            moveDown(index);
          }}
          disabled={index === content.length - 1}
        >
          ↓
        </button>
      </div>
    );
  }; 
  // Simulate saving content to server (in a real app, this would upload to backend)
  const savePageContent = async (): Promise<void> => {
    try { 
      const apiContent: ApiContentItem[] = content.map(item => {
        if (item.type === 'image') {
          const imageItem = item as ImageContentItem;
          return {
            id: imageItem.id,
            type: 'image',
            content: imageItem.content,
            caption: imageItem.caption,
            file: imageItem.file
          };
        } else {
          return {
            id: item.id,
            type: item.type,
            content: item.content
          };
        }
      });
      
      if (isEditMode && id) { 
        await updateNewsPage(parseInt(id), pageTitle, apiContent);
        toast.success('Cập nhập tin tức thành công');
      } else { 
        const newPageId = await createNewsPage(pageTitle, apiContent);
        toast.success('Tạo tin tức thành công');
        navigate(`/tintuc/${newPageId}`);
      }
    } catch (error) {
      console.error('Failed to save news page:', error);
      toast.error('Lỗi khi cập nhật tin tức. thử lại sau');
    }  
  };
  useEffect(() => {
    const fetchPageData = async () => {
      if (isEditMode && id) {
        try {
          setIsLoading(true);
          const pageData = await getNewsPage(id);
          
          setPageTitle(pageData.title);
          
          if (pageData.content) {
            // Convert API content items to our format
            const contentItems: ContentItem[] = pageData.content.map((item: any) => {
              if (item.type === 'image') {
                return {
                  id: item.id,
                  type: 'image',
                  content: item.content,
                  caption: item.caption || ''
                } as ImageContentItem;
              } else if (item.type === 'heading') {
                return {
                  id: item.id,
                  type: 'heading',
                  content: item.content
                } as HeadingContentItem;
              } else {
                return {
                  id: item.id,
                  type: 'text',
                  content: item.content
                } as TextContentItem;
              }
            });
            
            setContent(contentItems);
          }
        } catch (error) {
          console.error('Failed to fetch page data:', error);
          alert('Failed to load the news page. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    
    fetchPageData();
  }, [id, isEditMode]);

  if(isLoading) 
    return (<p>Đang tải tin tức</p>);
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between flex-wrap items-center pb-4">
        <div className="flex gap-2">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => addContent('heading')}
          >
            Thêm tiêu đề
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => addContent('text')}
          >
            Thêm nội dung
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => addContent('image')}
          >
            Thêm hình ảnh
          </button>
        </div>
        <div className='flex justify-center gap-3 items-center'>
          <FormField 
              value={pageTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPageTitle(e.target.value)}
              placeholder="Nhập tên bài viết"
          />
          <div className="flex gap-2">
            <button
              className="min-w-32 bg-orange-500 text-white px-4 py-[10px] rounded"
              onClick={savePageContent}
            >
              Lưu trang
            </button>
          </div> 
        </div>

      </div>
      <div className="mb-8 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Bản mẫu</h3>
        <div className="border border-gray-400 shadow rounded p-6 bg-white">
          <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
          {content.map((item, index) => renderContent(item, index))}
        </div>
      </div>

      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded p-6 w-full max-w-xl">
            <h3 className="text-lg font-semibold mb-4">
              Edit {editorType.charAt(0).toUpperCase() + editorType.slice(1)}
            </h3>
            
            {editorType === 'image' ? (
              <>
                <div className="mb-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {previewUrl ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="max-h-64 max-w-full mb-4 rounded" 
                        />
                        <button 
                          onClick={triggerFileInput}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Change Image
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="cursor-pointer py-8"
                        onClick={triggerFileInput}
                      >
                        <p className="text-gray-500">Click to upload an image</p>
                        <p className="text-gray-400 text-sm mt-1">JPG, PNG, GIF supported</p>
                      </div>
                    )}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Caption:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={imageCaption}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageCaption(e.target.value)}
                    placeholder="Enter image caption"
                  />
                </div>
              </>
            ) : (
              <textarea
                className="w-full p-2 border rounded h-40"
                value={editorContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditorContent(e.target.value)}
                placeholder={editorType === 'heading' ? 'Enter heading text' : 'Enter paragraph text'}
              />
            )}
            
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowEditor(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={saveContent}
                disabled={editorType === 'image' && !previewUrl}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPageBuilder;