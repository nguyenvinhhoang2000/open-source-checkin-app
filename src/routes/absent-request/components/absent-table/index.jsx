import React from "react";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useBoolean } from "usehooks-ts";

import { ABSENT_FORM_NAME } from "@/constants/absent-form-name";
import useAuthStore from "@/store/use-auth-store";
import useLoadingStore from "@/store/use-loading-store";
import onCheckIsEditAbsent from "@/utils/check-allowce-edit-absent";

import AbsentFormModal from "../absent-form";
import AbsentModalView from "../absent-view";

import { paginationConfig, scroll } from "./config";

function AbsentTable({ filterTime }) {
  const isLoadingAbsentTable = useLoadingStore().isLoadingAbsentTable;
  const onHideLoadingAbsentTable = useLoadingStore().onHideLoadingAbsentTable;
  const onShowLoadingAbsentTable = useLoadingStore().onShowLoadingAbsentTable;
  const isRefreshAbsentTable = useLoadingStore().isRefreshAbsentTable;

  const onGetListAbsentRequest = useAuthStore().onGetListAbsentRequest;

  const [absentData, setAbsentData] = React.useState({});

  const [pageCurrent, setPageCurrent] = React.useState(1);

  const [dataSelectAction, setDataSelectAction] = React.useState({});

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

  React.useEffect(() => {
    const onGetListData = async () => {
      onShowLoadingAbsentTable();

      const { payload } = await onGetListAbsentRequest(
        filterTime,
        pageCurrent,
        paginationConfig.page,
      );

      onHideLoadingAbsentTable();

      setAbsentData(payload);
    };

    onGetListData();
  }, [filterTime, pageCurrent, isRefreshAbsentTable]); // eslint-disable-line react-hooks/exhaustive-deps

  const onOpenModalView = React.useCallback(
    (columnData, record) => {
      const { id, ...recordWithoutId } = record;

      setDataSelectAction({ columnData, record: recordWithoutId });

      onOpenView();
    },
    [onOpenView],
  );

  const onOpenModalEdit = React.useCallback(
    (columnData, record) => {
      setDataSelectAction({ columnData, record });

      onOpenEdit();
    },
    [onOpenEdit],
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

  const onChangePage = React.useCallback((page) => {
    setPageCurrent(page.current);
  }, []);

  const pagination = React.useMemo(() => {
    return {
      ...paginationConfig,
      total: absentData.total,
    };
  }, [absentData.total]);

  return (
    <>
      <Table
        loading={isLoadingAbsentTable}
        pagination={pagination}
        onChange={onChangePage}
        scroll={scroll}
        rowKey="_id"
        columns={columns}
        dataSource={absentData.data}
      />

      <AbsentModalView
        onClose={onCloseView}
        isModalOpen={isOpenView}
        currentData={dataSelectAction}
        onOpenEdit={onOpenEdit}
      />

      <AbsentFormModal
        onClose={onCloseEdit}
        cancelText="Cancel"
        isModalOpen={isOpenEdit}
        currentData={dataSelectAction}
        formName={ABSENT_FORM_NAME.EDIT}
      />
    </>
  );
}

export default AbsentTable;

AbsentTable.propTypes = {
  filterTime: PropTypes.string,
};

AbsentTable.defaultProps = {
  filterTime: "",
};
