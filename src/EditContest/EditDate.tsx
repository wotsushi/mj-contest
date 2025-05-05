import TextInput from "../components/TextInput";

type Props = {
  date: string;
  setDate: (date: string) => void;
};

const EditDate: React.FC<Props> = ({ date, setDate }) => (
  <TextInput text={date} setText={setDate} size={20} />
);

export default EditDate;
