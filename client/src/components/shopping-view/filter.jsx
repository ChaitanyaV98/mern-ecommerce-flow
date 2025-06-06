import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Fragment } from "react";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm ">
      <div className="p-4 border-b ">
        <h2 className="text-lg font-extrabold ">Filters </h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.entries(filterOptions).map(([section, options]) => (
          <Fragment key={section}>
            <div>
              <h3 className="text-base font-bold capitalize">{section}</h3>
              <div className="grid gap-2 mt-2">
                {options.map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox
                      checked={filters?.[section]?.includes(option.id) || false}
                      onCheckedChange={() => handleFilter(section, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
