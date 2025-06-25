import React, { useEffect, useState } from 'react';
import Each from '../../layouts/Each'; 
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import Button from '../../components/common/Button';
import { WidgetData } from '../../types/widget.interface';
import { useAdminContext } from '../../context/AdminContext';
import WidgetRenderer from '../../components/WidgetRender'; 
import { deleteWidget, fetchWidgetList } from '../../api/widget'; 
import { toast } from 'react-hot-toast';
import { useWidgetEditorModal, useConfirmModal} from '../../hooks/modals';
import WidgetCustomizerModal from '../../components/Modals/WidgetCustomizerModal';

const WidgetList: React.FC = () => { 
    const { onOpen } = useWidgetEditorModal();
    const { onOpen: openConfirm, onClose: closeConfirm } = useConfirmModal();
    const [widgets, setWidgets] = useState<WidgetData[]>([]);
    const { widgetList } =  useAdminContext().state; 
    const { dispatch } = useAdminContext();
    const handleEditWidget = (data: WidgetData) => onOpen(data); 
    const handleDeleteWidget = (_id: string) => { 
        const handleSubmit = async() => {
            try {
                const result = await deleteWidget(_id); 
                if(result){  
                    setWidgets(prevWidgets => prevWidgets.filter(widget => widget._id !== _id));
                    toast.success(result);
                    closeConfirm();
                }
            } catch (error: unknown) { 
                toast.error(error instanceof Error ? error.message : "An unknown error occurred"); 
            }
        }
        openConfirm("",handleSubmit);
    }

    useEffect(() => { 
        fetchWidgetList(dispatch);
    },[dispatch]);

    useEffect(() => { 
        if(widgetList){
            setWidgets(widgetList.data);
        }
    }, [widgetList]);

    return (
        <section className="container mx-auto p-4">
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl font-bold text-gray-800">Danh sách Widget</h1>
                <Button onClick={() => onOpen(null)} style={{ padding: "10px" }} rounded='full'><FaPlus/></Button>
            </div>
            <hr className='my-5'/>
            <div className="w-full max-w-full max-h-screen mx-auto p-4">  
                { widgetList.loading && <p>Đang tải widget...</p> }
                { widgetList.error && <p>Không tìm thấy widget</p> } 
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                {
                    <Each 
                        of={widgets}
                        render={(template: WidgetData) => (
                            <div className={`relative max-h-48 h-48 rounded shadow border-2 hover:shadow-lg cursor-pointer border-gray-200 `}>
                                <WidgetRenderer data={template} size='small'/>
                                <div className='absolute top-2 right-2 flex gap-2'>
                                    <Button 
                                        onClick={() => handleEditWidget(template)}
                                        
                                    >
                                        <FaEdit/>
                                    </Button>
                                    <Button 
                                        onClick={()=>handleDeleteWidget(template._id)}
                                       
                                        color='danger'
                                    >
                                        <FaTrash/>
                                    </Button>
                                </div>
                            </div>
                        )}        
                    />
                } 
                </div>
            </div>
            <WidgetCustomizerModal />
        </section>
    )
}

export default WidgetList;