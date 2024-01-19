import React from "react";
import { Button, message } from "antd";
import { useBoolean } from "usehooks-ts";

import { GENDER } from "@/constants/gender";
import { TABLE_HEADE } from "@/constants/table-head";
import useAuthStore from "@/store/use-auth-store";
import {
  onFormatGlobalPhone,
  onFormatVietnamesePhone,
} from "@/utils/format-phoneNumber";

import ModalEditProfile from "../modal-edit";

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
      phoneNumber: onFormatGlobalPhone(value.phoneNumber),
    };

    const { status, message: messageResult } = await onSetProfile(formValue);

    message[status](messageResult, 1);

    onModalClose();

    onHideLoadingOk();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFormatGender = React.useMemo(() => {
    return GENDER.find((item) => item.id === user.gender).label;
  }, [user.gender]);

  const onFormatPhoneNumber = React.useMemo(() => {
    return onFormatVietnamesePhone(user.phoneNumber, { space: true });
  }, [user.phoneNumber]);

  const onShowModal = React.useCallback(() => {
    const dataUser = {
      ...user,
      phoneNumber: onFormatVietnamesePhone(user.phoneNumber, { space: false }),
      gender: onFormatGender,
      branch: `${user.branch.name}, ${user.branch.address}`,
    };

    setCurrentData(dataUser);

    onModalOpen();
  }, [onModalOpen, onFormatGender, user]);

  return (
    <div className="flex w-full flex-row gap-6 text-[0.875rem]">
      <div className="flex w-[5rem] flex-col gap-[1.25rem] text-character-2">
        {TABLE_HEADE.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="flex w-[17.375rem] flex-col gap-[1.25rem] break-words text-character-1">
        <span>{user.name}</span>
        <span>{onFormatGender}</span>
        <span>{user.position}</span>
        <span>
          {user.branch.name}, {user.branch.address}
        </span>
        <span>{user.email}</span>
        <span>{onFormatPhoneNumber}</span>
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
