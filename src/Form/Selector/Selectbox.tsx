import styled from "styled-components";

type Props = {
  name: string;
  options: string[];
  current: number;
  set: (i: number) => void;
};

const Selectbox: React.FC<Props> = ({ name, options, current, set }) => (
  <div>
    <Select
      value={current}
      onChange={(e) => set(parseInt(e.target.value))}
      aria-label={name}
    >
      {options.map((option, i) => (
        <option key={i} value={i}>
          {option}
        </option>
      ))}
    </Select>
  </div>
);

const Select = styled.select`
  width: 120px;
  font-size: 24px;
`;

export default Selectbox;
