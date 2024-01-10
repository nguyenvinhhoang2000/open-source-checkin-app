import React from "react";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { dataAbsent } from "@/constants/data/data-absent";

import AbsentFormModal from "../absent-form";
import AbsentView from "../absent-view";

function AbsentTable({ filterTime }) {
  const [isOpenView, setIsOpenView] = React.useState(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);

  const onOpenModalView = React.useCallback(() => {
    setIsOpenView(true);
  }, []);
  const onCloseModalView = React.useCallback(() => {
    setIsOpenView(false);
  }, []);
  const onOpenModalEdit = React.useCallback(() => {
    setIsOpenEdit(true);
  }, []);
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
              onClick={onOpenModalEdit}
            >
              <img src="/assets/icons/eye.svg" alt="view" />
              <AbsentView />
            </Button>

            {!dayjs(record.dateRequest).isAfter(dayjs(new Date()), "day") && (
              <Button
                title="edit"
                type="text"
                className="p-0"
                onClick={onOpenModalView}
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
        pagination={{
          pageSize: 7,
        }}
        scroll={{ x: "auto" }}
        rowKey="id"
        columns={columns}
        dataSource={dataAbsent}
      />

      <AbsentFormModal
        onClose={onCloseModalView}
        cancelText="Cancel"
        isModalOpen={isOpenView}
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
