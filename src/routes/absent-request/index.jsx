import React from "react";
import { useBoolean } from "usehooks-ts";

import AppHeaderTable from "@/components/apps/app-header-table";

import { ABSENT_FORM_NAME } from "@/constants/absent-form-name";
import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

import AbsentFormModal from "./components/absent-form";
import AbsentTable from "./components/absent-table";

function AbsentRequestTable() {
  const {
    value: isOpenCreateAbsent,
    setTrue: onOpenCreateAbsent,
    setFalse: onCloseCreateAbsent,
  } = useBoolean(false);

  const [filterTime, setFilterTime] = React.useState(
    defaultItemFilterTime[0].key,
  );

  const onFilterTime = React.useCallback((record) => {
    setFilterTime(record.key);
  }, []);

  return (
    <section className="container">
      <div className="mt-[1.25rem] flex flex-col gap-6 rounded-xl bg-white p-5 shadow-dropShadow">
        <AppHeaderTable
          title="Your Absent Request"
          classNameTitle="font-medium text-[1.25rem] leading-[1.75rem] font-roboto"
          filterTime={filterTime}
          buttonAbsentRequestText="Absent Request"
          onOpenAbsentRequestForm={onOpenCreateAbsent}
          onFilterTime={onFilterTime}
        />
        <AbsentFormModal
          onClose={onCloseCreateAbsent}
          cancelText="Cancel"
          isModalOpen={isOpenCreateAbsent}
          formName={ABSENT_FORM_NAME.CREATE}
        />
        <AbsentTable filterTime={filterTime} />
      </div>
    </section>
  );
}

export default React.memo(AbsentRequestTable);
