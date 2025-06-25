import { useParams } from 'react-router-dom';
import Template from '../../pages/TemplateSubDomain';
import {useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api.config';
import Loading from 'react-loading';

interface CardShare {
  id: number;
  slug: string;
  user_id: number;
  id_template: number;
}

export default function TemplateByAlias() {
  const { alias } = useParams<{ alias?: string }>();
  const [cardShares, setCardShares] = useState<CardShare[]>([]);
  const [loading, setLoading] = useState(true);
  const slug = alias;


  // useEffect(() => {
  //   if (!user?.id) return;

  //   const fetchCardData = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/api/admin/getcardshare/${user.id}`);
  //       const cardshare = response.data.cardshare;
    
  //       // Nếu là mảng thì xử lý như cũ
  //       if (Array.isArray(cardshare)) {
  //         const cleanedData = cardshare.map((card: any) => ({
  //           ...card,
  //           id: Number(card.id),
  //           user_id: Number(card.user_id),
  //           id_template: Number(card.id_template),
  //         }));
  //         setCardShares(cleanedData);
  //       } else if (typeof cardshare === "object" && cardshare !== null) {
  //         // Nếu chỉ là 1 object duy nhất
  //         const cleanedCard = {
  //           ...cardshare,
  //           id: Number(cardshare.id),
  //           user_id: Number(cardshare.user_id),
  //           id_template: Number(cardshare.id_template),
  //         };
  //         setCardShares([cleanedCard]); // đưa vào mảng
  //       } else {
  //         setCardShares([]); // fallback nếu rỗng
  //       }
    
  //     } catch (error) {
  //       console.error("❌ Lỗi khi tải dữ liệu thiệp:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchCardData();
  // }, [user?.id]);
    useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        // 1. Gọi API lấy user_id và id_template từ slug
        const slugResponse = await axios.get(`${API_BASE_URL}/api/guest/gettemplatebyslug/${slug}`);
        const { user_id } = slugResponse.data.data;

        // 2. Gọi API lấy card share theo user_id
        const response = await axios.get(`${API_BASE_URL}/api/admin/getcardshare/${user_id}`);
        const cardshare = response.data.cardshare;

        // 3. Xử lý dữ liệu cardshare
        if (Array.isArray(cardshare)) {
          const cleanedData = cardshare.map((card: any) => ({
            ...card,
            id: Number(card.id),
            user_id: Number(card.user_id),
            id_template: Number(card.id_template),
          }));
          setCardShares(cleanedData);
        } else if (typeof cardshare === "object" && cardshare !== null) {
          const cleanedCard = {
            ...cardshare,
            id: Number(cardshare.id),
            user_id: Number(cardshare.user_id),
            id_template: Number(cardshare.id_template),
          };
          setCardShares([cleanedCard]);
        } else {
          setCardShares([]);
        }

      } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu:", error);
        setCardShares([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);


  if (loading) return <div>
     {loading && (
                    <div style={{
                        position: 'fixed', // giúp overlay toàn màn hình
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)', // lớp mờ nền nhẹ
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999 // đảm bảo nổi trên cùng
                    }}>
                        <Loading
                            type="spinningBubbles"
                            color="rgba(237,131,131)"
                            height={100}
                            width={100}
                        />
                    </div>
                )}
  </div>;

  if (!alias) return <div>Alias không tồn tại</div>;

  const matchedCard = cardShares.find((card) => card.slug === alias);

  if (!matchedCard) {
    return <div>Not found</div>;
  }

  return <Template userId={matchedCard.user_id} themeId={matchedCard.id_template} />;
}


