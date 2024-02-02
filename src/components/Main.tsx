import { useState } from "react";
import { MainGrid } from "../UI";
import { useCalendarContext } from "../state/state";
import DayComponent from "./DayComponent";
import { Task } from "../types";

const Main = () => {
  const {
    calendarState: { currentDays, tasks },
  } = useCalendarContext();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  return (
    <MainGrid>
      {currentDays.map((i) => (
        <DayComponent
          draggedTask={draggedTask}
          setDraggedTask={setDraggedTask}
          curTasks={tasks?.[i] || []}
          key={i}
          curDay={i}
        />
      ))}
    </MainGrid>
  );
};

export default Main;
