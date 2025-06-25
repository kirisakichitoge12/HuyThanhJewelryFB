import React from 'react';
import EditableField from '../../common/EditableField';
import IconSectionImage from '../../../assets/images/templates/template1/iconSectionWhite.svg';
import BannerImage from '../../../assets/images/templates/template1/banner.jpg';

interface StorySectionProps {
    id: string; 
    title: string;
    titleFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: string) => void;
} 
const StorySection: React.FC<StorySectionProps> = ({
    id,
    title,
    titleFont,
    disabled,
    onSectionChange
}) => {
    return (
        <section style={{ background: `url(${BannerImage})`, backgroundRepeat: "no-repeat", backgroundSize:"cover" }}  className='relative w-full bg-white py-[70px]' >
            <div className="absolute top-0 w-full h-0 border-r-[100vw] border-r-transparent border-l-0 border-t-[150px] border-t-white z-20"></div> 
            <div className='bg-[#ee8584] opacity-30 -z-0 w-full h-full absolute top-0'></div>
            <section className='max-w-9xl mx-auto flex flex-col justify-center items-center text-white font-marmelad pb-[35px] my-[70px]'> 
                <EditableField 
                    id={`storySection-${id}`}
                    name='title'
                    initialValue={title}
                    className='w-full text-[42pt] font-marmelad'
                    onChangeBlur={onSectionChange}
                    disabled={disabled}
                    styleThemes={{ fontFamily: titleFont}}
                />
                <img className='mb-[70px] z-10' src={IconSectionImage} alt='icon section image'/> 

            </section>
            <div className="absolute bottom-0 w-full h-0 border-r-[100vw] border-r-transparent border-l-0 border-b-[150px] border-b-white z-20"></div>  
        </section>
    )
}

export default StorySection