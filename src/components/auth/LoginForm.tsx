import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
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
    <>
      <h1>Вход</h1>
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
    </>
  );
}
