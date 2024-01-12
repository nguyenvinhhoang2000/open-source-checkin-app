import React from "react";
import { Button } from "antd";
import { useBoolean } from "usehooks-ts";

import { dataProfile } from "@/constants/data/data-profile.js";

import ModalEditProfile from "../modal-edit";

function Profile() {
  const {
    value: isModalOpen,
    setTrue: setModalOpen,
    setFalse: setModalClose,
  } = useBoolean(false);
  const {
    value: isLoadingOk,
    setTrue: setLoadingOk,
    setFalse: setUnLoadingOk,
  } = useBoolean(false);

  const [currentData, setCurrentData] = React.useState();

  const onClickOk = React.useCallback(() => {
    setLoadingOk();
    const handleEditData = new Promise((resolve) => {
      setTimeout(() => {
        setUnLoadingOk();
        setModalClose();
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
  }, [setLoadingOk, setModalClose, setUnLoadingOk]);

  const onShowModal = React.useCallback(() => {
    setCurrentData(dataProfile);
    setModalOpen();
  }, [setModalOpen]);

  return (
    <div className="flex gap-[1.5rem] font-roboto text-sm font-normal leading-[1.375rem]">
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
          onClick={onShowModal}
        >
          <img
            src="/assets/icons/edit-profile.svg"
            alt="icon-edit"
            title="edit-profile"
          />
          <span className="font-roboto text-sm"> Edit Profile</span>
        </Button>
        <ModalEditProfile
          currentData={currentData}
          okText="Save"
          cancelText="Cancel"
          onHandleOk={onClickOk}
          isModalOpen={isModalOpen}
          onHandleCancel={setModalClose}
          isLoadingButtonOk={isLoadingOk}
          onClose={setModalClose}
        />
      </div>
    </div>
  );
}

export default React.memo(Profile);