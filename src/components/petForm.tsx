'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
import { usePetContextProvider } from '@/app/app/hooks/usePetContextProvider';
import { DialogClose, DialogFooter } from './ui/dialog';
import { handlePetAction } from '@/actions/serverActions';

type PetFormProps = {
  actionType: 'add' | 'edit';
};

const FetForm = ({ actionType }: PetFormProps) => {
  const { selectedPet } = usePetContextProvider();

  return (
    <form action={handlePetAction} className='flex flex-col gap-6'>
      {actionType === 'edit' && (
        <input type='hidden' name='id' value={selectedPet?.id} />
      )}

      <FormFieldWrapper>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
          required
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='ownerName'>Owner Name</Label>
        <Input
          type='text'
          id='ownerName'
          name='ownerName'
          defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
          required
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='imageUrl'>Image Url</Label>
        <Input
          type='text'
          id='imageUrl'
          name='imageUrl'
          defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='age'>Age</Label>
        <Input
          type='text'
          id='age'
          name='age'
          defaultValue={actionType === 'edit' ? selectedPet?.age : ''}
          required
        />
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea
          id='notes'
          rows={3}
          name='notes'
          defaultValue={actionType === 'edit' ? selectedPet?.notes : ''}
        />
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
