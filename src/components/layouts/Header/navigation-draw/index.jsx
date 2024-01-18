import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useBoolean } from "usehooks-ts";

import { fullConfig } from "@/theme";

import Navigation from "../navigation";
import UserDropdown from "../user-info/user-dropdown";

function NavigationDraw() {
  const {
    value: isOpen,
    setFalse: onCloseDraw,
    setTrue: onOpenDraw,
  } = useBoolean(false);

  const onRenderTitle = React.useMemo(() => {
    return (
      <div className="sm:hidden">
        <UserDropdown />
      </div>
    );
  }, []);

  return (
    <div>
      <Button
        aria-label="navigation-list"
        className="flex items-center"
        type="text"
        onClick={onOpenDraw}
      >
        <UnorderedListOutlined />
      </Button>
      <Drawer
        width={fullConfig.theme.width.drawWidth}
        title={onRenderTitle}
        placement="right"
        onClose={onCloseDraw}
        open={isOpen}
      >
        <Navigation classNames="flex flex-col justify-between gap-4" />
      </Drawer>
    </div>
  );
}
export default NavigationDraw;
