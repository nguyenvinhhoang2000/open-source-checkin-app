import React from "react";

function HeadDateLocation() {
  return (
    <div className="mt-[1.25rem] flex flex-col justify-center gap-[0.25rem] lg:mt-0">
      <div className="flex gap-[0.6875rem] font-roboto text-sm font-normal leading-[1.375rem]">
        <span className="text-character-2">Location:</span>
        <span className="text-character-1">Head office, Da Nang</span>
      </div>
      <div className="flex gap-[0.6875rem] font-roboto text-sm font-normal leading-[1.375rem]">
        <span className="min-w-[3.625rem] text-character-2">Date:</span>
        <span className="text-character-1">Monday, 20-11-2021</span>
        <span className="text-character-1">8:30:42</span>
      </div>
    </div>
  );
}

export default React.memo(HeadDateLocation);
