import React from "react";
import { Input, Modal, Select } from "antd";
import PropTypes from "prop-types";

import AppFooterDraw from "@/components/apps/app-footer-draw";
import AppTitleDraw from "@/components/apps/app-title-draw";

import { dataProfile } from "@/constants/data/data-profile.js";
import { emptyFn } from "@/utils/empty-types";

import { optionsBranch, optionsGender } from "./config-edit-profile";

const { TextArea } = Input;

function AppEditProfile({
  CancelText,
  okText,
  onHandleOk,
  onHandleCanlce,
  isModalOpen,
  loadingButtonOk,
  onClose,
}) {
  return (
    <Modal
      title={
        <AppTitleDraw
          titleText="Edit Profile"
          onClose={onClose}
          classNames="px-[1.25rem] mb-[1rem]"
        />
      }
      open={isModalOpen}
      closable={false}
      footer={
        <AppFooterDraw
          okText={okText}
          onOk={onHandleOk}
          cancleText={CancelText}
          onCancle={onHandleCanlce}
          loadingButtonOk={loadingButtonOk}
          classNames="px-[1.25rem]"
        />
      }
    >
      <div className="flex flex-col gap-[0.75rem] border-y-[0.0625rem] p-[1.5rem]">
        <div className="flex flex-col gap-[0.5rem]">
          <span className="font-roboto text-sm font-normal leading-[1.375rem]">
            Name
          </span>
          <Input
            value={dataProfile.name}
            placeholder="Enter your Name"
            disabled
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <span className="font-roboto text-sm font-normal leading-[1.375rem]">
            Gender
          </span>
          <Select
            value={dataProfile.gender}
            options={optionsGender}
            placeholder="Enter your Gender"
            disabled
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <span className="font-roboto text-sm font-normal leading-[1.375rem]">
            Position
          </span>
          <Input
            value={dataProfile.position}
            placeholder="Enter your Position"
            disabled
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <span className="font-roboto text-sm font-normal leading-[1.375rem]">
            Branch
          </span>
          <Select
            value={dataProfile.branch}
            options={optionsBranch}
            placeholder="Enter your Branch"
            disabled
          />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <span className="font-roboto text-sm font-normal leading-[1.375rem]">
            Phone
          </span>
          <Input value={dataProfile.phone} placeholder="Enter your Phone" />
        </div>
        <div className="flex flex-col gap-[0.5rem]">
          <span className="font-roboto text-sm font-normal leading-[1.375rem]">
            Note
          </span>
          <TextArea
            showCount
            maxLength={100}
            placeholder="Enter your note"
            value={dataProfile.note}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AppEditProfile;

AppEditProfile.propTypes = {
  isModalOpen: PropTypes.bool,
  CancelText: PropTypes.string,
  okText: PropTypes.string,
  onHandleOk: PropTypes.func,
  onHandleCanlce: PropTypes.func,
  loadingButtonOk: PropTypes.bool,
  onClose: PropTypes.func,
};

AppEditProfile.defaultProps = {
  isModalOpen: false,
  CancelText: "",
  okText: "",
  loadingButtonOk: false,
  onHandleOk: emptyFn,
  onHandleCanlce: emptyFn,
  onClose: emptyFn,
};
