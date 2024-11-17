'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { createCustomer } from '@/services/customers';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';

import VietnamData from './simplified_json_generated_data_vn_units_minified.json';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
  }),
  phone: z.string().min(1, 'Phone number is required'),
});

type FormData = z.infer<typeof schema>;

export default function AddCustomer(): React.JSX.Element {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);

  const onSubmit = async (data: FormData): Promise<void> => {
    const jsonData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
      },
    };

    try {
      await createCustomer(jsonData);
      router.push(paths.dashboard.customers);
    } catch (error) {
      logger.error('Error creating customer:', error);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Customer</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader title="Add customer" />
          <Divider />
          <CardContent>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Name" error={Boolean(errors.name)} helperText={errors.name?.message} />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                  />
                )}
              />
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                      {...field}
                      label="City"
                      error={Boolean(errors.address?.city)}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setSelectedCity(e.target.value);
                      }}
                    >
                      {VietnamData.map((area) => (
                        <MenuItem key={area.FullNameEn} value={area.FullNameEn}>
                          {area.FullNameEn}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      {...field}
                      label="State"
                      error={Boolean(errors.address?.state)}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    >
                      {VietnamData.filter((area) => area.FullNameEn === selectedCity).flatMap((area) =>
                        area.District.map((district) => (
                          <MenuItem key={district.FullNameEn} value={district.FullNameEn}>
                            {district.FullNameEn}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street"
                    error={Boolean(errors.address?.street)}
                    helperText={errors.address?.street?.message}
                  />
                )}
              />

              <Button type="submit" variant="contained">
                Add Customer
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </form>
    </Stack>
  );
}
