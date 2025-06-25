import React, { useEffect, useState } from 'react';
import Each from '../../layouts/Each';
import { UserData } from '../../types/dataResponse/user.interface';
import { API_BASE_URL } from "../../config/api.config";
import axios, { AxiosResponse } from 'axios';

const UserManagement: React.FC = () => {
    const titleTable: string[] = ["Tên", "Email", "Trạng Thái", "Điện thoại", "Tạo ngày", "Thao tác"];
    const [userList, setUserList] = useState<UserData[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userRole, setUserRole] = useState<'user' | 'admin'>('admin');

    const getStatusText = (status: UserData['status']) => {
        switch (status) {
            case 'inactive':
                return 'Chưa kích hoạt';
            case 'active_paid':
                return 'Đã kích hoạt (Thanh toán)';
            case 'active_subscription':
                return 'Đã kích hoạt (Mã hóa đơn)';
            default:
                return '';
        }
    };

    const getStatusColor = (status: UserData['status']) => {
        switch (status) {
            case 'inactive':
                return 'bg-yellow-100 text-yellow-800';
            case 'active_paid':
                return 'bg-green-100 text-green-800';
            case 'active_subscription':
                return 'bg-blue-100 text-blue-800';
            default:
                return '';
        }
    };

    const fetchUserLists = async () => {
        try {
            const response: AxiosResponse = await axios.get(`${API_BASE_URL}/api/admin/getusers`);
            const result = response.data;
            if (!result.success || response.status !== 200) {
                throw new Error(result.message || "Không lấy được danh sách người dùng");
            }
            setUserList(result.users);
            console.log("User list:", result.users);
            return result.users;
        } catch (error: any) {
            console.error("Error fetching users:", error.message);
            return [];
        }
    };

    const updateUserRole = async (userId: string, role: 'user' | 'admin') => {
        try {
            const response: AxiosResponse = await axios.patch(`${API_BASE_URL}/api/admin/update-user-role/${userId}`, {
                isadmin: role === 'admin' ? 1 : null,
            });
            const result = response.data;
            if (!result.success || response.status !== 200) {
                throw new Error(result.message || "Cập nhật vai trò thất bại");
            }
            console.log("User role updated:", result);
            // Update the userList with the new isadmin value
            setUserList((prevList) =>
                prevList.map((user) =>
                    user.id === userId ? { ...user, isadmin: role === 'admin' ? 1 : null } : user
                )
            );
            alert("Cập nhật vai trò thành công!");
            return result;
        } catch (error: any) {
            console.error("Error updating user role:", error.message);
            alert("Cập nhật vai trò thất bại");
        }
    };

    useEffect(() => {
        fetchUserLists();
    }, []);

    const openModal = (user: UserData) => {
        setSelectedUser(user);
        setUserRole(user.isadmin =='1' ? 'admin' : 'user'); // Set initial role based on isadmin
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSave = () => {
        if (selectedUser) {
            updateUserRole(selectedUser.id, userRole);
            closeModal();
        }
    };

    return (
        <section className="container mx-auto p-4">
            <h1 className="flex-1 text-2xl font-bold text-gray-800 mt-5 mb-2">Quản lí người dùng</h1>
            <hr className='my-5' />
            <div className="w-full max-w-full max-h-screen mx-auto p-4">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full table-fixed">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <Each
                                    of={titleTable}
                                    render={(item: string) => (
                                        <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{item}</th>
                                    )}
                                />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {userList.map((user: UserData, index: number) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer border"
                                >
                                    <td className="p-3 text-sm font-medium text-gray-900 truncate">{user.name}</td>
                                    <td className="p-3 text-sm text-gray-500 truncate">{user.email}</td>
                                    <td className="p-3 text-sm text-gray-500 truncate">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.isFree === null ? 'inactive' : 'active_paid')}`}>
                                            {getStatusText(user.isFree === null ? 'inactive' : 'active_paid')}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-500">{user.phone}</td>
                                    <td className="p-3 text-sm text-gray-500">
                                        {user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : 'Chưa có'}
                                    </td>
                                    <td className="p-3 text-sm text-gray-500">
                                        <button
                                            onClick={() => openModal(user)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Chi tiết người dùng</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ngày cưới</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-md p-2 mt-1"
                                    defaultValue={selectedUser.weddingDate || ''}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phân quyền</label>
                                <select
                                    value={userRole}
                                    onChange={(e) => setUserRole(e.target.value as 'user' | 'admin')}
                                    className="w-full border rounded-md p-2 mt-1"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UserManagement;