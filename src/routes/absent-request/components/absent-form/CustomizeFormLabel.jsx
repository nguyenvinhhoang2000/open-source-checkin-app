import React from "react";

function CustomizeFormLabel(label, { required }) {
  return (
    <>
      <span>{label}</span>
      {required && <span className="font-roboto text-danger">&nbsp;*</span>}
    </>
  );
}

export default CustomizeFormLabel;
