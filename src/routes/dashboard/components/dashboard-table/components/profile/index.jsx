import React from "react";
import { Button } from "antd";

import AppEditProfile from "@/components/apps/app-edit-profile";

function Profile() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loadingOk, setLoadingOk] = React.useState(false);

  const handleClickOK = React.useCallback(() => {
    setLoadingOk(true);
    const handleEditData = new Promise((resolve) => {
      setTimeout(() => {
        setLoadingOk(false);
        setIsModalOpen(false);
        resolve("Change profile okay");
      }, 2000);
    });

    handleEditData
      .then((data) => {
        console.log(`🚀🚀🚀!..data:`, data);
      })
      .catch((error) => {
        console.log(`🚀🚀🚀!..change error`, error);
      });
  });

  const handleClickCancle = React.useCallback(() => {
    setIsModalOpen(false);
  });

  const showModal = React.useCallback(() => {
    setIsModalOpen(true);
  });

  const handleClickClose = React.useCallback(() => {
    setIsModalOpen(false);
  });

  return (
    <div className="flex min-h-[26.5625rem] max-w-[26.375rem] gap-[1.5rem] rounded-lg bg-white p-5 font-roboto text-sm font-normal leading-[1.375rem] shadow-dropShadow">
      <div className="flex flex-col gap-[1.25rem] text-character-2">
        <span>Name</span>
        <span>Gender</span>
        <span>Position</span>
        <span>Branch</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Note</span>
      </div>
      <div className="flex flex-col gap-[1.25rem] text-character-1">
        <span>Ha Vinh Thai</span>
        <span>Male</span>
        <span>Head</span>
        <span>Head office, Da Nang</span>
        <span>thaiha@gmail.com</span>
        <span>0909 090 090</span>
        <span>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </span>
        <Button
          type="primary"
          className="flex max-w-[9rem] items-center gap-[0.625rem] sm:max-w-[7.75rem]"
          onClick={showModal}
        >
          <img
            src="/assets/icons/edit-profile.svg"
            alt="icon-edit"
            title="edit-profile"
          />
          Edit Profile
        </Button>
        <AppEditProfile
          okText="Save"
          CancelText="Cancel"
          onHandleOk={handleClickOK}
          isModalOpen={isModalOpen}
          onHandleCanlce={handleClickCancle}
          loadingButtonOk={loadingOk}
          onClose={handleClickClose}
        />
      </div>
    </div>
  );
}

export default React.memo(Profile);
