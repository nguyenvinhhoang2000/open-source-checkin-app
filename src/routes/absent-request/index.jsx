import React from "react";

import { dataAbsent } from "@/constants/data/data-absent";

import AbsentTable from "./components/absent-table";

function AbsentRequest() {
  return (
    <section className="mt-[1.25rem]">
      <AbsentTable dataAbsent={dataAbsent} />
    </section>
  );
}

export default AbsentRequest;
