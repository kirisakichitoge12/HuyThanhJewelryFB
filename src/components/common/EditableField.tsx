import React, { useCallback, useEffect, useRef, useState } from "react";
import FormatToolbar, { FormatType, Position } from "./FormatToolbar";

interface EditableFieldProps {
  id: string;
  name: string;
  className?: string;
  initialValue?: string;
  styleThemes?: React.CSSProperties;
  disabled?: boolean;
  index?: number;
  subField?: string;
  onChangeBlur: (
    name: string,
    newValue: string,
    subField?: string,
    i?: number
  ) => void;
}

export interface HistoryState {
  value: string;
  selection: Selection | null;
}

const EditableField: React.FC<EditableFieldProps> = ({
  id,
  name,
  initialValue = "",
  onChangeBlur,
  index,
  subField,
  styleThemes,
  className,
  disabled,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedInput, setSelectedInput] = useState<string | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<Position>({
    top: 0,
    left: 0,
  });
  const [history, setHistory] = useState<HistoryState[]>([
    { value: initialValue, selection: null },
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = initialValue;
    }
  }, []);

  const updateHistory = useCallback(
    (newValue: string) => {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push({
        value: newValue,
        selection: window.getSelection(),
      });
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    },
    [history, currentIndex]
  );

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    // Ngăn chặn hoàn toàn sự lan truyền sự kiện
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopImmediatePropagation();

    const selection = window.getSelection();

    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setToolbarPosition({
        top: rect.top + window.scrollY - 40,
        left: rect.left + window.scrollX,
      });
      setSelectedInput(id);
    } else {
      setSelectedInput(null);
    }
  };

  // Áp dụng tương tự cho các sự kiện khác
  const handleBlur = (event?: React.FocusEvent) => {
    event?.stopPropagation();
    event?.preventDefault();

    if (contentRef.current) {
      onChangeBlur(name, contentRef.current.innerHTML, subField, index);
    }
    setSelectedInput(null);
  };

  const handleFormat = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: FormatType
  ): void => {
    event.stopPropagation();
    event.preventDefault();

    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) return;

    document.execCommand("styleWithCSS", false, "true");

    switch (type) {
      case "bold":
        document.execCommand("bold", false);
        break;
      case "italic":
        document.execCommand("italic", false);
        break;
      case "underline":
        document.execCommand("underline", false);
        break;
      case "strikethrough":
        document.execCommand("strikeThrough", false);
        break;
    }

    if (contentRef.current) {
      updateHistory(contentRef.current.innerHTML);
    }
  };

  const handleUndo = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (currentIndex > 0) {
        event.stopPropagation();
        const newIndex = currentIndex - 1;
        const { value } = history[newIndex];
        if (contentRef.current) {
          contentRef.current.innerHTML = value;
        }
        setCurrentIndex(newIndex);
      }
    },
    [currentIndex, history]
  );

  const handleRedo = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (currentIndex < history.length - 1) {
        event.stopPropagation();
        const newIndex = currentIndex + 1;
        const { value } = history[newIndex];
        if (contentRef.current) {
          contentRef.current.innerHTML = value;
        }
        setCurrentIndex(newIndex);
      }
    },
    [currentIndex, history]
  );

  return (
    <div
      className="relative"
      onMouseLeave={(e) => {
        e.stopPropagation();
        handleBlur();
      }}
    >
      <div
        ref={contentRef}
        contentEditable={!disabled}
        id={id}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onSelect={(e) => e.stopPropagation()}
        onMouseUp={(e) => handleClick(e, id)}
        className={`
                    ${
                      className ||
                      "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    }
                    resize-none overflow-hidden border-2 border-transparent outline-primary 
                    ${disabled ? "" : "hover:border-primary"}
                `}
        style={styleThemes}
      />

      {selectedInput === id && !disabled && (
        <FormatToolbar
          position={toolbarPosition}
          onFormat={handleFormat}
          canUndo={currentIndex > 0}
          canRedo={currentIndex < history.length - 1}
          onUndo={handleUndo}
          onRedo={handleRedo}
          currentStyle={{}} // Style is now handled by selection
        />
      )}
    </div>
  );
};

export default EditableField;
