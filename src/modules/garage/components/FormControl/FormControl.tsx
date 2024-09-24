import {FC} from "react";
import {FormControlProps} from "./FormControl.types.ts";
import {UiButton, UiInput} from "@/shared/components";

const FormControl: FC<FormControlProps> = ({onSubmit, onChange, values, errors, disabled, submitButtonText}) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 md:flex-row align-start">
      <UiInput
        name="name"
        type="text"
        placeholder="Enter car name"
        value={values.name}
        onChange={onChange}
        errors={errors.name}
      />
      <div>
        <input
          type="color"
          name='color'
          className="p-0.5 h-9 w-9 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
          value={values.color}
          onChange={onChange}
          title="Choose your color"
        />
        {errors.color}
      </div>

      <UiButton
        className="max-h-[40px]"
        type="submit"
        disabled={disabled}
      >{submitButtonText}</UiButton>
    </form>
  )
}

export default FormControl;