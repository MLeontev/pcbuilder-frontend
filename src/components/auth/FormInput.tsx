import { FieldError, UseFormRegister } from 'react-hook-form';
import ErrorMessage from '../shared/ErrorMessage';

interface FormInputProps {
  type: 'text' | 'password';
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  error?: FieldError;
}

export default function FormInput(props: FormInputProps) {
  return (
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.name)}
      />
      <ErrorMessage message={props.error?.message} />
    </div>
  );
}
