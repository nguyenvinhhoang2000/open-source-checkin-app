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

import useAbsentStore from "@/store/use-absent-store";
import onCheckIsEditAbsent from "@/utils/check-allowce-edit-absent";

import { paginationConfig, scroll } from "./config";

function AbsentTable({
  filterTime,
  onShowModalEdit,
  onShowModalView,
  onGetAbsentDetail,
}) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoadingAbsentTable = useAbsentStore().isLoadingAbsentTable;
  const listAbsent = useAbsentStore().listAbsent;
  const totalAbsent = useAbsentStore().totalAbsent;
  const onGetListAbsentRequest = useAbsentStore().onGetListAbsentRequest;
  const onClearListAbsentRequest = useAbsentStore().onClearListAbsentRequest;

  const onOpenModalView = React.useCallback(
    (columnData, record) => {
      const { id, ...recordWithoutId } = record;

      onGetAbsentDetail({ columnData, record: recordWithoutId });

      onShowModalView();
    },
    [onGetAbsentDetail, onShowModalView],
  );

  const onOpenModalEdit = React.useCallback(
    async (columnData, record) => {
      onGetAbsentDetail({ columnData, record });

      onShowModalEdit();
    },
    [onGetAbsentDetail, onShowModalEdit],
  );

  const columns = [
    {
      title: "From",
      dataIndex: "fromAt",
      key: "fromAt",
      width: "11rem",
      render: (text) => (
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format("DD-MM-YYYY hh:mm:ss")}
        </span>
      ),
    },

    {
      title: "To",
      dataIndex: "toAt",
      key: "toAt",
      width: "11.75rem",
      render: (text) => (
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
          {dayjs(text).format("DD-MM-YYYY hh:mm:ss")}
        </span>
      ),
    },

    {
      title: "Date Request",
      dataIndex: "createdAt",
      key: "createdAt",
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
        const onClickButtonEye = () => {
          onOpenModalView(
            columns.filter((item) => item.key !== "actions"),
            record,
          );
        };

        const onClickButtonEdit = () => {
          onOpenModalEdit(
            columns.filter((item) => item.key !== "actions"),
            record,
          );
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
  onShowModalView: PropTypes.func.isRequired,
  onGetAbsentDetail: PropTypes.func.isRequired,
  onShowModalEdit: PropTypes.func.isRequired,
  filterTime: PropTypes.string,
};

AbsentTable.defaultProps = {
  filterTime: "",
};
