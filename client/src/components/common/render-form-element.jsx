import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function RenderFormElement({ currentItem, value, onChange, setFormData }) {
  let content = null;
  switch (currentItem.componentType) {
    case "input":
      content = (
        <Input
          name={currentItem.name}
          id={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
          type={currentItem.type}
        />
      );
      break;
    case "select":
      content = (
        <Select
          value={value}
          onValueChange={(val) =>
            setFormData((prev) => ({ ...prev, [currentItem.name]: val }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={currentItem.label} />
          </SelectTrigger>
          <SelectContent>
            {currentItem.options && currentItem.options.length > 0
              ? currentItem.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id}>
                    {optionItem.label}
                  </SelectItem>
                ))
              : null}
          </SelectContent>
        </Select>
      );
      break;
    case "textarea":
      content = (
        <Textarea
          name={currentItem.name}
          placeholder={currentItem.placeholder}
          id={currentItem.id}
          value={value}
          onChange={onChange}
        />
      );
      break;
    default:
      content = (
        <Input
          name={currentItem.name}
          id={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
          type={currentItem.type}
        />
      );
      break;
  }
  return content;
}

export default RenderFormElement;
