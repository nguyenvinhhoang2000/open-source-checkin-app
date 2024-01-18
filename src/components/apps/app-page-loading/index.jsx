import React from "react";

function AppLoadingPage() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center">
      <img
        className="animate-ping duration-1000"
        src="/assets/icons/wiicamp-logo.svg"
        alt="w-logo"
      />
    </div>
  );
}

export default React.memo(AppLoadingPage);
