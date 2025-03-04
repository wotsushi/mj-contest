const Result: React.FC = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>順位</th>
          <th>名前</th>
          <th>合計</th>
          <th>1回戦</th>
          <th>2回戦</th>
          <th>3回戦</th>
          <th>4回戦</th>
          <th>5回戦</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, i) => (
          <tr key={player.id}>
            <td>{i + 1}</td>
            <td>{player.name}</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
            <td>0.0</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const players = [
  { id: 1, name: "そら" },
  { id: 2, name: "ロボ子さん" },
  { id: 3, name: "アキロゼ" },
  { id: 4, name: "はあと" },
  { id: 5, name: "フブキ" },
  { id: 6, name: "まつり" },
  { id: 7, name: "シオン" },
  { id: 8, name: "あやめ" },
  { id: 9, name: "ちょこ" },
  { id: 10, name: "スバル" },
  { id: 11, name: "AZKi" },
  { id: 12, name: "ミオ" },
  { id: 13, name: "みこ" },
  { id: 14, name: "おかゆ" },
  { id: 15, name: "ころね" },
  { id: 16, name: "すいせい" },
];

export default Result;
