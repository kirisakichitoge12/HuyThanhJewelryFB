import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../../components/common/Button';
import FormField from '../../components/common/FormField';

interface Guest {
    name: string;
    phone: string;
    isAttending: boolean;
    numberOfGuests: number;
}

const WeddingCardDetail: React.FC = () => {
    const [showSharePopup, setShowSharePopup] = useState(false);
    const guests: Guest[] =  [
        { name: 'Nguyễn Văn A', phone: '0123456789', isAttending: true, numberOfGuests: 2 },
        { name: 'Trần Thị B', phone: '0987654321', isAttending: false, numberOfGuests: 1 },
        { name: 'Lê Văn C', phone: '0112233445', isAttending: true, numberOfGuests: 3 },
        { name: 'Nguyễn Văn aaaaaaA', phone: '0123456789', isAttending: true, numberOfGuests: 2 },
        { name: 'Trần Thị B', phone: '0987654321', isAttending: false, numberOfGuests: 1 },
        { name: 'Lê Văn C', phone: '0112233445', isAttending: true, numberOfGuests: 3 },
        { name: 'Nguyễn Văn A', phone: '0123456789', isAttending: true, numberOfGuests: 2 },
        { name: 'Trần Thị B', phone: '0987654321', isAttending: false, numberOfGuests: 1 },
        { name: 'Lê Văn C', phone: '0112233445', isAttending: true, numberOfGuests: 3 },
        // ... thêm nhiều khách mời khác nếu cần ...
    ];
    const [searchTerm, setSearchTerm] = useState('');

    // Mock statistics data
    const statistics = {
        totalInvited: 100,
        totalConfirmed: 75,
        totalAttending: 120
    };

    // Xử lý xuất file Excel
    const handleExportExcel = () => {
        window.open('https://pmt.sc/wLcspetQ8SHg', '_blank');
    };

    // Xử lý chia sẻ sự kiện
    const handleShareEvent = () => {
        setShowSharePopup(true);
    };

    return (
        <div className="w-full max-w-4xl  mx-auto p-1 lg:p-4 space-y-6">
        {/* Tổng quan */}
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Tổng quan thiệp mời</h2>
            
            {/* Biểu đồ thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Tổng số khách mời</p>
                <p className="text-2xl font-bold text-blue-600">{statistics.totalInvited}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Đã xác nhận</p>
                <p className="text-2xl font-bold text-green-600">{statistics.totalConfirmed}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Tổng số người tham dự</p>
                <p className="text-2xl font-bold text-purple-600">{statistics.totalAttending}</p>
            </div>
            </div>

            {/* Button chia sẻ sự kiện */}
            <button
                onClick={handleShareEvent}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
            Chia sẻ sự kiện
            </button>
        </div>

        {/* Khách mời */}
        <div className="bg-white rounded-lg shadow p-1 lg:p-6  min-h-[600px]">
            <h2 className="text-xl font-bold mb-4">Khách mời</h2>

            {/* Search input */}
            <div className="mb-4">
            <input
                type="text"
                placeholder="Tìm kiếm khách mời..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>

            {/* Danh sách khách mời */}
            <div className="overflow-auto h-[440px]">
                <table className="w-full min-w-full divide-y divide-gray-200 text-sm lg:text-base">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-2 lg:px-6 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Tên </th>
                            <th className="p-2 lg:px-6 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Số điện thoại </th>
                            <th className="p-2 lg:px-6 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Sự kiện tham dự </th>
                            <th className="p-2 lg:px-6 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Khách mời </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {guests.map((guest, index) => (
                            <tr key={index}>
                                <td className=" p-2 lg:px-6 lg:py-4 whitespace-nowrap">{guest.name}</td>
                                <td className=" p-2 lg:px-6 lg:py-4 whitespace-nowrap">{guest.phone}</td>
                                <td className=" p-2 lg:px-6 lg:py-4 whitespace-nowrap">
                                    {guest.isAttending ? 'Có' : 'Không'} tham dự
                                </td>
                                <td className=" p-2 lg:px-6 lg:py-4 whitespace-nowrap">{guest.numberOfGuests}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Export button */}
            <Button onClick={handleExportExcel} color='success'>
                Xuất danh sách 
            </Button> 
        </div>

        {/* Share Event Popup */}
        {showSharePopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 className="text-lg font-bold mb-4">Chia sẻ sự kiện</h3>
                    <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Link chia sẻ:</p>
                        <FormField 
                            value="https://pmt.sc/pBeX57qQWG77"
                            disabled
                        /> 
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button onClick={() => setShowSharePopup(false)} color='none'> Đóng </Button>
                        <Button  
                            onClick={() => {
                                navigator.clipboard.writeText("https://pmt.sc/pBeX57qQWG77");
                                toast("Đã sao chép link!", { icon: "🔗" });
                            }} 
                        >
                            Sao chép link
                        </Button>
                    </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};

export default WeddingCardDetail;