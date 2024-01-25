import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import ABSENT_TABLE_COLUMNS from "@/constants/absent-table";
import { FORMAT_DATE } from "@/constants/format-date";
import { emptyObj } from "@/utils/empty-types";

function AbsentView({ currentData }) {
  return (
    <div className="flex flex-col gap-2 border-b border-t border-b-black/5 border-t-black/5 px-6 pb-1 pt-4">
      {ABSENT_TABLE_COLUMNS.map(
        (item, index) =>
          index < 4 && (
            <div
              key={item.key}
              className="flex flex-row flex-wrap justify-between gap-2 font-roboto"
            >
              <span className="font-bold">{item.title}</span>
              <span>
                {item.key === ABSENT_TABLE_COLUMNS[3].key
                  ? currentData[item.key]?.toString()
                  : dayjs(new Date(currentData[item.key])).format(
                      FORMAT_DATE.FORMAT_DATE_FOR_DATE_AND_12_HOURS_AND_INTERVALS,
                    )}
              </span>
            </div>
          ),
      )}
    </div>
  );
}

export default React.memo(AbsentView);

AbsentView.propTypes = {
  currentData: PropTypes.instanceOf(Object),
};

AbsentView.defaultProps = {
  currentData: emptyObj,
};
