import { useMemo } from 'react';
import classNames from 'classnames';

import { UiButtonHookProps } from './index.ts';
import { UiButtonSize, UiButtonTheme } from './UiButton.enums.ts';

export const useUiButton = (props: UiButtonHookProps) => {
  const { size, theme, disabled, block } = props;

  const rootClasses = useMemo(
    () =>
      classNames(
        'flex justify-center items-center px-3 py-1.5 font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        {
          'opacity-50 cursor-not-allowed': disabled,
          'w-full': block,
          'text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900':
            theme === 'danger',
          'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600':
            theme === UiButtonTheme.PRIMARY,
          'font-semibold ring-1 ring-slate-700/10 hover:bg-slate-50':
            theme === UiButtonTheme.SECONDARY,
          'text-sm shadow-sm rounded-md': size === UiButtonSize.SM,
          'text-md shadow-md rounded-lg px-6 py-3': size === UiButtonSize.MD,
          'text-lg shadow-lg rounded-xl px-12 py-6': size === UiButtonSize.LG,
        },
      ),
    [disabled, block, theme, size],
  );

  return { rootClasses };
};
