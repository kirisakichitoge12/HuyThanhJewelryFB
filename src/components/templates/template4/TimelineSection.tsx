import React, { useEffect, useState } from "react";

import Each from "../../../layouts/Each";
import ComponentToolbar from "../../common/ComponentToolbar";
import { useConfirmModal } from "../../../hooks/modals";
import FormField from "../../common/FormField";
import Button from "../../common/Button";
import RichImageEditor from "../../common/RichImageEditor";
import { API_BASE_URL } from "../../../config/api.config";
import { availableColorsTemplate4 } from "../../../config";
import TimelinesDeco11 from "../../../assets/images/templates/template4/timelineDeco11.png";
import TimelinesDeco12 from "../../../assets/images/templates/template4/timelineDeco12.png";
import TimelinesDeco13 from "../../../assets/images/templates/template4/timelineDeco13.png";

import TimelinesDeco21 from "../../../assets/images/templates/template4/timelineDeco21.png";
import TimelinesDeco22 from "../../../assets/images/templates/template4/timelineDeco22.png";
import TimelinesDeco23 from "../../../assets/images/templates/template4/timelineDeco23.png";

import TimelinesDeco31 from "../../../assets/images/templates/template4/timelineDeco31.png";
import TimelinesDeco32 from "../../../assets/images/templates/template4/timelineDeco32.png";
import TimelinesDeco33 from "../../../assets/images/templates/template4/timelineDeco33.png";

import Picture1 from "../../../assets/images/templates/template4/happy-smilng-asian-couple-bride-groom 4.png";
import Picture2 from "../../../assets/images/templates/codien/happy-smilng-asian-couple-bride-groom 3.png";
import Picture3 from "../../../assets/images/templates/codien/happy-smilng-asian-couple-bride-groom 5.png";
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
  const timelinesDecos: string[][] = [
    [TimelinesDeco11, TimelinesDeco12, TimelinesDeco13],
    [TimelinesDeco21, TimelinesDeco22, TimelinesDeco23],
    [TimelinesDeco31, TimelinesDeco32, TimelinesDeco33],
  ];
  const timelineImages: string[] = [Picture1, Picture2, Picture3];
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
      className="relative w-full py-[100px] font-pacifico"
      style={{ backgroundColor: availableColorsTemplate4[style][2] }}
    >
      <section className="max-w-9xl mx-auto flex flex-col justify-center items-center px-[15px] md:px-[193px]">
       <EditableField
          initialValue={mainTitle}
          name="mainTitle"
          id={`mainTitle-${id}`}
          disabled={disabled}
          styleThemes={{
            color: availableColorsTemplate4[style][1],
            fontSize: '52px',
            marginBottom: '45px',
          }}
          className="text-[52px] mb-[45px]"
          onChangeBlur={onSectionChangetest}
        />

        <div className="relative flex flex-col justify-center items-end md:items-center gap-[64px] md:gap-[120px] w-full">
          <Each
            of={data}
            render={(item: TimelineProps, index: number) => (
              <div
                className={`max-w-full border border-transparent ${
                  !disabled && "hover:border-[#855515]"
                }  md:relative w-full flex flex-col justify-center items-center`}
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
                  <div
                    className={`z-10 md:absolute w-full mx-[30px] md:mx-0 md:w-[579px] h-[213px] md:h-[385px] ${
                      index % 2 === 0
                        ? "rotate-[-3.45deg] left-0"
                        : "rotate-[3.45deg] right-0"
                    } `}
                  >
                    {typeof item.image === "string" && item.image.length > 0 ? (
                      <img
                        src={`${API_BASE_URL}/${item.image}`}
                        alt="image"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : typeof item.image === "object" &&
                      item.image !== null ? (
                      <img
                        className="w-full h-full object-cover rounded-xl"
                        src={URL.createObjectURL(item.image)}
                        alt=""
                      />
                    ) : (
                      <img
                     className="rounded-xl object-top object-cover md:object-contain md:rounded-none"
                        src={timelineImages[index]}
                        alt=""
                      />
                    )}
                  </div>
                  <div
                    className={`md:col-start-14 md:col-end-24 row-start-1 space-y-8 relative md:inline-block md:w-[729px] md:h-[517px] p-6 md:py-3 ${
                      index % 2 === 0
                        ? "md:ml-[330px] md:pl-[325px] md:pr-[56px]"
                        : "md:mr-[330px] md:pr-[325px] md:pl-[56px]"
                    }  w-full bg-white rounded-xl shadow-lg flex md:flex-row flex-col justify-center items-center z-20 md:z-0`}
                  >
                    <img
                      src={timelinesDecos[style][index]}
                      alt="icon deco"
                      className="mb-[15px]"
                    />
                    <div className="flex flex-col justify-start items-center md:items-start">
                      <h1
                        className="text-[32px]"
                        style={{ color: availableColorsTemplate4[style][1] }}
                      >
                        {item.date}
                      </h1>
                      <h3
                        className="text-[32px] md:text-[40px] break-words text-start py-4"
                        style={{
                          borderColor: availableColorsTemplate4[style][0],
                          color: availableColorsTemplate4[style][0],
                          fontFamily: titleFont,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p
                      className="text-base font-beVietnamPro text-start text-dark-100"
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
            <h2 className="text-xl  font-semibold text-gray-800">Sửa cột mốc</h2>
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
                    : Picture1
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
