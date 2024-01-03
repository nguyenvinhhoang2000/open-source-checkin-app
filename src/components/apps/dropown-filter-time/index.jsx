import React from "react";
import { Button, Dropdown } from "antd";
import PropTypes from "prop-types";

function DropdownFilterTime(props) {
  const { menuProps, timeFilter } = props;

  return (
    <Dropdown
      menu={menuProps}
      overlayClassName="w-[7.8125rem]"
      placement="bottomRight"
      trigger={["click"]}
    >
      <Button
        className="flex items-center justify-center gap-[0.625rem] self-stretch px-[0.9375rem] py-[0.25rem]"
        title="Filter"
        type="link"
      >
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem] text-primary-0">
          {timeFilter}
        </span>

        <img src="/assets/icons/filter-down.svg" alt="filter down" />
      </Button>
    </Dropdown>
  );
}

export default DropdownFilterTime;

DropdownFilterTime.propTypes = {
  menuProps: PropTypes.instanceOf(Object).isRequired,
  timeFilter: PropTypes.string.isRequired,
};
