import React, { useEffect, useState } from 'react';      
import { CustomFile } from '../../types';
import { useCropImageModal, useImagesModal } from '../../hooks/modals'; 
import Loading from 'react-loading';

const ImagesModal: React.FC = () => {
    const [images, setImages] = useState<CustomFile[]>([]);
    const { isOpen, onClose, onChooseImages, images: imagesModal, onUploadImages, isSingle } = useImagesModal(); 
    const { onOpen: onCropImageModalOpen, newImage, id: idCurrentImageCrop } = useCropImageModal();
    // const [currentImage, setCurrentImage] = useState<number[]>([]);

    // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!event.target.files) return;
    //     const files = Array.from(event.target.files);
    //     const newImages: CustomFile[] = [];
    
    //     files.forEach((file) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    
    //         reader.onload = (e) => {
    //             const img = new Image();
    //             img.src = e.target?.result as string;
    //             img.onload = () => {
    //                 const canvas = document.createElement("canvas");
    //                 const ctx = canvas.getContext("2d");
    
    //                 if (!ctx) return;
    
    //                 canvas.width = img.width;
    //                 canvas.height = img.height;
    //                 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    //                 canvas.toBlob((blob) => {
    //                     if (blob) {
    //                         const newFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" });
    
    //                         // Xóa URL cũ nếu đã tồn tại để tránh rò rỉ bộ nhớ
    //                         const previewURL = URL.createObjectURL(newFile);
    
    //                         const customFile = Object.assign(newFile, { preview: previewURL });
    //                         newImages.push(customFile);
    
    //                         if (newImages.length === files.length) {
    //                             // Kiểm tra ảnh trùng trước khi thêm
    //                             setImages([...images, ...newImages]);
    //                              onUploadImages([...images, ...newImages]);
    //                         }
    //                     }
    //                 }, "image/webp", 0.6);
    //             };
    //         };
    //     });
    // };
    const [loading, setLoading] = useState(false); 
    // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (!event.target.files) return;
    //     const files = Array.from(event.target.files);
    //     const newImages: CustomFile[] = [];
    //     setLoading(true);

    //     setTimeout(() => {
    //         setLoading(false);
    //      }, 2000);
    //     files.forEach((file) => {
    //         if (file.type === "image/webp") {
    //             const previewURL = URL.createObjectURL(file);
    //             const img = new Image();
    //             img.src = previewURL;
    
    //             img.onerror = () => {
    //                 console.warn(`Hình ảnh ${file.name} bị lỗi và đã bị loại bỏ.`);
    //                 URL.revokeObjectURL(previewURL);
    //             };
    
    //             img.onload = () => {
    //                 setTimeout(() => {
    //                     const customFile = Object.assign(file, { preview: previewURL });
    //                     newImages.push(customFile);
    
    //                     if (newImages.length === files.length) {
    //                         setImages([...images, ...newImages]);
    //                         onUploadImages([...images, ...newImages]);
    //                     }
    //                 }, 100); // Chờ 100ms để đảm bảo ảnh load hoàn toàn
    //             };
    
    //             return;
    //         }
    
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    
    //         reader.onload = (e) => {
    //             const img = new Image();
    //             img.src = e.target?.result as string;
    
    //             img.onerror = () => console.warn(`Hình ảnh ${file.name} bị lỗi và đã bị loại bỏ.`);
    
    //             img.onload = () => {
    //                 setTimeout(() => {
    //                     const canvas = document.createElement("canvas");
    //                     const ctx = canvas.getContext("2d");
    
    //                     if (!ctx) return;
    
    //                     canvas.width = img.width;
    //                     canvas.height = img.height;
    //                     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    //                     canvas.toBlob((blob) => {
    //                         if (blob) {
    //                             const newFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" });
    
    //                             const previewURL = URL.createObjectURL(newFile);
    //                             const customFile = Object.assign(newFile, { preview: previewURL });
    
    //                             newImages.push(customFile);
    
    //                             if (newImages.length === files.length) {
    //                                 setImages([...images, ...newImages]);
    //                                 onUploadImages([...images, ...newImages]);
    //                             }
    //                         }
    //                     }, "image/webp", 0.6);
    //                 }, 100); // Chờ 100ms để đảm bảo ảnh load hoàn toàn
    //             };
    //         };
    //     });
        
    // };
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const files = Array.from(event.target.files);
        const newImages: CustomFile[] = [];
        setLoading(true); // Bật loading khi bắt đầu upload
    
        files.forEach((file) => {
            if (file.type === "image/webp") {
                const previewURL = URL.createObjectURL(file);
                const img = new Image();
                img.src = previewURL;
    
                img.onerror = () => {
                    console.warn(`Hình ảnh ${file.name} bị lỗi và đã bị loại bỏ.`);
                    URL.revokeObjectURL(previewURL);
                };
    
                img.onload = () => {
                    setTimeout(() => {
                        const customFile = Object.assign(file, { preview: previewURL });
                        newImages.push(customFile);
    
                        if (newImages.length === files.length) {
                            setImages([...images, ...newImages]);
                            onUploadImages([...images, ...newImages]);
                            setLoading(false); // Tắt loading khi tất cả ảnh đã xử lý
                        }
                    }, 100); // Giữ delay 100ms nếu cần
                };
    
                return; // Skip sang file tiếp theo
            }
    
            // Xử lý các file không phải webp (chuyển sang webp)
            const reader = new FileReader();
            reader.readAsDataURL(file);
    
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target?.result as string;
    
                img.onerror = () => console.warn(`Hình ảnh ${file.name} bị lỗi và đã bị loại bỏ.`);
    
                img.onload = () => {
                    setTimeout(() => {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
    
                        if (!ctx) return;
    
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                        canvas.toBlob((blob) => {
                            if (blob) {
                                const newFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), { type: "image/webp" });
    
                                const previewURL = URL.createObjectURL(newFile);
                                const customFile = Object.assign(newFile, { preview: previewURL });
    
                                newImages.push(customFile);
    
                                if (newImages.length === files.length) {
                                    setImages([...images, ...newImages]);
                                    onUploadImages([...images, ...newImages]);
                                    setLoading(false); // Tắt loading khi tất cả ảnh đã xử lý
                                }
                            }
                        }, "image/webp", 0.6);
                    }, 100); // Giữ delay 100ms nếu cần
                };
            };
        });
    };
    
    
    const handleSave = () => { 
        // const result: CustomFile[] = images.filter((_, i) => currentImage.includes(i));
        // onChooseImages(result);
        onChooseImages(images);  // Lấy luôn toàn bộ images hiện có 
        onClose();
    };     

    const handleCropImage = (image: CustomFile, index: number) => {
        onCropImageModalOpen(image, `album-coba-${index.toString()}`);
    };

    const handleRemoveImage = (index: number) => {
        const newImages:CustomFile[]  = images.filter((_, i) => i !== index)
        setImages(newImages);
        onUploadImages(newImages); 
    }; 

    // const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    //     if (event.target.checked) {
    //         if(isSingle){
    //             setCurrentImage([index]);
    //         }else{
    //             const newCurrentImage = [...currentImage, index];
    //             setCurrentImage(newCurrentImage);
    //         }
    //     }else{
    //         if(isSingle){
    //             setCurrentImage([]);
    //         }else{
    //             const newCurrentImage = currentImage.filter((item) => item !== index);
    //             setCurrentImage(newCurrentImage);
    //         }
    //     } 
    // }

    useEffect(() => {
        if(imagesModal.length > 0){
            // console.log(imagesModal);
            setImages(imagesModal.map((image) => Object.assign(image, { preview: URL.createObjectURL(image)})));
        }
        // setCurrentImage([]);
    }, [imagesModal, isSingle]);

    useEffect(() => { 
        if(newImage && idCurrentImageCrop.includes("album-coba")){
            const index = idCurrentImageCrop.slice(-1);
            if(index){
                const newIndex = Number(index);
                if(newIndex >= 0 && newIndex < images.length){  
                    const customFile: CustomFile = Object.assign(newImage, {
                        preview: URL.createObjectURL(newImage)
                    }); 
                    console.log({
                        newIndex, newImage
                    }); 
                    const newCurrentImage = images.map((i: CustomFile, index: number) => index === newIndex ? customFile : i);
                    console.log(newCurrentImage);
                    setImages(newCurrentImage);
                }
            }
        }
    },[newImage, idCurrentImageCrop]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800"> 
                    Thư viện ảnh
                </h2>
                <div className='flex gap-2 justify-center items-center'> 
                    <label htmlFor="images" className='cursor-pointer font-medium text-blue-600 border-[1px] border-blue-600 rounded-md px-2 py-1'>
                        Tải ảnh
                    </label>
                </div>
                </div>
                <div className="p-4 space-y-4 h-[450px] overflow-y-auto">    
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        className='hidden'
                        onChange={handleImageUpload}
                    />
                    <div className="mt-2 grid grid-cols-4 gap-2">
                        {images.map((image: CustomFile, index: number) => (
                            <div key={index} className={`relative group`}>
                                <img
                                    src={image.preview}
                                    alt={`Image ${index}`}
                                    className="w-full h-48 object-contain rounded-md shadow-md transition-all duration-300 group-hover:blur-sm"
                                />
                                <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center gap-2'>
                                    <button 
                                        onClick={() => handleCropImage(image, index)}
                                        className='bg-black/80 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleRemoveImage(index)} className='bg-black/80 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        Remove
                                    </button> 
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-2 p-4 border-t">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Save
                </button>
                </div>
            </div>
             {loading && (
                                                            <div style={{
                                                                position: 'fixed', // giúp overlay toàn màn hình
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%',
                                                                backgroundColor: 'rgba(255, 255, 255, 0.6)', // lớp mờ nền nhẹ
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                zIndex: 9999 // đảm bảo nổi trên cùng
                                                            }}>
                                                                <Loading
                                                                    type="spinningBubbles"
                                                                    color="rgba(237,131,131)"
                                                                    height={100}
                                                                    width={100}
                                                                />
                                                            </div>
                                                        )}
        </div>
    );
};

export default ImagesModal;