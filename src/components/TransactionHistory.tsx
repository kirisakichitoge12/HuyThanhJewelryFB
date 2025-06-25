import React from 'react'; 
import { FaSearch } from 'react-icons/fa';

const TransactionHistory: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label htmlFor="startDate" className="text-sm">Ngày đầu</label>
          <input
            type="date"
            id="startDate"
            className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="endDate" className="text-sm">Ngày cuối</label>
          <input
            type="date"
            id="endDate"
            className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Trạng thái</option>
          <option>Hoàn thành</option>
          <option>Đang xử lý</option>
          <option>Đã hủy</option>
        </select>
        
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm yêu cầu"
            className="w-full border rounded px-3 py-1.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">SỐ TIỀN (VND)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">THỜI GIAN</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">MÃ GIAO DỊCH</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">GHI CHÚ</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">TRẠNG THÁI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-end gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Số lượng:</span>
          <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 border rounded hover:bg-gray-50">&lt;</button>
          <span className="text-sm">1</span>
          <button className="px-2 py-1 border rounded hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;