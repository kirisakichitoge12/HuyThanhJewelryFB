import React, { ChangeEvent, useEffect, useRef, useState } from "react"; 
import FontSelector from "../../components/FontSelector";
import ColorSelector from "../../components/ColorSelector";   
import WidgetRenderer from "../../components/WidgetRender";  
import FormField from "../../components/common/FormField";
import WidgetModal from "../../components/Modals/WidgetModal";
import MusicModal from "../../components/Modals/MusicModal"; 
import Button from "../../components/common/Button"; 
import { toast } from "react-hot-toast";  
import { useFont } from "../../hooks/useFont";
import { WidgetData } from "../../types/widget.interface";
import { useMusicModal, useWidgetListModal } from "../../hooks/modals/";  
import { TemplateDataRequest } from "../../types/dataResponse/template.interface";
import { convertTemplateToFormData, isTemplateData } from "../../utils/templateUtils";
import { createTemplate } from "../../api/template";
import { useLocation, useParams } from "react-router-dom"; 
import { availableFonts } from "../../config";
import { FaDesktop, FaMobileAlt, FaMusic } from "react-icons/fa";
import { DisplayMode } from "../../types";

interface TemplateDataProps {
    listWidget: WidgetData[];
    backgroundColor: string;
    name: string;
    listTrackId: string[];
}


const TemplateEditor: React.FC = () => {  
    const [templateData, setTemplateData] = useState<TemplateDataProps>({
        name: "",
        listWidget: [],
        listTrackId: [],
        backgroundColor: "#fffff",
    });
    const { onOpen: openMusic, listTrackId } = useMusicModal();
    const { onOpen: openWidget, template } = useWidgetListModal(); 
    const { currentFont: contentFont, setCurrentFont: setContentFont } = useFont();
    const { currentFont: titleFont, setCurrentFont: setTitleFont } = useFont();  

    const { id } = useParams();
    const location = useLocation();
    const dataToEdit = location.state;   

    const [display, setDisplay] = useState<DisplayMode>("edit"); 
    const phoneRef = useRef<HTMLDivElement>(null); 
    const enterFullScreen = (type: DisplayMode) => {
        if (phoneRef.current) {
            setDisplay(type);
            phoneRef.current.requestFullscreen().catch((err) => {
                console.error("Error entering fullscreen:", err);
            });
        }
    };

    const handleSaveTemplate: VoidFunction = async() => {
        const data: TemplateDataRequest = {
            name: templateData.name,
            backgroundColor: templateData.backgroundColor,
            listTrackId: templateData.listTrackId,
            listWidget: templateData.listWidget.map((item: WidgetData) => item._id),
            titleFont: titleFont.value,
            contentFont: contentFont.value,
        } 
        const formData: FormData = await convertTemplateToFormData(data);
        try {
            const result = await createTemplate(formData); 
            if(result) 
                toast.success(result); 
        } catch (error: unknown) {
            console.log(error)
            if(error instanceof Error){ 
                console.log(error.message);
            } 
            console.log("Error unknown");
            toast.error('Create template Faill');
        }
    } 

    useEffect(() => {
        if(isTemplateData(dataToEdit) && Array.isArray(dataToEdit.listWidget)){ 
            setTemplateData({
                name: dataToEdit.name,
                backgroundColor: dataToEdit.backgroundColor,
                listTrackId: dataToEdit.listTrackId,
                listWidget: dataToEdit.listWidget
            });
            const indexFontTitle = availableFonts.find(f => f.value === dataToEdit.titleFont);
            const indexFontContent = availableFonts.find(f => f.value === dataToEdit.contentFont);
            if(indexFontTitle)
                setTitleFont(indexFontTitle);
            if(indexFontContent)
                setContentFont(indexFontContent);
            if(Array.isArray(dataToEdit.listTrackId)){
                // onSetMusicList(dataToEdit.listTrackId);
            }
        }
    }, [id, dataToEdit]);

    useEffect(() => {  
        if(template.length <= 6 && template.length > 0) {   
            setTemplateData(prev => ({...prev, listWidget: template})); 
        }
        if(template.length > 6 ){
            toast.error("Tạo tối đa chỉ 6 widget trong 1 template")
        }
    }, [template]);

    useEffect(() => {
        if(listTrackId){
            // setTemplateData(prev => ({...prev, listTrackId}))
        }
    }, [listTrackId]);

    return (
        <section ref={phoneRef} className="relative bg-white">
            { 
                display !== "edit" 
                    ? 
                        // <SubNavbarDisplayMode onEnterFullScreen={enterFullScreen} onExistFullScreen={exitFullScreen}>
                        //     {
                        //         display === "mobile" 
                        //             ? <MobilePreview 
                        //                     data={templateData.listWidget || []} 
                        //                     fontTitleFamily={titleFont.value}
                        //                     fontContentFamily={contentFont.value}
                        //                 />
                        //             : <DesktopPreview 
                        //                 data={templateData.listWidget || []} 
                        //                 fontTitleFamily={titleFont.value}
                        //                 fontContentFamily={contentFont.value}
                        //             />
                        //     }
                        // </SubNavbarDisplayMode>
                        <></>
                    : <div  className="bg-white py-6 px-10 space-y-6 overflow-hidden">
                        <div className="flex items-center gap-4">
                            <FontSelector 
                                title="Chọn chữ tiêu đề"
                                selectedFont={titleFont.value} 
                                onFontChange={setTitleFont} 
                            />
                            <FontSelector 
                                title="Chọn chữ nội dung"
                                selectedFont={contentFont.value} 
                                onFontChange={setContentFont} 
                            />
                            <ColorSelector onColorChange={(color: string) => setTemplateData(prev => ({...prev, backgroundColor: color}))} />  
                            
                            <div>
                                <label>Tên mẫu</label>
                                <FormField 
                                    value={templateData.name}
                                    placeholder="Name..." 
                                    onChange={(e:ChangeEvent<HTMLInputElement>) => setTemplateData(prev => ({ ...prev, name:e.target.value }))}
                                />
                            </div>
                            <div className="flex gap-5 justify-center items-center">
                                <Button onClick={openMusic}><FaMusic /></Button> 
                                <Button onClick={() => enterFullScreen("mobile")}><FaMobileAlt /></Button>
                                <Button onClick={() => enterFullScreen("desktop")}><FaDesktop /></Button>
                                <Button onClick={handleSaveTemplate}>Lưu mẫu</Button>
                            </div>
                        </div>

                        <hr/> 
                        {/* Thêm widget */}
                        <div className=""> 
                            <div className='w-full opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='w-full h-[2px] bg-yellow-400 translate-y-5'></div>
                                    <button onClick={()=>openWidget(0)} className={`hover:bg-yellow-500 hover:text-white border-2 border-yellow-600 bg-white text-yellow-600 p-2 rounded-md px-4 z-10`}>+ Thêm widget</button>
                                </div>
                            </div>
                            {templateData.listWidget.map((widget: WidgetData, index: number) => (
                                <div key={index}>
                                    <div className='relative aspect-[60/41]' style={{backgroundColor: templateData.backgroundColor}}> 
                                        <WidgetRenderer 
                                            data={widget} 
                                            fontTitleFamily={titleFont.value}
                                            fontContentFamily={contentFont.value}
                                        />
                                    </div>
                                    <div className='w-full opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <div className='w-full h-[2px] bg-yellow-400 translate-y-5'></div>
                                            <button 
                                                onClick={()=>openWidget(index + 1)} 
                                                className={`hover:bg-yellow-500 hover:text-white border-2 border-yellow-600 bg-white text-yellow-600 p-2 rounded-md px-4 z-10`}>
                                                    + Thêm widget
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))} 
                        </div>  
                        <WidgetModal/>
                        <MusicModal/>
                    </div>
            }
        </section>
    );
};

export default TemplateEditor;