import React from 'react';

import { AuthProvider } from './auth';
import { CartProvider } from './cart';
import { OrderProvider } from './order';

export const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      <OrderProvider>{children}</OrderProvider>
    </CartProvider>
  </AuthProvider>
);
