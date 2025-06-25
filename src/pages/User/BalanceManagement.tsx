import React, { useState } from 'react'; 
import WithdrawalForm from '../../components/WithdrawalForm';
import TransactionHistory from '../../components/TransactionHistory';
 

const BalanceManagement: React.FC = () => {
    const stats = {
        totalAvailable: 0,
        totalReceived: 0,
        totalWithdrawn: 0,
        pendingApproval: 0
    };
    const [activeTab, setActiveTab] = useState<'withdraw' | 'history' | 'transactions'>('withdraw');
    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Navigation Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`pb-2 px-4 ${activeTab === 'withdraw' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('withdraw')}
                >
                Rút tiền
                </button>
                <button
                className={`pb-2 px-4 ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('history')}
                >
                Lịch sử yêu cầu
                </button>
                <button
                className={`pb-2 px-4 ${activeTab === 'transactions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('transactions')}
                >
                Lịch sử giao dịch
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-6">
                {/* Statistics Card */}
                <div className="bg-white rounded-lg shadow p-4 h-fit">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Tổng tiền có thể yêu cầu rút</span>
                        <span className="text-blue-600 font-medium">{stats.totalAvailable}đ</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-t">
                        <span className="text-gray-600">Tổng tiền thực nhận từ trang</span>
                        <span className="text-blue-600 font-medium">{stats.totalReceived}đ</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-t">
                        <span className="text-gray-600">Tổng tiền đã rút</span>
                        <span className="text-pink-500 font-medium">{stats.totalWithdrawn}đ</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-t">
                        <span className="text-gray-600">Chờ duyệt</span>
                        <span className="text-pink-500 font-medium">{stats.pendingApproval}đ</span>
                        </div>
                    </div>
                </div>

                {/* Withdrawal Form */}
                { activeTab === "withdraw" && <WithdrawalForm/>}
                { activeTab === "transactions" && <TransactionHistory/> }
                { activeTab === "history" && <TransactionHistory/> }
            </div>
        </div>
    );
};

export default BalanceManagement;