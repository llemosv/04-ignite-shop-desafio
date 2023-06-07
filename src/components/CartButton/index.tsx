import { Handbag } from 'phosphor-react';
import { CartButtonContainer } from './styles';

interface ButtonProps {
  size?: 'medium' | 'large';
  color: 'gray' | 'green';
  numberItems?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function CartButton({
  color,
  size,
  numberItems,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <CartButtonContainer onClick={onClick} color={color} size={size} {...rest}>
      <Handbag size={30} weight="bold" />

      {color === 'gray' && numberItems > 0 && (
        <div>
          <p>{numberItems}</p>
        </div>
      )}
    </CartButtonContainer>
  );
}
