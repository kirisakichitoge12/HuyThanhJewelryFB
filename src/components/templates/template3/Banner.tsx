import React from 'react'
import BannerImage from '../../../assets/images/templates/codien/bannerImage.jpg';
import BannerDeco1 from '../../../assets/images/templates/codien/bannerDeco1.png';
import BannerDeco2 from '../../../assets/images/templates/codien/bannerDeco2.png';
import BannerDeco3 from '../../../assets/images/templates/codien/hoatietcodien.png';
import { availableColorsCodien } from '../../../config';
import { API_BASE_URL } from '../../../config/api.config';
import { FaUpload } from 'react-icons/fa';
import EditableField from '../../common/EditableField';

export interface BannerProps{ 
    bride: string;
    groom: string;
    title: string;
    image?: File;
    date: string
}

interface BannerSectionProps extends BannerProps{
    id: string, 
    disabled?: boolean;
    titleFont?: string;
    contentFont?: string;
    style: number;
    onSectionChange:  (name: string, newValue: string | File ) => void;
}

const Banner: React.FC<BannerSectionProps> = ({id, disabled, style, onSectionChange, titleFont, contentFont, ...props}) => {
    const decos: string[] = [BannerDeco1, BannerDeco2, BannerDeco3];
    const [preview, setPreview] = React.useState<string | null>(null);
    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            console.log(event.target.files[0]);
            const file = event.target.files[0];
            setPreview(URL.createObjectURL(file));
            onSectionChange('image', file);
        }
    }
    return ( 
        <section 
            onClick={(e) => e.stopPropagation()} 
            className={`relative bg-white `}   
        >
            <div>
                {disabled ? null:<label htmlFor="file-input" className='absolute z-10 opacity-70 hover:opacity-100 transition-opacity duration-300 top-36 right-10 w-32s flex justify-center items-center rounded-lg h-11 cursor-pointer bg-white '>
                    <FaUpload />
                    Tải Ảnh
                </label>}
                <input type='file' id='file-input' className='hidden' onChange={handleUploadImage}/>
            </div> 
            <img src={preview ? preview : props.image ? `${API_BASE_URL}/${props.image}` : BannerImage} className='h-[647px] w-full object-cover' />
            <section className="max-w-9xl mx-auto " style={{ color: availableColorsCodien[style][0] }}> 
                <div className='max-w-[837px] mx-auto p-[56px] flex flex-col justify-center items-center space-y-6 bg-white -translate-y-30 md:-translate-y-36'>
                    <img src={decos[style]} className=' h-[50]  md:h-[90px] object-cover'/>
                    <EditableField 
                            initialValue={props.title} 
                        name='title'
                        className='text-base md:text-2xl font-beVietnamPro'
                            id={`banner-title-${id}`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            styleThemes={{ fontFamily: titleFont}}
                        />   
                    <div className='text-[40px] md:text-[48px] font-playfairDisplay flex gap-5 md:flex-row flex-col justify-center items-center h-40 md:h-24' >
                        <EditableField 
                            initialValue={props.groom} 
                            name='groom'
                            id={`banner-groom-${id}`} 
                            disabled={disabled}  
                            className='text-end'
                            onChangeBlur={onSectionChange} 
                            styleThemes={{ fontFamily: titleFont}}
                        />   
                        <p className='text-[80px] md:text-[128px] font-explora leading-5'>&</p>
                        <EditableField 
                            initialValue={props.bride} 
                            name='bride'
                            className='text-start'
                            id={`banner-bridge-${id}`} 
                            disabled={disabled}  
                            onChangeBlur={onSectionChange} 
                            styleThemes={{ fontFamily: titleFont}}
                        />    
                    </div>
                    <div className='w-[278px] md:w-[382px] h-[1px]' style={{ background: availableColorsCodien[style][1] }}></div>
                    <EditableField 
                        initialValue={props.date} 
                        name='date'
                        id={`banner-date-${id}`} 
                        disabled={disabled}  
                        onChangeBlur={onSectionChange} 
                        styleThemes={{ fontFamily: contentFont}}
                        className='uppercase text-2xl md:text-4xl'
                    />  
                </div>
            </section>
    </section>
    )
}

export default Banner