import React, { memo, useEffect, useState, useCallback } from 'react';
import Modal from './Modal';   
import Each from '../../layouts/Each';  
import WidgetRenderer from '../WidgetRender';
import { WidgetData } from '../../types/widget.interface'; 
import { useAdminContext } from '../../context/AdminContext';  
import { fetchWidgetList } from '../../api/widget';
import { useWidgetListModal } from '../../hooks/modals';

const WidgetModal: React.FC = () => { 
    const { isOpen, onClose, onAddWidget } = useWidgetListModal(); 
    const { widgetList } =  useAdminContext().state;  
    const [currentWidget, setCurrentWidget] = useState<WidgetData | null>(null);   
    const { dispatch } = useAdminContext();  
    const handleAddWidget = useCallback(() => {
        if(currentWidget){
            onAddWidget(currentWidget);
            onClose();
        }
    }, [currentWidget, onAddWidget, onClose]);
    useEffect(() => {  
        fetchWidgetList(dispatch); 
    },[dispatch]); 
    return (
        <Modal
            title={"Danh sách widget"}
            isOpen={isOpen}
            onClose={onClose} 
            size='max-w-4xl'
        >  
            { widgetList.loading && <p>Đang tải mẫu...</p>  }
            { (widgetList.error)  && <p>{widgetList.error}</p> }
            <div className="p-4 space-y-4 h-[450px] overflow-y-auto">    
                <div className="grid grid-cols-3 gap-4">
                { <Each 
                    of={widgetList.data || []}
                    render={(template: WidgetData) => (
                        <div  
                            onClick={()=>setCurrentWidget(template)} 
                            className={`
                                relative rounded shadow border-2 hover:shadow-lg cursor-pointer h-48
                                ${ currentWidget?._id === template._id ? "border-blue-500" : "border-gray-200"}
                            `}
                        >
                            <WidgetRenderer data={template} size='small'/> 
                        </div>
                    )}        
                />} 
                </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Đóng
                </button>
                <button 
                    onClick={handleAddWidget}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Thêm Widget
                </button>
            </div>
        </Modal>
    )
}

export default memo(WidgetModal)