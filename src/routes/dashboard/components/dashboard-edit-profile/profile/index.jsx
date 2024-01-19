import React from "react";
import { Button, message } from "antd";
import { useBoolean } from "usehooks-ts";

import { GENDER } from "@/constants/gender";
import useAuthStore from "@/store/use-auth-store";

import ModalEditProfile from "../modal-edit";

function Profile() {
  const user = useAuthStore().user;
  const onSetProfile = useAuthStore().onSetProfile;
  const onGetUserInformation = useAuthStore().onGetUserInformation;

  const [currentData, setCurrentData] = React.useState();

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

  const onClickOk = React.useCallback(async (value) => {
    onShowLoadingOk();

    const { status, message: messageResult } = await onSetProfile(value);

    message[status](messageResult, 1);

    await onGetUserInformation();

    onModalClose();

    onHideLoadingOk();
  }, []);

  const onShowModal = React.useCallback(() => {
    const dataUser = {
      ...user,
      gender: GENDER.find((item) => item.id === user.gender).label,
      branch: `${user.branch.name}, ${user.branch.address}`,
    };
    setCurrentData(dataUser);

    onModalOpen();
  }, [onModalOpen, user]);

  return (
    <div className="flex w-full flex-row gap-6 text-[0.875rem]">
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
