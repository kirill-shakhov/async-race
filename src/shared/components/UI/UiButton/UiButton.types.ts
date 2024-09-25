import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { UiButtonSize, UiButtonTheme } from './UiButton.enums.ts';

interface DefaultProps {
  children?: ReactNode;
  loading?: boolean;
  block?: boolean;
  size?: UiButtonSize;
  theme?: UiButtonTheme;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    DefaultProps {}

export interface AnchorProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    DefaultProps {}

export type UiButtonProps = ButtonProps &
  AnchorProps & {
    href?: string;
  };

export type UiButtonHookProps = DefaultProps & {
  disabled?: boolean;
};
