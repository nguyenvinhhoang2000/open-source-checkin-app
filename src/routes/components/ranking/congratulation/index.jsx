import React from "react";
import PropTypes from "prop-types";

function Congratulation(props) {
  const { dataRanking } = props;

  return (
    <div className="flex w-full items-start justify-center bg-neutral-1 bg-[url('/assets/images/background/congratulation.jpg')] bg-center bg-no-repeat pt-[3.81rem]">
      <div className="grid w-[59.5rem] grid-cols-3 gap-[0.75rem] px-[0.5rem] lg:px-0">
        <div className="col-span-1 flex max-w-[19.375rem] flex-col items-center justify-end gap-[1rem]">
          <img
            className="h-[5.5rem] w-[5.5rem] rounded-full"
            src={dataRanking[1]?.avatar}
            alt="avatar"
          />

          <div className="flex flex-col items-center justify-start pb-[0.75rem] text-center">
            <h3 className="m-0 font-roboto text-[1.5rem] font-[500] leading-[2rem] text-neutral-0">
              {dataRanking[1]?.name}
            </h3>

            <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem] text-neutral-0">
              {dataRanking[1]?.position}
            </span>
          </div>

          <div className="flex min-h-[7.0625rem] w-full flex-shrink-0 items-center justify-center rounded-t-[0.75rem] bg-primary-1">
            <span className="font-roboto text-[4rem] font-[700] leading-[2.875rem] text-neutral-1">
              {dataRanking[1]?.rank}
            </span>
          </div>
        </div>

        <div className="col-span-1 flex max-h-[22.5rem] max-w-[19.375rem] flex-col items-center justify-start gap-[1rem]">
          <img
            className="h-[5.5rem] w-[5.5rem] rounded-full"
            src={dataRanking[0]?.avatar}
            alt="avatar"
          />

          <div className="flex flex-col items-center justify-start pb-[0.75rem] text-center">
            <h3 className="m-0 font-roboto text-[1.5rem] font-[500] leading-[2rem] text-neutral-0">
              {dataRanking[0]?.name}
            </h3>

            <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem] text-neutral-0">
              {dataRanking[0]?.position}
            </span>
          </div>

          <div className="flex min-h-[10.875rem] w-full flex-shrink-0 items-center justify-center rounded-t-[0.75rem] bg-primary-1">
            <span className="font-roboto text-[4rem] font-[700] leading-[2.875rem] text-neutral-1">
              {dataRanking[0]?.rank}
            </span>
          </div>
        </div>

        <div className="col-span-1 flex max-w-[19.375rem] flex-col items-center justify-end gap-[1rem]">
          <img
            className="h-[5.5rem] w-[5.5rem] rounded-full"
            src={dataRanking[2]?.avatar}
            alt="avatar"
          />

          <div className="flex flex-col items-center justify-start pb-[0.75rem] text-center">
            <h3 className="m-0 font-roboto text-[1.5rem] font-[500] leading-[2rem] text-neutral-0">
              {dataRanking[2]?.name}
            </h3>

            <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem] text-neutral-0">
              {dataRanking[2]?.position}
            </span>
          </div>

          <div className="flex min-h-[5rem] w-full flex-shrink-0 items-center justify-center rounded-t-[0.75rem] bg-primary-1">
            <span className="font-roboto text-[4rem] font-[700] leading-[2.875rem] text-neutral-1">
              {dataRanking[2]?.rank}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Congratulation;

Congratulation.propTypes = {
  dataRanking: PropTypes.instanceOf(Array).isRequired,
};
