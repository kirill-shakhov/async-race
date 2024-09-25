import { ChangeEvent } from 'react';
import { UiSelectProps } from './UiSelect.types.ts';

function UiSelect({ list, selectedValue, onChange }: UiSelectProps) {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  return (
    <div className="flex flex-col space-y-4">
      <select
        className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {list.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UiSelect;
