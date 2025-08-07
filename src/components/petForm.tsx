'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePetContextProvider } from '@/app/app/hooks/usePetContextProvider';
import { petFormSchema } from '@/lib/schema';
import FormFieldWrapper from './formFieldWrapper';
import ErrorMessage from './errorMessage';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
};

const PetForm = ({ actionType, onFormSubmission }: PetFormProps) => {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContextProvider();

  // Stabilisiere die DefaultValues mit useMemo
  const petDefaultValues = useMemo(
    () => ({
      name: selectedPet?.name ?? '',
      ownerName: selectedPet?.ownerName ?? '',
      imageUrl: selectedPet?.imageUrl ?? '',
      age: selectedPet?.age ?? 0,
      notes: selectedPet?.notes ?? '',
    }),
    [selectedPet],
  );

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
    // reset,
    // setFocus,
  } = useForm({
    resolver: zodResolver(petFormSchema),
    defaultValues: actionType === 'add' ? {} : petDefaultValues,
    shouldFocusError: true,
  });

  // Reset nur beim Wechsel des ausgewählten Pets
  // useEffect(() => {
  //   if (actionType === 'edit' && selectedPet) {
  //     reset(petDefaultValues);
  //   }
  // }, [petDefaultValues, actionType, reset, selectedPet]);

  // Fokus auf das erste Fehlerfeld
  // useEffect(() => {
  //   if (errors.name) setFocus('name');
  //   else if (errors.ownerName) setFocus('ownerName');
  //   else if (errors.imageUrl) setFocus('imageUrl');
  //   else if (errors.age) setFocus('age');
  //   else if (errors.notes) setFocus('notes');
  // }, [errors, setFocus]);

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        const petData = petFormSchema.parse(getValues());
        petData.imageUrl =
          petData.imageUrl ||
          'https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png';

        // Add userId to petData for PetEssentials type
        // const petDataWithUserId = {
        //   ...petData,
        //   userId: selectedPet?.userId ?? '', // or provide the correct userId here
        // };

        if (actionType === 'add') {
          await handleAddPet(petData);
        } else if (actionType === 'edit') {
          await handleEditPet(petData, selectedPet?.id || '');
        }

        if (onFormSubmission) onFormSubmission();
      }}
      className='flex flex-col gap-6'
    >
      <FormFieldWrapper>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' {...register('name')} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='ownerName'>Owner Name</Label>
        <Input id='ownerName' {...register('ownerName')} />
        {errors.ownerName && (
          <ErrorMessage>{errors.ownerName.message}</ErrorMessage>
        )}
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='imageUrl'>Image Url</Label>
        <Input id='imageUrl' {...register('imageUrl')} />
        {errors.imageUrl && (
          <ErrorMessage>{errors.imageUrl.message}</ErrorMessage>
        )}
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='age'>Age</Label>
        <Input id='age' {...register('age')} />
        {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
      </FormFieldWrapper>
      <FormFieldWrapper>
        <Label htmlFor='notes'>Notes</Label>
        <Textarea id='notes' {...register('notes')} />
        {errors.notes && <ErrorMessage>{errors.notes.message}</ErrorMessage>}
      </FormFieldWrapper>
      <DialogFooter>
        <Button type='submit' className='ml-auto'>
          {actionType === 'add' ? 'Add a new Pet' : 'Edit Pet'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default PetForm;
