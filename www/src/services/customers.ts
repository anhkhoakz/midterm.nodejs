import formHttp from '@/utils/axios';
import http from '@/utils/axios';

import type { Customer } from '@/types/customers';

const baseURL = '/customers';

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await http.get(baseURL);

  return response.data as Customer[];
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  const response = await http.get(`${baseURL}/${id}`);
  return response.data as Customer;
};

export const createCustomer = async (formData: FormData): Promise<Customer> => {
  const response = await formHttp.post(baseURL, formData);
  return response.data as Customer;
};

export const updateCustomer = async (id: number, customer: Customer): Promise<Customer> => {
  const formData = new FormData();
  (Object.keys(customer) as (keyof Customer)[]).forEach((key) => {
    formData.append(key.toString(), customer[key] as Blob);
  });
  const response = await formHttp.put(`${baseURL}/${id}`, formData);
  return response.data as Customer;
};

export const deleteCustomer = async (id: string): Promise<void> => {
  await http.delete(`${baseURL}/${id}`);
};
