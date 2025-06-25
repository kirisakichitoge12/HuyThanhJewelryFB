import React, { useEffect, useState } from 'react';
import Each from '../../../layouts/Each';
import { availableColorsTemplate4 } from '../../../config';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { FaLightbulb, FaPen, FaRegLightbulb, FaSave } from 'react-icons/fa';
import { BsEmojiSmile } from 'react-icons/bs';
import toast from 'react-hot-toast';
import BackgroundImage1 from '../../../assets/images/templates/template4/messageBg1.png';
import BackgroundImage2 from '../../../assets/images/templates/template4/messageBg2.png';
import BackgroundImage3 from '../../../assets/images/templates/template4/messageBg3.png';
import DecoImage1 from '../../../assets/images/templates/template4/messageDeco1.png';
import DecoImage2 from '../../../assets/images/templates/template4/messageDeco2.png';
import DecoImage3 from '../../../assets/images/templates/template4/messageDeco3.png';
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
    user_id: number;
    theme_id: number;
    disabled?: boolean;
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
    const backgrounds: string[] = [BackgroundImage1, BackgroundImage2, BackgroundImage3];
    const decos: string[] = [DecoImage1, DecoImage2, DecoImage3];
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
        <section id="coDien-message-id" className={`relative`} style={{ backgroundImage: `url(${backgrounds[style]})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
            <section className='z-10 relative max-w-9xl mx-auto font-pacifico overflow-hidden bg-transparent flex flex-row justify-center items-center pt-[150px] pl-[18px] pr-[24px] pb-[75px] lg:px-[301px] py-[120px]'>
                <div className='relative flex flex-col text-center items-center w-full h-full'>
                    <img src={decos[style]} style={{ transform: "rotate(-15deg)" }} />
                    <h1
                        style={{ color: availableColorsTemplate4[style][1], fontFamily: titleFont }}
                        className={`text-start text-[40px] md:text-[52px] md:leading-[90px]`}
                    >
                        Sổ lưu bút
                    </h1>
                    <div className='w-full z-10 mt-[56px] space-y-6'>
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
                                <button
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                        event.stopPropagation();
                                        setShowHint(prev => !prev);
                                    }}>
                                    {showHint ? <FaLightbulb size={20}/> : <FaRegLightbulb size={20}/>}
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
                                <div
                                    className="absolute mb-2 w-full top-36 max-h-48 text-start border-2 shadow-lg overflow-y-auto bg-white z-10 space-y-2">
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
                                    <EmojiPicker onEmojiClick={onEmojiClick}/>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center items-center gap-5 w-full mt-2">
                            <button 
                                onClick={handleAdd}
                                className='text-white text-lg min-w-[250px] px-6 py-4 rounded-full'
                                style={{ backgroundColor: availableColorsTemplate4[style][1] }}
                            >
                                Gửi lời chúc
                            </button>
                        </div>
                    </div>
                    <div className='z-0 max-h-[250px] overflow-y-auto font-svn-sans text-base text-start flex flex-col gap-6 custom-scrollbar mt-10'>
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
            </section>
        </section>
    );
}

export default MessageSection;