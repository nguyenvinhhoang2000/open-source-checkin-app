import React from "react";
import { Button } from "antd";

import { dataProfile } from "@/constants/data/data-profile.js";

import ModalEditProfile from "../modal-edit";

function Profile() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loadingOk, setLoadingOk] = React.useState(false);

  const [currentData, setCurrentData] = React.useState();
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

  const showModal = React.useCallback(() => {
    setCurrentData(dataProfile);
    setIsModalOpen(true);
  }, []);

  const handleClickClose = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex gap-[1.5rem] p-5 font-roboto text-sm font-normal leading-[1.375rem]">
      <div className="flex flex-col gap-[1.25rem] text-character-2">
        {Object.keys(dataProfile).map((item) => (
          <span key={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
        ))}
      </div>
      <div className="flex flex-col gap-[1.25rem] text-character-1">
        {Object.keys(dataProfile).map((item) => (
          <span key={item}>{dataProfile[item]}</span>
        ))}

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
          <span> Edit Profile</span>
        </Button>
        <ModalEditProfile
          currentData={currentData}
          okText="Save"
          CancelText="Cancel"
          onHandleOk={handleClickOK}
          isModalOpen={isModalOpen}
          onHandleCancel={handleClickClose}
          isLoadingButtonOk={loadingOk}
          onClose={handleClickClose}
        />
      </div>
    </div>
  );
}

export default React.memo(Profile);
