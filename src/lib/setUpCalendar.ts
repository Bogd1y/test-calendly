import dayjs, { Dayjs } from "dayjs";
import { CalendarStateType } from "../types";
import { getFromLocalStotage } from "./localStorageWorker";

export function setUpCalendar(currentDate: Dayjs): CalendarStateType {

  const startDate = currentDate.startOf('M').startOf('week')
  const endDate = currentDate.endOf("M").endOf('week')

  const datesInRange = []

  let currentDateForWhile = dayjs(startDate);;

  while (currentDateForWhile.isBefore(endDate) || currentDateForWhile.isSame(endDate, 'day')) {
    datesInRange.push(currentDateForWhile.format('YYYY-MM-DD'));
    currentDateForWhile = currentDateForWhile.add(1, 'day');
  }

  const localTasks = getFromLocalStotage()

  return {
    monthDayCount: currentDate.daysInMonth(),
    currentDays: datesInRange,
    dayNow: currentDate,
    tasks: localTasks,
    selectedDay: null
  }
}