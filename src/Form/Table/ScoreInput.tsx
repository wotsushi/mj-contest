import styled from "styled-components";
import { useState } from "react";

type Props = {
  score: number | null;
  commit: (score: number) => void;
};

const ScoreInput: React.FC<Props> = ({ score, commit }) => {
  const [draft, setDraft] = useState<number | null>(score);
  return (
    <Input
      type="number"
      placeholder="持ち点"
      value={draft ?? ""}
      onChange={(e) => setDraft(parseInt(e.target.value))}
      onBlur={() => commit(draft ?? Number.NaN)}
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
