"use client";
import { TaskDisplayOption } from "@/app/types";
import { useState } from "react";
import TaskListDisplayOptionSwitch from "./ViewOptionSwitch";
import BoardView from "./BoardView";
import ListView from "./ListView";

export default function TaskLists() {
  const [displayOption, setDisplayOption] =
    useState<TaskDisplayOption>("board");

  return (
    <section className="flex flex-col gap-5 w-full h-full">
      <section className="flex justify-between items-center">
        <h2 className="text-xl text-secondary font-bold flex gap-2 items-center">
          <span>Task Lists </span>
          <span className="text-sm font-normal bg-accent rounded-md py-0.5 px-2 text-primary">
            2
          </span>
        </h2>
        <TaskListDisplayOptionSwitch
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
        />
      </section>
      {displayOption === "board" ? <BoardView /> : <ListView />}
    </section>
  );
}
