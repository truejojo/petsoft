import FormFieldWrapper from './formFieldWrapper';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { logIn, signUp } from '@/actions/serverActions';

type AuthFormProps = { type: 'login' | 'signup' };

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <form action={type === 'login' ? logIn : signUp} className='space-y-4'>
      <FormFieldWrapper>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' type='email' />
      </FormFieldWrapper>

      <FormFieldWrapper>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' name='password' type='password' />
      </FormFieldWrapper>

      <Button type='submit'>{type === 'login' ? 'Log In' : 'Sign Up'}</Button>
    </form>
  );
};

export default AuthForm;
