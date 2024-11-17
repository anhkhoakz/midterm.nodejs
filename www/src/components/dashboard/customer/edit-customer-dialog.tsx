import type * as React from 'react';
import { updateCustomer } from '@/services/customers';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import type { Customer } from '@/types/customers';
import { logger } from '@/lib/default-logger';

interface EditCustomerDialogProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onReload: () => void;
}

function EditCustomerDialog({ open, customer, onClose, onReload }: EditCustomerDialogProps): React.ReactElement {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!customer) return;

    const formData = new FormData(event.currentTarget);

    const updatedCustomer = {
      ...customer,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    try {
      await updateCustomer(customer._id, updatedCustomer);
      onClose();
      onReload();
    } catch (error) {
      logger.error('Failed to update customer', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <DialogContentText>To edit this customer, please update the information below.</DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={customer?.name}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={customer?.email}
          />
          <TextField
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            type="tel"
            fullWidth
            variant="standard"
            defaultValue={customer?.phone}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCustomerDialog;
