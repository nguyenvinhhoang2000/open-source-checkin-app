import React from "react";
import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";

function AppTitlePopup({
  titleText,
  onClose,
  classNames,
  classNamesClose,
  classNamesTitle,
  isDisabledClose,
}) {
  return (
    <div
      className={classnames(
        classNames,
        "flex flex-row items-center justify-between",
      )}
    >
      <span
        className={classnames(classNamesTitle, "flex items-center font-medium")}
      >
        {titleText}
      </span>
      <Button
        disabled={isDisabledClose}
        aria-label="Close draw"
        className={classnames(classNamesClose, "m-0 h-fit p-0")}
        onClick={onClose}
        type="text"
      >
        <img src="/assets/icons/close-icon.svg" alt="close" />
      </Button>
    </div>
  );
}

export default React.memo(AppTitlePopup);

AppTitlePopup.propTypes = {
  titleText: PropTypes.string,
  classNames: PropTypes.string,
  classNamesClose: PropTypes.string,
  classNamesTitle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  isDisabledClose: PropTypes.bool,
};

AppTitlePopup.defaultProps = {
  titleText: "Title Draw",
  classNames: "",
  classNamesClose: "",
  classNamesTitle: "",
  isDisabledClose: false,
};
