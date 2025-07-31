'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import { PlusIcon } from '@radix-ui/react-icons';
import { Dialog } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { cn } from '@/lib/utils';
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
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === 'checkout') {
    return (
      <Button variant='secondary' onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
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
        <PetForm
          actionType={actionType}
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PetButton;
