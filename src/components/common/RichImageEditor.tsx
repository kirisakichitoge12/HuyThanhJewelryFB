import React, { useEffect, useRef, useState } from 'react';
import { IoCloudUploadOutline, IoImageOutline, IoTrashOutline } from 'react-icons/io5';
import { useCropImageModal, useImagesModal } from '../../hooks/modals'; 
import { createImageFileFromLocalSrc, urlToFile } from '../../utils'; 
import ImageEmpty from '../../assets/images/templates/coba/empty.png';
import toast from 'react-hot-toast';
import Loading from 'react-loading';
import { API_BASE_URL } from '../../config/api.config';

interface RichImageEditorProps{
    id: string;
    src: string;
    name: string;
    subField?: string;
    index?: number;
    className?: string;
    classNameImage?: string;
    alt?: string;
    toolbarPosition?: 'top' | 'bottom'; // thêm dòng này
    style?:  React.CSSProperties;
    disabled?: boolean;
    onChange: (name: string, file: File | string, subField?: string, index?: number) => void;
    children?: React.ReactNode, 
}

const RichImageEditor:React.FC<RichImageEditorProps> = ({
    id,
    alt,
    src,
    name, 
    subField, 
    index,
    className, 
    classNameImage, 
    toolbarPosition = 'bottom',
    style = {},
    onChange,
    disabled = false,
    children,
}) => {
    const imgRef = useRef<HTMLImageElement>(null); 
    const [imagePreview, setImagePreview] = useState<string>(src);

    const [toolbar, setToolbar] = useState<boolean>(false); 
    const { onOpen } = useImagesModal();
    const { onOpen: onCropImageModalOpen, newImage, id: idCurrentImageCrop, reset } = useCropImageModal();
    const { listImage, id: idCurrentImage } = useImagesModal();
    const handleClick = (event: React.MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        event.stopPropagation(); 
        setToolbar(true); 
    }
    const [loading, setLoading] = useState(false);
    const handleBlur = () => setToolbar(false);
    const convertFileToWebP = async (
        file: File,
        quality: number = 0.3,
        fileName: string = "image.webp"
      ): Promise<File> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              return reject(new Error("Không lấy được canvas context"));
            }
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const newFile = new File([blob], fileName, { type: "image/webp" });
                  resolve(newFile);
                } else {
                  reject(new Error("Chuyển đổi blob thất bại"));
                }
              },
              "image/webp",
              quality
            );
          };
          img.onerror = () => reject(new Error("Lỗi khi tải ảnh"));
        });
      };
      
    //   const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        
    //     setLoading(true);

    //     setTimeout(() => {
    //         setLoading(false);
    //      }, 2000);

    //     const target = e.target as HTMLInputElement;
    //     const file = target.files?.[0];
    //     if (!file) return;
      
    //     try {
         
    //       // Chuyển file sang định dạng WebP với chất lượng 0.5
    //       const webpFile = await convertFileToWebP(file, 0.3, "image.webp");
    //       // Tạo URL xem trước từ file WebP
    //       setImagePreview(URL.createObjectURL(webpFile));
    //       // Gọi callback với file đã chuyển đổi
    //       onChange(name, webpFile, subField, index);
    //     } catch (error) {
    //       console.error("Lỗi chuyển đổi ảnh:", error);
    //       // Nếu chuyển đổi thất bại, fallback sử dụng file gốc
    //       setImagePreview(URL.createObjectURL(file));
    //       onChange(name, file, subField, index);
    //     }
        
    //   };
    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true); // Bật loading ngay khi bắt đầu
    
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) {
            setLoading(false); // Không có file thì tắt loading
            return;
        }
    
        try {
            // Chuyển file sang định dạng WebP với chất lượng 0.3
            const webpFile = await convertFileToWebP(file, 0.3, "image.webp");
    
            // Tạo URL xem trước từ file WebP
            setImagePreview(URL.createObjectURL(webpFile));
    
            // Gọi callback để thông báo file đã upload
            onChange(name, webpFile, subField, index);
        } catch (error) {
            console.error("Lỗi chuyển đổi ảnh:", error);
    
            // Nếu chuyển đổi lỗi, dùng file gốc để xem trước và onChange
            setImagePreview(URL.createObjectURL(file));
            onChange(name, file, subField, index);
        } finally {
            // Tắt loading sau khi tất cả đã xử lý xong (thành công hoặc lỗi đều tắt)
            setLoading(false);
        }
    };
    

      
    const handleOpenCropImage = async(event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        event.stopPropagation();
        try { 
            let imageFile: File | null = null;
            if(imagePreview.includes(API_BASE_URL)){
                imageFile = await urlToFile(imagePreview);
            }else{
                imageFile = await createImageFileFromLocalSrc(imagePreview, "image.jpg");
            } 
            if(imageFile){
                onCropImageModalOpen(imageFile, id); 
                onChange(name, imageFile, subField, index);
            } else {
                toast.error("Tải ảnh thất bại");
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    } 

    const handleSelectImage = () => onOpen(id, true);
    const handleRemoveImage = () => {
        setImagePreview(ImageEmpty);
        onChange(name, "", subField, index);
    }

    useEffect(() => {
        console.log({
            newImage,
             id, idCurrentImageCrop
        })
        if (id === idCurrentImageCrop && newImage) {
            const objectUrl = URL.createObjectURL(newImage);
            setImagePreview(objectUrl);
            onChange(name, newImage, subField, index);
            reset();
            // return () => URL.revokeObjectURL(objectUrl);
        }
    }, [newImage,id]); // Only depend on newImage changes

    // Handle initial list image
    useEffect(() => {
        if (idCurrentImage === id && listImage.length > 0) {
            const objectUrl = URL.createObjectURL(listImage[0]);
            setImagePreview(objectUrl);
            onChange(name, listImage[0], subField, index);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [listImage]);
     

    return ( 
        <div onMouseLeave={handleBlur} onClick={handleClick} className={`z-30 ${className || "relative cursor-pointer"}`}>
            <img 
                className={`w-full h-full z-10 object-cover object-center border-2 p-2 border-transparent ${disabled ? "" : "hover:border-primary"}  ${classNameImage}`} style={style}
                alt={alt}
                ref={imgRef}
                src={imagePreview} 
                
                loading='lazy'
            />
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
            {toolbar && !disabled &&
                (<div
                    onClick={(event) => event.stopPropagation()}
                    className={`absolute rotate-0 z-50 font-svn-sans text-sm min-w-56 md:text-[10px] bg-white text-gray-700 rounded-md shadow-lg border border-gray-200 px-10 py-2 text-center w-full max-w-80
                        ${toolbarPosition === 'top' ? 'bottom-full -mb-2' : 'top-full -mt-2'}
                    `}
                    >

                    <h3 className="pb-3 font-bold text-[12px]">Sửa hình ảnh</h3>
                        <div className="flex justify-center gap-3">
                            <label  
                                htmlFor={id} 
                                className={`hover:bg-gray-200 p-1 rounded flex flex-col justify-between items-center`}
                            >
                                <IoCloudUploadOutline size={20}/>
                                <p>Tải ảnh</p>
                            </label>
                            <input id={id} onChange={handleUploadImage} type='file' className='hidden'/>
                            <button  
                                onClick={handleSelectImage}
                                className={`hover:bg-gray-200 p-1 rounded flex flex-col justify-between items-center`}
                            >
                                <IoImageOutline size={20}/>
                                <p>Chọn ảnh</p>
                            </button>
                            <button  
                                onClick={handleOpenCropImage}
                                className={`hover:bg-gray-200 p-1 rounded flex flex-col justify-between items-center`}
                            >
                                <IoImageOutline size={20}/>
                                <p>Sửa ảnh</p>
                            </button>
                            <button  
                                onClick={handleRemoveImage}
                                className={`hover:bg-gray-200 p-1 rounded flex flex-col justify-between items-center`}
                            >
                                <IoTrashOutline size={20}/>
                                <p>Gỡ ảnh</p>
                            </button>
                        </div>
                    </div>
                )}
            {children}
             
        </div>
        
    )
}

export default RichImageEditor