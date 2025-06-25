import React, { useState, useEffect } from 'react';  
import Each from '../../../layouts/Each';
import { availableColorsTemplate2 } from '../../../config';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'; 
import { FaLightbulb, FaPen, FaRegLightbulb, FaSave } from 'react-icons/fa';
import { BsEmojiSmile } from 'react-icons/bs';
import toast from 'react-hot-toast';
import DecoLeft1 from '../../../assets/images/templates/sangtrong/decor.png';
import DecoLeft2 from '../../../assets/images/templates/sangtrong/34.png';
import DecoLeft3 from '../../../assets/images/templates/sangtrong/11.png';
import DecoRight1 from '../../../assets/images/templates/sangtrong/watercolor-boho-card-with-hand-painted-tropical-orchid-flowers-dried-palm-leaves-branches-pampas-flowers-illustration 2.png';
import DecoRight2 from '../../../assets/images/templates/sangtrong/35.png';
import DecoRight3 from '../../../assets/images/templates/sangtrong/12.png';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api.config';

export interface MessageProps {
    id?: number; // Optional ID from backend
    name: string;
    content: string;
    reply?: string;
}

interface MessageSectionProps { 
    style: number;
    messages: MessageProps[];
    titleFont: string;
    disabled?: boolean;
    user_id: number;
    theme_id: number;
    onSectionChange: (name: string, newValue: MessageProps[]) => void; 
}

const MessageSection: React.FC<MessageSectionProps> = ({  
    style, 
    titleFont, 
    messages, 
    user_id,
    theme_id,
 
    onSectionChange 
}) => {  
    const decoLefts: string[] = [DecoLeft1, DecoLeft2, DecoLeft3];
    const decoRights: string[] = [DecoRight1, DecoRight2, DecoRight3];
    const [formData, setFormData] = useState<MessageProps>({
        name: "",
        content: "",
        reply: ""
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showHint, setShowHint] = useState<boolean>(false);
    const [replyStates, setReplyStates] = useState<{ [key: string]: { isReplying: boolean; replyText: string } }>({});

    const onEmojiClick = (emojiData: EmojiClickData) => { 
        setFormData(prev => ({
            ...prev,
            content: prev.content + emojiData.emoji
        }));       
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchMessages = async () => {
         if(user_id && theme_id) {
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
   if(user_id && theme_id) {
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
       if(user_id && theme_id) {
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

    const handleSuggestionClick = (e: React.MouseEvent<HTMLDivElement>, suggestion: string) => {
        e.stopPropagation();
        setFormData(prev => ({ ...prev, content: suggestion }));
        setShowHint(false);
    };

    const suggestions: string[] = [
        "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
        "Chúc mừng ngày trọng đại tới hai bạn. Hạnh phúc bền lâu và trơn vẹn nhé!",
        "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!",
        "Chúc hai bạn ngày vui hạnh phúc. Hãy yêu thương nhau thật nhiều và sống thật hạnh phúc nha!"
    ];

    return (
        <section id="sangtrong-message-id" className={`relative bg-white`}>
            <img src={decoLefts[style]} className='absolute top-0 left-0 md:w-[429px] md:h-[363px] w-[179px] h-[151px]'/>
            <img src={decoRights[style]} className='absolute bottom-0 right-0 md:w-[429px] md:mb-18 md:h-[363px] w-[179px] h-[151px]'/> 
            <section className='z-10 relative max-w-[1443px] mx-auto font-phudu overflow-hidden flex flex-col justify-center items-center pt-[56px] pl-[18px] pr-[24px] lg:pt-[164px] lg:pl-[304px] lg:pr-[302px]'>
                <div className='relative max-w-[837px] max-h-[1059px] w-full md:min-w-[335px] min-h-[912px]'>  
                    <div className='md:px-[40px] md:pb-[127px] full:pl-[108px] full:pr-[109px] grid text-center items-center w-full h-full'> 
                        <h1 
                            style={{ color: availableColorsTemplate2[style][0], fontFamily: titleFont }}
                            className={`text-center text-[56px] md:text-[72px] md:leading-[90px] font-pinyonScript`}
                        >
                            Sổ lưu bút
                        </h1>
                        <div className='font-svn-sans z-10 mt-[55px] space-y-6'>
                            <input 
                                name="name"
                           
                                value={formData.name}
                                onChange={handleChange}     
                                placeholder='Tên của bạn *'
                                onClick={(event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation()}
                                className='w-full h-12 ps-4 border-[1px] border-dark-300' 
                            />
                            <div className='relative'>
                                <textarea 
                                    name="content"
                                  
                                    value={formData.content}
                                    onChange={handleChange} 
                                    placeholder='Nhập lời chúc của bạn*' 
                                    onClick={(event: React.MouseEvent<HTMLTextAreaElement>) => event.stopPropagation()}
                                    className='w-full h-[140px] ps-4 pt-3 border-[1px] border-dark-300 resize-none'
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
                                                onClick={(event: React.MouseEvent<HTMLDivElement>) => handleSuggestionClick(event, suggestion)}
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
                            <div className="flex justify-center">
                                <button 
                                    onClick={handleAdd} 
                                    className='rounded-full text-white font-prata text-lg min-w-[250px] p-6' 
                                    style={{ backgroundColor: availableColorsTemplate2[style][0] }}
                                >
                                    Gửi lời chúc
                                </button>
                            </div>  
                        </div>
                        <div className='z-0 mt-10 mb-8 w-full h-[2px] bg-dark-300'></div>
                        <div className='z-0 max-h-[360px] overflow-y-auto font-svn-sans text-base text-start flex flex-col gap-6 custom-scrollbar'>
                            <Each 
                                of={messages}
                                render={(message: MessageProps) => {
                                    const messageKey = message.id ?? `index-${messages.indexOf(message)}`;
                                    return (
                                        <div key={messageKey}>
                                            <h4 className='font-bold mb-3'>{message.name}</h4>
                                            <p>{message.content}</p>
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
                                            <div className='w-full h-[1px] bg-dark-100 mt-6 border-[1px] border-dashed'></div>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section> 
        </section>
    );
}

export default MessageSection;