import {useMemo} from "react";
import classNames from "classnames";

import {UiInputProps} from "./UiInput.types.ts";

export const useUiInput = (props: UiInputProps) => {
  const {disabled, readOnly, errors, touched} = props;

  const rootClasses = useMemo(() => classNames(
    "block w-full  rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
    {
      'disabled': disabled,
      'has-error text-red-500 border-2 border-rose-500 pr-10': errors && touched,
      'readonly cursor-not-allowed': readOnly
    }
  ), [disabled, readOnly, errors, touched]);

  return {rootClasses};
};

