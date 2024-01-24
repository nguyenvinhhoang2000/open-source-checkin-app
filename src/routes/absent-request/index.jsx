import React from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useBoolean } from "usehooks-ts";

import AppHeaderTable from "@/components/apps/app-header-table";

import { ABSENT_MODAL_NAME } from "@/constants/absent-form-name";
import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

import AbsentTable from "./components/absent-table";
import CommonModal from "./components/common-modal";

function AbsentRequestTable() {
  const [modalName, setModalName] = React.useState(ABSENT_MODAL_NAME.CREATE);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [dataSelectAction, setDataSelectAction] = React.useState({});

  const {
    value: isOpenModal,
    setTrue: onShowModal,
    setFalse: onHideModal,
  } = useBoolean(false);

  const [filterTime, setFilterTime] = React.useState(
    defaultItemFilterTime[0].key,
  );

  const onFilterTime = React.useCallback(
    (record) => {
      setFilterTime(record.key);
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          ...Object.fromEntries(searchParams),
          filterTime: record.key,
        }).toString(),
      });
    },
    [location.pathname, navigate, searchParams],
  );

  const onGetAbsentDetail = React.useCallback((data) => {
    setDataSelectAction(data);
  }, []);

  const onOpenModal = React.useCallback(
    (value) => {
      setModalName(value);

      onShowModal();
    },
    [onShowModal],
  );

  const onOpenModalAbsentFormCreate = React.useCallback(() => {
    setModalName(ABSENT_MODAL_NAME.CREATE);
    onShowModal();
  }, [onShowModal]);

  return (
    <section className="container">
      <div className="mt-[1.25rem] flex flex-col gap-6 rounded-xl bg-white p-5 shadow-dropShadow">
        <AppHeaderTable
          title="Your Absent Request"
          classNameTitle="font-medium text-[1.25rem] leading-[1.75rem] font-roboto"
          filterTime={filterTime}
          buttonAbsentRequestText="Absent Request"
          onOpenAbsentRequestForm={onOpenModalAbsentFormCreate}
          onFilterTime={onFilterTime}
        />

        <AbsentTable
          onShowModalView={onShowModal}
          filterTime={filterTime}
          onGetAbsentDetail={onGetAbsentDetail}
          onShowModal={onOpenModal}
        />

        <CommonModal
          currentData={dataSelectAction}
          onOpenModal={onOpenModal}
          isModalOpen={isOpenModal}
          onClose={onHideModal}
          modalName={modalName}
        />
      </div>
    </section>
  );
}

export default React.memo(AbsentRequestTable);
