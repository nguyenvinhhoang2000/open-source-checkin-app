import React from "react";
import { Button, message } from "antd";
import { useBoolean } from "usehooks-ts";

import useAuthStore from "@/store/use-auth-store";
import replacePrefixPhoneNumber from "@/utils/format-phoneNumber";

import ModalEditProfile from "../modal-edit";

import { renderGender, TABLE_HEADED } from "./table-head";

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
      phoneNumber: replacePrefixPhoneNumber(value.phoneNumber, {
        space: false,
        type: "+84",
      }),
    };

    const { status, message: messageResult } = await onSetProfile(formValue);

    message[status](messageResult, 1);

    onModalClose();

    onHideLoadingOk();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onShowModal = React.useCallback(() => {
    const dataUser = {
      ...user,
      phoneNumber: replacePrefixPhoneNumber(user.phoneNumber, {
        space: false,
        type: "0x",
      }),
      gender: renderGender(user.gender),
      branch: `${user.branch.name}, ${user.branch.address}`,
    };

    setCurrentData(dataUser);

    onModalOpen();
  }, [onModalOpen, user]);

  const renderTableHeadDetail = React.useMemo(
    () =>
      TABLE_HEADED.map((item) => {
        let content;

        if (item.child) {
          content = `${user[item.key][item.child.NAME]}, ${
            user[item.key][item.child.ADDRESS]
          }`;
        } else if (item.format) {
          content = item.format(user[item.key]);
        } else {
          content = user[item.key];
        }

        return <span key={item.key}>{content}</span>;
      }),
    [user],
  );

  return (
    <div className="flex w-full flex-row gap-6 text-[0.875rem]">
      <div className="flex w-[5rem] flex-col gap-[1.25rem] text-character-2">
        {TABLE_HEADED.map((item) => (
          <span key={item.key}>{item.label}</span>
        ))}
      </div>
      <div className="flex w-[17.375rem] flex-col gap-[1.25rem] break-words text-character-1">
        {renderTableHeadDetail}

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
