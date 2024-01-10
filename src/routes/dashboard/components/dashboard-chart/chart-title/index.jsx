import React from "react";
import classnames from "classnames";

import DropdownFilterTime from "@/components/apps/app-header-table/app-dropdown-filter-time";

import { defaultItemFilterTime } from "@/constants/default-item-filter-time";

function ChartTitle() {
  const [timeFilter, setTimeFilter] = React.useState(
    defaultItemFilterTime[0]?.key,
  );

  const onMenuClick = React.useCallback((e) => {
    setTimeFilter(e?.key);
  }, []);

  const items = defaultItemFilterTime.map((item) => {
    return {
      key: item.key,
      label: (
        <span
          className={classnames(
            "font-roboto text-[0.875rem] leading-[1.375rem]",
            item.key === timeFilter ? "font-[500]" : "font-[400]",
          )}
        >
          {item.key}
        </span>
      ),
    };
  });

  const menuProps = {
    items,
    onClick: onMenuClick,
  };
  return (
    <div className="flex flex-row justify-between">
      <span className="text-[1.25rem] font-medium">Statistic</span>

      <DropdownFilterTime menuProps={menuProps} timeFilter={timeFilter} />
    </div>
  );
}

export default React.memo(ChartTitle);
