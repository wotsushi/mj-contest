import styled from "styled-components";

type Props = {
  nameByID: Map<number, string>;
  current: number;
  set: (i: number) => void;
};

const Selectbox: React.FC<Props> = ({ nameByID, current, set }) => (
  <div>
    <Select value={current} onChange={(e) => set(parseInt(e.target.value))}>
      {Array.from(nameByID.entries()).map(([id, name]) => (
        <option key={id} value={id}>
          {name}
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
