import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const HolidaysContext = createContext<holiday[] | undefined | null>(undefined);
// https://date.nager.at/api/v3/PublicHolidays/2024/UA

type holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: true;
  global: true;
  counties: [string];
  launchYear: 0;
  types: [string];
};

export const HolidaysProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contextValue, setContextValue] = useState<holiday[] | null>(null);

  const fetchAndSet = async () => {
    try {
      const response = await fetch(
        "https://date.nager.at/api/v3/PublicHolidays/2024/UA"
      );

      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }

      const result = await response.json();
      setContextValue(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAndSet();
  }, []);

  return (
    <HolidaysContext.Provider value={contextValue}>
      {children}
    </HolidaysContext.Provider>
  );
};
export const useHolidaysContext = () => {
  const context = useContext(HolidaysContext);
  return context;
};
