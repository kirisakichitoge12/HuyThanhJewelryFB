import {
  FaCogs,
  FaFolder,
  FaHome,
  FaMusic,
  FaRegImage,
  FaUsers,
} from "react-icons/fa";
import { StatusBlogPost } from "../types/dataResponse/blog.interface";
import { FontOption } from "../types/fonts";
// import { UserData } from "../types/dataResponse/user.interface";
import { BaseListMenu, OptionsPlans } from "../types";
import { CiGrid41, CiUser, CiWavePulse1 } from "react-icons/ci";
import Photo1 from "../assets/images/photo1.jpeg";
import Photo2 from "../assets/images/photo2.jpeg";
import Photo3 from "../assets/images/photo3.jpeg";
import Photo4 from "../assets/images/photo4.jpeg";
import { CarouselItem } from "../components/common/FullscreenCarousel";
import { Section } from "../components/templates/Coba/Coba";

const availableColorsTemplate2 = [
  ["#A12F0C", "#F4DBCE", "#FBF7F5"],
  ["#8D7326", "#F1E3C5", "#FBF7F5"],
  ["#1C67B1", "#F4E1CE", "#F8F8F8"],
];
const availableColorsTemplate6 = [
  ["#545F1B", "#E6D0AF", "#FFFCF6"],
  ["#51385D", "#F6D6CA", "#FFFCF6"],
  ["#154B85", "#C9E1FC", "#F6FFFF"],
];
const availableColorsTemplate7 = [
  ["#56721D", "#B9815D", "#FCF9EC"],
  ["#4C0D3B", "#D99EB5", "#EFECF2"],
  ["#B4714E", "#66A17D", "#F3F1EE"],
];

const listMenuAdmin: BaseListMenu[] = [
  { name: "Trang chủ", icon: FaHome, path: "/admin/home" },
  { name: "Mẫu thiệp", icon: FaRegImage, path: "/admin/template/new" },
  { name: "Danh sách nhạc", icon: FaMusic, path: "/admin/music" },
  { name: "Người dùng", icon: FaUsers, path: "/admin/users" },
  { name: "Template", icon: FaFolder, path: "/admin/template" },
  { name: "Widget", icon: FaCogs, path: "" },
];

const listSubMenuUser: BaseListMenu[] = [
  { name: "Danh sách thiệp", icon: CiGrid41, path: "/user/wedding-card" },
  {
    name: "Tổng quan",
    icon: CiWavePulse1,
    path: "/user/wedding-card/detail/1",
  },
  { name: "Trang cá nhân", icon: CiUser, path: "/user/account" },
];

const listMenuUser: BaseListMenu[] = [
  { name: "Mẫu thiệp", path: "/guest/templates" },
  { name: "Biểu phí", path: "/guest/pricing" },  
  // { name: "Tin tức", path: "#"}
];

const availableStatusBlogPost: StatusBlogPost[] = ["nháp", "đăng", "lưu trữ"];

const availableFonts: FontOption[] = [
  {
    name: "Chọn phông chữ",
    value: "",
    category: "",
    weights: [],
  },
  {
    name: "Inter",
    value: "Inter, sans-serif",
    category: "sans",
    weights: [],
  },
  {
    name: "Roboto",
    value: "Roboto, sans-serif",
    category: "sans",
    weights: [300, 400, 500, 700],
  },
  {
    name: "Poppins",
    value: "Poppins, sans-serif",
    category: "sans",
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: "Lato",
    value: "Lato, sans-serif",
    category: "sans",
    weights: [300, 400, 700, 900],
  },
  {
    name: "Playfair Display",
    value: "Playfair Display, serif",
    category: "serif",
    weights: [400, 500, 600, 700],
  },
  {
    name: "Montserrat",
    value: "Montserrat, sans-serif",
    category: "sans",
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: "Open Sans",
    value: "Open Sans, sans-serif",
    category: "sans",
    weights: [300, 400, 600, 700],
  },
];
const availableFontsCoBa: FontOption[] = [
  {
    name: "Chọn phông chữ",
    value: "",
    category: "",
    weights: [],
  },
  {
    name: "Phudu",
    value: "Phudu",
    category: "",
    weights: [300, 400, 500, 700],
  },
  {
    name: "Birthstone",
    value: "Birthstone",
    category: "",
    weights: [300, 400, 500, 700],
  },
  {
    name: "Trirong",
    value: "Trirong",
    category: "",
    weights: [300, 400, 500, 600, 700],
  },
];
// const availabUser: UserData[] = [
//   {
//     _id: "1",
//     name: "Bohemian Rhapsody",
//     plans: "basic",
//     password: "12333333333333333333333sssssssssssssssss333333",
//     email: "Opera@gmail.com",
//     phone: "0123456789",
//     status: "inactive",
//     // createdAt: "13/11/2024"
//   },
//   {
//     _id: "2",
//     name: "John Lennon",
//     plans: "basic",
//     password: "123",
//     email: "JohnLennon@gmail.com",
//     phone: "0123456789",
//     status: "active_paid",
//     // createdAt: "13/11/2024"
//   },
//   {
//     _id: "3",
//     name: "Andrew Lennon",
//     plans: "basic",
//     password: "123",
//     email: "JohnLennon@gmail.com",
//     phone: "0123456789",
//     status: "active_subscription",
//     // createdAt: "13/11/2024"
//   },
// ];
const availablePlans: OptionsPlans[] = [
  {
    name: "Cơ bản",
    value: "basic",
  },
  {
    name: "Cao Cấp",
    value: "premium",
  },
  {
    name: "Vip",
    value: "vip",
  },
];

const availableNews: CarouselItem[] = [
  {
    id: 1,
    image: Photo1,
    title: "Bí quyết tổ chức đám cưới trong mơ",
    excerpt:
      "Từ ý tưởng sáng tạo đến kế hoạch chi tiết, chúng tôi mang đến cho bạn những mẹo hữu ích và xu hướng mới nhất để ngày cưới của bạn trở thành kỷ niệm đẹp nhất. Khả...",
  },
  {
    id: 2,
    image: Photo2,
    title: "Lên kế hoạch cho ngày cưới hoàn hảo",
    excerpt:
      "Đám cưới không chỉ là một sự kiện mà còn là hành trình yêu thương của bạn. Blog của chúng tôi cung cấp hướng dẫn chi tiết, từ việc chọn địa điểm, decor, thiệp cưới, để...",
  },
  {
    id: 3,
    image: Photo3,
    title: "Lên kế hoạch cho ngày cưới hoàn hảo",
    excerpt:
      "Đám cưới không chỉ là một sự kiện mà còn là hành trình yêu thương của bạn. Blog của chúng tôi cung cấp hướng dẫn chi tiết, từ việc chọn địa điểm, decor, thiệp cưới, để...",
  },
  {
    id: 4,
    image: Photo4,
    title: "Những điều giúp hành trình cưới trọn vẹn",
    excerpt:
      "Cùng đồng hành trên hành trình chuẩn bị ngày trọng đại của bạn. Blog chia sẻ đầy đủ kinh nghiệm tổ chức đám cưới, từ việc chọn concept, tìm nhà cung cấp đến các...",
  },
  {
    id: 5,
    image: Photo1,
    title: "Những điều giúp hành trình cưới trọn vẹn",
    excerpt:
      "Cùng đồng hành trên hành trình chuẩn bị ngày trọng đại của bạn. Blog chia sẻ đầy đủ kinh nghiệm tổ chức đám cưới, từ việc chọn concept, tìm nhà cung cấp đến các...",
  },
];

const availableColors = [
  ["#f9b85d", "#F9E8C8", "#393B0F", "#555726", "#AC2A21"],
  ["#DDCE90", "#F0DECE", "#9A2240", "#367F8A", "#B03554"],
  ["#F9E8C8", "#F4E5DC", "#092729", "#C19051", "#004C3F"],
];

const availableColorsCodien = [
  ["#855515", "#DC9D7B", "#FBF7F5"],
  ["#238482", "#90C695", "#FBF9F5"],
  ["#514E8E", "#CFA27F", "#F9F7F5"],
];
const availableColorsTemplate4 = [
  ["#FD567E", "#183972", "#F4FBFF"],
  ["#8F184B", "#F7687E", "#FFEFF6"],
  ["#CA5848", "#FFBA6F", "#FFFAF1"],
];

const availableValuesCoBa: Section[] = [
  {
    id: 0,
    type: "Banner",
    props: {
      bride: "Thanh Tuấn",
      groom: "& Ngọc Anh",
      date: "12-11-2024",
    },
    code: "",
  },
  {
    id: 1,
    type: "Invitation",
    props: {
      time: "17:00",
      date: "ngày 12 tháng 11 năm 2024",
      location: "Phủ chủ tịch, 02 hùng vương, quận ba đình, hà nội",
      description: "Sự hiện diện của bạn là niềm vinh dự của chúng tôi!",
      congratulations: {
        name: "",
        phone: 0,
        isWedding: false,
        isCeremony: false,
        moreOne: false,
      },
      bridge: "& Ngọc Anh",
      groom: "Thanh Tuấn",
    },
    code: "",
  },
  {
    id: 2,
    type: "Introduction",
    props: {
      contentBridge:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
      contentGroom:
        "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
    },
    code: "",
  },
  {
    id: 3,
    type: "StorySection",
    props: {
      title: "Chuyện chúng mình",
      description:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
    },
    code: "",
  },
  { id: 4, type: "AlbumSection", props: [], code: "" },
  {
    id: 5,
    type: "TimelineSection",
    props: {
      mainTitle: "Cột mốc",
      elements: [
        {
          date: "11-12-2024",
          title: "Lần đầu gặp nhau",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "11-12-2024",
          title: "Chuyến đi đầu tiên",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "11-12-2024",
          title: "Hẹn ước trọn đời",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
      ],
    },
    code: "",
  },
  {
    id: 6,
    type: "EventsSection",
    props: {
      events: [
        {
          id: 1,
          number: "01",
          title: "Nhà gái",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          number: "02",
          title: "Nhà trai",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "105.835878",
            longitude: "21.028111",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 3,
          number: "03",
          title: "Nhà gái",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 4,
          number: "04",
          title: "Nhà gái",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
      ],
    },
    code: "",
  },
  {
    id: 7,
    type: "MessageSection",
    props: {
      messages: [
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
      ],
    },
    code: "",
  },
  {
    id: 8,
    type: "BankSection",
    props: {
      nameBridge: "Hoàng Ngọc ANh",
      nameGroom: "Trần Anh Tuấn",
      bankNameBridge: "Ngân hàng BIDV",
      bankNameGroom: "Ngân hàng BIDV",
      bankNumberBridge: "8802686868",
      bankNumberGroom: "8802686868",
    },
    code: "",
  },
];

const availableValuesTemplate1: Section[] = [
  {
    id: 1,
    type: "Banner",
    props: {
      groom: "Thanh Tuấn",
      bride: "Ngọc Anh",
      date: "12-11-2024",
    },
    code: "",
  },
  {
    id: 3,
    type: "Introduction",
    props: {
      contentBride:
        "Là một người hay cười nhưng lại sống nội tâm và hay khóc thầm, không thích đọc sách nhưng thích mua, thích đi du lịch, thích trồng hoa. Và mình cũng cực thích Trường nữa :3",
      contentGroom:
        "Là một người hay cười nhưng lại sống nội tâm và hay khóc thầm, không thích đọc sách nhưng thích mua, thích đi du lịch, thích trồng hoa. Và mình cũng cực thích Trường nữa :3",
      nameGroom: "Thanh Tuấn",
      nameBride: "Ngọc Anh",
      fatherGroom: "Nguyễn ĐỨc Thao",
      motherGroom: "Ngô Thi Miên",
      fatherBride: "Nguyễn Văn Hải",
      motherBride: "Đặng Thị Chiêm",
      title: "Và.. Ngày ấy đã tới",
      description:
        "Thật vui vì được gặp và đón tiếp các bạn trong một dịp đặc biệt - Ngày cưới của chúng mình . Chúng mình muốn gửi đến bạn những lời cảm ơn sâu sắc nhất và để bạn biết rằng chúng mình rất hạnh phúc khi thấy bạn ở đó. Cảm ơn các bạn rất nhiều vì sự hiện diện cùng những lời chúc tốt đẹp mà bạn đã dành cho chúng mình nha!",
    },
    code: "",
  },
  {
    id: 4,
    type: "StorySection",
    props: {
      title: "Chuyện chúng mình",
    },
    code: "",
  },
  {
    id: 7,
    type: "TimelineSection",
    props: {
      mainTitle: "Cột mốc",
      elements: [
        {
          date: "2024-12-21T11:00",
          title: "Lần đầu gặp nhau",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "2024-12-12T08:00",
          title: "Chuyến đi đầu tiên",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "2024-12-12T08:00",
          title: "Hẹn ước trơn đời",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
      ],
    },
    code: "",
  },
  {
    id: 2,
    type: "Invitation",
    props: {
      date: "ngày 12 tháng 11 năm 2024",
      title: "The Big Day!",
      description:
        "Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng mình có thêm một niềm hạnh phúc!",
      bridge: "Ngọc Anh",
      groom: "Thanh Tuấn",
    },
    code: "",
  },
  {
    id: 6,
    type: "AlbumSection",
    props: {
      albums: [],
    },
    code: "",
  },
  {
    id: 5,
    type: "EventsSection",
    props: {
      description:
        "Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày tồi tệ.",
      events: [
        {
          id: 1,
          number: "01",
          title: "Nhà gái",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          number: "02",
          title: "Nhà trai",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "105.835878",
            longitude: "21.028111",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
      ],
    },
    code: "",
  },
  {
    id: 8,
    type: "MessageSection",
    props: {
      messages: [
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
      ],
    },
    code: "",
  },
  {
    id: 9,
    type: "BankSection",
    props: {
      nameBridge: "Hoàng Ngọc ANh",
      nameGroom: "Trần Anh Tuấn",
      bankNameBridge: "Ngân hàng BIDV",
      bankNameGroom: "Ngân hàng BIDV",
      bankNumberBridge: "8802686868",
      bankNumberGroom: "8802686868",
    },
    code: "",
  },
];

const availableValuesTemplate2: Section[] = [
  {
    id: 1,
    type: "Banner",
    props: {
      title: "Chúng tôi cưới",
      groom: "Thanh Tuấn",
      bride: "Ngọc Anh",
      day: "12",
      month: "11",
      year: "2024",
    },
    code: "",
  },
  {
    id: 2,
    type: "Invitation",
    props: {
      time: "17:00, Thứ 6",
      date: "ngày 12 tháng 11 năm 2024",
      congratulations: {
        name: "",
        phone: 0,
        isWedding: false,
        isCeremony: false,
        moreOne: false,
      },
      day: "12",
      month: "11",
      year: "2024",
      title: "The Big Day!",
      description:
        "Một lời chúc của bạn chắc chắn sẽ làm cho đám cưới của chúng mình có thêm một niềm hạnh phúc!",
      subDescription: "Sự hiện diện của bạn là niềm vinh dự của chúng tôi!",
      location: "Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
    },
    code: "",
  },
  {
    id: 3,
    type: "Introduction",
    props: {
      nameGroom: "Tiến Mạnh",
      nameBridge: "Ngọc Quỳnh ",
    },
    code: "",
  },
  {
    id: 6,
    type: "AlbumSection",
    props: {
      albums: [],
    },
    code: "",
  },
  {
    id: 4,
    type: "StorySection",
    props: {
      title: "Chuyện chúng mình",
      content:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
    },
    code: "",
  },
  {
    id: 7,
    type: "TimelineSection",
    props: {
      mainTitle: "Cột mốc",
      elements: [
        {
          day: "12",
          month: "11",
          year: "2024",
          title: "Lần đầu gặp nhau",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          day: "12",
          month: "11",
          year: "2024",
          title: "Chuyến đi đầu tiên",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          day: "12",
          month: "11",
          year: "2024",
          title: "Hẹn ước trơn đời",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
      ],
    },
    code: "",
  },
  {
    id: 5,
    type: "EventsSection",
    props: {
      title: "Sự kiện",
      events: [
        {
          id: 1,
          title: "Ăn hỏi",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "11:00",
          day: "11",
          month: "02",
          year: "2024",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          title: "Đón dâu",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "11:00",
          day: "11",
          month: "02",
          year: "2024",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          title: "Tiệc cưới",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "11:00",
          day: "11",
          month: "02",
          year: "2024",
          link: "https://g.page/vienhuyethoc?share",
        },
      ],
    },
    code: "",
  },
  {
    id: 8,
    type: "MessageSection",
    props: {
      messages: [
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
      ],
    },
    code: "",
  },
  {
    id: 9,
    type: "BankSection",
    props: {
      nameBridge: "Hoàng Ngọc ANh",
      nameGroom: "Trần Anh Tuấn",
      bankNameBridge: "Ngân hàng BIDV",
      bankNameGroom: "Ngân hàng BIDV",
      bankNumberBridge: "8802686868",
      bankNumberGroom: "8802686868",
      description:
        "Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nhé ^^. Cảm ơn bạn rất nhiều!",
    },
    code: "",
  },
];

const availableValuesTemplate3: Section[] = [
  {
    id: 1,
    type: "Banner",
    props: {
      title: "Chúng tôi cưới",
      groom: "Tiến Mạnh",
      bride: "Ngọc Quỳnh",
      date: "10-12-2024",
    },
    code: "",
  },
  {
    id: 2,
    type: "Invitation",
    props: {
      time: "10",
      address: "Số 13, phố Tố Hữu, Hà Đông, Hà Nội",
      congratulations: {
        name: "",
        phone: 0,
        isWedding: false,
        isCeremony: false,
        moreOne: false,
      },
      day: "Tháng 11, 2024",
      date: "9:00, Thứ 6",
      title: "Trân trọng kính mời!",
      description: "tới dự hôn lễ của 2 vợ chồng chúng tôi",
      subDescription: "Sự hiện diện của bạn là niềm vinh dự của chúng tôi",
      location: "Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
    },
    code: "",
  },
  {
    id: 3,
    type: "Introduction",
    props: {
      nameGroom: "Tiến Mạnh",
      nameBride: "Ngọc Quỳnh",
      contentBride:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
      contentGroom:
        "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
    },
    code: "",
  },
  {
    id: 6,
    type: "AlbumSection",
    props: {
      albums: [],
    },
    code: "",
  },
  {
    id: 4,
    type: "StorySection",
    props: {
      title: "Chuyện chúng mình",
      content:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
    },
    code: "",
  },
  {
    id: 7,
    type: "TimelineSection",
    props: {
      mainTitle: "Cột mốc",
      elements: [
        {
          date: "09-11-2023",
          title: "Lần đầu gặp nhau",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "09-11-2023",
          title: "Chuyến đi đầu tiên",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "09-11-2023",
          title: "Hẹn ước trơn đời",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
      ],
    },
    code: "",
  },
  {
    id: 5,
    type: "EventsSection",
    props: {
      title: "Sự kiện",
      events: [
        {
          id: 1,
          title: "Ăn hỏi",
          subTitle: "Nhà gái",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "09-11-2023",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          title: "Đón dâu",
          subTitle: "Nhà gái",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "09-11-2023",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          title: "Tiệc cưới",
          subTitle: "Nhà gái",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "09-11-2023",
          link: "https://g.page/vienhuyethoc?share",
        },
      ],
    },
    code: "",
  },
  {
    id: 8,
    type: "MessageSection",
    props: {
      messages: [
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
      ],
    },
    code: "",
  },
  {
    id: 9,
    type: "BankSection",
    props: {
      nameBridge: "Hoàng Ngọc ANh",
      nameGroom: "Trần Anh Tuấn",
      bankNameBridge: "Ngân hàng BIDV",
      bankNameGroom: "Ngân hàng BIDV",
      bankNumberBridge: "8802686868",
      bankNumberGroom: "8802686868",
      title: "Mừng cưới",
      description:
        "Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nhé ^^. Cảm ơn bạn rất nhiều!",
    },
    code: "",
  },
];

const availableValuesTemplate4: Section[] = [
  {
    id: 1,
    type: "Banner",
    props: {
      title: "Chúng tôi cưới",
      groom: "Tiến Mạnh",
      bride: "Ngọc Quỳnh",
      date: "10-12-2024",
    },
    code: "",
  },
  {
    id: 2,
    type: "Invitation",
    props: {
      address: "Số 13, phố Tố Hữu, Hà Đông, Hà Nội",
      congratulations: {
        name: "",
        phone: 0,
        isWedding: false,
        isCeremony: false,
        moreOne: false,
      },
      date: "10 - 11 -2024",
      title: "Trân trọng kính mời!",
      description:
        "Tới dự hôn lễ của 2 vợ chồng chúng tôi Sự hiện diện của bạn là niềm vinh dự của chúng tôi!",
      location: "Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
    },
    code: "",
  },
  {
    id: 3,
    type: "Introduction",
    props: {
      nameGroom: "Tiến Mạnh",
      nameBride: "Ngọc Quỳnh",
      contentBride:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
      contentGroom:
        "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
    },
    code: "",
  },
  {
    id: 4,
    type: "StorySection",
    props: {
      title: "Chuyện chúng mình",
      content:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
    },
    code: "",
  },
  {
    id: 7,
    type: "TimelineSection",
    props: {
      mainTitle: "Cột mốc",
      elements: [
        {
          date: "09-11-2023",
          title: "Lần đầu gặp nhau",
          content:
            "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
        },
        {
          date: "09-11-2023",
          title: "Chuyến đi đầu tiên",
          content:
            "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
        },
        {
          date: "09-11-2023",
          title: "Hẹn ước trơn đời",
          content:
            "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
        },
      ],
    },
    code: "",
  },
  {
    id: 6,
    type: "AlbumSection",
    props: {
      albums: [],
    },
    code: "",
  },
  {
    id: 5,
    type: "EventsSection",
    props: {
      title: "Sự kiện",
      events: [
        {
          id: 1,
          title: "Ăn hỏi",
          subTitle: "Nhà gái",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "09-11-2023",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          title: "Đón dâu",
          subTitle: "Nhà gái",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "09-11-2023",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          title: "Tiệc cưới",
          subTitle: "Nhà gái",
          address: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
          dateTime: "09-11-2023",
          link: "https://g.page/vienhuyethoc?share",
        },
      ],
    },
    code: "",
  },
  {
    id: 8,
    type: "MessageSection",
    props: {
      messages: [
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
      ],
    },
    code: "",
  },
  {
    id: 9,
    type: "BankSection",
    props: {
      nameBridge: "Hoàng Ngọc ANh",
      nameGroom: "Trần Anh Tuấn",
      bankNameBridge: "Ngân hàng BIDV",
      bankNameGroom: "Ngân hàng BIDV",
      bankNumberBridge: "8802686868",
      bankNumberGroom: "8802686868",
      title: "Mừng cưới",
      description:
        "Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha ^^. Cảm ơn bạn rất nhiều!",
    },
    code: "",
  },
];

const availableValuesTemplate8: Section[] = [
  {
    id: 0,
    type: "Banner",
    props: {
      bride: "Mạnh Linh",
      groom: "Ngọc Anh",
      date: "30-05-2025",
    },
    code: "",
  },
  {
    id: 1,
    type: "Invitation",
    props: {
      time: "17:00",
      date: "ngày 12 tháng 11 năm 2024",
      location: "Phủ chủ tịch, 02 hùng vương, quận ba đình, hà nội",
      description: "Sự hiện diện của bạn\nlà niềm vinh dự của chúng tôi!",
      title:"Trân trọng kính mời!",
      subDescription:
        "tới dự hôn lễ của 2 vợ chồng chúng tôi",
      timer:"08:30 Chủ nhật",
      day: "30",
      month: "05",
      year: "2025",
      locationdemo: "Tại Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
      congratulations: {
        name: "",
        phone: 0,
        isWedding: false,
        isCeremony: false,
        moreOne: false,
      },
      bridge: "& Ngọc Anh",
      groom: "Thanh Tuấn",
    },
    code: "",
  },
  {
    id: 2,
    type: "EventsSection",
    props: {
      events: [
        {
          id: 1,
          number: "01",
          title: "Nhà gái",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          number: "02",
          title: "Nhà trai",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "105.835878",
            longitude: "21.028111",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 3,
          number: "03",
          title: "Nhà gái",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 4,
          number: "04",
          title: "Nhà gái",
          address: {
            description: "45 Nguyễn Khoái, Hai Bà Trưng, Hà nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "2024-12-21T11:00",
          link: "https://g.page/vienhuyethoc?share",
        },
      ],
      eventstemplate8:[
        {
          id: 1,
          title: "Ăn hỏi",
          address: {
            description: "Nhà gái, Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "08:30, ngày 30/5/2025",
        },
        {
          id: 2,
          title: "Đón dâu",
          address: {
            description: "Nhà gái, Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "08:30, ngày 30/5/2025",
        },
        {
          id: 3,
          title: "Tiệc cưới",
          address: {
            description: "Nhà gái, Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
            latitude: "",
            longitude: "",
          },
          dateTime: "08:30, ngày 30/5/2025",
        },
      ]
    },
    code: "",
  },
  {
    id: 3,
    type: "StorySection",
    props: {
      title: "Chuyện chúng mình",
      description:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
    },
    code: "",
  },
  { id: 4, type: "AlbumSection", props: [], code: "" },
  {
    id: 5,
    type: "TimelineSection",
    props: {
      mainTitle: "Cột mốc",
      elements: [
        {
          date: "11-12-2024",
          title: "Lần đầu gặp nhau",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "11-12-2024",
          title: "Chuyến đi đầu tiên",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "11-12-2024",
          title: "Hẹn ước trọn đời",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
      ],
    },
    code: "",
  },
 
   {
    id: 6,
    type: "Introduction",
    props: {
      contentBridge:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
      contentGroom:
        "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
    },
    code: "",
  },
  {
    id: 7,
    type: "MessageSection",
    props: {
      messages: [
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
      ],
    },
    code: "",
  },
  {
    id: 8,
    type: "BankSection",
    props: {
      nameBridge: "Hoàng Ngọc ANh",
      nameGroom: "Trần Anh Tuấn",
      bankNameBridge: "Ngân hàng BIDV",
      bankNameGroom: "Ngân hàng BIDV",
      bankNumberBridge: "8802686868",
      bankNumberGroom: "8802686868",
    },
    code: "",
  },
];

const availableValuesTemplate6: Section[] = [
  {
    id: 0,
    type: "Banner",
    props: {
      groom: "Thành Long",
      bride: "Quỳnh Lan",
      date: "10-11-2024",
    },
    code: "",
  },
  {
    id: 1,
    type: "Invitation",
    props: {
      time: "9:00 - Thứ 6",
      date: "ngày 10 tháng 11 năm 2024",
      address: "Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
      description: "tới dự hôn lễ của 2 vợ chồng chúng tôi",
      congratulations: {
        name: "",
        phone: 0,
        isWedding: false,
        isCeremony: false,
        moreOne: false,
      },
      bridge: "& Ngọc Anh",
      groom: "Thanh Tuấn",
      title: "TRân trọng kính mời",
    },
    code: "",
  },
  {
    id: 2,
    type: "Introduction",
    props: {
      nameGroom: "Thành Long",
      nameBride: "Quỳnh Lan",
      contentBride:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
      contentGroom:
        "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
    },
    code: "",
  },
  {
    id: 3,
    type: "StorySection",
    props: {
      title: "CHUYỆN CHÚNG MÌNH",
      description:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ..",
    },
    code: "",
  },
  {
    id: 5,
    type: "TimelineSection",
    props: {
      mainTitle: "CỘT MỐC",
      elements: [
        {
          date: "Ngày 10-12-2024",
          title: "Lần đầu gặp nhau",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "Ngày 10-12-2024",
          title: "Chuyến đi đầu tiên",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
        {
          date: "Ngày 10-12-2024",
          title: "Hẹn ước trọn đời",
          content:
            "Mỗi lời chúc phúc và sự hiện diện của bạn trong ngày đặc biệt này chính là món quà vô giá với chúng tôi. Hãy cùng chúng tôi tận hưởng niềm vui, tiếng cười và sự ấm áp trong ngày hạnh phúc nhất này!",
        },
      ],
    },
    code: "",
  },
  {
    id: 4,
    type: "AlbumSection",
    props: {
      title: "Ảnh cưới",
      description:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
      albums: [],
    },
    code: "",
  },
  {
    id: 6,
    type: "EventsSection",
    props: {
      title: "Sự kiện",
      events: [
        {
          id: 1,
          number: "01",
          title: "Ăn hỏi",
          address: "NHÀ GÁI - Số 12, PHỐ TỐ HỮU, HÀ ĐÔNG, HÀ NỘI",
          time: "9:00, Thứ 6",
          date: "NGÀY 10 THÁNG 11 NĂM 2024",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          number: "02",
          title: "Đón dâu",
          address: "NHÀ GÁI - Số 12, PHỐ TỐ HỮU, HÀ ĐÔNG, HÀ NỘI",
          time: "9:00, Thứ 6",
          date: "NGÀY 10 THÁNG 11 NĂM 2024",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 3,
          number: "03",
          title: "Tiệc cưới",
          address: "NHÀ GÁI - Số 12, PHỐ TỐ HỮU, HÀ ĐÔNG, HÀ NỘI",
          time: "9:00, Thứ 6",
          date: "NGÀY 10 THÁNG 11 NĂM 2024",
          link: "https://g.page/vienhuyethoc?share",
        },
      ],
    },
    code: "",
  },
  {
    id: 7,
    type: "MessageSection",
    props: {
      messages: [
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
      ],
    },
    code: "",
  },
  {
    id: 8,
    type: "BankSection",
    props: {
      title: "HỘP MỪNG CƯỚI",
      description:
        "Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha ^^. Cảm ơn bạn rất nhiều!",
      nameBridge: "Hoàng Ngọc ANh",
      nameGroom: "Trần Anh Tuấn",
      bankNameBridge: "Ngân hàng BIDV",
      bankNameGroom: "Ngân hàng BIDV",
      bankNumberBridge: "8802686868",
      bankNumberGroom: "8802686868",
    },
    code: "",
  },
];

const availableValuesTemplate7: Section[] = [
  {
    id: 0,
    type: "Banner",
    props: {
      groom: "Mạnh Quân",
      bride: "Minh Anh",
      date: "30-05-2025",
    },
    code: "",
  },
  {
    id: 1,
    type: "Invitation",
    props: {
      time: "lúc 08:30",
      date: "30/05/2025",
      address: "Tại Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
      description: "Sự hiện diện của bạn\nlà niềm vinh dự của chúng tôi!",
      congratulations: {
        name: "",
        phone: 0,
        isWedding: false,
        isCeremony: false,
        moreOne: false,
      },
      bridge: "& Ngọc Anh",
      groom: "Thanh Tuấn",
      title: "Trân trọng kính mời",
      subTitle: "tới dự hôn lễ của 2 vợ chồng chúng tôi",
    },
    code: "",
  },

  {
    id: 6,
    type: "EventsSection",
    props: {
      title: "Sự kiện",
      events: [
        {
          id: 1,
          number: "01",
          title: "Ăn hỏi",
          address: "Nhà gái - Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
          time: "9:00, thứ 6",
          dateTime: "08:30, ngày 30/5/2025",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 2,
          number: "02",
          title: "Đón dâu",
          address: "Nhà gái - Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
          time: "9:00, thứ 6",
          dateTime: "08:30, ngày 30/5/2025",
          link: "https://g.page/vienhuyethoc?share",
        },
        {
          id: 3,
          number: "03",
          title: "Tiệc cưới",
          address: "Nhà gái - Số 12, phố Tố Hữu, Hà Đông, Hà Nội",
          time: "9:00, thứ 6",
          dateTime: "08:30, ngày 30/5/2025",
          link: "https://g.page/vienhuyethoc?share",
        },
      ],
    },
    code: "",
  },
  {
    id: 2,
    type: "Introduction",
    props: {
      nameGroom: "Mạnh Quân",
      nameBride: "Minh Anh",
      contentBride:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
      contentGroom:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
    },
    code: "",
  },
  {
    id: 3,
    type: "StorySection",
    props: {
      title: "Chuyện chúng mình",
      description:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
    },
    code: "",
  },
  {
    id: 5,
    type: "TimelineSection",
    props: {
      mainTitle: "Những cột mốc",
      elements: [
        {
          date: "30 - 05 -2025",
          title: "Lần đầu gặp nhau",
          content:
            "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu.",
        },
        {
          date: "30 - 05 -2025",
          title: "Chuyến đi đầu tiên",
          content:
            "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu.",
        },
        {
          date: "30 - 05 -2025",
          title: "Hẹn ước trọn đời",
          content:
            "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu.",
        },
      ],
    },
    code: "",
  },
  {
    id: 4,
    type: "AlbumSection",
    props: {
      description:
        "Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.",
      albums: [],
    },
    code: "",
  },
  {
    id: 7,
    type: "MessageSection",
    props: {
      messages: [
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
        {
          name: "Huy Thanh Jewelry",
          content:
            "Huy Thanh rất vui khi được đồng hành cùng hai bạn trong chặng đường hạnh phúc. Dù sông có đổi núi có dời, chúc hai bạn vẫn một đời thương nhau 3",
        },
      ],
    },
    code: "",
  },
  {
    id: 8,
    type: "BankSection",
    props: {
      title: "Mừng cưới",
      description:
        "Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha ^^. Cảm ơn bạn rất nhiều!",
      groom: "Mạnh Quân",
      bride: "Minh Anh",
      nameBridge: "Tên: Pham Minh Anh",
      nameGroom: "Tên: Trần Mạnh Quân",
      bankNameBridge: "Ngân hàng: BIDV",
      bankNameGroom: "Ngân hàng: BIDV",
      bankNumberBridge: "STK: 8802686868",
      bankNumberGroom: "STK: 8802686868",
    },
    code: "",
  },
];
export {
  listMenuAdmin,
  listMenuUser,
  listSubMenuUser,
  availableFonts,
  availableStatusBlogPost,
  // availabUser,
  availablePlans,
  availableNews,
  availableColors,
  availableFontsCoBa,
  availableValuesCoBa,
  availableValuesTemplate1,
  availableColorsTemplate2,
  availableColorsTemplate6,
  availableColorsTemplate7,
  availableValuesTemplate2,
  availableValuesTemplate8,
  availableColorsCodien,
  availableValuesTemplate3,
  availableValuesTemplate4,
  availableColorsTemplate4,
  availableValuesTemplate6,
  availableValuesTemplate7,
};
