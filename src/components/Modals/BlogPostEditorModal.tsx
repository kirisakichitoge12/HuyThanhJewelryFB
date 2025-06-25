import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BlogPostInterface } from '../../types/dataResponse/blog.interface';
import FormField from '../common/FormField';
import { FaSave, FaTrash, FaUpload } from 'react-icons/fa'; 
import Button from '../common/Button';
interface BlogPostEditorModalProps{
    post?: BlogPostInterface | null;
}

const BlogPostEditorModal: React.FC<BlogPostEditorModalProps> = ({
    post
}) => {
    const [selectedPost, setSelectedPost] = useState<BlogPostInterface>({
        _id: Date.now().toString(),
        title: 'New Blog Post',
        content: "",
        imageUrl: "",
        contents: [{
            sectionTitle: "",
            sectionContent: "",
            sectionImage: null,
        }],
        author: '', 
        status: 'nháp'
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) { 
        const imageUrl = URL.createObjectURL(file);
        
        setSelectedPost(prevPost => ({
            ...prevPost,
            image: file,
            imageUrl: imageUrl
        }))}
    };

    const handleImageRemove = () => {
        setSelectedPost(prevPost => ({
            ...prevPost,
            image: undefined,
            imageUrl: ""
        } ));

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setSelectedPost({ ...selectedPost, [name]: value });
    }; 
    const handleSectionChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        setSelectedPost(prevPost => {
            const updatedContent = [...prevPost.contents];
            updatedContent[index] = {
                ...updatedContent[index],
                [name]: files ? files[0] : value
            };
            return { ...prevPost, contents: updatedContent };
        });
    }; 
    const addContentSection = () => {
        setSelectedPost({
            ...selectedPost,
            contents: [
                ...selectedPost.contents,
                { sectionTitle: "", sectionContent: "", sectionImage: null },
            ],
        });
    };
    useEffect(() => {
        if(post){
            setSelectedPost(post); 
        }
    }, [post])

//   const handleSave = async() => {
//     if (selectedPost) {
//       const existingIndex = posts.findIndex(p => p._id === selectedPost._id); 
//       if (existingIndex > -1) {  
//         // Remove oldValue tracking, only store new values
//         const changes: Partial<Record<keyof BlogPostInterface, BlogPostInterface[keyof BlogPostInterface]>> = {};
//         const existingPost = posts[existingIndex]; 
//         for (const key in selectedPost) {
//           if (selectedPost[key as keyof BlogPostInterface] !== existingPost[key as keyof BlogPostInterface]) {
//             changes[key as keyof BlogPostInterface] = selectedPost[key as keyof BlogPostInterface]; // Store only new value
//           }
//         } 
//         const formData = new FormData(); 
//         // Add changes to formData if there are any
//         if (Object.keys(changes).length > 0) {
//           for (const key in changes) {
//             const value = changes[key as keyof BlogPostInterface];
//             if (value !== undefined) {   
//               if (typeof value === 'string' || value instanceof File) { // Check for valid types
//                 formData.append(key, value);
//               }
//             }
//           }
//         } 
//         try {
//           const result = await editBlogPost(selectedPost._id, formData); 
//           if(result){ 
//             const updatedPosts = [...posts];
//             updatedPosts[existingIndex] = result;
//             setPosts(updatedPosts);
//             toast.success("Update Blog success");
//           }
//         } catch (error: unknown) { 
//           toast.error(error instanceof Error ? error.message : "An unknown error occurred"); 
//         }
//       } else {
//         // Add new post   
//         try {
//           const result = await createBlogPost(selectedPost);
//           if(result){
//             setPosts([...posts, result]);
//             toast.success("Created success");
//           }
//         } catch (error: unknown) {
//           if(error instanceof Error){ 
//               toast.error( error.message || 'Create Blog Faill');
//           } 
//           toast.error('An unknown error occurred'); 
//       }}
      
//       setIsEditing(false);
//       setSelectedPost(null);
//     }
//   };

    const handleCancel = () => { 
        // setSelectedPost();
    };  
    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {selectedPost._id ? 'Sửa' : 'Tạo'} Bài Viết
                    </h2>
                    <div className="flex space-x-2">
                    <button 
                        onClick={handleCancel}
                        className="text-gray-400 px-4 py-2 rounded-md flex items-center"
                    > 
                        Hủy
                    </button>
                    <button 
                        onClick={() => {}}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
                    >
                        <FaSave className="mr-2" />
                        Lưu
                    </button>
                    </div>
                </div>

                <div className="space-y-4"> 
                    <FormField 
                        value={selectedPost.title}
                        name='title'
                        onChange={handleInputChange}
                        placeholder="Tiêu đề bài viết"
                    /> 
                    <h3 className="text-lg font-semibold text-gray-800 mb-4"> Nội dung bài viết</h3>
                    {
                        selectedPost.contents.map((section, index) => (
                            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50" >
                                <FormField 
                                title='Tiêu đề'
                                    id={`sectionTitle-${index}`}
                                    name="sectionTitle"
                                    value={section.sectionTitle} 
                                    placeholder="Nhập tiêu đề mục..."
                                    onChange={(e) => handleSectionChange(index, e)}
                                    required
                                /> 
                                <div className="mb-4">
                                    <label htmlFor={`sectionContent-${index}`} className="block text-gray-700 font-medium text-sm mt-2" >
                                        Nội dung mục
                                    </label>
                                    <textarea
                                        id={`sectionContent-${index}`}
                                        name="sectionContent"
                                        value={section.sectionContent}
                                        onChange={(e) => handleSectionChange(index, e)}
                                        rows={4}
                                        className="w-full p-3 border-[1px] border-gray-300 rounded-lg shadow-sm focus:outline-none"
                                        placeholder="Nhập nội dung mục..."
                                    ></textarea>
                                </div>

                                <div className=''>
                                    <label 
                                        htmlFor={`sectionImage-${index}`} 
                                        className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center cursor-pointer hover:bg-blue-600 truncate max-w-44" 
                                    >
                                        <FaUpload className="mr-2" /> 
                                        { selectedPost.contents[index].sectionImage?.name || "Tải lên" }  
                                    </label> 
                                    {selectedPost.contents[index].sectionImage && ( 
                                        <Button onClick={() => {}}>Remove</Button>
                                    )}
                                    <input type="file" id={`sectionImage-${index}`} name="sectionImage" accept="image/*" onChange={(e) => handleSectionChange(index, e)} className="hidden"/>
                                </div>
                            </div>
                        ))}
                    <button
                        type="button"
                        onClick={addContentSection}
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Thêm mục mới
                    </button>
                    <div className="grid grid-cols-2 gap-4"> 
                        <div> 
                            {/* Image Preview */}
                            {selectedPost.imageUrl && (
                                <div className="mt-4 relative">
                                    <img 
                                    src={selectedPost.imageUrl} 
                                    alt="Blog post preview" 
                                    className="max-w-full h-56 object-cover rounded-md"
                                    />
                                </div>
                            )} 
                        </div>
                        
                        <div>
                            <label className="block my-2">Người viết</label>
                            <FormField 
                                value={selectedPost.author}
                                onChange={(e) => setSelectedPost({...selectedPost, author: e.target.value})}
                            />
                            <label className="block my-2">Trạng thái</label>
                            <select 
                                value={selectedPost.status}
                                onChange={(e) => setSelectedPost({
                                    ...selectedPost, 
                                    status: e.target.value as BlogPostInterface['status']
                                })}
                                className="w-full outline-none shadow focus:shadow-lg rounded-md p-2"
                            >
                                <option value="nháp">Nháp</option>
                                <option value="đăng">Đăng</option>
                                <option value="lưu trữ">Lưu trữ</option>
                            </select>  
                            <label className="block my-2">Hình ảnh nổi bật</label>
                            {/* Image Upload Section */}
                            <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
                                <label htmlFor="imageUpload" className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center cursor-pointer hover:bg-blue-600">
                                    <FaUpload className="mr-2" /> 
                                    Tải lên
                                </label>
                                
                                {selectedPost.imageUrl && (
                                    <button 
                                        onClick={handleImageRemove}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-600"
                                    >
                                        <FaTrash /> 
                                    </button>
                                )}
                            </div> 
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2">Nhãn (được phân tách bằng dấu phẩy)</label>
                        <FormField 
                            value={selectedPost.tags ? selectedPost.tags.join(', ') : ''}
                            onChange={(e) => setSelectedPost({
                            ...selectedPost, 
                            tags: e.target.value.split(',').map(tag => tag.trim())
                            })}
                            placeholder="tình cảm, lãng mạn"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPostEditorModal