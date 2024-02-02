import {
  FormEvent,
  useCallback,
} from "react";
import {
  ColorCircle,
  ColorCircleContainer,
  ColorContainer,
  SearchInput,
  StlyishForm,
} from "../UI";
import { useFilterContext } from "../state/filter";

const Filter = () => {
  const { setTextFilter, colors, setFilteredColor, filteredColor } =
    useFilterContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get("taskValue") as string;

    setTextFilter(inputValue);
  };

  const debounce = (fn: Function, delay: number) => {
    let timeoutId: number;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleInputChange = useCallback(
    debounce((inputValue: string) => {
      setTextFilter(inputValue.toLowerCase());
    }, 300),
    []
  );

  return (
    <StlyishForm $flex onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        name="taskValue"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="filter by text"
      />
      <ColorContainer>
        <ColorCircleContainer>
          {colors.map((i) => (
            <ColorCircle
              $bgColor={i}
              key={i}
              onClick={() => setFilteredColor(i)}
            />
          ))}
        </ColorCircleContainer>
        {filteredColor && <div onClick={() => setFilteredColor("")}>❌</div>}
      </ColorContainer>
    </StlyishForm>
  );
};

export default Filter;
