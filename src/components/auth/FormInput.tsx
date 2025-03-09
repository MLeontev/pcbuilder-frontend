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
    <div className='flex flex-col mb-1.5'>
      <input
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.name)}
        className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 transition'
      />
      <ErrorMessage message={props.error?.message} />
    </div>
  );
}
