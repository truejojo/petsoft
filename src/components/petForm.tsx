'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';
// import { usePetContextProvider } from '@/app/app/hooks/usePetContextProvider';
import { DialogClose, DialogFooter } from './ui/dialog';
import { addPet } from '@/actions/serverActions';

type PetFormProps = {
  actionType: 'add' | 'edit';
};

const FetForm = ({ actionType }: PetFormProps) => {
  // const { handleAddPet } = usePetContextProvider();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const newPet = {
  //     name: formData.get('name') as string,
  //     ownerName: formData.get('ownerName') as string,
  //     imageUrl:
  //       (formData.get('imageUrl') as string) ||
  //       ('https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png' as string),
  //     age: Number(formData.get('age') as string),
  //     notes: formData.get('notes') as string,
  //   };

  //   if (actionType === 'add' && handleAddPet) {
  //     handleAddPet(newPet);
  //   }
  // };

  return (
    <form action={addPet} className='flex flex-col gap-6'>
      <div className='space-y-1'>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' id='name' name='name' required />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ownerName'>Owner Name</Label>
        <Input type='text' id='ownerName' name='ownerName' required />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='imageUrl'>Image Url</Label>
        <Input type='text' id='imageUrl' name='imageUrl' />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='age'>Age</Label>
        <Input type='text' id='age' name='age' required />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea id='notes' rows={3} name='notes' />
      </div>
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
