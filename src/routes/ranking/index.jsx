import React from "react";

import { dataRanking } from "@/constants/data/dataRanking";

import Congratulation from "../components/ranking/congratulation";
import RankTable from "../components/ranking/rank-table";

function Ranking() {
  return (
    <section className="flex flex-col items-center justify-start gap-[1.5rem]">
      <Congratulation dataRanking={dataRanking} />

      <RankTable dataRanking={dataRanking} />
    </section>
  );
}

export default Ranking;
