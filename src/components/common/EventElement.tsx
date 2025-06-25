import React, { memo } from 'react' 
import { availableColors } from '../../config'; 
import { formatDateTimeLocal } from '../../utils';
import { EventProps } from '../templates/Coba/EventsSection';  
interface EventElementProps{
    event:  EventProps; 
    style: number;
    icon: string;
}   


const EventElement: React.FC<EventElementProps> = ({ event, style, icon }) => {   
    return ( 
        <div className='flex flex-col justify-center items-center'>
            <div className='relative'>
                <img src={icon} className='min-w-[255px]'/>
                <p className={`absolute bottom-5 w-full flex justify-center text-2xl md:text-content-coba font-bold ${event.id % 2 === 0 ? "text-white" : "text-secondary-coba"}`}>{event.number}</p>  
            </div>
            <div className='flex flex-col justify-center items-center px-[11px] md:px-0 space-y-[22px] md:min-w-[620px]'>
                <div className={`
                        ${event.id % 2 === 0 ? "bg-primary-coba text-default-coba" : "bg-third-coba text-secondary-coba"}
                        w-fit grid grid-flow-col gap-[14.9px] items-center mt-2 justify-center shadow-3d lg:mx-[53px] lg:px-[14px]
                    `}
                    style={event.id % 2 === 0 ? { backgroundColor: availableColors[style][4],  color: "white" } : { backgroundColor: availableColors[style][0], color: availableColors[style][3] } }    
                > 
                    <h3 className='inline-block w-full max-h-14 md:max-h-20 bg-transparent text-[40px] leading-[54px] md:text-tilte-coba rotate-[-7.04deg] font-birthstone'>
                        {event.title}
                    </h3> 
                    <h3 className='w-full bg-transparent text-2xl md:text-content-coba font-bold max-h-10'>
                        {formatDateTimeLocal(event.dateTime)}
                    </h3> 
                </div>
                {/* <Link to={`https://www.google.com/maps/search/${event.address.longitude},+${event.address.latitude}`} className={`bg-transparent text-center text-2xl md:text-content-coba font-bold ${event.id % 2 === 0 ? "text-secondary-coba" : "text-primary-coba"}`}>
                    {event.address.description}
                </Link> 
                <p className={`bg-transparent text-center text-2xl md:text-content-coba font-bold ${event.id % 2 === 0 ? "text-secondary-coba" : "text-primary-coba"}`}>
                    {event.address.description}
                </p> */}
                <a
                href={event.link}
                target="_blank"   // Mở tab mới
                rel="noopener noreferrer"  // Bảo mật khi mở tab mới
                className={`bg-transparent text-center text-2xl md:text-content-coba font-bold ${event.id % 2 === 0 ? "text-secondary-coba" : "text-primary-coba"}`}
            >
                {event.address.description}
            </a>

            </div>
        </div>  
    )
}

export default memo(EventElement)