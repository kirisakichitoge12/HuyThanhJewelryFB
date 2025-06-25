import React, { useEffect, useState } from 'react';
import { 
    MdDashboard, 
    MdKeyboardArrowDown, 
    MdAccountCircle,
    MdGroup,
    MdAdd,
    MdHelpOutline,
    MdNotifications
} from 'react-icons/md';
import Logo from '../assets/images/logo.png'; 
import User from '../assets/images/photo1.jpeg'
import { Link, Outlet} from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; 
interface NavItemProps {
    icon: React.ReactNode;
    text: string;
    href: string;
    hasDropdown?: boolean;
    isDropdownOpen?: boolean;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, href }) => (
    <Link
        to={href}  
        className="w-full flex items-center py-2 px-4 hover:text-primary text-gray-700"
    >
        <span className="mr-3 ">{icon}</span>
        <span className="flex-1 text-left">{text}</span> 
    </Link>
);

const UserSideBar = () => {
    const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false); 
    const [isOpen, setIsOpen] = useState<boolean>(false); 
    // Handle click outside modal
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    }; 
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
            };

            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
            }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, setIsOpen]);
    return (
        <div className={`flex w-full h-screen overflow-hidden`}> 
            { isOpen && 
                <>
                    
                    <div className='block md:hidden w-full bg-black opacity-50 absolute h-full z-10 ' onClick={handleOverlayClick}>  </div>
                </>
            }
            <div
                className={`
                    fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col transform md:translate-x-0 md:relative md:h-screen transition-transform duration-300 ease-in-out z-40
                    ${ isOpen ? "translate-x-0" : "-translate-x-full"  }
                `}
            >
                {/* Logo */}
                <div className="p-4 border-b">
                    <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img 
                            src={Logo} 
                            alt="logo" 
                            className="h-10"
                        />
                        </Link>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto">
                    <div className="py-2">
                    <NavItem 
                        icon={<MdDashboard className="w-5 h-5 text-primary" />} 
                        text="Quản lý trang" 
                        href="/user/management/page"
                    />
                    <button 
                        className="w-full flex items-center py-2 px-4 hover:bg-gray-100 text-gray-700"
                        onClick={() => setIsAccountOpen(!isAccountOpen)}    
                    > 
                        <span className="mr-3"><MdAccountCircle className="w-5 h-5 text-primary" /></span>
                        <span className="flex-1 text-left hover:text-primary">Quản lý tài khoản</span> 
                        <MdKeyboardArrowDown 
                            className={`w-4 h-4 transition-transform ${isAccountOpen ? 'transform rotate-180' : ''}`}
                        /> 
                    </button>
                    {isAccountOpen && (
                        <div className="bg-gray-50 pl-6 py-1 ">
                            <NavItem 
                                icon={<MdGroup className="w-5 h-5" />} 
                                text="Thông tin cá nhân" 
                                href="/user/account"
                            />
                        </div>
                    )}
                    </div>
            </nav>

                {/* Create Page Button */}
                <div className="p-4">
                    <button 
                     onClick={() => {
                        window.location.href = 'https://template.hungthinhsecurity.com/guest/templates';
                    }}
                    className="w-full bg-primary text-white rounded py-2 px-4 flex items-center justify-center hover:bg-secondary transition-colors">
                    <MdAdd className="w-5 h-5 mr-2" />
                    Tạo trang
                    </button>
                </div>

                {/* Help Section */}
                <div className="border-t">
                    <NavItem 
                        icon={<MdHelpOutline className="w-5 h-5" />} 
                        text="Hướng dẫn" 
                        href=""
                    />
                </div>
            </div> 
            <div className="flex-1 overflow-auto h-screen">
                <div className="flex justify-between items-center p-4 sticky top-0 bg-white shadow-md ">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden top-4 left-4 p-2 rounded-full"
                    >
                        <FaBars className='text-primary'/>
                    </button>
                    <div className="md:hidden p-4">
                    <div className="md:hidden flex items-center">
                    <Link to="/" className="flex items-center">
                        <img 
                            src={Logo} 
                            alt="logo" 
                            className="h-10"
                        />
                        </Link>
                    </div>
                </div>
                    <div className="flex space-x-4">
                        <button className="relative">
                            <MdNotifications className="w-6 h-6 text-primary" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <img 
                            src={User} 
                            alt="User" 
                            className="w-8 h-8 rounded-full"
                            />
                        </div>
                    </div>
                    <button 
                         onClick={() => {
                            window.location.href = 'https://template.hungthinhsecurity.com/guest/templates';
                        }}
                        className="hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                    >
                        Tạo trang ngay!
                    </button>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default UserSideBar;