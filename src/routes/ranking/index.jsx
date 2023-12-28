import React from "react";

import { topThree } from "@/constants/data/dataRanking";

import Congratulation from "../components/congratulation";

function Ranking() {
  return (
    <section className="flex flex-col items-center justify-start gap-[1.5rem]">
      <Congratulation topThree={topThree} />
    </section>
  );
}

export default Ranking;
