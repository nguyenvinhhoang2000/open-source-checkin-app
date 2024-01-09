import React from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { dataAbsent } from "@/constants/data/data-absent";

const currentDate = dayjs();

const columns = [
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    width: "11rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {dayjs(text).format("DD-MM-YYYY hh:mm:ss")}
      </span>
    ),
  },

  {
    title: "To",
    dataIndex: "to",
    key: "to",
    width: "11.75rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {dayjs(text).format("DD-MM-YYYY hh:mm:ss")}
      </span>
    ),
  },

  {
    title: "Date Request",
    dataIndex: "dateRequest",
    key: "dateRequest",
    width: "11.75rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {dayjs(text).format("DD-MM-YYYY hh:mm:ss")}
      </span>
    ),
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "39rem",
    render: (text) => (
      <span className="line-clamp-2 min-w-[15rem] text-ellipsis whitespace-pre-wrap font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },

  {
    title: "Action",
    key: "actions",
    render: (record) => {
      return (
        <div className="flex items-center justify-start gap-[1.25rem]">
          <button
            className="h-[1.25rem] w-[1.25rem]"
            title="view"
            type="button"
          >
            <img src="/assets/icons/eye.svg" alt="view" />
          </button>

          {!dayjs(record.dateRequest).isBefore(currentDate, "day") && (
            <button
              className="h-[1.25rem] w-[1.25rem]"
              title="edit"
              type="button"
            >
              <img src="/assets/icons/edit.svg" alt="edit" />
            </button>
          )}
        </div>
      );
    },
  },
];

function AbsentTable({ filterTime }) {
  // handle width filterTime to render data of table
  console.log(`🚀🚀🚀!..filterTime:`, filterTime);
  return (
    <Table
      pagination={{
        pageSize: 7,
      }}
      scroll={{ x: "auto" }}
      rowKey="id"
      columns={columns}
      dataSource={dataAbsent}
    />
  );
}

export default AbsentTable;

AbsentTable.propTypes = {
  filterTime: PropTypes.string,
};

AbsentTable.defaultProps = {
  filterTime: "",
};
