import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCalendarContext } from "./state";

const FilterContext = createContext<
  | {
      text: string;
      colors: string[];
      setTextFilter: Dispatch<SetStateAction<string>>;
      setColorFilter: Dispatch<SetStateAction<string[]>>;
      setFilteredColor: Dispatch<SetStateAction<string>>;
      filteredColor: string;
    }
  | undefined
>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    calendarState: { tasks },
  } = useCalendarContext();

  const [textFilter, setTextFilter] = useState<string>("");
  const [colorFilter, setColorFilter] = useState<string[]>([]);
  const [filteredColor, setFilteredColor] = useState<string>("");

  useEffect(() => {
    setColorFilter(() => {
      const allColors: string[] = Object.values(tasks ?? {})
        .flatMap((taskArray) => taskArray.map((task) => task.colors))
        .flat();

      const uniqueColors: string[] = [...new Set(allColors)];

      return [...uniqueColors];
    });
  }, [tasks]);

  const contextValue = {
    text: textFilter,
    colors: colorFilter,
    filteredColor,
    setFilteredColor,
    setTextFilter,
    setColorFilter,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within");
  }
  return context;
};
