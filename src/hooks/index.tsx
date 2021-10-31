import React from 'react';

import { AuthProvider } from './auth';
import { CartProvider } from './cart';

export const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
);
