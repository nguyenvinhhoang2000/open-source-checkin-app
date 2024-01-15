import React from "react";
import { Table } from "antd";
import classnames from "classnames";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { data } from "@/constants/data/data-head-absent-infor";
import { dataTableHistory } from "@/constants/data/data-history-table";
import checkLate from "@/utils/check-late";
import onCheckRowAbsent from "@/utils/check-row-absent";

import { pagination, scroll } from "./table-config";

function HistoryTable({ filterTime }) {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "25%",
      render: (text) => (
        <p className="flex min-h-[3.1875rem] items-start font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format("DD-MM-YYYY")}
        </p>
      ),
    },

    {
      title: "Check-in",
      dataIndex: "checkIn",
      key: "checkIn",
      width: "25%",
      render: (text) => {
        if (text === data[3].text)
          return (
            <div className="min-h-[3.1875rem]">
              <p className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
                {text}
              </p>
              <p className="text-[0.75rem] text-absentDescription">
                Description
              </p>
            </div>
          );

        const { isLate, type } = checkLate(text, "in");

        return (
          <div className="min-h-[3.1875rem]">
            <p className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
              {dayjs(text).format("hh:mm:ss")}
            </p>
            <p
              className={classnames(
                isLate ? "text-neutral-4" : "text-secondary-6",
                "text-[0.875rem] font-[400] leading-[1.375rem]",
              )}
            >
              {type}
            </p>
          </div>
        );
      },
    },

    {
      title: "Check-out",
      dataIndex: "checkOut",
      key: "checkOut",
      width: "25%",

      render: (text) => {
        if (text === data[3].text)
          return (
            <span className="flex min-h-[3.1875rem] items-start font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
              {text}
            </span>
          );

        const { type } = checkLate(text, "out");

        return (
          <div className="min-h-[3.1875rem]">
            <p className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
              {dayjs(text).format("HH:mm:ss")}
            </p>
            <p className="text-[0.875rem] font-[400] leading-[1.375rem] text-neutral-4">
              {type}
            </p>
          </div>
        );
      },
    },

    {
      title: "Device",
      dataIndex: "device",
      key: "device",
      width: "25%",
      render: (text) => (
        <p className="flex min-h-[3.1875rem] items-start font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {text}
        </p>
      ),
    },
  ];

  // KEY TO FILTER DATA OF TABLE
  console.log(`🚀🚀🚀!..filterTime of DASHBOARD HISTORY TABLE:`, filterTime);
  return (
    <Table
      pagination={pagination}
      scroll={scroll}
      rowKey="id"
      columns={columns}
      className="w-full whitespace-nowrap"
      dataSource={dataTableHistory}
      rowClassName={onCheckRowAbsent}
    />
  );
}

export default React.memo(HistoryTable);

HistoryTable.propTypes = {
  filterTime: PropTypes.string,
};

HistoryTable.defaultProps = {
  filterTime: "",
};
