import { Rule } from "../contest";

type Props = {
  uma: Rule["uma"];
  setUma: (uma: Rule["uma"]) => void;
};

const EditUma: React.FC<Props> = ({ uma, setUma }) => (
  <div>
    {uma?.map((point, i) => (
      <input
        key={i}
        type="number"
        value={point}
        onChange={(e) =>
          setUma(
            uma.map((p, j) =>
              j === i ? Number(e.target.value) : p,
            ) as Rule["uma"],
          )
        }
      />
    ))}
  </div>
);

export default EditUma;
