import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

function AppTitleDraw({
  titleText,
  onClose,
  classNames,
  classNamesClose,
  classNamesTitle,
}) {
  return (
    <div className={classNames}>
      <span className={classNamesTitle}>{titleText}</span>
      <Button
        aria-label="Close draw"
        className={classNamesClose}
        onClick={onClose}
        type="text"
      >
        <img src="/assets/icons/close-icon.svg" alt="close" />
      </Button>
    </div>
  );
}

export default React.memo(AppTitleDraw);

AppTitleDraw.propTypes = {
  titleText: PropTypes.string,
  classNames: PropTypes.string,
  classNamesClose: PropTypes.string,
  classNamesTitle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

AppTitleDraw.defaultProps = {
  titleText: "Save",
  classNames: "flex flex-row items-center justify-between",
  classNamesClose: "p-0 m-0 h-fit",
  classNamesTitle: "flex items-center font-medium",
};
