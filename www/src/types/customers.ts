export interface Customer {
  _id: string;
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; street: string };
  phone: string;
  createdAt: Date;

  [key: string]: unknown;
}
