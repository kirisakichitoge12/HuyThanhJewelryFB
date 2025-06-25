interface NewsCardProps{
    image:string;
    title: string;
    excerpt: string;
    isBtnAction: boolean;
} 
const NewsCard = ({ image, title, excerpt, isBtnAction }: NewsCardProps) => (
    <div className="w-[295px] min-h-[370px] rounded-lg"> 
        <img 
            src={image} 
            alt={title}
            className="min-w-[295px] mb-6 h-[190px] object-cover transition-transform duration-300 group-hover:scale-105"
        /> 
        <h3 className="font-bold text-[18px] leading-[25px] mb-2 line-clamp-2 group-hover:text-red-500 transition-colors ">
            {title}
        </h3>
        <p className={`text-heading text-base line-clamp-3 ${ isBtnAction ? "block" : "hidden" }`}>
            {excerpt}
        </p>
    </div>
);

export default NewsCard;