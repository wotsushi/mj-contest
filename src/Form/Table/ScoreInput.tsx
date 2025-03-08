import styled from "styled-components";
import { useState } from "react";

type Props = {
  commit: (score: number) => void;
};

const ScoreInput: React.FC<Props> = ({ commit }) => {
  const [score, setScore] = useState<number | null>(null);
  return (
    <Input
      type="number"
      placeholder="持ち点"
      value={score ?? ""}
      onChange={(e) => setScore(parseInt(e.target.value))}
      onBlur={() => commit(score ?? Number.NaN)}
    />
  );
};

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 24px;
  color: #434343;
  text-align: center;
  background-color: #fff;
  border: none;

  &::placeholder {
    color: #ccc;
  }
`;

export default ScoreInput;
