import React from "react";
import { Button } from "antd";
import { useBoolean } from "usehooks-ts";

import AppModel from "@/components/apps/app-model";

function Checkin() {
  const { value: isModalOpen, setValue: setIsModalOpen } = useBoolean(false);
  const onClickOk = () => {
    setIsModalOpen(false);
  };

  const onShowModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mt-[1.25rem] lg:mt-0 lg:flex lg:flex-col lg:justify-center">
      <Button type="primary" onClick={onShowModal}>
        Check-in
      </Button>
      <AppModel
        text="Check-in"
        title="You Check-in late!"
        description="Please be more compliant with your working hours"
        src="/assets/icons/check-in.svg"
        okText="Cancel"
        onHandleOk={onClickOk}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}

export default React.memo(Checkin);
