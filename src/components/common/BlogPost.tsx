import React, { memo } from 'react'  
import LinkIcon from './LinkIcon';

interface BlogPostProps{
    imageUrl: string;
    title: string;
    content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
    imageUrl,
    title,
    content,
}) => {
    return (
        <div className=" overflow-hidden grid lg:grid-flow-col grid-flow-row" >
            {/* Image */} 
            <div className="min-w-[345px] md:min-w-[402px] h-[257px] overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover hover:scale-110 transition-all "
                />
            </div> 
            
            {/* Post Details */}
            <div className="pt-4 lg:py-[35.5px] lg:pl-[30px] lg:pr-10"> 
                <h2 className="text-content-4 mb-2 font-bold text-heading flex-grow">{title}</h2>
                <p className="text-content-2 text-sub-heading line-clamp-3 text-justify mb-6">
                    {content}
                </p> 
                <LinkIcon to=''>
                    Xem thêm
                </LinkIcon>
            </div>
        </div>
    )
}

export default memo(BlogPost)