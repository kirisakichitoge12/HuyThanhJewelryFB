import React from 'react'
import Modal from './Modal'
import useConfirmModal from '../../hooks/modals/useConfirmModal'
import Button from '../common/Button';

const ConfirmModal: React.FC = () => {
    const { isOpen, onClose, content, onSubmit } = useConfirmModal();
    const handleDelete = () =>{
        onSubmit();
        onClose();
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size='max-w-lg'
        >
            <div className='text-center p-5 '>
                {
                    content || 
                    <>
                        <h3 className='text-xl'>Bạn chắc rằng muốn xóa thiệp cưới này?</h3>
                        <p className='my-5 text-gray-500'>Bằng cách xóa này, bạn sẽ mất tất cả dữ liệu và không thể hoàn tác hành động này</p>
                        <hr/>
                    </> 
                }
                <div className='flex justify-end items-center mt-4 gap-4'>
                    <Button onClick={onClose} color='none'>
                        Đóng
                    </Button>
                    <Button onClick={handleDelete} color='danger' style={{ padding: "8px 20px" }}>
                        Đồng ý
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal