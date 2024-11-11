import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
  }),
});

type FormData = z.infer<typeof schema>;

interface EditCustomerFormProps {
  open: boolean;
  onClose: () => void;
  customer: FormData;
  onSave: (data: FormData) => void;
}

export function EditCustomerForm({ open, onClose, customer, onSave }: EditCustomerFormProps): React.JSX.Element {
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: customer,
  });

  React.useEffect(() => {
    reset(customer);
  }, [customer, reset]);

  const onSubmit = (data: FormData) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" />}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField {...field} label="Email" fullWidth margin="normal" />}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <TextField {...field} label="Phone" fullWidth margin="normal" />}
          />
          <Controller
            name="address.street"
            control={control}
            render={({ field }) => <TextField {...field} label="Street" fullWidth margin="normal" />}
          />
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => <TextField {...field} label="City" fullWidth margin="normal" />}
          />
          <Controller
            name="address.state"
            control={control}
            render={({ field }) => <TextField {...field} label="State" fullWidth margin="normal" />}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
