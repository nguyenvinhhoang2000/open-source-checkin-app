import React from "react";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FF6D03",
          borderRadius: 2,
          // colorBgContainer: "#f6ffed",
        },
      }}
    >
      <span>1</span>
    </ConfigProvider>
  );
}

export default App;
