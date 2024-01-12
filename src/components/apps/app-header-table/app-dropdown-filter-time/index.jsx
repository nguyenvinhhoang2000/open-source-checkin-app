import React from "react";
import { Button, Dropdown } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

function AppDropdownFilterTime({ onFilterTime, filterTime }) {
  const menu = React.useMemo(() => {
    const data = defaultItemFilterTime.map((item, index) => {
      return {
        id: index + 1,
        key: item.key,
        label: (
          <span
            className={classNames(
              item.key === filterTime && "font-medium",
              "text-[0.875rem]",
            )}
          >
            {item.label}
          </span>
        ),
      };
    });
    return {
      items: data,
      onClick: onFilterTime,
    };
  }, [filterTime, onFilterTime]);
  return (
    <Dropdown
      menu={menu}
      placement="bottom"
      trigger={["click"]}
      className="flex flex-row items-center justify-between gap-[0.625rem] font-roboto"
    >
      <Button title="Filter" type="text">
        <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem] text-primary-0">
          {defaultItemFilterTime.find((item) => item.key === filterTime)?.label}
        </span>

        <img src="/assets/icons/filter-down.svg" alt="filter down" />
      </Button>
    </Dropdown>
  );
}

export default AppDropdownFilterTime;

AppDropdownFilterTime.propTypes = {
  onFilterTime: PropTypes.func.isRequired,
  filterTime: PropTypes.string.isRequired,
};
