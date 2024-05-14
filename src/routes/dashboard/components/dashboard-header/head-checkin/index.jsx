import React from "react";
import { Button } from "antd";
import { useBoolean } from "usehooks-ts";

import AppModel from "@/components/apps/app-model";

function Checkin() {
  const {
    value: isModalOpen,
    setTrue: onOpenModal,
    setFalse: onCloseModal,
  } = useBoolean(false);

  const onClickOk = React.useCallback(() => {
    onCloseModal();
  }, [onCloseModal]);

  return (
    <div className="mt-[1.25rem] lg:mt-0 lg:flex lg:flex-col lg:justify-center">
      <Button type="primary" onClick={onOpenModal}>
        Check-in
      </Button>
      <AppModel
        text="Check-in"
        title="Bạn Check-in trễ!"
        description="Vui lòng tuân thủ giờ làm việc của bạn hơn"
        src="/assets/icons/check-in.svg"
        okText="Hủy"
        onHandleOk={onClickOk}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}

export default React.memo(Checkin);
