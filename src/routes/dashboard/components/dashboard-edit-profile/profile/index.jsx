import React from "react";
import { Button } from "antd";
import { useBoolean } from "usehooks-ts";

import { dataProfile } from "@/constants/data/data-profile.js";
import { GENDER } from "@/constants/gender";
import useAuthStore from "@/store/use-auth-store";

import ModalEditProfile from "../modal-edit";

function Profile() {
  const user = useAuthStore().user;
  const {
    value: isModalOpen,
    setTrue: onModalOpen,
    setFalse: onModalClose,
  } = useBoolean(false);
  const {
    value: isLoadingOk,
    setTrue: onShowLoadingOk,
    setFalse: onHideLoadingOk,
  } = useBoolean(false);

  const [currentData, setCurrentData] = React.useState();
  const onClickOk = React.useCallback(() => {
    onShowLoadingOk();
    const handleEditData = new Promise((resolve) => {
      setTimeout(() => {
        onHideLoadingOk();
        onModalClose();
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
  }, [onShowLoadingOk, onModalClose, onHideLoadingOk]);

  const onShowModal = React.useCallback(() => {
    setCurrentData(dataProfile);
    onModalOpen();
  }, [onModalOpen]);

  return (
    <div className="flex w-full flex-row gap-6">
      <div className="flex w-[5rem] flex-col gap-[1.25rem] text-character-2">
        <span>Name</span>
        <span>Gender</span>
        <span>Position</span>
        <span>Branch</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Note</span>
      </div>
      <div className="flex w-[17.375rem] flex-col gap-[1.25rem] break-words text-character-1">
        <span>{user.name}</span>
        <span>{GENDER.find((item) => item.id === user.gender).label}</span>
        <span>{user.position}</span>
        <span>
          {user.branch.name}, {user.branch.address}
        </span>
        <span>{user.email}</span>
        <span>{user.phoneNumber}</span>
        <span>{user.note || "..."}</span>

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
      </div>
      <ModalEditProfile
        currentData={currentData}
        okText="Save"
        cancelText="Cancel"
        onHandleOk={onClickOk}
        isModalOpen={isModalOpen}
        onHandleCancel={onModalClose}
        isLoadingButtonOk={isLoadingOk}
        onClose={onModalClose}
      />
    </div>
  );
}

export default React.memo(Profile);
