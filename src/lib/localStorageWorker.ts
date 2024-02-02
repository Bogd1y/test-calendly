import { Task } from "../types"

export const setToLocalStotage = (data: { [key: string]: Task[]; } | null) => {
  localStorage.setItem('tasks', JSON.stringify(data))
}
export const getFromLocalStotage = (): { [key: string]: Task[]; } => {
  const storedTasks = localStorage.getItem('tasks');

  return storedTasks ? JSON.parse(storedTasks) : [];
}