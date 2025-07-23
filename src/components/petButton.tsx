import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PetForm from './petForm';

type PetButtonProps = {
  actionType: 'add' | 'edit' | 'checkout';
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const PetButton = ({
  actionType,
  className,
  onClick,
  children,
}: PetButtonProps) => {
  if (actionType === 'checkout') {
    return (
      <Button variant='secondary' onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size='icon' className={cn(className)}>
            <PlusIcon className='size-6' />
          </Button>
        ) : (
          <Button variant='secondary'>{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='mb-4'>
          <DialogTitle>
            {actionType === 'add' ? 'Add a new Pet' : 'Edit Pet'}
          </DialogTitle>
        </DialogHeader>
        <PetForm actionType={actionType} />
      </DialogContent>
    </Dialog>
  );
};

export default PetButton;
