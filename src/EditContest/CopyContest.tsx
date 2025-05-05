import { useState } from "react";
import { copyDoc } from "../firebase";

type Props = {
  srcID: string;
};

const CopyContest: React.FC<Props> = ({ srcID }) => {
  const [dstID, setDstID] = useState("");
  return (
    <div>
      <div>
        <input
          type="text"
          value={dstID}
          size={25}
          onChange={(e) => setDstID(e.target.value)}
        />
      </div>
      <button type="button" onClick={() => copyDoc(srcID, dstID)}>
        コピー
      </button>
    </div>
  );
};

export default CopyContest;
