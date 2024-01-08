import React from "react";
import { Table } from "antd";
import dayjs from "dayjs";

import { dataTableHistory } from "@/constants/data/data-history-table";
import checkLate from "@/utils/check-late";

function HistoryTable() {
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
        if (text === "Absent")
          return (
            <div className="min-h-[3.1875rem]">
              <p className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
                {text}
              </p>
              <p className="text-checkDescription text-[0.75rem]">
                Description
              </p>
            </div>
          );

        const isLate = checkLate(text, "in");

        return (
          <div className="min-h-[3.1875rem]">
            <p className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
              {dayjs(text).format("hh:mm:ss")}
            </p>
            {isLate ? (
              <p className="text-[0.875rem] font-[400] leading-[1.375rem] text-neutral-4">
                Check-in Late
              </p>
            ) : (
              <p className="text-checkEalry text-[0.875rem] font-[400] leading-[1.375rem]">
                Check-in Early
              </p>
            )}
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
        if (text === "Absent")
          return (
            <span className="flex min-h-[3.1875rem] items-start font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
              {text}
            </span>
          );

        const isLate = checkLate(text, "out");

        return (
          <div className="min-h-[3.1875rem]">
            <p className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
              {dayjs(text).format("hh:mm:ss")}
            </p>
            {isLate ? (
              <p className="text-checkEalry text-[0.875rem] font-[400] leading-[1.375rem]">
                Check-out Late
              </p>
            ) : (
              <p className="text-[0.875rem] font-[400] leading-[1.375rem] text-neutral-4">
                Check-out Early
              </p>
            )}
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
  return (
    <div>
      {" "}
      <Table
        pagination={{
          pageSize: 8,
        }}
        scroll={{ x: "auto" }}
        rowKey="id"
        columns={columns}
        className="w-full whitespace-nowrap"
        dataSource={dataTableHistory}
        rowClassName={(record) =>
          record.checkIn === "Absent" ? "bg-neutral-3" : ""
        }
      />
    </div>
  );
}

export default React.memo(HistoryTable);
