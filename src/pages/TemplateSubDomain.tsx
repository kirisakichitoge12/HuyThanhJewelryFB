import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Coba from '../components/templates/Coba/Coba';
import Template1 from '../components/templates/template1/Template1';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config/api.config';
import SangTrong from '../components/templates/SangTrong/SangTrong';
import Codien from '../components/templates/template3/template3';
import Tinhyeu from '../components/templates/template4/template4';
import Nhenhang from '../components/templates/template6/template6';
import Hoathoa from '../components/templates/template7/Template7';


interface TemplateProps {
  userId?: number;
  themeId?: number;
}

const TemplateSubDomain: React.FC<TemplateProps> = (props) => {
  const context = useContext(UserContext);
  const { user } = context;
  const [templateId, setTemplateId] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  // Lấy từ URL nếu không có props
  const params = useParams<{ id?: string; userId?: string; themeId?: string }>();

  const resolvedUserId = props.userId ?? (params.userId ? parseInt(params.userId) : undefined);
  const resolvedThemeId = props.themeId ?? (params.themeId ? parseInt(params.themeId) : undefined);
  const id = params.id;
 
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       let response = null;
//       let allowAccess = false; // Mặc định không cho truy cập

//       if (resolvedThemeId && resolvedUserId) {
//         // Gọi API lấy thông tin widget trước
//         response = await axios.get(`${API_BASE_URL}/api/widgets/${resolvedUserId}/${resolvedThemeId}`);
//         const data = response.data;

//         if (data) {
//           const theme: number = parseInt(data.templateId_default);
//           // if (theme > 0) {
//           //   setTemplateId(theme);
//           // }

//           // Nếu template là 2 => luôn cho phép
//           if (theme === 2) {
//              // Gọi API kiểm tra quyền chia sẻ
//             const packageRes = await axios.get(`${API_BASE_URL}/api/user/package-info/${resolvedUserId}`);
//             const {isFree} = packageRes.data;
//              if (isFree == 1) {
//               allowAccess = true;
//               setTemplateId(theme);
//               // console.log("Package Info:", typeof(isFree));
//             }
//           } else {
//             // Gọi API kiểm tra quyền chia sẻ
//             const packageRes = await axios.get(`${API_BASE_URL}/api/user/package-info/${resolvedUserId}`);
//             const { isFree, isPackage } = packageRes.data;

//             if (isFree == 1 && (isPackage == 1 || isPackage == 2)) {
//               allowAccess = true;
//               setTemplateId(theme);
//               // console.log("Package Info:", typeof(isFree));
//             }

//           }
//         }

//         if (!allowAccess) {
//           setIsDisabled(true);
//           return;
//         }

//         setIsDisabled(false);
//       } else if (id && user) {
//         response = await axios.get(`${API_BASE_URL}/api/widgets/${user.id}/${id}`);
//         localStorage.setItem('userId', JSON.stringify(user.id));

//         if (response?.data) {
//           const theme: number = parseInt(response.data.templateId_default);
//           if (theme > 0) {
//             setTemplateId(theme);
//           }
//         }
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) console.error("Lỗi khi lấy dữ liệu:", error.message);
//     }
//   };

//   fetchData();
// }, [id, resolvedUserId, resolvedThemeId, user]);

useEffect(() => {
  const fetchData = async () => {
    try {
      let response = null;
      let allowAccess = false; // Mặc định không cho truy cập

      if (resolvedThemeId && resolvedUserId) {
        // Gọi API lấy thông tin widget trước
        response = await axios.get(`${API_BASE_URL}/api/widgets/${resolvedUserId}/${resolvedThemeId}`);
        const data = response.data;

        if (data) {
          const theme: number = parseInt(data.templateId_default);

          // Gọi API /api/getalltemplate để lấy thông tin template
          const templateRes = await axios.get(`${API_BASE_URL}/api/getalltemplate`);
          const templates = templateRes.data.data; // Giả định API trả về mảng templates
         const matchingTemplate = templates.find(
            (template: any) => parseInt(template.id) === theme
          );

          let isFreeTemplate: number | null = null;
          if (matchingTemplate) {
            isFreeTemplate = parseInt(matchingTemplate.isFree); // nếu cần ép kiểu
          }

          if (matchingTemplate) {
            isFreeTemplate = matchingTemplate.isFree; // Lấy cột isFree từ template
          }

          // Nếu template là 2 => luôn cho phép nếu isFree == 1
          if (theme == 2) {
            // Gọi API kiểm tra quyền chia sẻ
            const packageRes = await axios.get(`${API_BASE_URL}/api/user/package-info/${resolvedUserId}`);
            const { isFree } = packageRes.data;
            if (isFree == 1) {
              allowAccess = true;
              setTemplateId(theme);
            }
          } else {
            // Gọi API kiểm tra quyền chia sẻ
            const packageRes = await axios.get(`${API_BASE_URL}/api/user/package-info/${resolvedUserId}`);
            const { isFree, isPackage } = packageRes.data;

            // Kiểm tra điều kiện: isFree == 1, (isPackage == 1 hoặc 2), và isFreeTemplate == 1
            if (
              isFree == 1 &&
              (isPackage == 1 || isPackage == 2) &&
              isFreeTemplate == 1
            ) {
              allowAccess = true;
              setTemplateId(theme);
            }
          }
        }

        if (!allowAccess) {
          setIsDisabled(true);
          return;
        }

        setIsDisabled(false);
      } else if (id && user) {
        response = await axios.get(`${API_BASE_URL}/api/widgets/${user.id}/${id}`);
        localStorage.setItem('userId', JSON.stringify(user.id));

        if (response?.data) {
          const theme: number = parseInt(response.data.templateId_default);
          if (theme > 0) {
            setTemplateId(theme);
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.error("Lỗi khi lấy dữ liệu:", error.message);
    }
  };

  fetchData();
}, [id, resolvedUserId, resolvedThemeId, user]);
  if (!templateId) return null;

  return (
    <>
      {templateId === 1 && <Coba disabled={isDisabled}   userIdsub={resolvedUserId?.toString()} themeIdsub={resolvedThemeId} />}
      {templateId === 2 && <Template1 userId={resolvedUserId} themeId={resolvedThemeId} />} 
      {templateId === 3 && <SangTrong userId={resolvedUserId} themeId={resolvedThemeId} />}
      {templateId === 4 && <Codien userId={resolvedUserId} themeId={resolvedThemeId} />}
      {templateId === 5 && <Tinhyeu userId={resolvedUserId} themeId={resolvedThemeId} />}
      {templateId === 6 && <Nhenhang userId={resolvedUserId} themeId={resolvedThemeId} />}
      {templateId === 7 && <Hoathoa userId={resolvedUserId} themeId={resolvedThemeId} />}
    </>
  );
};

export default TemplateSubDomain;
