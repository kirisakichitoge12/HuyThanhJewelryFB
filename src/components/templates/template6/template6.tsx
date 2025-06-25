import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Banner from "./Banner";
import Introduction from "./Introduction";
import Invitation, { InvitationProps } from "./Invitation";

import ColorSelect from "../../common/ColorSelect";
import SubNavbarDisplayMode, {
  SubNavbarMethods,
} from "../../../layouts/SubNavbarDisplayMode";
import StorySection from "./StorySection";
import {
  availableColorsTemplate6,
  availableFontsCoBa,
  availableValuesTemplate6 as defaultValuesCoBa,
} from "../../../config";
import { Section } from "../Coba/Coba";
import { CustomFile } from "../../../types";
import ComponentToolbar from "../../common/ComponentToolbar";
import { AiOutlinePlus } from "react-icons/ai";
import { useFont } from "../../../hooks/useFont";
import AlbumSection from "./AlbumSection";
import { FaArrowLeft, FaRegTimesCircle } from "react-icons/fa";
import FontSelector from "../../FontSelector";
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { CiMusicNote1 } from "react-icons/ci";
import { useConfirmModal, useMusicModal } from "../../../hooks/modals";
import { IoIosLaptop } from "react-icons/io";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import EventsSection from "./EventsSection";
import MessageSection, { MessageProps } from "./MessageSection";
import BankSection from "./BankSection";
import TimelineSection, { TimelineProps } from "./TimelineSection";
import WidgetListModal from "../../Modals/WidgetListModal";
import WidgetImage1 from "../../../assets/images/templates/template6/widget1.png";
import WidgetImage2 from "../../../assets/images/templates/template6/widget2.png";
import WidgetImage3 from "../../../assets/images/templates/template6/widget3.png";
import WidgetImage4 from "../../../assets/images/templates/template6/widget4.png";
import WidgetImage5 from "../../../assets/images/templates/template6/widget5.png";
import WidgetImage6 from "../../../assets/images/templates/template6/widget6.png";
import WidgetImage7 from "../../../assets/images/templates/template6/widget7.png";
import WidgetImage8 from "../../../assets/images/templates/template6/widget8.png";
import Loading from "react-loading";
import ReplaceTemplateModal from "../../Modals/ReplaceTemplateModal";
import ReplaceTemplateModalBack from "../../Modals/ReplaceTemplateModalBack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../../config/api.config";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
// import { FontOption } from '../../../types/fonts';
import MusicModal from "../../Modals/MusicModal";
// import { fetchMusicLists } from '../../../api/music';
import { MusicData } from "../../../types/music.interface";
import { fetchMusicLists } from "../../../api/music";

const ReplaceTemplate = () => {
  return (
    <>
      <h3 className="text-xl text-primary text-center">
        Bạn có thực sự muốn đổi giao diện?{" "}
      </h3>
      <p className="my-5 text-gray-500">
        Thao tác này sẽ xoá bỏ giao diện cũ bạn đã tạo và lưu lại giao diện này.
      </p>
      <hr />
    </>
  );
};
interface TemplateProps {
  userId?: number;
  themeId?: number;
}

const Template6: React.FC<TemplateProps> = (props) => {
  const { id, userId, themeId } = useParams();
  const context = useContext(UserContext);
  const { user } = context;
  // const { onOpen, track, onChooseMusic } = useMusicModal();
  const [selectedStyle, setSelectedStyle] = useState<number>(0);
  const [availableValuesCoBa, setAvailableValuesCoBa] = useState<Section[]>(defaultValuesCoBa);
  const [sections, setSections] = useState<Section[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const displayRef = useRef<SubNavbarMethods | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [addWidget, setAddWidget] = useState<{
    state: boolean;
    location: number;
  }>({ state: false, location: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentFont: titleFont, setCurrentFont: setTitleFont } = useFont();
  const { currentFont: contentFont, setCurrentFont: setContentFont } =
    useFont();
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [isPlayMusic, setIsPlayMusic] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { onOpen, track,onChooseMusic } = useMusicModal();
  const { onOpen: onOpenConfirm } = useConfirmModal();                                                                                                                                                                                               
  const handleAddWidget = (index: number, location: number) => {
    const newSection: Section = {
      ...availableValuesCoBa[index],
      id: Date.now(),
    };
    setSections((prev) => [
      ...prev.slice(0, location),
      newSection,
      ...prev.slice(location),
    ]);
  };
  const handleCopy = (index: number): void => {
    const newSection: Section = {
      ...sections[index],
      id: Date.now(),
    };
    setSections((prev) => [
      ...prev.slice(0, index + 1),
      newSection,
      ...prev.slice(index + 1),
    ]);
  };
  const handleMoveUp = (index: number): void => {
    if (index === 0) return;
    setSections((prev) => {
      const updated = [...prev];
      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];
      return updated;
    });
  };
  const handleMoveDown = (index: number): void => {
    if (index === sections.length - 1) return;
    setSections((prev) => {
      const updated = [...prev];
      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];
      return updated;
    });
  };
  const handleDelete = (index: number): void => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSectionChange = (
    sectionId: number, // ID của section cần thay đổi
    name: string, // Tên trường cần thay đổi
    newValue:
      | string
      | File
      | InvitationProps
      | CustomFile[]
      | MessageProps[]
      | TimelineProps,
    subField?: string, // Trường con (nếu có)
    index?: number // Vị trí trong mảng (nếu có)
  ) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }
        if (
          subField &&
          typeof index === "number" &&
          Array.isArray(section.props[name]) &&
          section.props[name].length > 0
        ) {
          return {
            ...section,
            props: {
              ...section.props,
              [name]: section.props[name]?.map((item: any, i: number) =>
                i === index ? { ...item, [subField]: newValue } : item
              ),
            },
          };
        }
        if (name === "events" && typeof index === "number") {
          return {
            ...section,
            props: {
              ...section.props,
              [name]: section.props[name]?.map((item: any, i: number) =>
                i === index ? newValue : item
              ),
            },
          };
        }
        if (name === "elements" && typeof index === "number") {
          console.log(name);
          return {
            ...section,
            props: {
              ...section.props,
              [name]: section.props[name]?.map((item: any, i: number) =>
                i === index ? newValue : item
              ),
            },
          };
        }
        return {
          ...section,
          props: {
            ...section.props,
            [name]: newValue,
          },
        };
      })
    );
  };
  const handleCloseReplaceModal = () => {
    setShowReplaceModal(false);
  };
  const handleOpenModal = () => {
    const idCheck = Number(id) ? id : "null";
    if (idCheck == "null") {
      setShowModal(true);
    } else {
      setShowModal(false);
      navigate("/user/management/page");
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/user/management/page"); // Nếu chọn "Không", quay về trang Home
  };
  const handleSectionClick = (id: number): void => {
    setActiveSectionId(id);
    if (id !== null) {
      const index = sections.findIndex((section) => section.id === id);
      if (index !== -1 && sectionRefs.current[index]) {
        sectionRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        const sectionTop =
          sectionRefs.current[index]?.getBoundingClientRect().top +
          window.scrollY;
        window.scrollTo({
          top: sectionTop - 200,
          behavior: "smooth",
        });
      }
    }
  };
  const handlePlayMusic = useCallback(
    (dataTrack: MusicData | null) => {
      if (dataTrack && audioRef.current) {
        if (isPlayMusic) {
          console.log("pause music", dataTrack);
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        } else {
          console.log("tắt nhạc4");
          console.log("play music", dataTrack);
          audioRef.current.src = `${API_BASE_URL}${dataTrack.file_url}`;
          audioRef.current.play();
        }
        setIsPlayMusic(!isPlayMusic);
        console.log("tắt nhạc3");
      }
    },
    [isPlayMusic]
  );
  const handleSave = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    if (user === null) {
      toast.error("Vui lòng đăng nhập");
      setTimeout(() => {
        window.location.href = "/authentication";
      }, 2000);
    }
    if (user) {
      const templateId = Number(id) ? id : "null";
      const response = await axios.get(
        `${API_BASE_URL}/api/replacement/${user.id}/${Number(id) ? id : "null"}`
      );
      const isCheck = response.data.isNewTemplate;
      const data = {
        theme: selectedStyle,
        titleFont: titleFont.value,
        contentFont: contentFont.value,
        name_template: "Tình yêu",
        name_music: track ? track.id : 0,
        id_customer: user.id,
        sections: sections,
        templateId: Number(id) ? id : "null",
        templateId_default: 6,
      };
      // console.log(data);
      const handlePost = async () => {
        const response = await axios.post(
          `${API_BASE_URL}/api/savetemplate`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log(response);
        if (response.status === 200) {
          setTimeout(() => {
            toast.success("Lưu thành công", {
              iconTheme: {
                primary: "rgb(237,131,131)", // Màu của icon
                secondary: "#ffffff", // Màu nền của icon
              },
            });
          }, 1500);
          if (response.data.template_customer_id !== templateId) {
            navigate(`/theme/${response.data.template_customer_id}`);
          }
        } else {
          setTimeout(() => {
            toast.error("Lưu thất bại");
          }, 1500);
        }
      };

      if (isCheck) {
        setTimeout(() => {
          onOpenConfirm(<ReplaceTemplate />, handlePost);
        }, 1500);
      } else {
        handlePost();
      }
    }
  };
  const handleConfirmModal = () => {
    setShowModal(false);
    handleSavenew();
  };
  const handleSavenew = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    if (user === null) {
      toast.error("Vui lòng đăng nhập");
      setTimeout(() => {
        window.location.href = "/authentication";
      }, 2000);
    }
    if (user) {
      const templateId = Number(id) ? id : "null";
      const response = await axios.get(
        `${API_BASE_URL}/api/replacement/${user.id}/${Number(id) ? id : "null"}`
      );
      const isCheck = response.data.isNewTemplate;
      const data = {
        theme: selectedStyle,
        titleFont: titleFont.value,
        contentFont: contentFont.value,
        name_template: "template4",
        name_music: track ? track.id : 0,
        id_customer: user.id,
        sections: sections,
        templateId: Number(id) ? id : "null",
        templateId_default: 6,
      };
      // console.log(data);
      const handlePost = async () => {
        const response = await axios.post(
          `${API_BASE_URL}/api/savetemplate`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setTimeout(() => {
            toast.success("Lưu thành công", {
              iconTheme: {
                primary: "rgb(237,131,131)", // Màu của icon
                secondary: "#ffffff", // Màu nền của icon
              },
            });
          }, 1500);
          if (response.data.template_customer_id !== templateId) {
            navigate(`/theme/${response.data.template_customer_id}`);
            navigate("/user/management/page");
          }
        } else {
          setTimeout(() => {
            toast.error("Lưu thất bại");
          }, 1500);
        }
      };

      if (isCheck) {
        handlePost();
      } else {
        handlePost();
      }
    }
  };
  const location = useLocation();

  const idTemplate = useMemo(() => {
    const path = location.pathname;

    if (path.includes("/theme/coba")) return 1;
    if (path.includes("/theme/template1")) return 2;
    if (path.includes("/theme/sangtrong")) return 3;
    if (path.includes("/theme/codien")) return 4;
    if (path.includes("/theme/tinhyeu")) return 5;
    if (path.includes("/theme/nhenhang")) return 6;
    if (path.includes("/theme/hoathoa")) return 7;
    return null; // hoặc giá trị mặc định
  }, [location.pathname]);


  const fetchDefaultData = useCallback(async () => {
    try {
      setLoading(true);
  
      // Tạo delay tối thiểu (ví dụ: 1500ms)
      const minDelay = new Promise(resolve => setTimeout(resolve, 1500));
  
      // Gọi API và delay song song
      const [res] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/documents/6`),
        minDelay
      ]);
  
      if (res.status === 200 && res.data.json_data) {
        const parsedData = typeof res.data.json_data === 'string'
          ? JSON.parse(res.data.json_data)
          : res.data.json_data;
  
        const defaultSections = Array.isArray(parsedData)
          ? parsedData
          : Array.isArray(parsedData?.data)
            ? parsedData.data
            : [];
  
        setAvailableValuesCoBa(defaultSections);
        if (sections.length === 0) {
          setSections(defaultSections);
        }
      } else {
        setAvailableValuesCoBa(defaultValuesCoBa);
        if (sections.length === 0) {
          setSections(defaultValuesCoBa);
        }
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu mặc định:', error);
      setAvailableValuesCoBa(defaultValuesCoBa);
      if (sections.length === 0) {
        setSections(defaultValuesCoBa);
      }
    } finally {
      setLoading(false);
    }
  }, [sections.length]);
  
   useEffect(() => {
    const checkTemplate = async () => {
      if (user) {
        setLoading(true); // Bật loading nếu muốn
  
        const templateId = Number(id) ? id : 'null';
  
        const delay = new Promise(resolve => setTimeout(resolve, 1800)); // Delay 1.5s
  
        try {
          const [response] = await Promise.all([
            axios.get(`${API_BASE_URL}/api/replacement/${user.id}/${templateId}`),
            delay
          ]);
  
          const isCheck = response.data.isNewTemplate;
  
          // Mở modal nếu isNewTemplate = true
          if (isCheck) {
            setShowReplaceModal(true);
          }
  
          // Nếu là template cũ thì điều hướng
          if (response.data.isTemplateold.id_template == idTemplate) {
            navigate(`/theme/${response.data.isTemplateold.id}`);
          }
  
        } catch (error) {
          console.error("Lỗi khi kiểm tra template:", error);
          // Bạn có thể hiển thị toast lỗi hoặc modal fallback nếu cần
        } finally {
          setLoading(false); // Tắt loading sau cùng
        }
      }
    };
  
    checkTemplate();
  }, [user, id]);
  //subdomain
  const params = useParams<{
    id?: string;
    userId?: string;
    themeId?: string;
  }>();

  const resolvedUserId =
    props.userId ?? (params.userId ? parseInt(params.userId) : undefined);
  const resolvedThemeId =
    props.themeId ?? (params.themeId ? parseInt(params.themeId) : undefined);
  useEffect(() => {
   const fetchData = async () => {
     
     try {
       let response = null;
       let hasWidgetData = false; // Biến kiểm tra dữ liệu từ /api/widgets
       let shouldDisable = false;
       // Bước 1: Gọi /api/widgets
       if (themeId && userId) {
         response = await axios.get(`${API_BASE_URL}/api/widgets/${userId}/${themeId}`);
         shouldDisable = true;
         // Bỏ setIsDisabled(true)
       } else if (resolvedUserId && resolvedThemeId) {
         response = await axios.get(`${API_BASE_URL}/api/widgets/${resolvedUserId}/${resolvedThemeId}`);
          shouldDisable = true;
         // Bỏ setIsDisabled(true)
       } else if (user && id) {
         response = await axios.get(`${API_BASE_URL}/api/widgets/${user.id}/${id}`);
         shouldDisable = false;
       }
 
       // Bước 2: Xử lý dữ liệu từ /api/widgets
       if (response?.data) {
         const data = response.data;
         const widgets = data.templates_with_widgets?.[0]?.widgets || [];
         if (widgets.length > 0) {
           setSections(widgets); // Ưu tiên set sections từ /api/widgets
           hasWidgetData = true; // Đánh dấu có dữ liệu để ngăn gọi fetchDefaultData
         }
 
         if (data.titles_fonts) {
           const font = availableFontsCoBa.find(f => f.name === data.titles_fonts) || availableFontsCoBa[0];
           setTitleFont(font);
         }
 
         if (data.content_fonts) {
           const font = availableFontsCoBa.find(f => f.name === data.content_fonts) || availableFontsCoBa[0];
           setContentFont(font);
         }
 
         if (data.themes) {
           setSelectedStyle(parseInt(data.themes));
         }
 
         // *** SỬA: Thêm lại logic xử lý data.music theo đoạn code bạn cung cấp ***
         if (data.music) {
           const result = await fetchMusicLists();
           console.log({ result });
           if (result && result.length > 0) {
             const indexTrack = result.findIndex((item: any) => item.id == data.music);
             console.log(indexTrack);
             if (indexTrack !== -1) { // Kiểm tra indexTrack hợp lệ
               onChooseMusic(result[indexTrack]);
             }
           }
         }
       }
 
       // Bước 3: Nếu không có dữ liệu từ /api/widgets, gọi fetchDefaultData
       if (!hasWidgetData) {
         await fetchDefaultData(); // Gọi fetchDefaultData nếu không có dữ liệu
       }
        setIsDisabled(shouldDisable);
     } catch (error) {
       console.error("Lỗi khi fetch template:", error);
       await fetchDefaultData(); // Gọi fetchDefaultData trong catch
     }
   };
 
   fetchData();
 }, [themeId, userId, resolvedUserId, resolvedThemeId, user, id]);
  //   const fetchData = async () => {
  //     try {
  //       let response = null;

  //       if (themeId && userId) {
  //         response = await axios.get(
  //           `${API_BASE_URL}/api/widgets/${userId}/${themeId}`
  //         );
  //         setIsDisabled(true); // bản được chia sẻ => không cho chỉnh sửa
  //       } else if (resolvedUserId && resolvedThemeId) {
  //         response = await axios.get(
  //           `${API_BASE_URL}/api/widgets/${resolvedUserId}/${resolvedThemeId}`
  //         );
  //         setIsDisabled(true);
  //       } else if (user) {
  //         response = await axios.get(
  //           `${API_BASE_URL}/api/widgets/${user.id}/${id}`
  //         );
  //         setIsDisabled(false);
  //       }

  //       if (!response) return;

  //       const data = response.data;
  //       const widgets = data.templates_with_widgets?.[0]?.widgets || [];
  //       if (widgets.length > 0) setSections(widgets);

  //       if (data.titles_fonts) {
  //         const font =
  //           availableFontsCoBa.find((f) => f.name === data.titles_fonts) ||
  //           availableFontsCoBa[0];
  //         setTitleFont(font);
  //       }

  //       if (data.content_fonts) {
  //         const font =
  //           availableFontsCoBa.find((f) => f.name === data.content_fonts) ||
  //           availableFontsCoBa[0];
  //         setContentFont(font);
  //       }

  //       if (data.themes) setSelectedStyle(parseInt(data.themes));

  //       if (data.music) {
  //         const result = await fetchMusicLists();
  //         const selected = result.find((item) => item.id == data.music);
  //         console.log(selected);
  //         // if (selected) onChooseMusic(selected);
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi fetch template:", error);
  //       setSections(availableValuesCoBa); // fallback an toàn
  //     }
  //   };

  //   fetchData();
  // }, []);

  //         const fetchData = async () => {
  //             try {
  //                 let response = null;
  //                 if(themeId && userId){
  //                     response = await axios.get(`${API_BASE_URL}/api/widgets/${userId}/${themeId}`);
  //                     setIsDisabled(true);
  //                 }else{
  //                     if(user){
  //                         response = await axios.get(`${API_BASE_URL}/api/widgets/${user.id}/${id}`);
  //                         setIsDisabled(false);
  //                     }
  //                     else
  //                     {
  //                         response = await axios.get(`${API_BASE_URL}/api/widgets`);
  //                         setIsDisabled(false);
  //                         setSections(response.data.templates_with_widgets[0].widgets);
  //                     }
  //                 }
  //                 if(response === null) return;
  //                 const data = response.data;
  //                 const isExist = data.templates_with_widgets;
  //                 const dataFontTitle = data.titles_fonts;
  //                 const dataFontContent = data.content_fonts;
  //                 console.log(response)
  //                 if(data){
  //                     if (isExist) {
  //                         // console.log(data);
  //                         if (isExist[0].widgets.length > 0) {
  //                             setSections(isExist[0].widgets);
  //                         }
  //                     }
  //                     if(dataFontTitle ){
  //                         const font: FontOption = availableFontsCoBa.find((f: FontOption) => f.name === dataFontTitle) || availableFontsCoBa[0];
  //                         setTitleFont(font);
  //                     }
  //                     if(dataFontContent ){
  //                         const font: FontOption = availableFontsCoBa.find((f: FontOption) => f.name === dataFontContent) || availableFontsCoBa[0];
  //                         setContentFont(font);
  //                     }
  //                     const theme: number = parseInt(data.themes)
  //                     if(theme){
  //                         console.log("chu de", theme);
  //                         setSelectedStyle(theme);
  //                     }
  //                     if(data.music){
  //                         const result = await fetchMusicLists();
  //                         console.log({result})
  //                         if(result && result.length > 0){
  //                             const indexTrack = result.findIndex((item: any) => item.id == data.music);
  //                             console.log(indexTrack);
  //                             onChooseMusic(result[indexTrack]);
  //                         }
  //                     }
  //                 }
  //             } catch (error: unknown) {
  //             }
  //         }
  //         fetchData();
  //         console.log("sections nè", sections)

  //         setIsDisabled(isDisabled);
  // }, []);

  useEffect(() => {
         const mediaQuery = window.matchMedia("(max-width: 640px)"); // Tailwind 'sm'
         const handleChange = () => {
             setIsDisabled(mediaQuery.matches);
             setIsMobileScreen(mediaQuery.matches);
         }
         handleChange();
         mediaQuery.addEventListener("change", handleChange);
 
         return () => mediaQuery.removeEventListener("change", handleChange);
     }, []);
  // const hiddenComponentTypes = ['MessageSection']; // từ DB
  const [hiddenComponentTypes, setHiddenComponentTypes] = useState<string[]>(
    []
  );

  useEffect(() => {
    const fetchHiddenComponents = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/hidentemplates/6`
        );

        // Ép kiểu an toàn: nếu là mảng thì dùng luôn, không thì gán mảng rỗng
        const data = Array.isArray(response.data) ? response.data : [];

        setHiddenComponentTypes(data);
      } catch (error) {
        // console.error("Lỗi khi load component ẩn:", error);
        setHiddenComponentTypes([]); // fallback an toàn
      }
    };

    fetchHiddenComponents();
  }, []);

  return (
    <section className="relative w-full h-full overflow-hidden">
      {!isDisabled && (
        <div className="fixed z-50  w-full bg-white">
          <div className="p-2 max-w-9xl mx-auto">
            <div className="flex justify-between items-center space-x-4">
              <audio ref={audioRef} className="hidden" />
              <button
                onClick={handleOpenModal}
                className="px-6 py-2 text-primary border-[1px] border-primary rounded-lg hover:bg-red-100"
              >
                <FaArrowLeft />
              </button>
              <div className="flex justify-center items-center gap-5">
                <button
                  onClick={() =>
                    displayRef.current &&
                    displayRef.current.enterFullScreen("desktop")
                  }
                >
                  <IoIosLaptop size={40} />
                </button>
                <button
                  onClick={() =>
                    displayRef.current &&
                    displayRef.current.enterFullScreen("mobile")
                  }
                >
                  <HiOutlineDevicePhoneMobile size={26} />
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 text-[#384094] border-[1px] border-[#384094] font-bold rounded-lg hover:bg-blue-100"
                >
                  Lưu trang
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between px-4 pb-1 max-w-9xl mx-auto gap-5 pt-2 overflow-auto md:overflow-visible">
            {/* Left Section */}
            <ColorSelect
              colorSets={availableColorsTemplate6}
              selectedStyle={selectedStyle}
              onStyleChange={setSelectedStyle}
            />
            <FontSelector
              title="Chọn chữ tiêu đề"
              selectedFont={titleFont.value}
              onFontChange={setTitleFont}
              fontSets={availableFontsCoBa}
            />
            <FontSelector
              title="Chọn chữ nội dung"
              selectedFont={contentFont.value}
              onFontChange={setContentFont}
              fontSets={availableFontsCoBa}
            />
            <button
              onClick={() => handlePlayMusic(track)}
              className="w-96 inline-flex items-center gap-2 hover:bg-gray-200 h-8 px-1 rounded-full"
            >
              {isPlayMusic ? (
                <FaRegCirclePause size={25} />
              ) : (
                <FaRegCirclePlay size={25} />
              )}
              <p className="inline-block truncate">
                {track ? track.name : "Chưa chọn nhạc"}
              </p>
            </button>
            <button
              onClick={() => {
                onOpen(true); // Mở modal
                if (audioRef.current) {
                  audioRef.current.pause(); // Dừng nhạc ngay lập tức
                  audioRef.current.currentTime = 0; // Reset thời gian
                }
                setIsPlayMusic(false);
              }}
              className="hover:bg-gray-200 w-8 h-8 px-1 rounded-full"
            >
              <CiMusicNote1 size={25} />
            </button>
          </div>
        </div>
      )}
      <section className="relative bg-white overflow-y-auto font-CormorantUnicase">
        <SubNavbarDisplayMode ref={displayRef} setDisabled={setIsDisabled}>
          <div>
            {sections.map((section, index) => {
              if (hiddenComponentTypes.includes(section.type)) return null;
              const Component = {
                Banner,
                Invitation,
                Introduction,
                StorySection,
                AlbumSection,
                TimelineSection,
                EventsSection,
                MessageSection,
                BankSection,
              }[section.type];

              return (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  onClick={() => handleSectionClick(section.id)}
                >
                  {!isDisabled &&
                    activeSectionId === section.id &&
                    index !== 0 && (
                      <div className="relative">
                        <ComponentToolbar
                          title="Sửa widget"
                          isMoveUp={index !== 1}
                          isMoveDown={index !== sections.length - 1}
                          onCopy={() => handleCopy(index)}
                          onMoveUp={() => handleMoveUp(index)}
                          onMoveDown={() => handleMoveDown(index)}
                          onDelete={() => handleDelete(index)}
                        />
                        <div className="absolute z-50 flex justify-center items-center h-1 w-full bg-yellow-500">
                          <button
                            onClick={() =>
                              setAddWidget({ state: true, location: index })
                            }
                            className="flex justify-center items-center gap-2 border-2 hover:bg-gray-100 border-yellow-500 text-yellow-500 bg-white z-50 text-sm md:text-base md:py-3 md:px-6 rounded-md"
                          >
                            <AiOutlinePlus /> Thêm widget
                          </button>
                        </div>
                      </div>
                    )}
                  <Component
                    // {...section.props}
                    {...{
                      ...section.props,
                      ...(section.type === "MessageSection" && {
                        user_id: resolvedUserId,
                        theme_id: resolvedThemeId,
                      }),
                    }}
                    id={section.id}
                    titleFont={titleFont.value}
                    contentFont={contentFont.value}
                    disabled={isDisabled}
                    style={selectedStyle}
                    onSectionChange={(
                      name: string,
                      newValue:
                        | string
                        | File
                        | InvitationProps
                        | CustomFile[]
                        | MessageProps[]
                        | TimelineProps,
                      subField?: string,
                      i?: number
                    ) =>
                      handleSectionChange(
                        section.id,
                        name,
                        newValue,
                        subField,
                        i
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
        </SubNavbarDisplayMode>
      </section>
      <WidgetListModal
        title={[
          "Địa điểm",
          "Giới thiệu",
          "Câu chuyện",
          "Lịch trình",
          "Albums",
          "Sự kiện",
          "Tin nhắn",
          "Ngân hàng",
        ]}
        data={[
          WidgetImage1,
          WidgetImage2,
          WidgetImage3,
          WidgetImage4,
          WidgetImage5,
          WidgetImage6,
          WidgetImage7,
          WidgetImage8,
        ]}
        isOpen={addWidget.state}
        location={addWidget.location}
        onClose={() => setAddWidget({ state: false, location: 0 })}
        onChooseWidget={handleAddWidget}
      />
      <MusicModal />
      {isMobileScreen && (
        <div className="absolute bottom-10 w-full z-50 hidden">
          <div className="bg-cyan-500 text-white px-4 py-2 mx-10 flex rounded-lg">
            <p>
              Hãy sử dụng PC/Laptop để có trải nghiệm sử dụng tốt nhất nhé!!
            </p>
            <button onClick={() => setIsMobileScreen(false)}>
              <FaRegTimesCircle size={20} />
            </button>
          </div>
        </div>
      )}
      {/* {isDisabled && (
        <button
          onClick={() => handlePlayMusic(track)}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 w-96 inline-flex items-center gap-2 hover:bg-gray-200 h-8 px-1 rounded-full text-primary "
        >
          {isPlayMusic ? (
            <FaRegCirclePause size={25} />
          ) : (
            <FaRegCirclePlay size={25} />
          )}
          <p className="inline-block truncate"></p>
        </button>
      )} */}
       {isDisabled && (
                             <button
                                onClick={() => handlePlayMusic(track)}
                                className='fixed focus:outline-none left-4 bottom-0 transform -translate-y-1/2 inline-flex items-center gap-2 hover:bg-gray-200 h-8 px-1 rounded-full text-primary'
                                >
                                {isPlayMusic ? <FaRegCirclePause size={25} /> : <FaRegCirclePlay size={25} />}
                                {/* <p className='inline-block truncate'></p> */}
                                </button>
                          
                            )}
                            
             {isDisabled && (
             <audio  
                            ref={audioRef}
                            // controls  
                            className='hidden'
                            // onEnded={() => setCurrentTrack(null)}
                        />
                    )}
      {showReplaceModal && !isDisabled && (
        <ReplaceTemplateModal onClose={handleCloseReplaceModal} />
      )}

      {loading && (
        <div
          style={{
            position: "fixed", // giúp overlay toàn màn hình
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.6)", // lớp mờ nền nhẹ
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // đảm bảo nổi trên cùng
          }}
        >
          <Loading
            type="spinningBubbles"
            color="rgba(237,131,131)"
            height={100}
            width={100}
          />
        </div>
      )}
      {showModal && (
        <ReplaceTemplateModalBack
          onClose={handleCloseModal} // Đóng và về trang Home
          onConfirm={handleConfirmModal} // Xác nhận lưu và quay lại trang trước
        />
      )}
    </section>
  );
};

export default Template6;
