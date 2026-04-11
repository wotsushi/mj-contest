import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type Props = {
  id: string;
  value: number;
  label?: string;
  items: { value: number; label: string }[];
  onChange: (value: number) => void;
};

const SelectBox: React.FC<Props> = ({ id, value, label, items, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
