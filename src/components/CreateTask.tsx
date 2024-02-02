import { FormEvent, useEffect, useRef } from "react";
import { ColorInput, Input, StlyishForm } from "../UI";

const CreateTask = ({handleAdd, setIsAdding }: { setIsAdding: (data: "edit" | "add" | null) => void, handleAdd: (e: FormEvent<HTMLFormElement>) => void}) => {

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <StlyishForm onSubmit={handleAdd}>
      <label htmlFor="inpD">New task</label>
      <Input
        id="inpD"
        name="taskValue"
        type="text"
        ref={inputRef}
        onBlur={(e) => {
          if (!e.target.value?.length) {
            setIsAdding(null)
          }
        }}
        placeholder="needs to be done"
      />
      <ColorInput id="inpD" name="colorValue" type="color" />
    </StlyishForm>
  );
};

export default CreateTask;
