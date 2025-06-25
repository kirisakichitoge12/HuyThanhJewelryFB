import React from 'react'
import { Link } from 'react-router-dom'
import ArrowRight from '../../assets/icons/arrow-right.svg';

interface LinkIconProps{
    icon?: string;
    children: string;
    to: string;
}

const LinkIcon: React.FC<LinkIconProps> = ({
    children,
    to,
    icon = ""
}) => {
    return (
        <Link to={to} className='text-primary flex gap-1 items-center font-bold text-[14px] leading-[16.98px]'>
            <p>{children}</p>
            <img src={icon || ArrowRight}/>
        </Link>
    )
}

export default LinkIcon