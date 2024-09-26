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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
