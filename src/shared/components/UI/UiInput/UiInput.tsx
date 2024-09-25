import { UiInputProps } from './UiInput.types.ts';
import { useUiInput } from './useUiInput.tsx';

function UiInput({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  readOnly,
  disabled,
  value,
  onChange,
  onBlur,
  errors,
}: UiInputProps) {
  const { rootClasses } = useUiInput({ readOnly, disabled, errors });

  return (
    <div>
      {label && (
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className="ui-input-wrap">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete ? 'on' : 'off'}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={rootClasses}
        />

        <div className="text-red-500">{errors && errors}</div>
      </div>
    </div>
  );
}

export default UiInput;
