import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useLogin } from '../../hooks/auth/useLogin';
import { getErrorMessage } from '../../utils/errorUtils';
import ErrorMessage from '../shared/ErrorMessage';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

interface ILoginFormInput {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required('Введите логин'),
  password: yup.string().required('Введите пароль'),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormInput>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { mutate, error, isPending } = useLogin();

  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    mutate(data);
  };

  return (
    <div className='flex justify-center items-center mt-60'>
      <div className='border border-gray-300 rounded-lg shadow-md p-8 w-full max-w-sm'>
        <h1 className='text-2xl font-semibold text-center mb-6'>Вход</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type='text'
            placeholder='Логин'
            register={register}
            name='username'
            error={errors.username}
          />

          <FormInput
            type='password'
            placeholder='Введите пароль'
            register={register}
            name='password'
            error={errors.password}
          />

          {error && <ErrorMessage message={getErrorMessage(error)} />}

          <SubmitButton disabled={isSubmitting || isPending} text='Войти' />
        </form>

        <p className='text-center text-sm text-gray-600 mt-4'>
          Нет аккаунта?{' '}
          <Link to='/register' className='text-blue-500 hover:underline'>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
