import React from "react";
import { ConfigProvider, Modal } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FF6D03",
          borderRadius: 2,
          colorBgContainer: "#FFF",
        },
      }}
    >
      <Modal open>
        <span className="underline text-red-900">Hello</span>{" "}
      </Modal>
    </ConfigProvider>
  );
}

export default App;
