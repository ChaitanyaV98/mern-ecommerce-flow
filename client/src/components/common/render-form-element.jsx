import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

function RenderFormElement({ currentItem, value, onChange }) {
  let content = null;
  switch (currentItem.commonType) {
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
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue value={currentItem.placeholder} />
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
    case "textArea ":
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
