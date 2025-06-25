import React from 'react';
import DiamondIcon from '../assets/icons/Diamond.svg';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api.config';

interface CardTemplateProps{
    id: number;
    name: string;
    isFree?: boolean;
    image: string;
}

const CardTemplate: React.FC<CardTemplateProps> = ({
    id,
    name,
    isFree,
    image
}) => {
    const templateMap: Record<number, string> = {
        1: "coba",
        2: "template1",
        3: "sangtrong",
        4: "codien",
        5: "tinhyeu",
        6: "nhenhang",
        7: "hoathoa",
      };
      
      const templateURL = templateMap[id] || "coba";
      
    return (
        <div className='group sm:mx-4 sm:mb-4'>
        <div className='hover:scale-105 hover:z-20 hover:shadow-lg transition-all duration-500 ease-in-out'>
            <div className='flex justify-center mb-4 overflow-hidden rounded-lg'>
                <div className='relative w-[360px] h-[500px] sm:w-[300px] sm:h-[400px] overflow-hidden bg-white'>
                    <div className="absolute top-3 right-3 bg-primary bg-opacity-70 rounded-full p-2 flex items-center justify-center z-10">
                        <img src={DiamondIcon} alt='diamond Icon' className='w-6 h-6'/> 
                    </div>
                    <div className='absolute inset-0 overflow-y-auto scrollbar-hide'>
                        <img 
                           src={`${API_BASE_URL}/${image}`}
                            alt="Template" 
                            className='w-full h-auto object-cover'
                            style={{
                                objectPosition: 'center top',
                                minHeight: '100%'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-center items-center mx-auto max-w-[360px] sm:max-w-[300px] mt-4'>
            <Link to={`/theme/${templateURL}`} className='text-black text-lg font-bold hover:text-secondary cursor-pointer'>{name}</Link>
        </div>
    </div>
    
)
}

export default CardTemplate