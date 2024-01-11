import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

import { emptyFn } from "@/utils/empty-types";

import AppDropdownFilterTime from "./app-dropdown-filter-time";

function AppHeaderTable({
  title,
  classNameTitle,
  onFilterTime,
  filterTime,
  buttonAbsentRequestText,
  onOpenAbsentRequestForm,
}) {
  return (
    <div className="flex flex-col items-center gap-4 min-[380px]:flex min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
      <span className={classNameTitle}>{title}</span>
      <div className="flex flex-row items-center gap-6">
        <AppDropdownFilterTime
          onFilterTime={onFilterTime}
          filterTime={filterTime}
        />
        {buttonAbsentRequestText && (
          <Button
            className="h-full min-h-[2.3125rem] min-w-[8.1875rem] font-roboto"
            title="Absent Request"
            type="primary"
            onClick={onOpenAbsentRequestForm}
          >
            {buttonAbsentRequestText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default AppHeaderTable;

AppHeaderTable.propTypes = {
  title: PropTypes.string.isRequired,
  classNameTitle: PropTypes.string,
  onFilterTime: PropTypes.func.isRequired,
  filterTime: PropTypes.string.isRequired,
  onOpenAbsentRequestForm: PropTypes.func,
  buttonAbsentRequestText: PropTypes.string,
};

AppHeaderTable.defaultProps = {
  classNameTitle: "",
  buttonAbsentRequestText: "",
  onOpenAbsentRequestForm: emptyFn,
};
