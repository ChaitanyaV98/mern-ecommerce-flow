import { Button } from "../ui/button";
import { Label } from "../ui/label";
import RenderFormElement from "./render-form-element";
function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="w-full grid  gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            <RenderFormElement
              currentItem={controlItem}
              value={formData[controlItem.name]}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                });
              }}
            />
          </div>
        ))}

        <Button type="submit" className="mt-2 w-full">
          {buttonText ? buttonText : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default CommonForm;
