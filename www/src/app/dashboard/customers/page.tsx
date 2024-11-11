'use client';

import * as React from 'react';
// import type { Metadata } from 'next';
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

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
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
  }, []);

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
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
