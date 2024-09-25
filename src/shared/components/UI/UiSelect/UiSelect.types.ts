export interface Option {
  value: string;
  text: string;
}

export interface UiSelectProps {
  list: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}
