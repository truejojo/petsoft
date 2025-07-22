import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { PlusIcon } from '@radix-ui/react-icons';

type PetButtonProps = {
  actionType: 'edit' | 'checkout' | 'size';
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
  if (actionType === 'edit') {
    return <Button variant='secondary'>{children}</Button>;
  }

  if (actionType === 'checkout') {
    return (
      <Button variant='secondary' onClick={onClick}>
        {children}
      </Button>
    );
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
