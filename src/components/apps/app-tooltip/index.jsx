import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import {
  TOOLTIP_ARROW,
  TOOLTIP_COLOR,
  TOOLTIP_DIRECTION,
} from "@/constants/config-app/tooltip";
import {
  findArrowTooltip,
  findDirectionTooltip,
} from "@/utils/find-direction-tooltip";

function AppToolTip({ position, content, children, classNames, colorToolTip }) {
  const foundDirection = findDirectionTooltip(TOOLTIP_DIRECTION, position);
  const foundArrow = findArrowTooltip(TOOLTIP_ARROW, position);
  return (
    <div className={classnames(classNames, "relative cursor-pointer")}>
      <div className="mx-2 my-1">{children}</div>
      <span
        className={classnames(
          TOOLTIP_COLOR[colorToolTip][position].bg,
          "absolute w-[2.375rem] whitespace-nowrap rounded-lg p-2 text-xs",
          foundDirection.classname,
        )}
      >
        {content}
      </span>
      <span
        className={classnames(
          "absolute border-[6px]",
          foundArrow.classname,
          TOOLTIP_COLOR[colorToolTip][position].arrow,
        )}
      />
    </div>
  );
}
export default React.memo(AppToolTip);

AppToolTip.propTypes = {
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
  colorToolTip: PropTypes.oneOf(["chart-1", "chart-2"]),
};
AppToolTip.defaultProps = {
  classNames: "",
  colorToolTip: "chart-2",
};
