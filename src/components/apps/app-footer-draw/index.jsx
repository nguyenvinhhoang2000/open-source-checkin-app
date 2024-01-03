import React from "react";
import { Button } from "antd";
import classnames from "classnames";
import PropTypes from "prop-types";

import { emptyFn } from "@/utils/empty-types";

function AppFooterDraw({
  classNames,
  okText,
  cancleText,
  onDelete,
  onOk,
  onCancle,
  deleteText,
  loadingButtonOk,
}) {
  return (
    <div className={classnames(classNames, "flex flex-row justify-end gap-2")}>
      {deleteText && (
        <Button danger type="text" onClick={onDelete}>
          {deleteText}
        </Button>
      )}
      <div className="flex flex-row items-center gap-2">
        {cancleText && <Button onClick={onCancle}>{cancleText}</Button>}
        <Button loading={loadingButtonOk} onClick={onOk} type="primary">
          {okText}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(AppFooterDraw);

AppFooterDraw.propTypes = {
  okText: PropTypes.string,
  cancleText: PropTypes.string,
  deleteText: PropTypes.string,
  classNames: PropTypes.string,
  onOk: PropTypes.func.isRequired,
  onCancle: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  loadingButtonOk: PropTypes.bool.isRequired,
};

AppFooterDraw.defaultProps = {
  okText: "Save",
  cancleText: "",
  deleteText: "",
  classNames: "",
  onDelete: emptyFn,
};
