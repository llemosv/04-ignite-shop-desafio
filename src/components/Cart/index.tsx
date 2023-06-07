import * as Dialog from '@radix-ui/react-dialog';
import CartButton from '../CartButton';
import {
  CartCheckout,
  CartClose,
  CartContent,
  CartProduct,
  ImageContainer,
} from './styles';
import { X } from 'phosphor-react';
import { useCart } from '../../hooks/useCart';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';

export default function Cart() {
  const { cartItems, removeCartItem, cartTotal } = useCart();

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const cartQuantity = cartItems.length;
  const cartPriceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal);

  function handleRemoveCartItems(item) {
    removeCartItem(item.id);
  }

  async function handleBuyProduct() {
    console.log(cartItems);

    const verifyCart = cartItems.length === 0;

    if (verifyCart) {
      return alert('Nenhum produto selecionado!');
    }

    const itemsFormatted = cartItems.map((product) => {
      return {
        price: product.defaultPriceId,
        quantity: 1,
      };
    });

    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        products: itemsFormatted,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!');
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton color="gray" numberItems={cartQuantity} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>

          <h2>Sacola de compras</h2>
          <section>
            {cartItems.length > 0 ? (
              cartItems.map((product) => {
                return (
                  <CartProduct key={product.id}>
                    <ImageContainer>
                      <Image
                        src={product.imageUrl}
                        width={120}
                        height={110}
                        alt=""
                      />
                    </ImageContainer>
                    <div>
                      <p>{product.name}</p>
                      <strong>{product.price}</strong>
                      <button onClick={() => handleRemoveCartItems(product)}>
                        Remover
                      </button>
                    </div>
                  </CartProduct>
                );
              })
            ) : (
              <p>Parece que seu carrinho está vazio</p>
            )}
          </section>

          <CartCheckout>
            <div className="first-div">
              <p>Quantidade</p>
              <span>
                {cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}
              </span>
            </div>
            <div className="second-div">
              <p>Valor total</p>
              <strong>{cartPriceFormatted}</strong>
            </div>

            <button
              disabled={isCreatingCheckoutSession}
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </button>
          </CartCheckout>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
