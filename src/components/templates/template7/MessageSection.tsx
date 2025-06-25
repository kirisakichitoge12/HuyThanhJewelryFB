import React, { useEffect, useState } from "react";
import Each from "../../../layouts/Each";
import { availableColorsTemplate7 } from "../../../config";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { FaLightbulb, FaPen, FaRegLightbulb, FaSave } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import toast from "react-hot-toast";
import BackgroundImage1 from "../../../assets/images/templates/template7/message/bg1.png";
import BackgroundImage2 from "../../../assets/images/templates/template7/message/bg2.png";
import BackgroundImage3 from "../../../assets/images/templates/template7/message/bg3.png";
import DecoLeft1 from "../../../assets/images/templates/template7/message/DecoLeft1.png";
import DecoLeft2 from "../../../assets/images/templates/template7/message/DecoLeft2.png";
import DecoLeft3 from "../../../assets/images/templates/template7/message/DecoLeft3.png";
import DecoRight1 from "../../../assets/images/templates/template7/message/DecoRight1.png";
import DecoRight2 from "../../../assets/images/templates/template7/message/DecoRight2.png";
import DecoRight3 from "../../../assets/images/templates/template7/message/DecoRight3.png";
import Frame1 from "../../../assets/images/templates/template7/message/frame1.png";
import Frame2 from "../../../assets/images/templates/template7/message/frame2.png";
import Frame3 from "../../../assets/images/templates/template7/message/frame3.png";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api.config";

export interface MessageProps {
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
  onSectionChange,
}) => {
  const backgrounds = [BackgroundImage1, BackgroundImage2, BackgroundImage3];
  const decoLefts = [DecoLeft1, DecoLeft2, DecoLeft3];
  const decoRights = [DecoRight1, DecoRight2, DecoRight3];
  const frames = [Frame1, Frame2, Frame3];

  const [formData, setFormData] = useState<MessageProps>({
    name: "",
    content: "",
    reply: "",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [replyStates, setReplyStates] = useState<{
    [key: string]: { isReplying: boolean; replyText: string };
  }>({});

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + emojiData.emoji,
    }));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/guest/messages`, {
        params: { user_id, theme_id },
      });

      const messagesFromApi: MessageProps[] = response.data;

      const defaultMessage: MessageProps = {
        name: "Huy Thanh Jewelry",
        content:
          "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau <3",
      };

      const hasDefault = messagesFromApi.some(
        (msg) =>
          msg.name === defaultMessage.name &&
          msg.content === defaultMessage.content
      );

      const finalMessages = hasDefault
        ? messagesFromApi
        : [defaultMessage, ...messagesFromApi];

      onSectionChange("messages", finalMessages);
    } catch (error) {
      console.error("Lỗi khi tải lời chúc:", error);
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
      const response = await axios.post(`${API_BASE_URL}/api/guest/messages`, {
        ...formData,
        user_id,
        theme_id,
      });

      toast.success("Gửi lời chúc thành công");
      onSectionChange("messages", [...messages, response.data]);
      fetchMessages();
      setFormData({ name: "", content: "", reply: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Gửi lời chúc thất bại. Vui lòng thử lại.");
    }
  };

  const handleReply = async (message: MessageProps, index: number) => {
    const key = `index-${index}`;
    const replyText = replyStates[key]?.replyText.trim();

    if (!replyText) {
      toast.error("Vui lòng nhập nội dung trả lời.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/guest/messages`, {
        user_id,
        theme_id,
        name: message.name || "Admin",
        content: message.content,
        reply: replyText,
      });

      toast.success("Gửi trả lời thành công");

      setReplyStates((prev) => ({
        ...prev,
        [key]: { isReplying: false, replyText: "" },
      }));

      fetchMessages();
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Đã có lỗi khi gửi trả lời.");
    }
  };

  const toggleReply = (index: number) => {
    const key = `index-${index}`;
    setReplyStates((prev) => ({
      ...prev,
      [key]: {
        isReplying: !prev[key]?.isReplying,
        replyText: prev[key]?.replyText || "",
      },
    }));
  };

  const handleReplyChange = (index: number, value: string) => {
    const key = `index-${index}`;
    setReplyStates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        replyText: value,
      },
    }));
  };

  const suggestions: string[] = [
    "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
    "Chúc mừng ngày trọng đại tới hai bạn. Hạnh phúc bền lâu và trơn vẹn nhé!",
    "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!",
    "Chúc hai bạn ngày vui hạnh phúc. Hãy yêu thương nhau thật nhiều và sống thật hạnh phúc nha!",
  ];

  const handleSuggestionClick = (
    e: React.MouseEvent<HTMLDivElement>,
    suggestion: string
  ) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, content: suggestion }));
    setShowHint(false);
  };

  return (
    <section
      id="template7-message-id"
      className={`relative font-meowScript`}
      style={{
        backgroundImage: `url(${backgrounds[style]})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img src={decoLefts[style]} className="absolute top-0 left-0" />
      <img src={decoRights[style]} className="absolute bottom-0 right-0" />

      <section className="z-10 relative max-w-9xl mx-auto gap-[30px] overflow-hidden bg-transparent flex flex-col md:flex-row justify-center items-center px-[15px] py-[100px] md:pt-[120px] md:pb-[109px] md:pl-[85px] md:pr-[117px]">
        <div className="relative flex flex-col text-center items-center w-full md:w-[512px] h-[534px]">
          <h1
            style={{
              color: availableColorsTemplate7[style][0],
              fontFamily: titleFont,
            }}
            className={`text-start text-[40px] md:text-[80px] md:leading-[90px]`}
          >
            Sổ lưu bút
          </h1>
          <div className="w-full z-10 mt-[56px] space-y-6 font-montserrat">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tên của bạn *"
              onClick={(e) => e.stopPropagation()}
              className="w-full h-12 ps-4 border-[1px] border-dark-300"
            />
            <div className="relative">
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Nhập lời chúc của bạn*"
                onClick={(e) => e.stopPropagation()}
                className="w-full h-[140px] ps-4 pt-3 border-[1px] border-dark-300 resize-none"
              />
              <div className="absolute bottom-2 right-2 space-x-3">
                <button onClick={() => setShowHint((prev) => !prev)}>
                  {showHint ? <FaLightbulb size={20} /> : <FaRegLightbulb size={20} />}
                </button>
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <BsEmojiSmile size={20} />
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
            <div className="flex justify-center items-center gap-5 w-full mt-2">
              <button
                onClick={handleAdd}
                className="text-white text-lg w-full md:min-w-[298px] px-6 py-4 rounded-lg uppercase"
                style={{ backgroundColor: availableColorsTemplate7[style][0] }}
              >
                Gửi lời chúc
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <img src={frames[style]} className="md:block hidden" />
          <div className="relative md:absolute top-0 w-full h-full flex justify-center items-center">
            <div className="md:w-[512px] h-[420px] font-svn-sans overflow-y-auto custom-scrollbar px-4 py-2">
              <Each
                of={messages}
                render={(message: MessageProps, index: number) => {
                  const key = `index-${index}`;
                  return (
                    <div key={key}>
                      <h4 className="font-bold mb-3">{message.name}</h4>
                      <p>{message.content}</p>
                      {message.reply && (
                        <p className="text-gray-600 mt-2 italic">
                          Trả lời: {message.reply}
                        </p>
                      )}
                      <div
                        className="flex justify-start items-center gap-5 w-full mt-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => toggleReply(index)}
                          className="text-primary"
                        >
                          {replyStates[key]?.isReplying ? (
                            <FaSave
                              size={25}
                              onClick={(e) => {
                                e.preventDefault();
                                handleReply(message, index);
                              }}
                            />
                          ) : (
                            <FaPen size={20} />
                          )}
                        </button>
                        {replyStates[key]?.isReplying && (
                          <input
                            placeholder="Trả lời"
                            className="w-full ps-4 py-3 border border-gray-300"
                            value={replyStates[key]?.replyText || ""}
                            onChange={(e) =>
                              handleReplyChange(index, e.target.value)
                            }
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleReply(message, index);
                              }
                            }}
                          />
                        )}
                      </div>
                      <div className="w-full h-[1px] bg-dark-100 mt-6 border-[1px] border-dashed"></div>
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
};

export default MessageSection;