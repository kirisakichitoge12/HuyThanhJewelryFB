import { useEffect, useState } from 'react';  
import { fetchTemplateList } from '../../api/template';
import { TemplateData } from '../../types/dataResponse/template.interface';
import Each from '../../layouts/Each';
import TemplateRenderer from '../../components/TemplateRender';

const TemplateList: React.FC = () => {  
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchTemplateList();
        if(result){
          setTemplates(result); 
        }
      } catch (error: unknown) {
        setError(error instanceof Error 
          ? error.message 
          : 'An unknown error occurred');
      } finally {
        setIsLoading(false);  
      }
    };  
    fetchData();
  }, []); 
  console.log(templates)
  if (isLoading) {
    return <div>Đang tải mẫu thiệp...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }


  return (   
    <div className="container mx-auto p-4"> 
        <h1 className="flex-1 text-2xl font-bold text-gray-800 mb-5">Quản lí mẫu thiệp</h1>       
        <hr className='my-5' />  
        {templates.length < 1 ? (
          <p>Không tìm tìm thấy mẫu thiệp nào</p>
        ) : (
          <div className='w-full grid grid-cols-6'>
            <Each 
              of={templates}
              render={(template: TemplateData) => ( 
                <TemplateRenderer data={template}/>
              )}        
            />
          </div>
        )}
      </div>   
  );
};

export default TemplateList;