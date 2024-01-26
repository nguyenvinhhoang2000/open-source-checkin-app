import React from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { ABSENT_MODAL_NAME } from "@/constants/absent-form-name";
import ABSENT_TABLE_COLUMNS from "@/constants/absent-table";
import { FORMAT_DATE } from "@/constants/format-date";
import useAbsentStore from "@/store/use-absent-store";
import onCheckIsEditAbsent from "@/utils/check-allowce-edit-absent";

import { paginationConfig, scroll } from "./config";

function AbsentTable({ filterTime, onShowModal, onGetAbsentDetail }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoadingAbsentTable = useAbsentStore().isLoadingAbsentTable;
  const listAbsent = useAbsentStore().listAbsent;
  const totalAbsent = useAbsentStore().totalAbsent;
  const onGetListAbsentRequest = useAbsentStore().onGetListAbsentRequest;
  const onClearListAbsentRequest = useAbsentStore().onClearListAbsentRequest;

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
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          ...Object.fromEntries(searchParams),
          page: page.current,
        }).toString(),
      });
    },
    [location.pathname, navigate, searchParams],
  );

  const pagination = React.useMemo(() => {
    return {
      ...paginationConfig,
      total: totalAbsent,
      current: +searchParams.get("page") || 1,
    };
  }, [totalAbsent, searchParams]);

  const onGetListData = React.useCallback(async () => {
    await onGetListAbsentRequest(filterTime, pagination.current);
  }, [filterTime, onGetListAbsentRequest, pagination]);

  React.useEffect(() => {
    onGetListData();

    return () => {
      onClearListAbsentRequest();
    };
  }, [filterTime, pagination.current]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Table
      loading={isLoadingAbsentTable}
      pagination={pagination}
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
  filterTime: PropTypes.string,
};

AbsentTable.defaultProps = {
  filterTime: "",
};
