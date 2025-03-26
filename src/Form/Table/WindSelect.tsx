import styled from "styled-components";

type Props = {
  wind: number;
  setWind: (w: number) => void;
};

const WindSelect: React.FC<Props> = ({ wind, setWind }) => (
  <div>
    <Select
      value={wind}
      onChange={(e) => setWind(parseInt(e.target.value))}
      aria-label="wind"
    >
      {Winds.map((w, i) => (
        <option key={i} value={i}>
          {w}
        </option>
      ))}
    </Select>
  </div>
);

const Select = styled.select`
  width: 60px;
  font-size: 24px;
`;

const Winds = ["東", "南", "西", "北"] as const;

export default WindSelect;
