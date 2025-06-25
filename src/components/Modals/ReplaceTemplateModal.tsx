type ReplaceTemplateModalProps = {
    onClose: () => void;
  };
  
  const ReplaceTemplateModal = ({ onClose }: ReplaceTemplateModalProps) => {
    return (
      <div className="fixed inset-0 flex items-center z-[9999] justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
          <h3 className="text-xl text-center text-primary font-bold">Lưu ý!</h3>
          <p className="mt-4 text-gray-600">
            Khi đổi giao diện mới, bạn sẽ phải chỉnh sửa lại toàn bộ thông tin và ảnh.
            Giao diện cũ bạn chỉnh sửa trước đó sẽ được xoá bỏ khi bạn nhấn "Lưu trang" giao diện này.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              className="bg-primary text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Tiếp tục chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    );
  };


  export default ReplaceTemplateModal;