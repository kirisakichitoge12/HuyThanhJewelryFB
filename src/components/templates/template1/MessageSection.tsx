import React, { useEffect, useState } from 'react';
import FollowerIcon from '../../../assets/images/templates/template1/flower-large.svg';
import Icon from '../../../assets/images/templates/template1/weddingGiftEnvelope.svg'; 
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { FaLightbulb, FaPen, FaRegLightbulb, FaSave } from 'react-icons/fa';
import ButtonTemplate from './ButtonTemplate';
import toast from 'react-hot-toast';
import Each from '../../../layouts/Each';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api.config';

export interface MessageProps {
    id?: number; // Optional ID from backend
    name: string;
    content: string;
    reply?: string;
}

interface MessageSectionProps {  
    messages: MessageProps[];
    titleFont: string; 
    disabled?: boolean;
    user_id: number;
    theme_id: number;
    onSectionChange: (name: string, newValue: MessageProps[]) => void; 
}

const MessageSection: React.FC<MessageSectionProps> = ({ messages, titleFont, user_id, theme_id, onSectionChange }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showHint, setShowHint] = useState<boolean>(false);
    const [replyStates, setReplyStates] = useState<{ [key: string]: { isReplying: boolean; replyText: string } }>({});
    const [formData, setFormData] = useState<MessageProps>({
        name: "",
        content: "",
        reply: ""
    });

    const fetchMessages = async () => {
        try {
            const { data: messagesFromApi } = await axios.get(`${API_BASE_URL}/api/guest/messages`, {
                params: { user_id, theme_id }
            });

            const defaultMessage: MessageProps = {
                name: "Huy Thanh Jewelry",
                content: "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau <3"
            };

            const hasDefault = messagesFromApi.some(
                (msg: MessageProps) => msg.name === defaultMessage.name && msg.content === defaultMessage.content
            );

            const finalMessages = hasDefault
                ? messagesFromApi
                : [defaultMessage, ...messagesFromApi];

            onSectionChange("messages", finalMessages);
        } catch (error) {
            console.error("Lỗi khi tải lời chúc:", error);
            toast.error("Không thể tải lời chúc. Vui lòng thử lại.");
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [user_id, theme_id]);

    const handleAdd = async () => {
        if (!formData.name.trim() || !formData.content.trim()) {
            toast.error("Vui lòng điền tên và lời chúc.");
            return;
        }

        if (!user_id || !theme_id) {
            toast.error("Chỉ khách mời mới có thể gửi lời chúc.");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/guest/messages`, {
                ...formData,
                user_id,
                theme_id
            });
            toast.success("Gửi lời chúc thành công", {
                iconTheme: {
                    primary: 'rgb(237,131,131)',
                    secondary: '#ffffff',
                },
            });

            fetchMessages();
            setFormData({ name: "", content: "", reply: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Gửi lời chúc thất bại. Vui lòng thử lại.");
        }
    };

    const handleReply = async (message: MessageProps) => {
        const messageKey = message.id ?? `index-${messages.indexOf(message)}`;
        const replyText = replyStates[messageKey]?.replyText.trim();

        if (!replyText) {
            toast.error("Vui lòng nhập nội dung trả lời.");
            return;
        }

        if (!user_id || !theme_id) {
            toast.error("Chỉ khách mời mới có thể trả lời.");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/guest/messages`, {
                user_id,
                theme_id,
                name: message.name || "Admin",
                content: message.content,
                reply: replyText
            });

            toast.success("Gửi trả lời thành công", {
                iconTheme: {
                    primary: 'rgb(237,131,131)',
                    secondary: '#ffffff',
                },
            });

            const updatedMessages = messages.map(msg =>
                msg === message ? { ...msg, reply: replyText } : msg
            );
            onSectionChange("messages", updatedMessages);

            setReplyStates(prev => ({
                ...prev,
                [messageKey]: { isReplying: false, replyText: "" }
            }));
            fetchMessages();
        } catch (error) {
            console.error("Error sending reply:", error);
            toast.error("Đã có lỗi khi gửi trả lời.");
        }
    };

    const toggleReply = (message: MessageProps) => {
        const messageKey = message.id ?? `index-${messages.indexOf(message)}`;
        setReplyStates(prev => ({
            ...prev,
            [messageKey]: {
                isReplying: !prev[messageKey]?.isReplying,
                replyText: prev[messageKey]?.replyText || ""
            }
        }));
    };

    const handleReplyChange = (message: MessageProps, value: string) => {
        const messageKey = message.id ?? `index-${messages.indexOf(message)}`;
        setReplyStates(prev => ({
            ...prev,
            [messageKey]: {
                ...prev[messageKey],
                replyText: value
            }
        }));
    };

    const suggestions: string[] = [
        "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
        "Chúc mừng ngày trọng đại tới hai bạn. Hạnh phúc bền lâu và trơn vẹn nhé!",
        "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!",
        "Chúc hai bạn ngày vui hạnh phúc. Hãy yêu thương nhau thật nhiều và sống thật hạnh phúc nha!"
    ];

    const onEmojiClick = (emojiData: EmojiClickData) => { 
        setFormData(prev => ({
            ...prev,
            content: prev.content + emojiData.emoji
        }));       
    };

    const handleSuggestionClick = (e: React.MouseEvent<HTMLDivElement>, suggestion: string) => { 
        e.stopPropagation();
        setFormData(prev => ({ ...prev, content: suggestion }));
        setShowHint(false);
    }; 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section className='relative overflow-hidden bg-white' id='message-section'>
            <section className='py-[250px] flex justify-center items-center relative max-w-9xl mx-auto'>
                <img src={FollowerIcon} alt='Follower Icon' className='absolute left-0 top-10 z-0'/>
                <div className='relative z-20 md:min-w-[636px] shadow-lg px-[30px] md:px-[60px] py-10 border-[10px] md:border-[42px] border-white bg-white flex flex-col justify-center items-center'>
                    <h1 className='text-[42pt] font-marmelad text-[#ee8584]' style={{ fontFamily: titleFont }}>Sổ lưu bút</h1>
                    <img src={Icon} alt='Wedding Gift Envelope' className='mb-[70px]'/>
                    <input
                        onClick={(e) => e.stopPropagation()}
                        name='name' 
                        value={formData.name}
                        onChange={handleChange} 
                        placeholder='Tên của bạn *' 
                        className='bg-gray-50 border-[1px] border-gray-400 w-full py-[11px] px-5 mb-[50px]'

                    />
                    <div className='relative w-full mb-[50px]'>
                        <textarea
                            value={formData.content}
                            onClick={(e) => e.stopPropagation()} 
                            onChange={handleChange}
                            name='content'
                            placeholder='Nhập lời chúc của bạn *' 
                            className='w-full h-[140px] ps-4 pt-3 border-[1px] bg-gray-50 border-gray-400 resize-none'
                        
                        />
                        <div className='absolute bottom-2 right-2 space-x-3'>
                            <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => { 
                                event.stopPropagation();
                                setShowHint(prev => !prev);
                            }}>
                                {showHint ? <FaLightbulb size={20}/>: <FaRegLightbulb size={20}/> }
                            </button>
                            <button        
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setShowEmojiPicker(!showEmojiPicker)
                                }} 
                            >
                                <BsEmojiSmile size={20}/>
                            </button>
                        </div>
                        {showHint && (
                            <div className="absolute mb-2 w-full top-36 max-h-48 text-start border-2 shadow-lg overflow-y-auto bg-white z-10 space-y-2">
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        onClick={(e) => handleSuggestionClick(e, suggestion)}
                                        className="p-3 bg-white border-b-[1px] cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                        {showEmojiPicker && (
                            <div className="absolute mb-2 right-0 z-10">
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </div>
                        )}
                    </div>
                    <ButtonTemplate variant='secondary' borderColor='#ee8584' onClick={handleAdd}>
                        Gửi lời chúc
                    </ButtonTemplate> 
                    <div className='z-0 max-h-[250px] overflow-y-auto font-svn-sans text-base text-start flex flex-col gap-6 custom-scrollbar'>
                        <Each 
                            of={messages}
                            render={(message: MessageProps) => {
                                const messageKey = message.id ?? `index-${messages.indexOf(message)}`;
                                return (
                                    <div key={messageKey}>
                                        <hr className='border-[#ee8584] w-full mt-[50px]'/>
                                        <h3 className='font-bold'>{message.name}</h3>
                                        <p className='my-2 text-[#73777b] max-w-[432px]'>{message.content}</p>
                                        {message.reply && (
                                            <p className='text-gray-600 mt-2 italic'>Trả lời: {message.reply}</p>
                                        )}
                                        <div
                                            className='flex justify-start items-center gap-5 w-full mt-2'
                                            onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
                                        >
                                            <button
                                                onClick={() => toggleReply(message)}
                                                className='text-primary'
                                            >
                                                {replyStates[messageKey]?.isReplying
                                                    ? <FaSave onClick={(e) => {  
                                                        e.preventDefault();
                                                        handleReply(message);
                                                    }} size={25} />
                                                    : <FaPen size={20} />
                                                }
                                            </button>
                                            {replyStates[messageKey]?.isReplying && (
                                                <input
                                                    placeholder='Trả lời'
                                                    className='w-full ps-4 py-3 border-[1px] border-gray-300'
                                                    value={replyStates[messageKey]?.replyText || ''}
                                                    onChange={(e) => handleReplyChange(message, e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault();
                                                            handleReply(message);
                                                        }
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    </div>
                    <hr className='border-[#ee8584] w-full mt-4 mb-[50px] border-dashed'/> 
                    <div className='border-[1px] absolute w-[100%] h-[96%] border-[#ee8584] -z-10'></div>
                    <div className='border-[1px] absolute w-[96%] h-[100%] border-[#ee8584] -z-10'></div>
                </div>
                <img src={FollowerIcon} alt='Follower Icon' className='absolute right-0 rotate-180 bottom-10 z-10'/> 
            </section>
            <div className='bg-[#ee8584] w-[200%] h-[800px] absolute -left-40 -bottom-20 z-0 -rotate-6'> </div>
        </section>
    );
}

export default MessageSection;