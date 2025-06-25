const ReplaceTemplateModalBack = ({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void }) => {
    return (
        <div className="fixed inset-0 flex items-center z-[9999] justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <h3 className="text-xl text-center text-primary font-bold">Bạn có muốn lưu lại giao diện này không?</h3>
                <p className="mt-4 text-gray-600">
                    Thao tác này sẽ xoá bỏ giao diện cũ bạn đã tạo và lưu lại giao diện này.
                </p>
                <div className="mt-6 flex justify-center gap-4 ">
                    <button
                        className="bg-primary text-white px-4 py-2 rounded flex-1"
                        onClick={onConfirm}
                    >
                        Có
                    </button>
                    <button
                        className="bg-primary text-white px-4 py-2 rounded flex-1"
                        onClick={onClose}
                    >
                        Không
                    </button>
                </div>

            </div>
        </div>
    );
};


export default ReplaceTemplateModalBack;