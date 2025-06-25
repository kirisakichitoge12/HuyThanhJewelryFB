import React, { useEffect, useState } from "react";

import Each from "../../../layouts/Each";
import ComponentToolbar from "../../common/ComponentToolbar";
import { useConfirmModal } from "../../../hooks/modals";
import FormField from "../../common/FormField";
import Button from "../../common/Button";
import RichImageEditor from "../../common/RichImageEditor";
import { API_BASE_URL } from "../../../config/api.config";
import { availableColorsTemplate6 } from "../../../config";
import TimelinesDeco11 from "../../../assets/images/templates/template6/timlines/timelineDeco11.png";
import TimelinesDeco12 from "../../../assets/images/templates/template6/timlines/timelineDeco12.png";
import TimelinesDeco13 from "../../../assets/images/templates/template6/timlines/timelineDeco13.png";

import TimelinesDeco21 from "../../../assets/images/templates/template6/timlines/timelineDeco21.png";
import TimelinesDeco22 from "../../../assets/images/templates/template6/timlines/timelineDeco22.png";
import TimelinesDeco23 from "../../../assets/images/templates/template6/timlines/timelineDeco23.png";

import TimelinesDeco31 from "../../../assets/images/templates/template6/timlines/timelineDeco31.png";
import TimelinesDeco32 from "../../../assets/images/templates/template6/timlines/timelineDeco32.png";
import TimelinesDeco33 from "../../../assets/images/templates/template6/timlines/timelineDeco33.png";

import Deco1 from "../../../assets/images/templates/template6/timlines/deco1.png";
import Deco2 from "../../../assets/images/templates/template6/timlines/deco2.png";
import Deco3 from "../../../assets/images/templates/template6/timlines/deco3.png";

import BG1 from "../../../assets/images/templates/template6/timlines/bg1.png";
import BG2 from "../../../assets/images/templates/template6/timlines/bg2.png";
import BG3 from "../../../assets/images/templates/template6/timlines/bg3.png";

import Picture from "../../../assets/images/templates/template6/timelineImage.jpg";
import EditableField from "../../common/EditableField";
export interface TimelineProps {
  date: string;
  title: string;
  content: string;
  image?: string | File;
}

interface TimeLineSectionProps {
  id: string;
  elements: TimelineProps[];
  disabled?: boolean;
  titleFont: string;
  style: number;
  contentFont: string;
  mainTitle?: string;
  onSectionChange: (
    name: string,
    newValue: TimelineProps | TimelineProps[],
    subField?: string,
    i?: number
  ) => void;
  onSectionChangetest: (name: string, newValue: string | File) => void;
}

const TimelineSection: React.FC<TimeLineSectionProps> = ({
  id,
  elements,
  titleFont,
  contentFont,
  disabled,
  mainTitle,
  style,
  onSectionChange,
  onSectionChangetest,
}) => {
  const [currentSection, setCurrentSection] = useState<number>(-1);
  const [data, setData] = useState<TimelineProps[]>([]);
  const [isEdit, setIsEdit] = useState<TimelineProps | null>(null);
  const { onOpen } = useConfirmModal();
  const bgs: string[] = [BG1, BG2, BG3];
  const timelinesDecos: string[][] = [
    [TimelinesDeco11, TimelinesDeco12, TimelinesDeco13],
    [TimelinesDeco21, TimelinesDeco22, TimelinesDeco23],
    [TimelinesDeco31, TimelinesDeco32, TimelinesDeco33],
  ];
  const decos: string[] = [Deco1, Deco2, Deco3];
  const handleCopy = (index: number): void => {
    const newSection: TimelineProps = { ...data[index] };
    const oldTimelines = [...data];
    const newTimelines = [
      ...oldTimelines.slice(0, index + 1),
      newSection,
      ...oldTimelines.slice(index + 1),
    ];
    setData(newTimelines);
    onSectionChange("elements", newTimelines);
  };
  const handleMoveUp = (index: number): void => {
    if (index === 0) return;
    const oldTimelines = [...data];
    [oldTimelines[index - 1], oldTimelines[index]] = [
      oldTimelines[index],
      oldTimelines[index - 1],
    ];
    setData(oldTimelines);
    onSectionChange("elements", oldTimelines);
  };

  const handleMoveDown = (index: number): void => {
    if (index === data.length - 1) return;
    const oldTimelines = [...data];
    [oldTimelines[index], oldTimelines[index + 1]] = [
      oldTimelines[index + 1],
      oldTimelines[index],
    ];
    setData(oldTimelines);
    onSectionChange("elements", oldTimelines);
  };

  const handleDelete = (index: number): void => {
    const oldTimelines = [...data];
    const newTimelines = oldTimelines.filter((_, i) => i !== index);
    setData(newTimelines);
    onSectionChange("elements", newTimelines);
  };

  const handleSave = () => {
    if (isEdit !== null) {
      const update: TimelineProps = { ...isEdit };
      console.log(update);
      const oldEvents = [...data];
      if (currentSection > -1) {
        oldEvents[currentSection] = update;
        setData(oldEvents);
        onSectionChange("elements", update, undefined, currentSection);
      }
      setIsEdit(null);
    }
  };
  const handleTimelineClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentSection(index);
  };
  useEffect(() => {
    if (elements.length > 0 && Array.isArray(elements)) {
      setData(elements);
    } else {
      setData([]);
    }
  }, []);
  return (
    <section
      className="relative w-full py-[50px] font-pacifico"
      style={{
        backgroundImage: `url(${bgs[style]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%", 
      }}
    >
      <section className="max-w-9xl mx-auto flex flex-col justify-center items-center px-[15px] md:px-[86px] gap-[30px]">
        <div className="text-center">
          <EditableField
            initialValue={mainTitle}
            name="mainTitle"
            id={`mainTitle-${id}`}
            disabled={disabled}
            styleThemes={{
              color: availableColorsTemplate6[style][0],
            }}
            className="text-[48px] font-CormorantUnicase"
            onChangeBlur={onSectionChangetest}
          />
          <p className="text-dark-100 font-EncodeSans font-[18px]">
            Những cột mốc đặc biệt của chúng tôi
          </p>
        </div>

        <div className="relative grid md:grid-cols-3 justify-center items-end md:items-center w-full gap-y-[100px]">
          <Each
            of={data}
            render={(item: TimelineProps, index: number) => (
              <div
                className={`max-w-full border border-transparent ${
                  !disabled && "hover:border-[#855515]"
                }  md:relative w-full`}
                onClick={(e) => handleTimelineClick(e, index)}
              >
                {currentSection === index && !disabled ? (
                  <div className="absolute -top-[160px] left-0 w-full h-full flex justify-center items-center font-sans">
                    <ComponentToolbar
                      title="Sửa mốc thời gian"
                      isMoveUp={index !== 0}
                      isMoveDown={index !== data.length - 1}
                      onCopy={() => handleCopy(index)}
                      onMoveUp={() => handleMoveUp(index)}
                      onEdit={() => setIsEdit(item)}
                      onMoveDown={() => handleMoveDown(index)}
                      onDelete={() => onOpen("", () => handleDelete(index))}
                    />
                  </div>
                ) : null}
                <div
                  className={` relative w-full flex flex-col justify-center items-center`}
                >
                  <div className={`w-[277px] h-[365px] object-cover z-10`}>
                    {typeof item.image === "string" && item.image.length > 0 ? (
                      <img
                        src={`${API_BASE_URL}/${item.image}`}
                        alt="image"
                        className="object-cover h-[365px] w-full"
                      />
                    ) : typeof item.image === "object" &&
                      item.image !== null ? (
                      <img
                        className="object-cover h-[365px] w-full"
                        src={URL.createObjectURL(item.image)}
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-[365px] w-full object-top object-cover"
                        src={Picture}
                        alt=""
                      />
                    )}
                  </div>
                  <img src={decos[style]} className="absolute top-[33%]" />
                  <div
                    className={`md:col-start-14 md:col-end-24 row-start-1 relative md:inline-block md:py-3 w-full flex md:flex-row flex-col justify-center items-center z-20 md:z-0 `}
                  >
                    <div className="relative w-full space-y-2 text-center my-6 md:my-auto py-[22px] md:py-[26px] md:px-8">
                      <h1
                        className="text-[16px] font-EncodeSans z-10"
                        style={{ color: availableColorsTemplate6[style][0] }}
                      >
                        {item.date}
                      </h1>
                      <h3
                        className="uppercase text-2xl md:text-[32px] break-words font-CormorantUnicase"
                        style={{
                          borderColor: availableColorsTemplate6[style][0],
                          color: availableColorsTemplate6[style][0],
                          fontFamily: titleFont,
                        }}
                      >
                        {item.title}
                      </h3>
                      <img
                        src={timelinesDecos[style][index]}
                        alt="icon deco"
                        className="absolute top-0 left-0 mb-[15px] h-[120px] w-full object-fill opacity-30 -z-10"
                      />
                    </div>
                    <p
                      className="text-base  mt-5 font-beVietnamPro text-center text-dark-100"
                      style={{ fontFamily: contentFont }}
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </section>
      {isEdit !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            event.stopPropagation()
          }
        >
          <div
            className={` w-full max-w-2xl bg-white rounded-lg shadow-lg px-8 py-4 space-y-5`}
          >
            <h2 className="text-xl  font-semibold text-gray-800">
              Sửa cột mốc
            </h2>
            <div className="space-y-5">
              <RichImageEditor
                id={`introduction-image-${id}`}
                name={"_"}
                onChange={(_, newValue) =>
                  setIsEdit({ ...isEdit, image: newValue })
                }
                disabled={disabled}
                src={
                  typeof isEdit.image === "string"
                    ? `${API_BASE_URL}/${isEdit.image}`
                    : Picture
                }
                className=" relative w-full h-[300px] object-contain border-[1px] border-gray-100 rounded-md shadow-md"
                alt={`${isEdit.content}`}
              />
              <div className="flex justify-center items-center gap-2">
                <FormField
                  placeholder="Nhập tiêu đề"
                  value={isEdit.title || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIsEdit({
                      ...isEdit,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="datetime-local"
                  className="shadow px-4 outline-none py-2 rounded-lg"
                  value={isEdit.date || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIsEdit({
                      ...isEdit,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <textarea
                className="shadow px-4 outline-none py-2 rounded-lg w-full h-[200px]"
                value={isEdit.content || ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setIsEdit({
                    ...isEdit,
                    content: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-5">
              <Button onClick={() => setIsEdit(null)} color="none">
                Hủy
              </Button>
              <Button onClick={handleSave} style={{ padding: "10px 40px" }}>
                Lưu
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TimelineSection;
