import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

type PetButtonProps = {
  actionType: 'edit' | 'checkout' | 'size';
  className?: string;
};

const PetButton = ({ actionType, className }: PetButtonProps) => {
  if (actionType === 'edit') {
    return <Button variant='secondary'>Edit</Button>;
  }

  if (actionType === 'checkout') {
    return <Button variant='secondary'>Checkout</Button>;
  }

  if (actionType === 'size') {
    return (
      <Button size='icon' className={cn(className)}>
        <PlusIcon className='size-6' />
      </Button>
    );
  }
};

export default PetButton;
