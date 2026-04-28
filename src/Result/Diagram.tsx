import styled from "styled-components";
import { Contest } from "../contest";

type Props = {
  nameByID: Map<number, string>;
  contest: Contest;
};

const tableNames = ["A", "B", "C", "D"];
const tableColors = ["red", "orange", "blue", "green"];
const positions = [
  { cx: 200, cy: 500 }, // A
  { cx: 800, cy: 500 }, // B
  { cx: 800, cy: 200 }, // C
  { cx: 200, cy: 200 }, // D
];
const halfWidth = 130;
const halfHeight = 80;

const Diagram: React.FC<Props> = ({ nameByID, contest }) => {
  const nextRound = contest.results.findIndex((round) =>
    round.every((table) => table.scores === null),
  );
  const tables = nextRound >= 0 ? contest.results[nextRound] : [];
  return (
    <Wrapper>
      <svg viewBox="0 0 1000 700" width="100%" height="100%">
        {nextRound >= 0 && (
          <text
            x="20"
            y="50"
            textAnchor="start"
            dominantBaseline="middle"
            fontSize="36"
            fontWeight="bold"
            fill="#333"
          >
            {nextRound + 1}回戦
          </text>
        )}
        <rect
          x="170"
          y="30"
          width="660"
          height="60"
          fill="#fff"
          stroke="#444"
          strokeWidth="1"
        />
        <text
          x="500"
          y="60"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="40"
          fill="#333"
        >
          スクリーン
        </text>
        {positions.map((pos, i) => {
          const table = tables[i];
          const players = (
            table?.players ?? [null, null, null, null]
          ).map((p) =>
            p === null ? "" : (nameByID.get(p) ?? ""),
          );
          return (
            <DiamondTable
              key={i}
              cx={pos.cx}
              cy={pos.cy}
              color={tableColors[i]}
              letter={table?.table || tableNames[i]}
              players={players}
            />
          );
        })}
      </svg>
    </Wrapper>
  );
};

type DiamondProps = {
  cx: number;
  cy: number;
  color: string;
  letter: string;
  players: string[];
};

const DiamondTable: React.FC<DiamondProps> = ({
  cx,
  cy,
  color,
  letter,
  players,
}) => {
  const points = `${cx},${cy - halfHeight} ${cx + halfWidth},${cy} ${cx},${cy + halfHeight} ${cx - halfWidth},${cy}`;
  return (
    <g>
      <polygon
        points={points}
        fill={color}
        stroke="#444"
        strokeWidth="1"
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="60"
        fill="#fff"
        fontWeight="bold"
      >
        {letter}
      </text>
      <text
        x={cx - halfWidth * 0.4}
        y={cy - halfHeight + 15}
        textAnchor="end"
        fontSize="32"
        fill="#333"
      >
        {players[0]}
      </text>
      <text
        x={cx + halfWidth * 0.4}
        y={cy - halfHeight + 15}
        textAnchor="start"
        fontSize="32"
        fill="#333"
      >
        {players[1]}
      </text>
      <text
        x={cx + halfWidth * 0.4}
        y={cy + halfHeight + 5}
        textAnchor="start"
        fontSize="32"
        fill="#333"
      >
        {players[2]}
      </text>
      <text
        x={cx - halfWidth * 0.4}
        y={cy + halfHeight + 5}
        textAnchor="end"
        fontSize="32"
        fill="#333"
      >
        {players[3]}
      </text>
    </g>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

export default Diagram;
