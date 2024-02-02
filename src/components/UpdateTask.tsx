import React, { useEffect, useRef } from "react";
import { ColorInput, Input, StlyishForm } from "../UI";
import { Task } from "../types";

const UpdateTask = ({
  curTask,
  handleAdd,
  editTask,
}: {
  curTask: Task;
  handleAdd: (event: React.FormEvent<HTMLFormElement>, taskId: string) => void;
  editTask: Task;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <StlyishForm key={curTask.id} onSubmit={(f) => handleAdd(f, curTask.id)}>
      <label htmlFor="inpU">Edit task</label>
      <ColorInput
        id="inpU"
        name="colorValue"
        type="color"
        defaultValue={curTask.colors?.[0]}
      />
      <Input
        ref={inputRef}
        id="inpEdit"
        name="taskValue"
        type="text"
        placeholder={editTask.text}
        defaultValue={editTask.text}
      />
    </StlyishForm>
  );
};

export default UpdateTask;
