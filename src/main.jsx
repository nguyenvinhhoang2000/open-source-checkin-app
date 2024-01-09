import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";

import { drawerConfig } from "./constants/config-antd/drawer";
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
          },
          Pagination: {
            colorPrimary: fullConfig.theme.colors.neutral[0],
            borderRadius: fullConfig.theme.borderRadius["100px"],
            itemActiveBg: fullConfig.theme.colors.neutral[1],
            colorPrimaryHover: fullConfig.theme.colors.neutral[0],
          },
          Model: {
            primaryColor: fullConfig.theme.colors.primary[1],
          },
          Table: {
            cellPaddingInline: fullConfig.theme.antdTable.cellPaddingInline,
            cellPaddingBlock: fullConfig.theme.antdTable.cellPaddingBlock,
            headerSplitColor: fullConfig.theme.antdTable.headerSplitColor,
            fontFamily: fullConfig.theme.fontFamily.roboto[0],
          },
          Dropdown: {
            controlItemBgHover: fullConfig.theme.colors.primary[1],
          },
        },
      }}
      drawer={drawerConfig}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
