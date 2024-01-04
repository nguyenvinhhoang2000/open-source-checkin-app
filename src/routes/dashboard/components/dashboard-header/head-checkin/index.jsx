import React, { useState } from "react";
import { Button } from "antd";

import AppModel from "@/components/apps/app-model";

function Checkin() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOK = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mt-[1.25rem] lg:mt-0 lg:flex lg:flex-col lg:justify-center">
      <Button type="primary" onClick={showModal}>
        Check-in
      </Button>
      <AppModel
        text="Check-in"
        title="You Check-in late!"
        description="Please be more compliant with your working hours"
        src="/assets/icons/check-in.svg"
        okText="Cancel"
        onHandleOk={handleClickOK}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}

export default React.memo(Checkin);
