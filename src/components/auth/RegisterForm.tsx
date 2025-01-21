import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRegister } from '../../hooks/auth/useRegister';
import { getErrorMessage } from '../../utils/errorUtils';
import ErrorMessage from '../shared/ErrorMessage';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

interface IRegisterFormInput {
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Введите логин')
    .min(3, 'Логин должен быть не менее 3 символов')
    .max(50, 'Логин должен быть не более 50 символов'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
    .matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
    .matches(
      /[^a-zA-Z0-9]/,
      'Пароль должен содержать хотя бы один специальный символ'
    ),
  confirmPassword: yup
    .string()
    .required('Повторите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterFormInput>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const { mutate, error, isPending } = useRegister();

  const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
    mutate(data);
  };

  return (
    <>
      <h1>Регистрация</h1>
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
          placeholder='Пароль'
          register={register}
          name='password'
          error={errors.password}
        />

        <FormInput
          type='password'
          placeholder='Повторите пароль'
          register={register}
          name='confirmPassword'
          error={errors.confirmPassword}
        />

        {error && <ErrorMessage message={getErrorMessage(error)} />}

        <SubmitButton
          disabled={isSubmitting || isPending}
          text='Зарегистрироваться'
        />
      </form>
    </>
  );
}
