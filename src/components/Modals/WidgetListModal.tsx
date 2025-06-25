import React, { useState } from 'react'
import Modal from './Modal' 
import widget1 from '../../assets/images/templates/coba/widgetList/widget1.png';
import widget2 from '../../assets/images/templates/coba/widgetList/widget2.png';
import widget3 from '../../assets/images/templates/coba/widgetList/widget3.png';
import widget4 from '../../assets/images/templates/coba/widgetList/widget4.png';
import widget5 from '../../assets/images/templates/coba/widgetList/widget5.png';
import widget6 from '../../assets/images/templates/coba/widgetList/widget6.png';
import widget7 from '../../assets/images/templates/coba/widgetList/widget7.png';
import widget8 from '../../assets/images/templates/coba/widgetList/widget8.png';
import Each from '../../layouts/Each';
const widgetList = [widget1, widget2, widget3, widget4, widget5, widget6, widget7, widget8];
const titleWidget =["Địa điểm", "Giới thiệu",  "Câu chuyện", "Albums", "Lịch trình", "Sự kiện", "Tin nhắn", "Ngân hàng"];
interface WidgetListModalProps{
    data?: string[];
    title?: string[];
    isOpen: boolean;
    location: number;
    onClose: () => void;
    onChooseWidget: (index: number, location: number) => void;
} 
const WidgetListModal: React.FC<WidgetListModalProps> = ({
    data = widgetList,
    title = titleWidget,
    isOpen, 
    onClose,
    location,
    onChooseWidget
}) => { 
    const [isWidget, setIsWidget] = useState<number>(1); 
    const handleSubmit = () => { 
        onChooseWidget(isWidget, location);
        onClose();
    }
    return (
        <Modal
            title='Chọn widget'
            isOpen={isOpen}
            onClose={onClose} 
            size='max-w-3xl max-h-screen p-10'
        > 
            <h3 className='text-center text-2xl mb-5'>Thêm widget</h3>
            <div className='flex items-center justify-center space-x-4'>
                <div className='flex flex-col items-center space-y-4 w-1/3'>
                    <Each 
                        of={title}
                        render={(item: string, index: number) => 
                            <button 
                                onClick={() => setIsWidget(index + 1)} 
                                className={`
                                    ${isWidget === index + 1 ? 'bg-primary text-white' : 'text-gray-600'} 
                                    px-4 py-2 w-full text-gray-600 border-[1px] text-start border-gray-400 rounded-lg hover:bg-primary hover:text-white`}
                            >
                                {item}
                            </button>
                        }
                    />  
                    </div>
                <div className='w-2/3 max-h-[448px] shadow-lg rounded-lg'>
                <Each 
                    of={data}
                    render={(widget: string, index: number) => 
                        <img src={widget} alt={`widget-${index}`} className={`w-full max-h-[448px] object-cover object-top ${isWidget === index + 1 ? 'block' : 'hidden'}`} />
                    }
                /> 
                </div>
            </div>
            <div className='flex justify-end items-center text-white gap-5 pt-5'>
                <button className='text-black' onClick={onClose}>Đóng</button>
                <button 
                    className='bg-primary px-4 py-2 rounded' 
                    onClick={handleSubmit}
                >
                    Thêm
                </button>
            </div>
        </Modal>
    )
}

export default WidgetListModal