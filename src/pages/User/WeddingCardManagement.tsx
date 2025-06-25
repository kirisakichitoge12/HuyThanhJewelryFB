import React, { useState } from 'react';
import { CiBoxList, CiGrid41 } from 'react-icons/ci';
import {  FaRegClone, FaRegEdit, FaRegEye,FaRegTrashAlt, FaRegShareSquare   } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

interface WeddingCard {
    id: string;
    title: string;
    isActive: boolean;
    createdAt: string;
}

const WeddingCardManagement: React.FC = () => {
    const cards: WeddingCard[] = [
        {
            id: '1',
            title: 'Thiệp cưới của Nguyễn Văn A & Nguyễn Thị B',
            isActive: true,
            createdAt: '2024-01-15'
        },
        {
            id: '2',
            title: 'Thiệp cưới của Trần Văn C & Lê Thị D',
            isActive: false,
            createdAt: '2024-02-20'
        }
    ];
    
    const [isGridView, setIsGridView] = useState(true); 
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleViewDetails = (id: string) => {
        navigate(`/user/wedding-card/detail/${id}`);
        console.log(`Redirecting to details page for card ${id}`);
    };

    const handleEdit = (id: string) => {
        console.log(`Redirecting to edit page for card ${id}`);
    };

    const handleShare = (id: string) => {
        const card = cards.find(c => c.id === id);
        if (card?.isActive) {
            console.log(`Sharing card ${id}`);
        } else {
            alert('Không thể chia sẻ thiệp chưa kích hoạt');
        }
    };

    const handleDuplicate = (id: string) => {
        console.log(`Duplicating and redirecting to edit page for card ${id}`);
    };

    const handleDelete = (id: string) => {
        setSelectedCardId(id); 
    };
    console.log(selectedCardId);

    return (
        <div className="w-full max-w-4xl h-screen mx-auto p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý thiệp cưới</h1>
                <button 
                    onClick={() => setIsGridView(!isGridView)}
                    className="p-2 rounded-lg border text-xl border-gray-400 hover:bg-gray-50"
                >
                {isGridView ? <CiBoxList /> : <CiGrid41 />}
                </button>
            </div>

            <div className={`grid ${isGridView ? 'grid-cols-1 md:grid-cols-2 gap-4' : 'grid-cols-1 gap-2'}`}>
                {cards.map((card) => (
                    <div key={card.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className={`p-4 ${isGridView ? 'space-y-4' : 'flex justify-between items-center'}`}>
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{card.title}</h3>
                            <p className="text-sm text-gray-500">Ngày tạo: {card.createdAt}</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 
                            ${card.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {card.isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                            </span>
                        </div>

                        <div className={`flex ${isGridView ? 'justify-start' : 'justify-end'} gap-2`}>
                            <button
                                onClick={() => handleViewDetails(card.id)}
                                className="p-2 rounded-lg hover:bg-gray-100"
                                title="Chi tiết"
                            >
                                <FaRegEye />
                            </button>
                            <button
                            onClick={() => handleEdit(card.id)}
                            className="p-2 rounded-lg hover:bg-gray-100"
                            title="Chỉnh sửa"
                            >
                                <FaRegEdit />
                            </button>
                            <button
                                onClick={() => handleShare(card.id)}
                                className={`p-2 rounded-lg ${card.isActive ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
                                disabled={!card.isActive}
                                title="Chia sẻ"
                            >
                                <FaRegShareSquare  />
                            </button>
                            <button
                                onClick={() => handleDuplicate(card.id)}
                                className="p-2 rounded-lg hover:bg-gray-100"
                                title="Nhân bản"
                            >
                                <FaRegClone  />
                            </button>
                            <button
                                onClick={() => handleDelete(card.id)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                                title="Xóa"
                            >
                                <FaRegTrashAlt  />
                            </button>
                        </div>
                        </div>
                    </div>
                ))}
            </div> 
        </div>
    );
};

export default WeddingCardManagement;