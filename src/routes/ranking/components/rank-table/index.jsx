import React from "react";
import { Table } from "antd";
import PropTypes from "prop-types";

import { pageSize, scroll } from "./config";

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    width: "9.5rem",
    render: (text, record) => (
      <div className="flex min-w-[6rem] items-center justify-start gap-[0.5rem]">
        <img src="/assets/icons/trophy.svg" alt="trophy" />

        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {text}
        </span>

        <div className="flex items-center justify-start gap-[0.125rem] pl-[0.75rem]">
          {record.changeRankings >= 0 ? (
            <div className="flex items-center justify-start gap-[0.125rem]">
              <img
                className="mb-[0.1rem]"
                src="/assets/icons/arrow-up.svg"
                alt="arrow-up"
              />

              <span className="font-roboto text-[0.75rem] font-[400] leading-[1.25rem] text-secondary-6">
                +{record.changeRankings}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-start gap-[0.125rem]">
              <img
                className="mb-[0.1rem]"
                src="/assets/icons/arrow-down.svg"
                alt="arrow-down"
              />

              <span className="font-roboto text-[0.75rem] font-[400] leading-[1.25rem] text-neutral-4">
                {record.changeRankings}
              </span>
            </div>
          )}
        </div>
      </div>
    ),
  },

  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "24.75rem",
    render: (text, record) => (
      <div className="flex items-center justify-start gap-[0.75rem]">
        <img
          className="max-h-[2.5rem] max-w-[2.5rem]"
          src={record.avatar}
          alt="trophy"
        />

        <div className="flex flex-col items-start justify-start">
          <span className="font-roboto text-[0.875rem] font-[500] leading-[1.375rem]">
            {record.name}
          </span>

          <span className="font-roboto text-[0.75rem] font-[400] leading-[1.25rem]">
            {record.position}
          </span>
        </div>
      </div>
    ),
  },

  {
    title: "Check-in Early",
    dataIndex: "checkinEarly",
    key: "checkinEarly",
    width: "9.5rem",
    render: (text) => (
      <div className="flex items-center justify-start">
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {text}
        </span>
      </div>
    ),
  },

  {
    title: "Check-in Late",
    dataIndex: "checkinLate",
    key: "checkinLate",
    width: "9.5rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },

  {
    title: "Check-out Early",
    dataIndex: "checkoutEarly",
    key: "checkoutEarly",
    width: "9.5rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },

  {
    title: "Check-out Late",
    dataIndex: "checkoutLate",
    key: "checkoutLate",
    width: "9.5rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },

  {
    title: "Absent",
    dataIndex: "absent",
    key: "absent",
    width: "9.5rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },
];

function RankTable(props) {
  const { dataRanking } = props;

  return (
    <div className="container grid grid-cols-12 whitespace-nowrap rounded-[0.5rem] bg-neutral-0 p-[1.25rem] shadow-dropShadow">
      <div className="col-span-12 w-full">
        <Table
          pagination={pageSize}
          scroll={scroll}
          rowKey="id"
          columns={columns}
          dataSource={dataRanking}
        />
      </div>
    </div>
  );
}

export default RankTable;

RankTable.propTypes = {
  dataRanking: PropTypes.instanceOf(Array).isRequired,
};
