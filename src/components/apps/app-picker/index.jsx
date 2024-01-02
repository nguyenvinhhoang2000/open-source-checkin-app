import React from "react";
import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";

function AppPicker({ children, classNames, onClick, checked, value }) {
  return (
    <Button
      aria-label={`picke ${value}`}
      type="text"
      className={classnames(
        classNames,
        "relative h-full w-full p-0 hover:brightness-50",
      )}
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
      {checked && (
        <div className="absolute right-0 top-0 z-40">
          <img src="/assets/icons/picker.svg" alt="picker" />
        </div>
      )}
    </Button>
  );
}

export default React.memo(AppPicker);

AppPicker.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};
AppPicker.defaultProps = {
  classNames: "",
};
