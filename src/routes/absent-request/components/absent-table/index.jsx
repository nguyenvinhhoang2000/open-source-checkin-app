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

  const onOpenModalView = React.useCallback(
    (record) => {
      onGetAbsentDetail(record);

      onShowModal(ABSENT_MODAL_NAME.VIEW);
    },
    [onGetAbsentDetail, onShowModal],
  );

  const onOpenModalEdit = React.useCallback(
    async (record) => {
      onGetAbsentDetail(record);

      onShowModal(ABSENT_MODAL_NAME.EDIT);
    },
    [onGetAbsentDetail, onShowModal],
  );

  const columnRender = [
    {
      render: (text) => (
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format("DD-MM-YYYY hh:mm:ss")}
        </span>
      ),
    },

    {
      render: (text) => (
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format("DD-MM-YYYY hh:mm:ss")}
        </span>
      ),
    },

    {
      render: (text) => (
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format("DD-MM-YYYY hh:mm:ss")}
        </span>
      ),
    },

    {
      render: (text) => (
        <span className="line-clamp-2 min-w-[15rem] text-ellipsis whitespace-pre-wrap font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {text}
        </span>
      ),
    },

    {
      render: (record) => {
        const onClickButtonEye = () => {
          onOpenModalView(record);
        };

        const onClickButtonEdit = () => {
          onOpenModalEdit(record);
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

  const columns = ABSENT_TABLE_COLUMNS.map((item, index) => {
    return { ...item, ...columnRender[index] };
  });

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
  }, [filterTime, pagination.current]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    return () => {
      onClearListAbsentRequest();
    };
  }, [onClearListAbsentRequest]);

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
