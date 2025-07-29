'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { usePetContextProvider } from '@/app/app/hooks/usePetContextProvider';
import { DialogClose, DialogFooter } from './ui/dialog';

type PetFormProps = {
  actionType: 'add' | 'edit';
};

type TPetForm = {
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
};

const FetForm = ({ actionType }: PetFormProps) => {
  const { selectedPet, handlePet } = usePetContextProvider();
  const {
    register,
    formState: { errors },
  } = useForm<TPetForm>();

  return (
    <form action={handlePet} className='flex flex-col gap-6'>
      {actionType === 'edit' && (
        <input type='hidden' name='id' value={selectedPet?.id} />
      )}

      <FormFieldWrapper>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' {...register('name', { required: true })} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='ownerName'>Owner Name</Label>
        <Input id='ownerName' {...register('ownerName', { required: true })} />
        {errors.ownerName && (
          <ErrorMessage>{errors.ownerName.message}</ErrorMessage>
        )}
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='imageUrl'>Image Url</Label>
        <Input id='imageUrl' {...register('imageUrl', { required: true })} />
        {errors.imageUrl && (
          <ErrorMessage>{errors.imageUrl.message}</ErrorMessage>
        )}
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='age'>Age</Label>
        <Input id='age' {...register('age', { required: true })} />
        {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea id='notes' {...register('notes', { required: true })} />
        {errors.notes && <ErrorMessage>{errors.notes.message}</ErrorMessage>}
      </FormFieldWrapper>
      <DialogFooter>
        <DialogClose asChild>
          <Button type='submit' className='ml-auto'>
            {actionType === 'add' ? 'Add a new Pet' : 'Edit Pet'}
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};

export default FetForm;

const FormFieldWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className='space-y-1'>{children}</div>;
};

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-red-500 text-sm'>{children}</p>;
};
