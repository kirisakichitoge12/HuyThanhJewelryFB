import React, { memo } from 'react';

const BlogPostSkeleton: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse flex">
            {/* Image Skeleton */} 
            <div className="min-w-[345px] md:min-w-[402px] h-[257px] overflow-hidden">
                <div className="h-full bg-gray-200" /> {/* Skeleton for image */}
            </div> 
            
            {/* Post Details Skeleton */}
            <div className="pt-4 lg:py-[35.5px] lg:pl-[30px] lg:pr-10 h-full"> 
                <div className="h-6 bg-gray-200 rounded mb-2 min-w-44 max-w-80" /> {/* Skeleton for title */}
                <div className="h-4 bg-gray-200 rounded mb-6 w-full" /> {/* Skeleton for content */}
                <div className="h-4 bg-gray-200 rounded w-1/4" /> {/* Skeleton for "Xem thêm" link */}
            </div>
        </div>
    );
};

export default memo(BlogPostSkeleton);
