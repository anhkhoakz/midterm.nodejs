'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCustomers } from '@/services/customers';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import type { Customer } from '@/types/customers';
import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchProducts = async (): Promise<void> => {
    try {
      const customersData = await getCustomers();
      setCustomers(customersData);
    } catch (error) {
      logger.error('Failed to fetch customers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, [reload]);

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
        </Stack>
        <div>
          <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => {
              router.push(paths.dashboard.addCustomer);
            }}
          >
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters onSearch={setSearchQuery} />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
        setReload={setReload}
        searchQuery={searchQuery}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
