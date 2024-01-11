import React from "react";
import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";

import { BUTTON_TYPE } from "@/constants/button-type";
import { emptyFn } from "@/utils/empty-types";

function AppFooterPopup({
  classNames,
  okText,
  cancelText,
  onDelete,
  onOk,
  onCancel,
  deleteText,
  isLoadingButtonOk,
  buttonOkType,
  buttonOkClassNames,
}) {
  return (
    <div className={classnames(classNames, "flex flex-row justify-end gap-2")}>
      {deleteText && (
        <Button danger type="text" onClick={onDelete}>
          {deleteText}
        </Button>
      )}
      <div className="flex flex-row items-center gap-2">
        {cancelText && (
          <Button disabled={isLoadingButtonOk} onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        <Button
          className={buttonOkClassNames}
          loading={isLoadingButtonOk}
          onClick={onOk}
          type="primary"
          htmlType={buttonOkType}
        >
          {okText}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(AppFooterPopup);

AppFooterPopup.propTypes = {
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  deleteText: PropTypes.string,
  classNames: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  isLoadingButtonOk: PropTypes.bool.isRequired,
  buttonOkType: PropTypes.oneOf(BUTTON_TYPE),
  buttonOkClassNames: PropTypes.string,
};

AppFooterPopup.defaultProps = {
  okText: "Save",
  cancelText: "",
  deleteText: "",
  classNames: "",
  buttonOkType: BUTTON_TYPE[0],
  buttonOkClassNames: "",
  onDelete: emptyFn,
};
