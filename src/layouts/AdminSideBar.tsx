import React, { useState } from "react"; 
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom"; 
import { listMenuAdmin } from "../config";
import { FaTimes } from "react-icons/fa";
import { BaseListMenu } from "../types";

const AdminSidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);  
    const currentPath = window.location.pathname; 

    return (
        <div className="flex w-full h-screen overflow-hidden  ">
            {/* Nút mở Sidebar trên điện thoại */}
            <div> 
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg"
                >
                    {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>

                {/* Sidebar */}
                <div
                    className={`
                        fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex flex-col transform md:translate-x-0 md:relative md:h-screen transition-transform duration-300 ease-in-out z-40
                        ${ isOpen ? "translate-x-0" : "-translate-x-full"  }
                    `}
                >
                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 bg-gray-900">
                        <h1 className="text-2xl font-bold">Admin Panel</h1>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1">
                        <ul className="space-y-2 p-4">
                            {listMenuAdmin.map((item: BaseListMenu, index: number) => (
                                <li key={index}>
                                    <Link   
                                        to={item.path}
                                        onClick={() => setIsOpen(false)} // Đóng Sidebar sau khi nhấn (trên điện thoại)
                                        className={`flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 ${
                                            currentPath === item.path ? 'bg-gray-700' : ''
                                        }`}
                                    >
                                        {item.icon && <item.icon />} 
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div>
                    <a
                        href={"/"}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 p-3 mb-10 mx-4 rounded-md hover:bg-gray-700  `}
                    >
                    <span className="text-lg"><FaSignOutAlt /></span>
                    <span>Log out</span>
                    </a>
                    </div>
                  
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminSidebar;
