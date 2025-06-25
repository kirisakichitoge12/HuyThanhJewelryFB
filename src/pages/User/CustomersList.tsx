import React from "react";

interface GuestListProps {
  ListGuest: {
    message?: string;
    data: any[];
  };
}

const GuestList: React.FC<GuestListProps> = ({ ListGuest }) => {
  const guests = ListGuest?.data || [];
  console.log("ListGuestrrr", guests);

  return (
    <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 whitespace-nowrap text-primary">Tên</th>
            <th className="px-6 py-3 whitespace-nowrap text-primary">Số điện thoại</th>
            <th className="px-6 py-3 whitespace-nowrap text-primary">Lễ thành hôn</th>
            <th className="px-6 py-3 whitespace-nowrap text-primary">Lễ vu quy</th>
          </tr>
        </thead>
        <tbody>
          {guests.length > 0 ? (
            guests.map((guest, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 dark:odd:bg-gray-900 dark:even:bg-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {guest.name || "Không rõ"}
                </td>
                <td className="px-6 py-4">{guest.phone || "N/A"}</td>
                <td className="px-6 py-4">{guest.is_wedding==1 ? "Đã xác nhận tham dự": "Chưa xác nhận"}</td>
                <td className="px-6 py-4">{guest.is_ceremony==1 ? "Đã xác nhận tham dự": "Chưa xác nhận"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                Không có dữ liệu khách mời.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
