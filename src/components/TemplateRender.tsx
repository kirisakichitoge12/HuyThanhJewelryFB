import React from 'react'
import { TemplateData } from '../types/dataResponse/template.interface'
import WidgetRenderer from './WidgetRender';
import Each from '../layouts/Each';
import { WidgetData } from '../types/widget.interface';
import Button from './common/Button'; 
import { formattedDate } from '../utils';
import { LuCalendar, LuPencil, LuTrash } from 'react-icons/lu';
import { useConfirmModal } from '../hooks/modals';
import { useNavigate } from 'react-router-dom';

interface TemplateRenderProps{
    data: TemplateData;
}

const TemplateRenderer: React.FC<TemplateRenderProps> = ({
    data
}) => {
    const navigate = useNavigate();
    const { backgroundColor, listWidget, name, contentFont, createdAt, titleFont } = data;
    console.log(listWidget)
    const { onOpen } = useConfirmModal();
    const handleSubmitDeleted = () => {
        console.log("Deleted")
    }

    const handleNavigateToEdit = (dataToEdit: TemplateData) => {
        navigate(`/admin/template/edit/${dataToEdit._id}`, {
            state: dataToEdit
        })
    }
    return (
        <div className='shadow rounded '> 
            <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
                {/* Image Container */}
                <div style={{ backgroundColor }} className='max-w-full h-64 overflow-y-scroll hidden-scrollbar'>
                    
                    {
                        Array.isArray(listWidget) && listWidget.length > 0 &&
                            <Each 
                                of={listWidget}
                                render={(widget: WidgetData) =>     
                                    <WidgetRenderer 
                                        data={widget} 
                                        fontTitleFamily={titleFont} 
                                        fontContentFamily={contentFont} 
                                        size='small' 
                                    />
                                }
                            />  
                    }
                </div>

                {/* Action buttons */} 
                        <div className='absolute top-2 right-1 bg-white flex px-3 py-1 gap-2 justify-center items-center shadow w-fit rounded-full'>
                            <LuCalendar className='text-red-600'/>
                            <p className='text-sm opacity-80'>{formattedDate(createdAt || "")}</p>
                        </div>
                    <div className='flex p-4 justify-between'>
                        <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full truncate max-w-36">
                            {name}
                        </span>
                        <div className="flex">
                            <Button onClick={() => handleNavigateToEdit(data)} color='none'>
                                <LuPencil className='text-blue-600'/>
                            </Button>
                            <Button onClick={() => onOpen("",handleSubmitDeleted)} color='none'>
                                <LuTrash className='text-red-600'/>
                            </Button> 
                        </div>
                    </div> 
                </div> 
        </div>
    )
}

export default TemplateRenderer