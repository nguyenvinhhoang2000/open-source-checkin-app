import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";

import { fullConfig } from "../theme";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: fullConfig.theme.colors.primary[0],
          borderRadiusLG: fullConfig.theme.borderRadius.primary,
          colorWarning: fullConfig.theme.colors.neutral[1],
        },
        components: {
          Button: {
            primaryColor: fullConfig.theme.colors.neutral[0],
            paddingInline: fullConfig.theme.padding.primary.x,
            borderRadius: fullConfig.theme.borderRadius.primary,
          },
          Pagination: {
            colorPrimary: fullConfig.theme.colors.neutral[0],
            borderRadius: fullConfig.theme.borderRadius.custom1,
            itemActiveBg: fullConfig.theme.colors.neutral[1],
            colorPrimaryHover: fullConfig.theme.colors.neutral[0],
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
