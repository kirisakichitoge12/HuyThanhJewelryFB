import React, { useEffect } from 'react';
import { Clock, FileText } from 'lucide-react';
import { ContentItem, NewsPage } from '../types/news.dto';
import { useParams } from 'react-router-dom'; 
import { getNewsPage } from '../api/blog';
const NewsDisplay: React.FC = () => {
    const { id } = useParams();
    // console.log(id);
    const [newsPage, setNewsPage] = React.useState<NewsPage>({} as NewsPage);
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        const fetchNewsPage = async () => {
            try {
                if (!id) {
                    return;
                }
                const data = await getNewsPage(id);
                // console.log(data); 
                setNewsPage(data);
            } catch (error) {
                console.error('Error fetching news page:', error);
            }
        };

        fetchNewsPage();
    }, [id]);

    // Render content item based on its type
    const renderContentItem = (item: ContentItem) => {
        switch (item.type) {
            case 'heading':
                return (
                    <h2 key={item.id} className="text-2xl font-bold text-gray-800 mt-4 mb-2">
                        {item.content}
                    </h2>
                );
            case 'text':
                return (
                    <p key={item.id} className="text-gray-600 mb-3 leading-relaxed">
                        {item.content}
                    </p>
                );
            case 'image':
                return (
                    <div key={item.id} className="my-4">
                        <img 
                            src={item.content} 
                            alt={item.caption || 'News image'} 
                            className="max-w-full h-auto rounded-lg shadow-md"
                        />
                        {item.caption && (
                            <p className="text-center text-gray-500 mt-2 text-sm">
                                {item.caption}
                            </p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {newsPage.title}
                </h1>
                
                <div className="flex items-center text-gray-500 text-sm space-x-4">
                    <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        <span>Created: {formatDate(newsPage.created_at)}</span>
                    </div>
                    
                    {newsPage.created_at !== newsPage.updated_at && (
                        <div className="flex items-center">
                            <FileText size={16} className="mr-2" />
                            <span>Updated: {formatDate(newsPage.updated_at)}</span>
                        </div>
                    )}
                </div>
            </header>

            <div className="prose max-w-full">
                {newsPage.content?.map(renderContentItem)}
            </div>
        </div>
    );
};

export default NewsDisplay; 