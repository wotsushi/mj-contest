import { useState } from "react";
import { copyDoc } from "../firebase";
import TextInput from "../components/TextInput";

type Props = {
  srcID: string;
};

const CopyContest: React.FC<Props> = ({ srcID }) => {
  const [dstID, setDstID] = useState("");
  return (
    <div>
      <TextInput text={dstID} setText={setDstID} size={25} />
      <button type="button" onClick={() => copyDoc(srcID, dstID)}>
        コピー
      </button>
    </div>
  );
};

export default CopyContest;
