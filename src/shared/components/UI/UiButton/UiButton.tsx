import classNames from 'classnames';

import { UiProgressCircular } from '../UiProgressCircular';

import { useUiButton } from './useUiButton.ts';
import { UiButtonSize, UiButtonTheme } from './UiButton.enums.ts';
import { UiButtonProps } from './UiButton.types.ts';

function UiButton({
  children,
  href,
  loading,
  disabled,
  type,
  size = UiButtonSize.SM,
  block = false,
  theme = UiButtonTheme.PRIMARY,
  className,
  ...props
}: UiButtonProps) {
  const { rootClasses } = useUiButton({
    loading,
    disabled,
    block,
    size,
    theme,
  });

  const combinedClasses = classNames(rootClasses, className);

  return (
    <>
      {href ? (
        <a className={combinedClasses} href={href} target={'_blank'} {...props}>
          {children}
        </a>
      ) : (
        <button
          className={combinedClasses}
          type={type ?? 'button'}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? <UiProgressCircular /> : children}
        </button>
      )}
    </>
  );
}

export default UiButton;
