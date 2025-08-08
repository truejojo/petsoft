import FormFieldWrapper from './formFieldWrapper';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import AuthFormButton from './authFormButton';
import { logIn, signUp } from '@/actions/serverActions';

type AuthFormProps = { type: 'login' | 'signup' };

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <form action={type === 'login' ? logIn : signUp} className='space-y-4'>
      <FormFieldWrapper>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          required
          minLength={1}
          maxLength={20}
        />
      </FormFieldWrapper>

      <FormFieldWrapper>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
          minLength={4}
          maxLength={10}
        />
      </FormFieldWrapper>

      <AuthFormButton type={type} />
    </form>
  );
};

export default AuthForm;
