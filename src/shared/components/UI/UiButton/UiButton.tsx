import { FC } from 'react';
import { UiProgressCircular } from '../UiProgressCircular';

import { useUiButton } from './useUiButton.ts';
import { UiButtonSize, UiButtonTheme } from './UiButton.enums.ts';
import { UiButtonProps } from './UiButton.types.ts';

const UiButton: FC<UiButtonProps> = ({
  children,
  href,
  loading,
  disabled,
  type,
  size = UiButtonSize.SM,
  block = false,
  theme = UiButtonTheme.PRIMARY,
  ...props
}) => {
  const { rootClasses } = useUiButton({
    loading,
    disabled,
    block,
    size,
    theme,
  });

  return (
    <>
      {href ? (
        <a className={rootClasses} href={href} target={'_blank'} {...props}>
          {children}
        </a>
      ) : (
        <button
          className={rootClasses}
          type={type ? type : 'button'}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? <UiProgressCircular /> : children}
        </button>
      )}
    </>
  );
};

export default UiButton;
