import React from "react";
import { Button, message } from "antd";
import { useBoolean } from "usehooks-ts";

import useAuthStore from "@/store/use-auth-store";
import { formatPhoneApi, formatPhoneUi } from "@/utils/format-phoneNumber";

import ModalEditProfile from "../modal-edit";

import { formatUserProfile } from "./formatInfo";
import { TABLE_HEADED } from "./table-head";

function Profile() {
  const user = useAuthStore().user;
  const onSetProfile = useAuthStore().onSetProfile;

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

    const formValue = {
      ...value,
      phoneNumber: formatPhoneApi(value.phoneNumber),
    };

    const { status, message: messageResult } = await onSetProfile(formValue);

    message[status](messageResult, 1);

    onModalClose();

    onHideLoadingOk();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onShowModal = React.useCallback(() => {
    const dataUser = {
      ...user,
      phoneNumber: formatPhoneUi(user.phoneNumber),
      branch: `${user.branch.name}, ${user.branch.address}`,
    };

    setCurrentData(dataUser);

    onModalOpen();
  }, [onModalOpen, user]);

  return (
    <div className="flex flex-col gap-6 text-[0.875rem]">
      {TABLE_HEADED.map((item) => (
        <div key={item.key} className="flex flex-row gap-6">
          <span className="min-w-[5rem] text-character-2">{item.label}</span>
          <span>{formatUserProfile(item, user)}</span>
        </div>
      ))}
      <div className="flex flex-row gap-6">
        <span className="min-w-[5rem] text-character-2" />
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
          <span className="font-roboto text-sm">Edit Profile</span>
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
