import React from "react";
import { Button, Dropdown } from "antd";
import PropTypes from "prop-types";

import Down from "../../icons/down";

function DropdownFilterTime(props) {
  const { menuProps, timeFilter } = props;

  return (
    <div className="flex items-center justify-center self-stretch px-[0.9375rem] py-[0.25rem]">
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem] text-primary-0">
        {timeFilter}
      </span>

      <Dropdown
        menu={menuProps}
        overlayClassName="w-[7.8125rem]"
        placement="bottomRight"
      >
        <Button
          className="flex flex-col items-center justify-center"
          title="Filter"
          type="link"
          icon={<Down />}
        />
      </Dropdown>
    </div>
  );
}

export default DropdownFilterTime;

DropdownFilterTime.propTypes = {
  menuProps: PropTypes.instanceOf(Object).isRequired,
  timeFilter: PropTypes.string.isRequired,
};
