'use client';

import * as React from 'react';
import { deleteCustomer } from '@/services/customers';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Pencil as EditIcon } from '@phosphor-icons/react/dist/ssr/Pencil';
import { Trash as DeleteIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import dayjs from 'dayjs';

import type { Customer } from '@/types/customers';
import { logger } from '@/lib/default-logger';
import { useSelection } from '@/hooks/use-selection';

// import { EditCustomerForm } from './EditCustomerForm';

function noop(): void {
  // do nothing
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
}

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export function CustomersTable({
  count = 0,
  rows: customers = [],
  page = 0,
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < customers.length;
  const selectedAll = customers.length > 0 && selected?.size === customers.length;

  // const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  // const [isEditFormOpen, setIsEditFormOpen] = React.useState(false);

  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await deleteCustomer(customerId);
    } catch (error) {
      logger.error('Failed to delete customer', error);
    }
  };

  // const handleEditClick = (customer) => {
  //   setSelectedCustomer(customer);
  //   setIsEditFormOpen(true);
  // };

  // const handleEditSave = async (updatedCustomer) => {
  //   await updateCustomer(updatedCustomer);
  // };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Signed Up</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const isSelected = selected?.has(customer.id);

              return (
                <TableRow hover key={customer.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(customer.id);
                        } else {
                          deselectOne(customer.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Avatar src={`${BASE_URL}/images/uploads/${customer.avatar}`} />
                      <Typography variant="subtitle2">{customer.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {customer.address.street}, {customer.address.state}, {customer.address.city}
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{dayjs(customer.createdAt).format('D MMM, YY')}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        startIcon={<EditIcon />}
                        size="small"
                        color="warning"
                        variant="contained"
                        // onClick={() => handleEditClick(customer)}
                      >
                        Edit
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={async () => {
                          await handleDeleteCustomer(customer._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
