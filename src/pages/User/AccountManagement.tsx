import { useContext, useEffect, useState } from 'react';
import { FaUser, FaBell } from 'react-icons/fa';
import Information from '../../components/Information';
import PasswordChange from '../../components/PasswordChange';
import NotificationSettings from '../../components/Nofication';
import { BaseListMenu } from '../../types';
import Each from '../../layouts/Each';
import { UserContext } from '../../context/UserContext';

const AccountManagement = () => {
    const [name,setName]=useState<string>('');
    const tabData: BaseListMenu[] = [
        { name: "Thông tin cá nhân", icon:  FaUser, path: 'information' },
        { name: "Thông báo", icon:  FaBell, path: 'notification' },
    ]
    const context =useContext(UserContext);
    
    if (!context) {
        throw new Error("Profile must be used within a UserProvider");
    }
    
    const { user } = context;
    useEffect(() => {
        // Logic được thực thi khi `user` thay đổi
        console.log("User đã thay đổi:", user);
      }, [user]); // Theo dõi sự thay đổi của `user`
    const [activeTab, setActiveTab] = useState<string>('information');
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Header Navigation */}
            <div className="flex font-mobile justify-end gap-6 mb-8">
                <Each 
                    of={tabData}
                    render={(item: BaseListMenu) => 
                        <button onClick={() => setActiveTab(item.path)} className={`flex items-center gap-2 ${activeTab === item.path ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}>
                            { item.icon &&  <item.icon size={18} />} 
                            <span>{item.name}</span>
                        </button>
                    }
                /> 
            </div>
            {/* Left Profile Section */}
            <div className="grid lg:grid-cols-[1fr,2fr] gap-6">
                <div className="bg-white rounded-lg  border border-primary p-6 h-fit">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4">
                            <FaUser size={48} className="text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">{ user ? name || user.name :''}</h3>
                    </div>

                    <div className="space-y-4 h-fit">
                        <div className=''>
                            <h4 className="font-medium text-primary">Thông tin cơ bản</h4> 
                            <div className="flex justify-start items-center text-sm my-2 text-gray-600">
                                <p>Họ và tên:</p>
                                <p className="text-gray-800">{user ? name || user.name :""}</p>
                            </div>
                            <div className="flex justify-start items-center text-sm my-2 text-gray-600">
                                <p>Email:</p>
                                <p className="text-gray-800">{user ? user.email :''}</p>
                            </div>
                            <div className="flex justify-start items-center text-sm my-2 text-gray-600">
                                <p>Số điện thoại:</p>
                                <p className="text-gray-800">{user ? user.phone :''}</p>
                            </div>
                            <div className="flex justify-start items-center text-sm my-2 text-gray-600">
                                <p className=" text-gray-600">Trạng thái tài khoản:</p>
                                <p className="inline-block px-2 py-1 bg-gray-100 rounded text-sm">Chưa xác thực</p> 
                            </div>
                          
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                {activeTab === "information" && <Information setName={setName}/> }
                {activeTab !== "notification" && (
                    <div className="md:opacity-0 hidden-mobile">
                        <NotificationSettings />
                    </div>
                    )}
                { activeTab === "information" && <PasswordChange/> }
                { activeTab === "notification" && <NotificationSettings/> }
            </div>
        </div>
    );
};

export default AccountManagement;