type Props = {
  options: string[];
  current: number;
  set: (i: number) => void;
};

const Select: React.FC<Props> = ({ options, current, set }) => (
  <div>
    <select value={current} onChange={(e) => set(parseInt(e.target.value))}>
      {options.map((option, i) => (
        <option key={i} value={i}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
