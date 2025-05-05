type Props = {
  text: string;
  setText: (text: string) => void;
  size?: number;
};

const TextInput: React.FC<Props> = ({ text, setText, size }) => {
  return (
    <div>
      <input
        type="text"
        value={text}
        size={size}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
