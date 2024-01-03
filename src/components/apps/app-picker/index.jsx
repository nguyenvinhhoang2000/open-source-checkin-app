import React from "react";
import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";

function AppPicker({ children, classNames, onClick, checked, value }) {
  const onClickBtn = React.useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  return (
    <Button
      aria-label={`pick ${value}`}
      type="text"
      className={classnames(
        classNames,
        "relative h-full w-full p-0 hover:brightness-50",
      )}
      onClick={onClickBtn}
    >
      {children}
      {checked && (
        <img
          src="/assets/icons/picker.svg"
          alt="picker"
          className="absolute right-0 top-0 z-40"
        />
      )}
    </Button>
  );
}

export default React.memo(AppPicker);

AppPicker.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};
AppPicker.defaultProps = {
  classNames: "",
};
