import React, { useMemo, useState } from "react";
import { Button, Table } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import DropdownFilterTime from "@/components/apps/dropown-filter-time";

import { defaultItemFilterTime } from "@/constants/defaultItemFilterTime";
import { absentNumOfShow } from "@/constants/defaultPagination";
import { filterDataAbsent } from "@/utils/filterTime";

import styles from "./absentTable.module.css";

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

          {(dayjs(record.dateRequest).isSame(currentDate, "day") ||
            dayjs(record.dateRequest).isAfter(currentDate)) && (
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

function AbsentTable(props) {
  const { dataAbsent } = props;

  const [timeFilter, setTimeFilter] = useState(defaultItemFilterTime[0]?.key);

  const handleMenuClick = (e) => {
    setTimeFilter(e?.key);
  };

  const items = defaultItemFilterTime.map((item) => {
    return {
      key: item.key,

      label: (
        <span
          className={classNames(
            "font-roboto text-[0.875rem] leading-[1.375rem]",
            item.key === timeFilter ? "font-[500]" : "font-[400]",
          )}
        >
          {item.key}
        </span>
      ),
    };
  });

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const dataAbsentFilter = useMemo(() => {
    const newData = filterDataAbsent(timeFilter, dataAbsent);

    return newData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilter]);

  return (
    <div className="container">
      <div className="rounded-[0.5rem] bg-neutral-0 p-[1.25rem] shadow-tableShadow">
        <div className="flex w-full flex-col items-start justify-start gap-[1.25rem]">
          <div className="flex flex-col items-center justify-start gap-[1rem] self-stretch sm:flex-row sm:gap-0">
            <h4 className="mr-auto font-roboto text-[1.25rem] font-[500] leading-[1.75rem]">
              Your Absent Request
            </h4>

            <div className="flex items-center justify-end gap-[1.5rem]">
              <DropdownFilterTime
                menuProps={menuProps}
                timeFilter={timeFilter}
              />

              <Button
                className="min-w-[8.1875rem]"
                title="Absent Request"
                type="primary"
              >
                Absent Request
              </Button>
            </div>
          </div>

          <Table
            pagination={{ pageSize: absentNumOfShow }}
            scroll={{
              x: "auto",
            }}
            rowKey="id"
            columns={columns}
            dataSource={dataAbsentFilter}
            className={classNames(
              "w-full whitespace-nowrap",
              styles.customTable,
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default AbsentTable;

AbsentTable.propTypes = {
  dataAbsent: PropTypes.instanceOf(Array).isRequired,
};
