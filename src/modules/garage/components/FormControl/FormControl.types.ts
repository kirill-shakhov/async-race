import { ChangeEvent, FormEvent } from 'react';
import { CarWithoutId } from '@moduleGarage/static/types';

export interface FormControlProps {
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  values: CarWithoutId;
  errors: Partial<CarWithoutId>;
  disabled: boolean;
  submitButtonText: string;
}
