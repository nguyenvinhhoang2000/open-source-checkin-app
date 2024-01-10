import React from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";

import { fullConfig } from "@/theme";

import Navigation from "../navigation";
import UserDropdown from "../user-info/user-dropdown";

function NavigationDraw() {
  const [open, setOpen] = React.useState(false);

  const onOpenDraw = React.useCallback(() => {
    setOpen(true);
  }, []);
  const onCloseDraw = React.useCallback(() => {
    setOpen(false);
  }, []);

  const renderTitle = React.useMemo(() => {
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
        title={renderTitle}
        placement="right"
        onClose={onCloseDraw}
        open={open}
      >
        <Navigation classNames="flex flex-col justify-between gap-4" />
      </Drawer>
    </div>
  );
}
export default NavigationDraw;
