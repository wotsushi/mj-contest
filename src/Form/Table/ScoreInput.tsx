import styled from "styled-components";

type Props = {
  score: number | null;
  commit: (score: number) => void;
};

const ScoreInput: React.FC<Props> = ({ score, commit }) => {
  return (
    <Input
      type="number"
      placeholder="持ち点"
      defaultValue={score ?? ""}
      onBlur={(e) => commit(parseInt(e.target.value))}
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
