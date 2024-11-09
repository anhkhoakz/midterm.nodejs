import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];
