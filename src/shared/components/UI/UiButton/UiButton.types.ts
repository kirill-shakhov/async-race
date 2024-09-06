import {ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode} from "react";

interface DefaultProps {
  children?: ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  theme?: 'danger' | 'primary' | 'secondary';
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, DefaultProps {
}

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, DefaultProps {
}

export type UiButtonProps = ButtonProps & AnchorProps & {
  href?: string;
};

export type UiButtonHookProps = DefaultProps & {
  disabled?: boolean;
}