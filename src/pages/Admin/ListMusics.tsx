import { useEffect, useState } from 'react';
import { fetchMusicLists } from '../../api/music'; // hoặc đường dẫn phù hợp
import { MusicData } from '../../types/music.interface';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api.config';

const ListMusics = () => {
  const [musicList, setMusicList] = useState<MusicData[]>([]);

  useEffect(() => {
    const getMusics = async () => {
      const data = await fetchMusicLists();
      if (data.length === 0) {
        toast.error('Không có bài nhạc nào.');
      }
      setMusicList(data);
    };

    getMusics();
  }, []);
  const handleDelete = async (id: number) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xóa bài nhạc này không?');
    if (!confirm) return;
  
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/deletemusic/${id}`);
  
      if (response.data.success) {
        toast.success('Xóa bài nhạc thành công');
        // Xóa khỏi danh sách đã render
        setMusicList(prev => prev.filter(m => m.id !== id));
      } else {
        toast.error(response.data.message || 'Xóa thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa');
      console.error(error);
    }
  };
  const titleTable = ['Id', 'Tên bài hát', 'Action'];

  return (
    <div className="w-full max-w-full max-h-screen mx-auto p-4">  
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 border-b">
            <tr>
              {titleTable.map((item, index) => (
                <th
                  key={index}
                  className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {musicList.map((music, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer border"
              >
                <td className="p-3 text-sm font-medium text-gray-900 truncate">
                  {music.id}
                </td>
                <td className="p-3 text-sm text-gray-500 truncate">
                  {music.name}
                </td>
               
                <td className="p-3 text-sm text-gray-500 truncate">
                  <button onClick={() => handleDelete(music.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                   Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListMusics;
