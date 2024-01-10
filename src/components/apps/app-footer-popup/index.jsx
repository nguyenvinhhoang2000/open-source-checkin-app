import React from "react";
import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";

import { emptyFn } from "@/utils/empty-types";

function AppFooterDraw({
  classNames,
  okText,
  cancelText,
  onDelete,
  onOk,
  onCancel,
  deleteText,
  loadingButtonOk,
  htmlType,
}) {
  return (
    <div className={classnames(classNames, "flex flex-row justify-end gap-2")}>
      {deleteText && (
        <Button danger type="text" onClick={onDelete}>
          {deleteText}
        </Button>
      )}
      <div className="flex flex-row items-center gap-2">
        {cancelText && <Button onClick={onCancel}>{cancelText}</Button>}
        <Button
          loading={loadingButtonOk}
          onClick={onOk}
          type="primary"
          htmlType={htmlType}
        >
          {okText}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(AppFooterDraw);

AppFooterDraw.propTypes = {
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  deleteText: PropTypes.string,
  classNames: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  loadingButtonOk: PropTypes.bool.isRequired,
  htmlType: PropTypes.oneOf(["submit", "button", "reset"]).isRequired,
};

AppFooterDraw.defaultProps = {
  okText: "Save",
  cancelText: "",
  deleteText: "",
  classNames: "",
  onDelete: emptyFn,
};
