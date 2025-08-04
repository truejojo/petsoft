import FormFieldWrapper from './formFieldWrapper';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';

const AuthForm = () => {
  return (
    <form className='space-y-4'>
      <FormFieldWrapper>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' />
      </FormFieldWrapper>

      <FormFieldWrapper>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' />
      </FormFieldWrapper>

      <Button type='submit'>Log In</Button>
    </form>
  );
};

export default AuthForm;
