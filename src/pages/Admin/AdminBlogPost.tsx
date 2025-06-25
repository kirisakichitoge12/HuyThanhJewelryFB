import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Calendar, Eye } from 'lucide-react';  
import { useNavigate } from 'react-router-dom';  
import { NewsPreviewDTO } from '../../types/news.dto';
import { formatDateTimeLocal } from '../../utils'; 
import { getNewsPages } from '../../api/blog';

const AdminBlogPost: React.FC = () => {
  // State management
    const [articles, setArticles] = useState<NewsPreviewDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 
    const [searchTerm, setSearchTerm] = useState<string>(''); 
    const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
    const navigate = useNavigate(); 
    useEffect(() => {  
        const fetchNewsPages = async () => {
            const response = await getNewsPages();
            
            setArticles(response);    
        }
        setTimeout(() => {
            fetchNewsPages();
            setLoading(false);
        }, 500); 
    }, []);

    const filteredArticles = articles.filter(article => article.imageUrl && `https://nhahang.hungthinhsecurity.com/api/${article.imageUrl}` 
    );  
    const deleteArticle = (id: string) => {
        // This would be replaced with an actual API call
        setArticles(prev => prev.filter(article => article.id !== id));
    };

    const toggleArticleExpansion = (id: string) => {
        setExpandedArticle(expandedArticle === id ? null : id);
    }; 

    return (
        <div className="p-6 bg-white min-h-screen text-white">
        <div className="container">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#ED8383]">Quản Lý Tin Tức</h1>
                <button 
                    onClick={() => navigate(`tao-bai-viet-moi`)}
                    className="flex items-center px-4 py-2 bg-[#ED8383] text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#ED8383] focus:ring-opacity-50"
                > 
                    <Plus size={16} className="mr-2" />
                    Tạo Bài Viết Mới 
                </button>
            </div> 
        {/* Search */}
        <div className="mb-6">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 bg-gray-white border border-gray-100 rounded-md focus:outline-none focus:ring-1 text-gray-500 focus:ring-[#ED8383]"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        {/* News Articles List */}
        {loading ? (
                <div className="text-center py-10">
                    <p className="text-gray-400">Đang tải dữ liệu...</p>
                </div>
            ) : filteredArticles.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-400">Không tìm thấy bài viết nào</p>
                </div>
        ) : (
            <div className="space-y-6">
                {filteredArticles.map((article) => (
                <div key={article.id} className="hover:bg-gray-50 rounded-lg overflow-hidden shadow-lg">
                    <div className="p-6">
                        {/* Article Header with Title and Actions */}
                        <div className="flex flex-wrap justify-between items-start mb-4">
                            <h2 className="text-xl font-bold text-[#ED8383] mb-2 flex-grow">{article.title}</h2>
                            <div className="flex space-x-2">
                            <button
                                onClick={() => navigate(`sua/${article.id}`)}
                                className="p-2 text-blue-500 hover:text-blue-400 rounded-full hover:bg-gray-300"
                                title="Chỉnh sửa"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => deleteArticle(article.id)}
                                className="p-2 text-red-500 hover:text-red-400 rounded-full hover:bg-gray-300"
                                title="Xóa"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button
                                onClick={() => toggleArticleExpansion(article.id)}
                                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-300"
                                title={expandedArticle === article.id ? "Thu gọn" : "Xem chi tiết"}
                            >
                                <Eye size={18} />
                            </button>
                            </div>
                        </div>
                        
                        {/* Article Meta Info */}
                        <div className="flex items-center text-sm text-gray-800 mb-4">
                            <Calendar size={14} className="mr-1" />
                            <span>Ngày đăng: {formatDateTimeLocal(article.created_at)}</span>
                            <span className="mx-2">•</span>
                            <span>Tác giả: "Thịnh"</span>
                            <span className="mx-2">•</span>
                            <span className={ "text-green-500"}> Đã xuất bản 
                            </span>
                        </div> 
                        
                        {/* Expanded Content */}
                        {expandedArticle === article.id && (
                            <div className="mt-6 border-t border-gray-700 pt-4">
                            <div className="flex mb-4"> 
                                <div className="w-full h-64 bg-gray-700 rounded-lg overflow-hidden">
                                    <img 
                                        src={article.imageUrl} 
                                        alt={article.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            
                                <div 
                                    className="prose prose-sm max-w-none text-gray-300 prose-headings:text-gray-200 prose-a:text-blue-400"
                                    dangerouslySetInnerHTML={{ __html: article.textContent }}
                                />  
                            </div> 
                            </div>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default AdminBlogPost;