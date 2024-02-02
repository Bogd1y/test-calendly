import dayjs from "dayjs";
import {
  Arrows,
  Header as HeaderUI,
  Pressable,
  PressableLabel,
  Title,
} from "../UI";
import { useCalendarContext } from "../state/state";
import Filter from "./Filter";
import { MonthsArr } from "../constants/months";
import { ChangeEvent } from "react";
import { CalendarStateType } from "../types";
import * as htmlToImage from "html-to-image";

const Header = () => {
  const { nextMonth, prevMonth, jumpToCurMonth, calendarState, setUpFromFile } =
    useCalendarContext();

  function downloadJSON() {
    const serializedState = JSON.stringify(calendarState);
    const blob = new Blob([serializedState], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "appState.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function uploadJSON(event: ChangeEvent<HTMLInputElement>) {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const newState = JSON.parse(content);
      setUpFromFile(newState as CalendarStateType);
      fileInput.value = "";
    };
    reader.readAsText(file);
  }
  function captureAppAsImage() {
    const appElement = document.getElementById("root");

    if (!appElement) {
      return;
    }

    try {
      htmlToImage.toPng(appElement).then(function (dataUrl) {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "app_capture.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    } catch (error) {
      console.error("Error capturing app as image:", error);
    }
  }

  return (
    <HeaderUI>
      <Arrows>
        <Pressable title="Prev" onClick={prevMonth}>
          ◀
        </Pressable>
        <Pressable title="Next" onClick={nextMonth}>
          ▶
        </Pressable>
        <Pressable title="export" onClick={downloadJSON}>
          ⬆
        </Pressable>
        <PressableLabel htmlFor="fileInpt">⬇</PressableLabel>
        <Pressable title="getImage" onClick={captureAppAsImage}>
          📷
        </Pressable>

        <input
          style={{ visibility: "hidden" }}
          onChange={uploadJSON}
          id="fileInpt"
          type="file"
        />
      </Arrows>
      <Title onClick={jumpToCurMonth}>
        {dayjs().year()} {MonthsArr[dayjs().month()]}
      </Title>
      <Filter />
    </HeaderUI>
  );
};

export default Header;
