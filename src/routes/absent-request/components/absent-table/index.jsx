import React from "react";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useBoolean } from "usehooks-ts";

import { dataAbsent } from "@/constants/data/data-absent";

import AbsentFormModal from "../absent-form";
import AbsentModalView from "../absent-view";

import { pagination } from "./table-config";

function AbsentTable({ filterTime }) {
  const {
    value: isOpenView,
    setTrue: onOpenView,
    setFalse: onCloseView,
  } = useBoolean(false);
  const {
    value: isOpenEdit,
    setTrue: onOpenEdit,
    setFalse: onCloseEdit,
  } = useBoolean(false);

  const [dataView, setDateView] = React.useState({});
  const onOpenModalView = React.useCallback(
    (record) => {
      const { id, ...recordWithoutId } = record;
      setDateView(recordWithoutId);
      onOpenView();
    },
    [onOpenView],
  );
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
            <Button
              title="view"
              type="text"
              className="p-0"
              onClick={() => onOpenModalView(record)}
            >
              <img src="/assets/icons/eye.svg" alt="view" />
            </Button>

            {!dayjs(record.dateRequest).isAfter(dayjs(new Date()), "day") && (
              <Button
                title="edit"
                type="text"
                className="p-0"
                onClick={onOpenEdit}
              >
                <img src="/assets/icons/edit.svg" alt="edit" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  // handle width filterTime to render data of table
  console.log(`🚀🚀🚀!..filterTime:`, filterTime);
  return (
    <div>
      <Table
        pagination={pagination}
        scroll={{ x: "auto" }}
        rowKey="id"
        columns={columns}
        dataSource={dataAbsent}
      />

      <AbsentFormModal
        onClose={onCloseEdit}
        cancelText="Cancel"
        isModalOpen={isOpenEdit}
      />
      <AbsentModalView
        onClose={onCloseView}
        cancelText="Cancel"
        isModalOpen={isOpenView}
        currentData={dataView}
      />
    </div>
  );
}

export default AbsentTable;

AbsentTable.propTypes = {
  filterTime: PropTypes.string,
};

AbsentTable.defaultProps = {
  filterTime: "",
};
