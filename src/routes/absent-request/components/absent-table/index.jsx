import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { ABSENT_MODAL_NAME } from "@/constants/absent-form-name";
import ABSENT_TABLE_COLUMNS from "@/constants/absent-table";
import { FORMAT_DATE } from "@/constants/format-date";
import useAbsentStore from "@/store/use-absent-store";
import onCheckIsEditAbsent from "@/utils/check-allowce-edit-absent";
import paginationConfig from "@/utils/pagination-table-config";

import { scroll } from "./config";

function AbsentTable({ onShowModal, onGetAbsentDetail }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isLoadingAbsentTable = useAbsentStore().isLoadingAbsentTable;
  const listAbsent = useAbsentStore().listAbsent;
  const totalAbsent = useAbsentStore().totalAbsent;
  const pageAbsent = useAbsentStore().pageAbsent;
  const onSetPage = useAbsentStore().onSetPage;

  const columns = [
    {
      ...ABSENT_TABLE_COLUMNS.FROM_AT,
      render: (text) => (
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format(FORMAT_DATE.FORMAT_DATE_FOR_DATE_AND_24_HOURS)}
        </span>
      ),
    },

    {
      ...ABSENT_TABLE_COLUMNS.TO_AT,
      render: (text) => (
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format(FORMAT_DATE.FORMAT_DATE_FOR_DATE_AND_24_HOURS)}
        </span>
      ),
    },

    {
      ...ABSENT_TABLE_COLUMNS.CREATE_AT,
      render: (text) => (
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format(FORMAT_DATE.FORMAT_DATE_FOR_DATE_AND_24_HOURS)}
        </span>
      ),
    },

    {
      ...ABSENT_TABLE_COLUMNS.DESCRIPTION,
      render: (text) => (
        <span className="line-clamp-2 min-w-[15rem] text-ellipsis whitespace-pre-wrap font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {text}
        </span>
      ),
    },

    {
      ...ABSENT_TABLE_COLUMNS.ACTIONS,
      render: (record) => {
        const onClickButtonEye = () => {
          onGetAbsentDetail(record);
          onShowModal(ABSENT_MODAL_NAME.VIEW);
        };

        const onClickButtonEdit = () => {
          onGetAbsentDetail(record);
          onShowModal(ABSENT_MODAL_NAME.EDIT);
        };

        return (
          <div className="flex items-center justify-start gap-[1.25rem]">
            <Button
              title="view"
              type="text"
              className="h-[1.25rem] w-[1.25rem] p-0"
              onClick={onClickButtonEye}
            >
              <img src="/assets/icons/eye.svg" alt="view" />
            </Button>

            {onCheckIsEditAbsent(record.fromAt) && (
              <Button
                title="edit"
                type="text"
                className="h-[1.25rem] w-[1.25rem] p-0"
                onClick={onClickButtonEdit}
              >
                <img src="/assets/icons/edit.svg" alt="edit" />
              </Button>
            )}
          </div>
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
      onSetPage(page.current);
    },
    [onSetPage, searchParams, setSearchParams],
  );

  return (
    <Table
      loading={isLoadingAbsentTable}
      pagination={paginationConfig(totalAbsent, pageAbsent)}
      onChange={onChangePage}
      scroll={scroll}
      rowKey="_id"
      columns={columns}
      dataSource={listAbsent}
    />
  );
}

export default React.memo(AbsentTable);

AbsentTable.propTypes = {
  onGetAbsentDetail: PropTypes.func.isRequired,
  onShowModal: PropTypes.func.isRequired,
};
