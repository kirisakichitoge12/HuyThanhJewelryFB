import React, { useEffect, useState } from "react";

import Each from "../../../layouts/Each";
import ComponentToolbar from "../../common/ComponentToolbar";
import { useConfirmModal } from "../../../hooks/modals";
import FormField from "../../common/FormField";
import Button from "../../common/Button";
import RichImageEditor from "../../common/RichImageEditor";
import { API_BASE_URL } from "../../../config/api.config";
import { availableColorsTemplate7 } from "../../../config";


import Picture from "../../../assets/images/templates/template7/timeline.png";
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
      className="relative w-full py-[50px] font-meowScript"
      style={{ backgroundColor: availableColorsTemplate7[style][2] }}
    >
      <section className="max-w-9xl mx-auto md:h-screen px-[15px] md:px-[86px] gap-[56px]">
        <div className="text-center">
          <p
            className=" font-montserrat text-[18px]"
            style={{
              color: availableColorsTemplate7[style][1],
            }}
          >
            Cùng nhìn lại
          </p>
          <EditableField
            initialValue={mainTitle}
            name="mainTitle"
            id={`mainTitle-${id}`}
            disabled={disabled}
            styleThemes={{
              color: availableColorsTemplate7[style][0],
            }}
            className="text-[56px] md:text-[80px]"
            onChangeBlur={onSectionChangetest}
          />
        </div>

        <div className="relative mt-[140px] md:mt-[272px] grid md:grid-cols-3 justify-center items-end md:items-center w-full gap-y-[150px] gap-x-[87px]">
          <Each
            of={data}
            render={(item: TimelineProps, index: number) => (
              <div
                className={`max-w-full flex justify-end items-end border border-transparent ${
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
                  className={`relative md:w-full flex flex-col justify-end items-end min-h-[545px] text-white p-8 rounded-[20px] !bg-opacity-65 w-3/4  ${
                    index == 1 && "md:-translate-y-[127px]"
                  }`}
                  style={{
                    background:
                      availableColorsTemplate7[style][index % 2 ? 1 : 0],
                  }}
                >
                  <div
                    className={`absolute -top-24 rotate-[4deg] w-[300px] h-[376px] md:w-[343px] md:h-[430px] z-10 bg-white p-4 rounded-[25px] border`}
                    style={{ borderColor: availableColorsTemplate7[style][1] }}
                  >
                    {typeof item.image === "string" && item.image.length > 0 ? (
                      <img
                        src={`${API_BASE_URL}/${item.image}`}
                        alt="image"
                        className="object-cover h-[287px] md:h-[332px] w-full"
                      />
                    ) : typeof item.image === "object" &&
                      item.image !== null ? (
                      <img
                        className="object-cover h-[287px] md:h-[332px] w-full"
                        src={URL.createObjectURL(item.image)}
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-[287px] md:h-[332px] w-full object-top object-cover"
                        src={Picture}
                        alt=""
                      />
                    )}
                    <h3
                      className="text-2xl md:text-[48px] text-center mt-5"
                      style={{
                        color: availableColorsTemplate7[style][0],
                        fontFamily: titleFont,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className={`flex flex-col`}>
                    <h1 className="text-[20px] italic pb-4 font-montserrat z-10">
                      {item.date}
                    </h1>
                    <p
                      className="text-base font-montserrat text-start"
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
