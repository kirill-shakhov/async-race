import {InputHTMLAttributes} from "react";


export interface UiInputProps extends InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  errors?: string;
}