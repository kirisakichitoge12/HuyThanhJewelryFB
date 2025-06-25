import React, { useContext, useState } from 'react'; 
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Footer from './Footer';  
import Each from './Each';
import { listMenuUser } from '../config';
import { BaseListMenu } from '../types';
import Logo from '../assets/images/logo.png'; 
import MenuIcon from '../assets/icons/menu.svg';
import CloseIcon from '../assets/icons/times.svg';
import LogInIcon from '../assets/icons/log-in.svg';
import { UserContext } from '../context/UserContext';
import { MdAccountCircle,MdKeyboardArrowDown } from 'react-icons/md';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("Profile must be used within a UserProvider");
    }
    
    const { user } = context;
    const handleLogout = () => {
        localStorage.removeItem('user');  // Xóa thêm dữ liệu khác nếu cần
        toast.success("Đăng xuất thành công"
          ,{
            iconTheme: {
              primary: 'rgb(237,131,131)', // Màu của icon
              secondary: '#ffffff', // Màu nền của icon
            },
          }
        );
        setTimeout(() => {
            window.location.href = '/';
          }, 1000); // 2000ms = 2 giây
      };
    const [isOpen, setIsOpen] = useState(false);  
    const isActivePath = (path: string): string => {
        return location.pathname === path ? "text-primary" : "";
    }; 
    return (
        <div className='relative'>
            <nav className="sticky top-0 left-0 right-0 z-50 bg-white text-black py-[21px] px-4 md:px-[84px] w-full shadow-sm"> 
                <nav className='flex items-center justify-between max-w-9xl mx-auto full:px-default'>
                    <img className='h-[54px]' src={Logo} onClick={() => navigate('/')}/> 
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden top-8 right-4 z-50 bg-transparent text-primary p-2"
                    >
                        {isOpen ? <img src={CloseIcon} alt='close icon' /> : <img src={MenuIcon} alt='menu icon' />}
                    </button>
                    <div  style={{ columnGap: '56px' }} className="hidden md:flex items-center font-normal">
                        <Each 
                            of={listMenuUser}
                            render={(item: BaseListMenu) => 
                                <Link to={item.path} className={`${isActivePath(item.path)} text-lg hover:text-primary`}>
                                    {item.name}
                                </Link>
                            }
                        />
                        
                               {
                                user 
                                    ?                        
                                    <div className="relative">       
                                    <div
                                      className="flex items-center space-x-4 cursor-pointer"
                                      onClick={toggleMenu}
                                    >
                                     
                                      <p className="text-primary font-bold">{user.name}</p>
                                      <span className="flex items-center">
                                        <MdAccountCircle className="w-8 h-8 text-primary" />
                                      </span>
                                    </div>
                              
                                    {/* Dropdown Menu */}
                                    {isMenuOpen && (
                                     <div className="absolute mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md -left-2">
                                     <ul className="py-2">
                                       <li className="px-4 py-2 hover:text-primary cursor-pointer">
                                         <Link to="/user/account" className="block">
                                           {user.name}
                                         </Link>
                                       </li>
                                       <hr />
                                       <li className="px-4 py-2 hover:text-primary cursor-pointer">
                                         <Link to="/user/account" className="block">
                                           Trang quản trị
                                         </Link>
                                       </li>
                                       <li   onClick={handleLogout} className="px-4 py-2 hover:text-primary cursor-pointer">                                       
                                           Đăng xuất
                                       </li>
                                     </ul>
                                   </div>                                   
                                    )}
                                  </div>
                                  
    
                                    : <Link to={"/authentication"} className='flex items-center gap-1 text-primary font-bold'>
                                        Đăng nhập
                                        <img src={LogInIcon} alt='log in icon'/>
                                    </Link> 
                            }     
                    </div>  
                </nav>
            </nav> 
            <div
                className={`
                    md:hidden flex fixed h-full w-full pt-12 pl-8 text-lg space-y-10 left-0  bg-pink-default text-black flex-col transform md:translate-x-0 md:relative md:h-screen transition-transform duration-300 ease-in-out z-40
                    ${ isOpen ? "translate-x-0" : "-translate-x-full"  }
                `}
            >
                <Each 
                    of={listMenuUser}
                    render={(item: BaseListMenu) => 
                        <Link to={item.path} className={`${isActivePath(item.path)} text-base hover:opacity-80`}>
                            {item.name}
                        </Link>
                    }
                /> 
                {
                user
                ?
                <div className="relative">
                {/* Button to toggle dropdown */}
                <button
                  className="w-full flex items-center  hover:text-primary text-gray-700"
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                >
                  <span className="flex-1 text-left text-primary hover:text-secondary font-bold">
                    {user.name}
                  </span>
                  <MdKeyboardArrowDown
                    className={`w-5 h-5 m-2 transition-transform text-primary ${
                      isAccountOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
          
                {/* Dropdown Menu */}
                {isAccountOpen && (
                  <div className="absolute mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md -left-2">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:text-primary cursor-pointer">
                      <Link to="/user/account" className="block">
                        {user.name}
                      </Link>
                    </li>
                    <hr />
                    <li className="px-4 py-2 hover:text-primary cursor-pointer">
                      <Link to="/user/account" className="block">
                        Trang quản trị
                      </Link>
                    </li>
                    <li   onClick={handleLogout} className="px-4 py-2 hover:text-primary cursor-pointer">                                       
                        Đăng xuất
                    </li>
                  </ul>
                </div>
                )}
              </div>
              :
              <Link to={"/authentication"} className='flex items-center gap-1 text-primary font-bold'>
              Đăng nhập
              <img src={LogInIcon} alt='log in icon'/>
              </Link> 
                }
              
            </div>  
            <Outlet /> 
            <Footer/>
        </div>
    );
};


export default Navbar;