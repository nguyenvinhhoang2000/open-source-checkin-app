import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";

import { drawerConfig } from "./constants/config-antd/drawer";
import { modalConfig } from "./constants/config-antd/modal";
import App from "./App";
import { fullConfig } from "./theme";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: fullConfig.theme.colors.primary[0],
          borderRadiusLG: fullConfig.theme.borderRadius.primary,
          colorWarning: fullConfig.theme.colors.neutral[1],
          borderRadius: 3,
          colorBgMask: fullConfig.theme.colors.character[2],
        },
        components: {
          Button: {
            primaryColor: fullConfig.theme.colors.neutral[0],
            paddingInline: fullConfig.theme.padding.primary.x,
            borderRadius: fullConfig.theme.borderRadius.primary,
            textHoverBg: fullConfig.theme.colors.primary[1],
          },
          Pagination: {
            colorPrimary: fullConfig.theme.colors.neutral[0],
            borderRadius: fullConfig.theme.borderRadius["100px"],
            itemActiveBg: fullConfig.theme.colors.neutral[1],
            colorPrimaryHover: fullConfig.theme.colors.neutral[0],
          },
          Table: {
            cellPaddingInline: fullConfig.theme.antdTable.cellPaddingInline,
            cellPaddingBlock: fullConfig.theme.antdTable.cellPaddingBlock,
            headerSplitColor: fullConfig.theme.antdTable.headerSplitColor,
            fontFamily: fullConfig.theme.fontFamily.roboto[0],
          },
          Dropdown: {
            controlItemBgHover: fullConfig.theme.colors.primary[1],
            paddingXXS: fullConfig.theme.padding.dropdownOverlay,
            borderRadiusSM: fullConfig.theme.borderRadius.dropdownOverlay,
          },
        },
      }}
      drawer={drawerConfig}
      modal={modalConfig}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
