import { Dayjs } from "dayjs"

export type Task = {
  id: string
  colors: string[] 
  text: string
  day: string
}
type Day = string

export type CalendarStateType = {
  tasks: {[key: string]: Task[]} | null
  currentDays: Day[]
  monthDayCount: number
  dayNow: Dayjs
  selectedDay: string | null
  // selectedDay: string 
}

export type CalendarContextType = {
  calendarState: CalendarStateType
  prevMonth: () => void
  nextMonth: () => void
  setUpFromFile: (state: CalendarStateType) => void
  addTask: (dayIndex: string, task: any, colors: string[]) => void
  updateTask: (dayIndex: string, taskId: string, updatedText: string, colors?: string[]) => void
  deleteTask: (dayIndex: string, taskId: string) => void
  reorderTask: (curTasks: Task[], dayIndex: string, startIndex: number, endIndex: number) => void
  saveTasks: () => void
  jumpToCurMonth: () => void
}

