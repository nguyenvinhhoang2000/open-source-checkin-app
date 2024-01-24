import React from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useBoolean } from "usehooks-ts";

import AppHeaderTable from "@/components/apps/app-header-table";

import { ABSENT_FORM_NAME } from "@/constants/absent-form-name";
import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

import AbsentFormModal from "./components/absent-form";
import AbsentTable from "./components/absent-table";
import AbsentModalView from "./components/absent-view";

function AbsentRequestTable() {
  const [formModalName, setFormModalName] = React.useState(
    ABSENT_FORM_NAME.CREATE,
  );

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [dataSelectAction, setDataSelectAction] = React.useState({});

  const {
    value: isOpenModalView,
    setTrue: onShowModalView,
    setFalse: onHideModalView,
  } = useBoolean(false);

  const {
    value: isOpenModalForm,
    setTrue: onShowModalForm,
    setFalse: onHideModalForm,
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

  const onOpenCreateForm = React.useCallback(() => {
    setFormModalName(ABSENT_FORM_NAME.CREATE);

    onShowModalForm();
  }, [onShowModalForm]);

  const onOpenEditForm = React.useCallback(() => {
    setFormModalName(ABSENT_FORM_NAME.EDIT);

    onShowModalForm();
  }, [onShowModalForm]);

  return (
    <section className="container">
      <div className="mt-[1.25rem] flex flex-col gap-6 rounded-xl bg-white p-5 shadow-dropShadow">
        <AppHeaderTable
          title="Your Absent Request"
          classNameTitle="font-medium text-[1.25rem] leading-[1.75rem] font-roboto"
          filterTime={filterTime}
          buttonAbsentRequestText="Absent Request"
          onOpenAbsentRequestForm={onOpenCreateForm}
          onFilterTime={onFilterTime}
        />

        <AbsentTable
          onShowModalView={onShowModalView}
          filterTime={filterTime}
          onGetAbsentDetail={onGetAbsentDetail}
          onShowModalEdit={onOpenEditForm}
        />

        <AbsentModalView
          isModalOpen={isOpenModalView}
          onClose={onHideModalView}
          currentData={dataSelectAction}
          onOpenEdit={onOpenEditForm}
        />

        <AbsentFormModal
          currentData={dataSelectAction}
          onClose={onHideModalForm}
          cancelText="Cancel"
          isModalOpen={isOpenModalForm}
          formName={formModalName}
        />
      </div>
    </section>
  );
}

export default React.memo(AbsentRequestTable);
