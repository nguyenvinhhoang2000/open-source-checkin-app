import React from "react";
import { useSearchParams } from "react-router-dom";
import { Table } from "antd";
import classnames from "classnames";
import dayjs from "dayjs";

import {
  CHECK_IN_OUT_STATUS,
  CHECK_IN_OUT_TYPE,
} from "@/constants/check-in-out";
import useWorkingStatisticStore from "@/store/use-working-store";
import onCheckRowAbsent from "@/utils/check-row-absent";
import paginationConfig from "@/utils/pagination-table-config";
import { renderContent } from "@/utils/render-check-in-out-content";

import { scroll } from "./table-config";

function HistoryTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const listWorkingHistory = useWorkingStatisticStore().listWorkingHistory;
  const totalWorkingHistory = useWorkingStatisticStore().totalWorkingHistory;
  const pageWorkingHistory = useWorkingStatisticStore().pageWorkingHistory;
  const isLoadingGetWorkingHistory =
    useWorkingStatisticStore().isLoadingGetWorkingHistory;

  const renderColor = React.useCallback((status) => {
    switch (status) {
      case CHECK_IN_OUT_STATUS.EARLY:
        return "text-success";

      case CHECK_IN_OUT_STATUS.LATE:
        return "text-neutral-4";

      case CHECK_IN_OUT_STATUS.ABSENT:
        return "text-absentDescription";

      default:
        return null;
    }
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "_id",
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
        if (!text) return null;

        return (
          <div className="min-h-[3.1875rem]">
            <p className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
              {dayjs(text.date).format("hh:mm:ss")}
            </p>
            <p
              className={classnames(
                renderColor(text.status),
                "text-[0.875rem] font-[400] leading-[1.375rem]",
              )}
            >
              {renderContent(text.status, CHECK_IN_OUT_TYPE.CHECKIN)}
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
        if (!text) return null;

        return (
          <div className="min-h-[3.1875rem]">
            <p className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
              {dayjs(text.date).format("HH:mm:ss")}
            </p>
            <p className="text-[0.875rem] font-[400] leading-[1.375rem] text-neutral-4">
              {renderContent(text.status, CHECK_IN_OUT_TYPE.CHECKOUT)}
            </p>
          </div>
        );
      },
    },

    {
      title: "Device",
      dataIndex: "userAgent",
      key: "_id",
      width: "25%",
      render: (userAgent) => {
        const deviceNamePattern = /\(.*?;(.*?)\)/;

        const match = userAgent.match(deviceNamePattern);

        const deviceName = match ? match[1].trim() : userAgent;
        return (
          <p className="flex min-h-[3.1875rem] items-start font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
            {deviceName}
          </p>
        );
      },
    },
  ];

  const onChangePage = React.useCallback(
    (page) => {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: page.current,
      });
    },
    [searchParams, setSearchParams],
  );

  return (
    <Table
      pagination={paginationConfig(totalWorkingHistory, pageWorkingHistory)}
      onChange={onChangePage}
      {...(listWorkingHistory.length !== 0 ? { scroll } : {})}
      rowKey="_id"
      columns={columns}
      className="w-full whitespace-nowrap"
      dataSource={listWorkingHistory}
      rowClassName={onCheckRowAbsent}
      loading={isLoadingGetWorkingHistory}
    />
  );
}

export default React.memo(HistoryTable);
