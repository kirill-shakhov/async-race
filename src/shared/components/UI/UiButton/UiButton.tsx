import  {FC} from 'react';
import {UiButtonProps} from "./index.ts";
import {UiProgressCircular} from "../UiProgressCircular";

import {useUiButton} from "./useUiButton.ts";


const UiButton: FC<UiButtonProps> =
  ({
     children,
     href,
     loading,
     disabled,
     type,
     size = 'sm',
     block = false,
     theme = 'primary',
     ...props
   }) => {

    const {rootClasses} = useUiButton({
      loading,
      disabled,
      block,
      size: size as 'sm' | 'md' | 'lg',
      theme: theme as 'danger' | 'primary' | 'secondary'
    });

    return (
      <>
        {
          href ? (
            <a
              className={rootClasses}
              href={href}
              target={'_blank'}
              {...props}
            >
              {children}
            </a>
          ) : (
            <button
              className={rootClasses}
              type={type ? type : 'button'}
              disabled={disabled || loading}
              {...props}
            >

              {loading ? (<UiProgressCircular/>) : children}
            </button>
          )
        }

      </>
    );
  }

export default UiButton;
