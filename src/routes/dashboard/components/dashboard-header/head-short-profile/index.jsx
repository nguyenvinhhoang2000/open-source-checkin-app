import React from "react";

function HeadShortProfile() {
  return (
    <div className="flex gap-[0.75rem]">
      <img
        src="/assets/images/avatar/avatar1.jpg"
        alt="avatar"
        title="avatar-member"
        className="max-h-[64px] max-w-[64px]"
      />
      <div className="flex flex-col justify-center font-roboto">
        <h4 className="text-xl font-medium text-character-1">Vinh Thai</h4>
        <span className="text-sm	font-normal	leading-[1.375rem] text-character-2">
          Head
        </span>
      </div>
    </div>
  );
}

export default HeadShortProfile;
