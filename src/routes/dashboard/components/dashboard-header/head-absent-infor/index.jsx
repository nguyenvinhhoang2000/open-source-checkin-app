import React from "react";

import useWorkingStatisticStore from "@/store/use-working-store";

function HeadAbsentInfor() {
  const onGetWorkingStatistic =
    useWorkingStatisticStore().onGetWorkingStatistic;
  const totalEarly = useWorkingStatisticStore().totalEarly;
  const totalLater = useWorkingStatisticStore().totalLater;
  const totalAbsent = useWorkingStatisticStore().totalAbsent;

  const workingStatistic = React.useMemo(() => {
    return [
      {
        id: "01",
        number: totalAbsent + totalEarly + totalLater,
        text: "Total All time",
      },
      {
        id: "02",
        number: totalEarly,
        text: "Check-in Early",
      },
      {
        id: "03",
        number: totalLater,
        text: "Check-in Late",
      },
      {
        id: "04",
        number: totalAbsent,
        text: "Absent",
      },
    ];
  }, [totalAbsent, totalEarly, totalLater]);

  React.useEffect(() => {
    onGetWorkingStatistic();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-[1.25rem] flex gap-[1.5rem] lg:mt-0">
      {workingStatistic.map((item) => (
        <div
          className="flex flex-col gap-[0.25rem] text-center sm:min-w-[5.3125rem]"
          key={item.id}
        >
          <h2 className="font-roboto text-xl font-medium leading-10 text-character-1 sm:text-3xl">
            {item.number}
          </h2>
          <p className="font-roboto text-sm font-normal leading-[1.375rem] text-character-2">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default React.memo(HeadAbsentInfor);
