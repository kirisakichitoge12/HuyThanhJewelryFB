import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Coba from "../components/templates/Coba/Coba";
import Template1 from "../components/templates/template1/Template1";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api.config";
import SangTrong from "../components/templates/SangTrong/SangTrong";
import Codien from "../components/templates/template3/template3";
import Tinhyeu from "../components/templates/template4/template4";
import Nhenhang from "../components/templates/template6/template6";
import Hoathoa from "../components/templates/template7/Template7";
import Template8 from "../components/templates/template8/Template5";

const Template: React.FC = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const [templateId, setTemplateId] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { id, userId, themeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = null;

        if (themeId && userId) {
          setIsDisabled(false);
          response = await axios.get(
            `${API_BASE_URL}/api/widgets/${userId}/${themeId}`
          );
        } else if (id && user) {
          response = await axios.get(
            `${API_BASE_URL}/api/widgets/${user.id}/${id}`
          );
          localStorage.setItem("userId", JSON.stringify(user.id));
        }

        if (response) {
          const data = response.data;
          console.log("API Response:", data);

          if (data) {
            const theme: number = parseInt(data.templateId_default);
            if (theme > 0) {
              setTemplateId(theme);
            }
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error)
          console.error("Lỗi khi lấy dữ liệu:", error.message);
      }
    };
    fetchData();
  }, [id, userId, themeId, user]);

  if (!templateId) return null;

  return (
    <>
      {templateId === 1 && <Coba disabled={isDisabled} />}
      {templateId === 2 && <Template1 />}
      {templateId === 3 && <SangTrong />}
      {templateId === 4 && <Codien />}
      {templateId === 5 && <Tinhyeu />}
      {templateId === 6 && <Nhenhang />}
      {templateId === 7 && <Hoathoa />}
      {templateId === 8 && <Template8 />}
    </>
  );
};

export default Template;
