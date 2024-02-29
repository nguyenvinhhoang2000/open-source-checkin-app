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

import { scroll } from "./table-config";

function HistoryTable() {
  const [searchParams, setSearchParams] = useSearchParams();

  const onSetFilter = useWorkingStatisticStore().onSetFilter;
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

  const renderContent = React.useCallback((status, type) => {
    if (type === CHECK_IN_OUT_TYPE.CHECKIN) {
      switch (status) {
        case CHECK_IN_OUT_STATUS.EARLY:
          return "Check-in Early";

        case CHECK_IN_OUT_STATUS.LATE:
          return "Check-in Late";

        case CHECK_IN_OUT_STATUS.ABSENT:
          return "Description";

        default:
          return null;
      }
    } else {
      switch (status) {
        case CHECK_IN_OUT_STATUS.EARLY:
          return "Check-out Early";

        case CHECK_IN_OUT_STATUS.LATE:
          return "Check-out Late";

        case CHECK_IN_OUT_STATUS.ABSENT:
          return "Description";

        default:
          return null;
      }
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
      render: (text) => (
        <p className="flex min-h-[3.1875rem] items-start font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {text}
        </p>
      ),
    },
  ];

  const onChangePage = React.useCallback(
    (page) => {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: page.current,
      });
      onSetFilter(null, page.current);
    },
    [onSetFilter, searchParams, setSearchParams],
  );

  return (
    <Table
      pagination={paginationConfig(totalWorkingHistory, pageWorkingHistory)}
      onChange={onChangePage}
      scroll={scroll}
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
