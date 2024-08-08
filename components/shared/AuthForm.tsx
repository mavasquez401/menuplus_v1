import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type AuthFormProps = {
  type: 'sign-in' | 'sign-up';
  onSubmit: (data: SignInInputs | SignUpInputs) => void;
};

type SignInInputs = {
  email: string;
  password: string;
};

type SignUpInputs = SignInInputs & {
  firstName: string;
  lastName: string;
  age: number;
  height: number;
};

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const isSignUp = type === 'sign-up';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const handleFormSubmit: SubmitHandler<SignUpInputs> = (data) => {
    if (isSignUp) {
      onSubmit(data);
    } else {
      const { email, password } = data;
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {isSignUp && (
        <>
          <input
            {...register('firstName', { required: 'First name is required' })}
            placeholder="First Name"
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}

          <input
            {...register('lastName', { required: 'Last name is required' })}
            placeholder="Last Name"
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </>
      )}

      <input
        {...register('email', {
          required: 'Email is required',
          pattern: /^\S+@\S+$/i,
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: 6,
        })}
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}

      {isSignUp && (
        <>
          <input
            type="number"
            {...register('age', {
              required: 'Age is required',
              min: 18,
              max: 120,
            })}
            placeholder="Age"
          />
          {errors.age && <span>{errors.age.message}</span>}

          <input
            type="number"
            {...register('height', { required: 'Height is required', min: 0 })}
            placeholder="Height (cm)"
          />
          {errors.height && <span>{errors.height.message}</span>}
        </>
      )}

      <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
    </form>
  );
};

export default AuthForm;
