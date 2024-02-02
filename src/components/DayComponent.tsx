import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  DayBlock,
  DayHeader,
  HeightContainer,
  Holiday,
  Task,
  TaskColors,
  TasksContainer,
  TasksLength,
} from "../UI";
import dayjs from "dayjs";
import { MonthsArr } from "../constants/months";
import { useCalendarContext } from "../state/state";
import { Task as TaskType } from "../types";
import CreateTask from "./CreateTask";
import { useFilterContext } from "../state/filter";
import UpdateTask from "./UpdateTask";
import { useHolidaysContext } from "../state/holidays";

const DayComponent = ({
  curDay,
  curTasks,
  setDraggedTask,
  draggedTask,
}: {
  draggedTask: TaskType | null;
  setDraggedTask: (task: TaskType) => void;
  curDay: string;
  curTasks: TaskType[];
}) => {
  const { addTask, updateTask, reorderTask, deleteTask } = useCalendarContext();
  const { text, filteredColor } = useFilterContext();
  const holidays = useHolidaysContext();

  const [isAdding, setIsAdding] = useState<"edit" | "add" | null>(null);
  const [editTask, setEditTask] = useState<TaskType | null>(null);
  const [draggedTaskIndex, setDraggedTaskIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDbClick = () => {
    setIsAdding("add");
  };

  const handleEdit = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    task: TaskType
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setIsAdding("edit");
    setEditTask(null);
    setEditTask(task);
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>, taskId?: string) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get("taskValue") as string;
    const colorValue = formData.get("colorValue") as string;

    if (taskId) {
      if (!inputValue) {
        deleteTask(curDay, taskId);
      }
      updateTask(curDay, taskId, inputValue, [colorValue]);
    } else {
      addTask(curDay, inputValue, [colorValue]);
    }
    setIsAdding(null);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number,
    task: TaskType
  ) => {
    event.dataTransfer.setData("text/plain", ""); // required for Firefox
    setDraggedTask(task);
    setDraggedTaskIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetTask: TaskType,
    indexOfSelected: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (draggedTask && !curTasks.find((item) => item.id == draggedTask?.id)) {
      deleteTask(draggedTask.day, draggedTask?.id);
      addTask(curDay, draggedTask.text, draggedTask.colors);
      console.log(targetTask)
    } else {
      reorderTask(curTasks, curDay, indexOfSelected, draggedTaskIndex ?? 0);
    }
  };
  const handleDropContainer = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);

    if (draggedTask) {
      deleteTask(draggedTask.day, draggedTask?.id);
      addTask(curDay, draggedTask.text, draggedTask.colors);
    }
  };

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  return (
    <DayBlock
      key={curDay}
      $primary={dayjs(curDay).isSame(dayjs(), "month")}
      onDoubleClick={handleDbClick}
      onDragOver={handleDragOver}
      onDrop={handleDropContainer}
    >
      <DayHeader>
        {dayjs(curDay).date()}{" "}
        {dayjs(curDay).date() == dayjs(curDay).daysInMonth() &&
          MonthsArr[dayjs(curDay).month()]}
        <TasksLength>
          {!!curTasks.length && curTasks.length + " " + "items"}
        </TasksLength>
      </DayHeader>
      {isAdding === "add" && (
        <CreateTask setIsAdding={setIsAdding} handleAdd={handleAdd} />
      )}

      <HeightContainer>
        {!!curTasks?.length && (
          <TasksContainer
            onDragOver={handleDragOver}
            onDrop={handleDropContainer}
          >
            {curTasks.map((e, i) =>
              isAdding === "edit" && editTask?.id === e.id ? (
                <UpdateTask
                  key={e.id}
                  curTask={e}
                  editTask={editTask}
                  handleAdd={handleAdd}
                />
              ) : (
                <Task
                  $hidden={
                    (!!text && !e.text.toLowerCase().includes(text)) ||
                    (!!filteredColor && !e.colors.includes(filteredColor))
                  }
                  draggable
                  onDragStart={(ev) => handleDragStart(ev, i, e)}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, e, i)}
                  key={e.id}
                  onDoubleClick={(event) => handleEdit(event, e)}
                >
                  {e.colors.map((col, indx) => (
                    <TaskColors key={indx} $index={indx} $color={col} />
                  ))}
                  {e.text}
                </Task>
              )
            )}
          </TasksContainer>
        )}
      </HeightContainer>
      <Holiday>{holidays?.find((h) => h.date === curDay)?.name}</Holiday>
    </DayBlock>
  );
};

export default DayComponent;
