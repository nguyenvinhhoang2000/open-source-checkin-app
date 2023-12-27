import React from "react";
import { Alert, Button, ConfigProvider, Modal } from "antd";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

function App() {
  return (
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
        },
      }}
    >
      <Modal open okText="Check-in" cancelText="Cancel">
        <span className="underline text-red-900">Test Primary color Hello</span>{" "}
      </Modal>
      <h1 className="text-primary-0">Hello Word</h1>
      <Alert message="Warning" type="warning" showIcon closable />
      <Button type="primary">
        <span>Primary</span>
      </Button>
    </ConfigProvider>
  );
}

export default App;
