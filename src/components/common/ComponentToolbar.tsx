import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineCopy, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface ComponentToolbarProps {
    title: string;
    isMoveUp?: boolean;
    isMoveDown?: boolean;
    onCopy?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
}


const ComponentToolbar: React.FC<ComponentToolbarProps> = ({ 
    title,
    isMoveUp,
    isMoveDown,
    onCopy, 
    onMoveUp, 
    onMoveDown, 
    onDelete,
    onEdit,
}) => {
    return (
        <div className="absolute top-10 right-5 z-50 bg-white text-center text-xs p-4 space-y-2 rounded-lg shadow-lg border-[1px] border-gray-100">
            <p className="font-bold">{title}</p>
            <div className="flex items-center justify-center text-center"> 
                {
                    onMoveUp && (
                        <button disabled={!isMoveUp} className={`${!isMoveUp ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} flex flex-col gap-2 justify-center items-center px-3 py-2 transition-all duration-300 rounded hover:bg-gray-200`} onClick={onMoveUp}>
                            <AiOutlineArrowUp size={15}/>
                            <p>Lên</p>
                        </button>
                    )
                }
                {
                    onMoveDown && (
                        <button disabled={!isMoveDown} className={`${!isMoveDown ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} flex flex-col gap-2 justify-center items-center px-3 py-2 transition-all duration-300 rounded hover:bg-gray-200`} onClick={onMoveDown}>
                            <AiOutlineArrowDown size={15}/>
                            <p>Xuống</p>
                        </button>
                    )
                }
                {
                    onCopy && (
                        <button className="flex flex-col gap-2 justify-center items-center px-3 py-2 transition-all duration-300 rounded hover:bg-gray-200" onClick={onCopy}>
                            <AiOutlineCopy size={15}/>
                            <p>Sao chép</p>
                        </button>
                    )
                }
                {
                    onEdit && (
                        <button className="flex flex-col gap-2 justify-center items-center px-3 py-2 transition-all duration-300 rounded hover:bg-gray-200" onClick={onEdit}>
                            <AiOutlineEdit size={15}/>
                            <p>Sửa</p>
                        </button>
                    )
                }
                {
                    onDelete && (
                        <button className="flex flex-col gap-2 justify-center items-center px-3 py-2 transition-all duration-300 rounded hover:bg-gray-200" onClick={onDelete}>
                            <AiOutlineDelete size={15}/>
                            <p>Xóa</p>
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default ComponentToolbar;