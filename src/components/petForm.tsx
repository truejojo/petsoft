import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from './ui/button';

type PetFormProps = {
  actionType: 'add' | 'edit';
};

const FetForm = ({ actionType }: PetFormProps) => {
  return (
    <form className='flex flex-col gap-6'>
      <div className='space-y-1'>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' id='name' />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='ownerName'>Owner Name</Label>
        <Input type='text' id='ownerName' />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='imageUrl'>Image Url</Label>
        <Input type='text' id='imageUrl' />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='age'>Age</Label>
        <Input type='text' id='age' />
      </div>
      <div className='space-y-1'>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea id='notes' rows={3} />
      </div>
      <Button type='submit' className='ml-auto'>
        {actionType === 'add' ? 'Add a new Pet' : 'Edit Pet'}
      </Button>
    </form>
  );
};

export default FetForm;
