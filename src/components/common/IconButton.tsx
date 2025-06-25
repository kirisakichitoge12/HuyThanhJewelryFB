import React from 'react'

interface IconButtonProps{
    icon: string;
    onClick?: () =>  void;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onClick
}) => {
    return (
        <button onClick={onClick} className='p-[10px] border-2 border-primary rounded-full max-w-11 max-h-11'>
            <img src={icon} className='w-6 h-6'/>
        </button>
    )
}
