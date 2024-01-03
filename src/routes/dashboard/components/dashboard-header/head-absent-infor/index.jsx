import React from "react";

import { data } from "@/constants/data/data-head-absent-infor";

function HeadAbsentInfor() {
  return (
    <div className="mt-[1.25rem] flex gap-[1.5rem] lg:mt-0">
      {data.map((item) => {
        return (
          <div
            className="flex min-w-[5.3125rem] flex-col gap-[0.25rem] text-center "
            key={item.id}
          >
            <h2 className="font-roboto text-xl font-medium	leading-10 text-character-1 sm:text-3xl">
              {item.number}
            </h2>
            <p className="font-roboto text-sm	font-normal	leading-[1.375rem] text-character-2">
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default HeadAbsentInfor;
