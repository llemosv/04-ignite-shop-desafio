import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: IProduct[];
  cartTotal: number;
  addCartItem: (item: IProduct) => void;
  checkIfItemExistsInCart: (productId: string) => boolean;
  removeCartItem: (productId: string) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('IgniteShop::cart');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const calculateTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + item.numberPrice;
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('IgniteShop::cart', JSON.stringify(cartItems));
    setCartTotal(calculateTotalPrice());
  }, [cartItems, calculateTotalPrice]);

  function checkIfItemExistsInCart(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  function addCartItem(item: IProduct) {
    const verifyItemExistsInCart = checkIfItemExistsInCart(item.id);

    if (verifyItemExistsInCart) {
      return alert(`Produto ${item.name} já está no carrinho!`);
    }
    setCartItems((oldState) => [...oldState, item]);
  }

  function removeCartItem(productId: string) {
    setCartItems((oldState) => {
      if (oldState) {
        const newCartItems = oldState.filter((item) => item.id !== productId);
        return newCartItems;
      }
      return null;
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        checkIfItemExistsInCart,
        removeCartItem,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
