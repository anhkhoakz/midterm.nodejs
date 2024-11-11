export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    dashboard: '/dashboard/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    addCustomer: '/dashboard/add-customer',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
