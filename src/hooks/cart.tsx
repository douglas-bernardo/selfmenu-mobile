import React, { createContext, useCallback, useContext, useState } from 'react';

interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_formatted: string;
  photo_url: string;
}

interface IItem {
  id: string;
  product: IProduct;
  quantity: number;
  amount: string;
  details?: string;
  owner?: string;
}

interface CartContextData {
  cart_items: IItem[];
  addItem(product: IItem): void;
  removeItem(product: IItem): void;
  updateItem(product: IItem): void;
  clearCart(): void;
  showCartModal: boolean;
  toggleCartModal(): void;
}

interface CartState {
  items: IItem[];
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
  const [showCartModal, setShowCartModal] = useState(false);
  const [data, setData] = useState<CartState>({ items: [] } as CartState);

  const addItem = useCallback((product: IItem) => {
    setData(prevState => {
      return {
        items: [...prevState.items, product],
      };
    });
  }, []);

  const removeItem = useCallback((itemToRemove: IItem) => {
    setData(prevState => {
      return {
        items: prevState.items.filter(item => item.id !== itemToRemove.id),
      };
    });
  }, []);

  const updateItem = useCallback(
    (itemEdit: IItem) => {
      const updatedItems = data.items.map(item => {
        if (item.product.id === itemEdit.product.id) {
          return {
            ...item,
            quantity: itemEdit.quantity,
            amount: itemEdit.amount,
            details: itemEdit.details,
          };
        }
        return item;
      });
      setData({ items: updatedItems });
    },
    [data.items],
  );

  const clearCart = useCallback(() => {
    setData({ items: [] });
  }, []);

  const toggleCartModal = useCallback(() => {
    setShowCartModal(!showCartModal);
  }, [showCartModal]);

  return (
    <CartContext.Provider
      value={{
        cart_items: data.items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        showCartModal,
        toggleCartModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
}
