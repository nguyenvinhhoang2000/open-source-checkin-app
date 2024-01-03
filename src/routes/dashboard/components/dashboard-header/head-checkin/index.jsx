import React, { useState } from "react";
import { Button, Modal } from "antd";

function Checkin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mt-[1.25rem] lg:mt-0 lg:flex lg:flex-col lg:justify-center">
      <Button type="primary" onClick={showModal}>
        Check-in
      </Button>
      <Modal
        title={
          <div className="flex gap-[1rem]">
            <div>
              <img
                src="/assets/icons/check-in.svg"
                alt="logo"
                title="check-in-logo"
              />
            </div>
            <div className="flex flex-col gap-[0.5rem]">
              <p className="font-roboto text-base	font-medium text-character-1">
                You Check-in late!
              </p>
              <p className="font-roboto text-sm	font-normal	leading-[1.375rem] text-character-2">
                Please be more compliant with your working hours
              </p>
            </div>
          </div>
        }
        open={isModalOpen}
        closable={false}
        onOk={handleOk}
        footer={[
          <Button key="cancel" type="primary" onClick={handleOk}>
            Cancel
          </Button>,
        ]}
      />
    </div>
  );
}

export default Checkin;
