import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export interface SelectComponentProps {
  placeholder: string;
  items: any[];
}

export default function SelectComponent(
  props: SelectComponentProps & { onSelect: (value: string | null) => void }
) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    props.onSelect(value);
  };
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
