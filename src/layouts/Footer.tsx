import React from 'react'; 
import Logo from '../assets/images/logo.png';
import Certification from '../assets/images/certification.png';  
import LocationIcon from '../assets/icons/location.svg';
import PhoneIcon from '../assets/icons/envelope.svg';
import EnvelopeIcon from '../assets/icons/envelope.svg';
import ZaloIcon from '../assets/icons/Zalo.svg';
import FacebookIcon from '../assets/icons/Facebook.svg';
import TikTokIcon from '../assets/icons/TikTok.svg';
import YoutubeIcon from '../assets/icons/Youtube.svg';
import InstagramIcon from '../assets/icons/Instagram.svg';
import { Link } from 'react-router-dom';


const Footer:React.FC = () => {
    return (
        <footer className="max-w-9xl mx-auto bg-white py-16 px-[15px] md:px-[85px] border-t"> 
            <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr] md:gap-20 lg:gap-32">
            {/* Left Section */}
            <div> 
                <img  src={Logo}  alt="Huy Thanh"  className="h-[70px] w-auto text-red-500" />  
                <div className="text-sm  mt-6">
                    <p className='text-heading font-bold'>CÔNG TY TNHH VÀNG BẠC ĐÁ QUÝ HUY THÀNH</p>
                    <p className="mt-2 text-sub-heading">Giấy chứng nhận đăng ký doanh nghiệp: 0101892596 do Sở Kế hoạch & Đầu tư TP. Hà Nội cấp lần đầu ngày 02/03/2006.</p>
                </div>

                <div className="flex items-center space-x-6 mt-8">
                    <Link to="#" className="text-gray-600 hover:text-gray-800">
                        <img src={ZaloIcon} alt='zalo' loading='lazy' className='w-8 h-8'/>
                    </Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800">   
                        <img src={FacebookIcon} alt='facebook' loading='lazy' className='w-8 h-8'/>
                    </Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800">
                        <img src={TikTokIcon} alt='tiktok' loading='lazy' className='w-8 h-8'/>
                    </Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800">
                        <img src={YoutubeIcon} alt='youtube' loading='lazy' className='w-8 h-8'/> 
                    </Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800">
                        <img src={InstagramIcon} alt='instagram' loading='lazy' className='w-8 h-8'/> 
                    </Link>
                </div>
            </div>

            {/* Right Section */}
            <div className='flex flex-col-reverse lg:flex-row justify-center items-start mt-8 lg:mt-16'>
                <div className="flex-1 space-y-6 my-8 lg:my-0 h-full">
                    <div className="space-y-[24px] font-bold">
                        <Link to="#" className="block text-heading hover:text-primary">Mẫu thiệp</Link>
                        {/* <Link to="#" className="block text-heading hover:text-primary">Biểu phí</Link>
                        <Link to="#" className="block text-heading hover:text-primary">Tin tức</Link> */}
                        {/* <Link to="#" className="block text-heading hover:text-primary">Điều khoản và chính sách</Link> */}
                    </div> 
                </div>
                <div className= "flex-1 space-y-6">
                        <h3 className="font-bold text-gray-900">Liên hệ</h3> 
                        <div className='space-y-4'>
                            <div className="flex items-start text-gray-600"> 
                                <img src={LocationIcon} className='mr-2 w-5 h-5 text-primary' loading='lazy'/> 
                                <span>Số 23/100 (số cũ 56 30A, ngõ 8), phố Đỗ Cẩn, Phường Đội Cấn, Quận Ba Đình, Thành phố Hà Nội, Việt Nam.</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <img src={PhoneIcon} className='mr-2 w-5 h-5 text-primary' loading='lazy'/> 
                                <span>0437220777 - Fax: 0437338656</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <img src={EnvelopeIcon} className='mr-2 w-5 h-5 text-primary' loading='lazy'/> 
                                <span>Email: cskh@ht.vn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 md:mt-12 pt-4 border-t text-sm text-gray-500 text-center">
                <div className="flex items-center gap-4">
                    <img 
                        src={Certification}
                        alt="Đã thông báo Bộ Công Thương" 
                        className="w-[147px] h-[57px]"
                        loading='lazy' 
                    />
                    ©2024 Huy Thanh. All rights reserved
                </div>
            </div> 
        </footer>
    );
};

export default Footer;