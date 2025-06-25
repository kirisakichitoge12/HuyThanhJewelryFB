// // DynamicRenderer.tsx
// import React, { useEffect, useState } from "react";
// import * as Babel from "@babel/standalone";

// interface DynamicRendererProps {
//   code?: string | null;
//   dependencies: Record<string, any>;
// }

// const DynamicRenderer: React.FC<DynamicRendererProps> = ({ code, dependencies }) => {
//   const [Component, setComponent] = useState<React.FC | null>(null);
//   const [apiCode, setApiCode] = useState<string | null>(null);

//   // Cập nhật apiCode khi props.code thay đổi và hợp lệ
//   useEffect(() => {
//     if (code) {
//       setApiCode(code);
//     }
//   }, [code]);

//   // Biên dịch code JSX từ apiCode
//   useEffect(() => {
//     if (!apiCode) return;

//     try {
//       const wrappedCode = `
//         const DynamicComponent = () => (
//           ${apiCode.trim()}
//         );
//         exports.default = DynamicComponent;
//       `;

//       const transpiled = Babel.transform(wrappedCode, {
//         presets: ["typescript", "react"], // 👈 dùng cả typescript & react
//         sourceType: "script",
//         filename: "component.tsx", // 👈 đặt đuôi .tsx cho đúng context
//       }).code;

//       const module = { exports: {} };
//       const deps = {
//         exports: module.exports,
//         require: () => ({}),
//         module,
//         React,
//         ...dependencies,
//       };

//       const argNames = Object.keys(deps);
//       const argValues = Object.values(deps);

//       const func = new Function(...argNames, transpiled!);
//       func(...argValues);

//       const Comp = (module.exports as { default: React.FC }).default;
//       if (typeof Comp === "function") {
//         setComponent(() => Comp);
//       } else {
//         console.error("🚨 Component không hợp lệ:", Comp);
//         setComponent(() => () => <div>Lỗi khi hiển thị nội dung</div>);
//       }
//     } catch (error) {
//       console.error("🔥 Lỗi render code từ API:", error);
//       setComponent(() => () => <div>Lỗi khi render nội dung động</div>);
//     }
//   }, [apiCode]);

//   return Component ? <Component /> : <div>Đang tải nội dung...</div>;
// };

// export default DynamicRenderer;
// DynamicRenderer.tsx
import React, { useContext, useEffect, useState } from "react";
import * as Babel from "@babel/standalone";
import { DynamicScopeContext } from "../../context/DynamicScopeContext";

interface DynamicRendererProps {
  code?: string | null;
  dependencies: Record<string, any>;
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ code, dependencies }) => {
  const [Component, setComponent] = useState<React.FC | null>(null);
  const [apiCode, setApiCode] = useState<string | null>(null);

  const contextScope = useContext(DynamicScopeContext) || {}; // 🔒 fallback nếu context null

  useEffect(() => {
    if (code) {
      setApiCode(code);
    }
  }, [code]);

  useEffect(() => {
    if (!apiCode) return;

    try {
      const wrappedCode = `
        const DynamicComponent = () => (
          ${apiCode.trim()}
        );
        exports.default = DynamicComponent;
      `;

      const transpiled = Babel.transform(wrappedCode, {
        presets: ["typescript", "react"],
        sourceType: "script",
        filename: "component.tsx",
      }).code;

      const module = { exports: {} };

      // ✅ Ưu tiên dependencies hơn context (nếu trùng key)
      const allDeps = {
        exports: module.exports,
        require: () => ({}),
        module,
        React,
        ...contextScope,
        ...dependencies,
      };

      const argNames = Object.keys(allDeps);
      const argValues = Object.values(allDeps);

      const func = new Function(...argNames, transpiled!);
      func(...argValues);

      const Comp = (module.exports as { default: React.FC }).default;
      if (typeof Comp === "function") {
        setComponent(() => Comp);
      } else {
        console.error("🚨 Component không hợp lệ:", Comp);
        setComponent(() => () => <div>Lỗi khi hiển thị nội dung</div>);
      }
    } catch (error) {
      console.error("🔥 Lỗi render code từ API:", error);
      setComponent(() => () => <div>Lỗi khi render nội dung động</div>);
    }
  }, [apiCode, dependencies, contextScope]); // 👈 nhớ thêm context vào dependencies

  return Component ? <Component /> : <div>Đang tải nội dung...</div>;
};

export default DynamicRenderer;
