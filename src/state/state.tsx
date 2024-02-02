import { createContext, useContext, ReactNode, useState } from "react";
import { CalendarContextType, CalendarStateType, Task } from "../types";
import { setUpCalendar } from "../lib/setUpCalendar";
import dayjs from "dayjs";
import { setToLocalStotage } from "../lib/localStorageWorker";

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const currentDay = dayjs();

  const [calendarState, setContextValue] = useState<CalendarStateType>(
    setUpCalendar(currentDay)
  );
  const setUpFromFile = (state: CalendarStateType) => {
    setContextValue({ ...state, dayNow: currentDay });
  };

  const prevMonth = () => {
    setToLocalStotage(calendarState.tasks);
    setContextValue(setUpCalendar(calendarState.dayNow.subtract(1, "month")));
  };

  const jumpToCurMonth = () => {
    setToLocalStotage(calendarState.tasks);
    setContextValue(setUpCalendar(currentDay));
  };
  const nextMonth = () => {
    setToLocalStotage(calendarState.tasks);
    setContextValue(setUpCalendar(calendarState.dayNow.add(1, "month")));
  };

  const addTask = (dayIndex: string, task: string, colors: string[]) => {
    setContextValue((prev) => {
      const updatedTasks = {
        ...prev.tasks,
        [dayIndex]: [
          ...(prev.tasks?.[dayIndex] || []),
          {
            colors: colors,
            text: task,
            id: Math.random().toString(),
            day: dayIndex,
          },
        ],
      };

      return { ...prev, tasks: updatedTasks };
    });
  };
  const updateTask = (
    dayIndex: string,
    taskId: string,
    updatedText: string,
    colors?: string[]
  ) => {
    setContextValue((prev) => {
      const updatedTasks = {
        ...prev.tasks,
        [dayIndex]: (prev.tasks?.[dayIndex] || []).map((task) =>
          task.id === taskId
            ? { ...task, text: updatedText, colors: colors || task.colors }
            : task
        ),
      };

      return { ...prev, tasks: updatedTasks };
    });
  };
  const deleteTask = (dayIndex: string, taskId: string) => {
    setContextValue((prev) => {
      const updatedTasks = {
        ...prev.tasks,
        [dayIndex]: (prev.tasks?.[dayIndex] || []).filter(
          (task) => task.id !== taskId
        ),
      };

      return { ...prev, tasks: updatedTasks };
    });
  };

  const reorderTask = (
    curTasks: Task[],
    dayIndex: string,
    startIndex: number,
    endIndex: number
  ) => {
    setContextValue((prev) => {
      console.log("curTasks:", curTasks);

      const reorder = (list: Task[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        // let temp = result[startIndex]
        // result[startIndex] = result[endIndex]
        // result[endIndex] = temp

        const [removed] = result.splice(endIndex, 1);
        result.splice(startIndex, 0, removed);

        return result;
      };

      const newTasks = reorder(curTasks, startIndex, endIndex);

      console.log(newTasks);

      return { ...prev, tasks: { ...prev.tasks, [dayIndex]: newTasks } };
    });
  };

  const saveTasks = () => {
    // Logic to save tasks (you can use localStorage, API, etc.)
  };

  const contextValue: CalendarContextType = {
    calendarState,
    prevMonth,
    nextMonth,
    addTask,
    saveTasks,
    updateTask,
    deleteTask,
    jumpToCurMonth,
    reorderTask,
    setUpFromFile,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
};
