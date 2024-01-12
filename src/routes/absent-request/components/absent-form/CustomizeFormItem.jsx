import React from "react";

function CustomizeFormItem(label, { required }) {
  return (
    <div className="flex flex-row gap-1">
      {label}
      {required && <span className="font-roboto text-danger">*</span>}
    </div>
  );
}

export default CustomizeFormItem;
