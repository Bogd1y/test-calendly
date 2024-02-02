import styled from "styled-components";

export const MainGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-auto-rows: 1fr;
  font-size: 1.25rem;
  line-height: 1.75rem;
  padding: 4px;
  height: 85vh;
`;
export const DayBlock = styled.div<{ $primary?: boolean; hidden?: boolean }>`
  /* display: flex; */
  overflow-y: auto;
  flex-direction: column;
  padding: 4px 8px;
  margin: 2px;
  box-shadow: 0px 0px 5px lightgray;
  background: white;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) => (props.$primary ? "black" : "gray")};
  display: ${(props) => (props.hidden ? "none" : "flex")};
`;
export const DayBlockHeader = styled.div`
  display: flex;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: steelblue;
  padding: 10px 20px 10px 20px;
`;
export const Arrows = styled.div`
  display: flex;
  font-size: 1.25rem;
  line-height: 1.75rem;
  gap: 10px;
`;

export const Pressable = styled.button`
  font-size: inherit;
  padding: 0 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background: white;
  color: steelblue;
  transition: all 0.3s ease 0s;
  &:hover {
    background: lightgray;
  }
`;

export const Title = styled.time`
  position: fixed;
  /* pointer-events: none; */
  /* width: 100%; */
  color: white;
  left: 48%;
  text-align: center;
  font-size: 2rem;
  font-size: 600;
  cursor: pointer;
`;

export const Weeks = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  font-size: 1.25rem;
  line-height: 1.75rem;
  background: white;
  color: gray;
  text-align: center;
  padding: 5px;
`;
export const Week = styled.div`
  user-select: none;
  border-right: 2px solid lightsteelblue;

  &:last-child {
    border-right: 0px solid lightsteelblue;
  }
`;
export const Input = styled.input`
  display: block;
  border-radius: 5px;
  background: white;
  color: black;
  font-size: 12px;
  font-weight: 500;
  outline: 1px lightgray solid;
  width: 100%;
  padding: 5px;
  &:focus {
    outline: 2px lightgray solid;
  }
`;
export const TasksContainer = styled.div`
  overflow-y: auto;
  padding: 2px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Task = styled.div<{ $hidden: boolean }>`
  width: 100%;
  cursor: pointer;
  outline: 1px solid lightgray;
  line-height: 1.1;
  border-radius: 5px;
  padding: 2px 5px;
  position: relative;
  line-break: anywhere;
  display: ${(props) => (props.$hidden ? "none" : "block")};
`;
export const TaskColors = styled.div<{ $color?: string; $index: number }>`
  width: 100%;
  width: 10px;
  height: 2px;
  top: -1px;
  border-radius: 2px;
  left: ${(props) =>
    props.$index != 0 ? props.$index * 20 + 5 + "px" : "5px"};
  position: absolute;
  background-color: ${(props) => props.$color || "gray"};
`;
export const ColorInput = styled.input`
  position: absolute;
  top: 0;
  right: 0;
`;
export const StlyishForm = styled.form<{ $flex?: boolean }>`
  position: relative;
  display: ${(props) => (props.$flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.$flex ? "column" : "row")};
`;
export const TasksLength = styled.span`
  font-size: 0.7rem;
  color: steelblue;
`;
export const DayHeader = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  user-select: none;
`;

export const PressableLabel = styled.label`
  font-size: inherit;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
  background: white;
  color: steelblue;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  &:hover {
    background: lightgray;
  }
`;
export const SearchInput = styled.input`
  border-radius: 4px;
  padding: 2px 4px;
`;
export const ColorContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ColorCircle = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
`;
export const ColorCircleContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 5px;
`;
export const Holiday = styled.span`
  line-height: 1.1;
  font-size: 10px;
`;
export const HeightContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;
