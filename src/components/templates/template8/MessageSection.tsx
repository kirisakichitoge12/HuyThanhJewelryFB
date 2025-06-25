import React, { useState } from 'react';
import StampMessageMax from '../../../assets/images/templates/coba/stampMessageMax.png';
import StampMessageMin from '../../../assets/images/templates/coba/stampMessageMin.png'; 
import FrameMessage1 from '../../../assets/images/templates/coba/FrameMessage1.png';
import FrameMessage2 from '../../../assets/images/templates/coba/FrameMessage2.png';
import FrameMessage3 from '../../../assets/images/templates/coba/FrameMessage3.png';
import Each from '../../../layouts/Each';
import { availableColors } from '../../../config';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'; 
import { FaLightbulb, FaPen, FaRegLightbulb, FaSave } from 'react-icons/fa';
import { BsEmojiSmile } from 'react-icons/bs';
import toast from 'react-hot-toast';

export interface MessageProps{
    name: string;
    content: string;
    reply?: string;
}

interface MessageSectionProps{ 
    style: number;
    messages: MessageProps[]
    titleFont: string;
    disabled?: boolean;
    onSectionChange:  (name: string, newValue: MessageProps[] ) => void; 
}

const MessageSection: React.FC<MessageSectionProps> = ({  
    style, 
    titleFont, 
    messages, 
    disabled = false, 
    onSectionChange 
}) => { 
    const frames: string[] = [FrameMessage1, FrameMessage2, FrameMessage3]; 
    const [formData, setFormData] = useState<MessageProps>({
        name: "",
        content: "",
        reply: ""
    });
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [showHint, setShowHint] = useState<boolean>(false);
    const [inputReply, setInputReply] = useState<string>("");
    const [isReply, setIsReply] = useState<boolean>(false);
    const onEmojiClick = (emojiData: EmojiClickData ) => { 
        setFormData(prev => ({
            ...prev,
            content: prev.content + emojiData.emoji
        }))       
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    const handleAdd = () => {
        toast.success("Gửi lời chúc thành công")
        onSectionChange("messages", [...messages, formData]);
    }
    const handleSuggestionClick = (e: React.MouseEvent<HTMLDivElement>, suggestion: string) => {
        e.stopPropagation();
        setFormData(prev => ({...prev, content: suggestion}));
        setShowHint(false);
    };
    const suggestions: string[] = [
        "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
        "Chúc mừng ngày trọng đại tới hai bạn. Hạnh phúc bền lâu và trơn vẹn nhé!",
        "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!",
        "Chúc hai bạn ngày vui hạnh phúc. Hãy yêu thương nhau thật nhiều và sống thật hạnh phúc nha!"
    ];
    return (
        <section id="message-id" className={`relative`} style={{ backgroundColor: style === 0 ? "#18393C" : availableColors[style][4] }}>
            <section className='z-10 relative max-w-[1443px] mx-auto font-phudu overflow-hidden flex flex-col justify-center items-center pt-[56px] pl-[18px] pr-[24px] pb-[75px] lg:pt-[138px] lg:pb-[147px] lg:pl-[304px] lg:pr-[302px]'>
                <div className='relative max-w-[837px] max-h-[1059px] w-full md:min-w-[335px] min-h-[912px]'>
                    <img src={StampMessageMax} className='hidden lg:block absolute w-full h-full'/>
                    <img src={StampMessageMin} className='block lg:hidden absolute w-full h-full'/>

                    <div className='pt-[90px] px-[40px] pb-[127px] full:pl-[108px] full:pr-[109px] grid text-center items-center w-full h-ful'>
                        <h1 
                            className="text-title-coba-mobile md:text-tilte-coba text-3d drop-shadow-3d tracking-wide uppercase"  
                            style={{ fontFamily: titleFont, color: availableColors[style][4] }}
                        >  
                            Sổ lưu bút
                        </h1>
                        <div className='font-svn-sans z-10 mt-[58px] space-y-6'>
                            <input 
                                name="name"
                                disabled={disabled}
                                value={formData.name}
                                onChange={handleChange}     
                                placeholder='Tên của bạn *'
                                onClick={(event: React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => event.stopPropagation()}
                                className='w-full h-12 ps-4 border-[1px] border-dark-300' 
                            />
                            <div className='relative'>
                                <textarea 
                                    name="content"
                                    disabled={disabled}
                                    value={formData.content}
                                    onChange={handleChange} 
                                    placeholder='Nhập lời chúc của bạn*' 
                                    onClick={(event: React.MouseEvent<HTMLTextAreaElement, globalThis.MouseEvent>) => event.stopPropagation()}
                                    className='w-full h-[140px] ps-4 pt-3 border-[1px] border-dark-300 resize-none'
                                />
                                <div className='absolute bottom-2 right-2 space-x-3'>
                                    <button onClick={(event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => { 
                                        event.stopPropagation();
                                        setShowHint(prev  => !prev);
                                    }}>
                                        {showHint ? <FaLightbulb size={20}/>: <FaRegLightbulb size={20}/>  }
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
                                { showHint && (
                                        <div className="absolute mb-2 w-full top-36 max-h-48 text-start border-2 shadow-lg overflow-y-auto bg-white z-10 space-y-2">
                                            {suggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    onClick={(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => handleSuggestionClick(event, suggestion)}
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
                            <button 
                                className='font-phudu text-[#DDCCB6] text-base w-full md:min-w-[406px] py-4'  
                                style={{ backgroundColor: availableColors[style][3] }}
                                onClick={handleAdd}
                            >
                                Gửi lời chúc
                            </button>
                        </div>
                        <div className='z-0 mt-10 mb-8 w-full h-[2px] bg-dark-300'></div>
                        <div className='z-0 min-h-[348px] font-svn-sans text-base text-start flex flex-col gap-6'>
                            <Each 
                                of={messages}
                                render={(message: MessageProps, index: number) => 
                                    <div>
                                        <h4 className='font-bold mb-3'>{message.name}</h4>
                                        <p>{message.content}</p>
                                        { index === messages.length - 1 &&
                                            <div className='flex justify-start items-center gap-5 w-full mt-2' onClick={(event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => event.stopPropagation()}> 
                                                <button onClick={() => setIsReply(!isReply)} className='text-primary'>
                                                    {
                                                        isReply && !disabled
                                                            ? <FaSave size={25}/>
                                                            : <FaPen size={20}/>
                                                    }
                                                </button>
                                                { isReply
                                                    ? <input 
                                                        placeholder='Trả lời'
                                                        className='w-full ps-4 py-3'
                                                        value={inputReply}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputReply(e.target.value)}
                                                    />
                                                    : <p>{inputReply}</p>
                                                }
                                            </div>
                                        }
                                        <div className='w-full h-[1px] bg-dark-100 mt-6 border-[1px] border-dashed'></div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </section>
            <img src={frames[style]} className='absolute bottom-0 w-full max-h-[521px] object-cover object-top'/>
        </section>
    )
}

export default MessageSection