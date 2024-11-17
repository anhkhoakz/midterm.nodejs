import axios from 'axios';

import type { Customer } from '@/types/customers';
import { logger } from '@/lib/default-logger';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL
  ? `${process.env.NEXT_PUBLIC_SERVER_URL}/customers`
  : '/api/customers';

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get(baseURL);
    return response.data as Customer[];
  } catch (error) {
    logger.error('Error fetching customers:', error);
    throw error;
  }
};

export const getCustomerById = async (id: string): Promise<Customer> => {
  try {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data as Customer;
  } catch (error) {
    logger.error(`Error fetching customer with id ${id}:`, error);
    throw error;
  }
};

export const createCustomer = async (data: object): Promise<Customer> => {
  try {
    const response = await axios.post(baseURL, data);
    return response.data as Customer;
  } catch (error) {
    logger.error('Error creating customer:', error);
    throw error;
  }
};

export const updateCustomer = async (id: string, formData: object): Promise<Customer> => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, formData);
    return response.data as Customer;
  } catch (error) {
    logger.error(`Error updating customer with id ${id}:`, error);
    throw error;
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${baseURL}/${id}`);
  } catch (error) {
    logger.error(`Error deleting customer with id ${id}:`, error);
    throw error;
  }
};
