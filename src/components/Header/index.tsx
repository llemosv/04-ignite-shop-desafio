import Image from 'next/image';

import logoImg from '../../assets/logo.svg';
import { useRouter } from 'next/router';
import { HeaderContainer } from './styles';
import Cart from '../Cart';
import Link from 'next/link';

export default function Header() {
  const { pathname } = useRouter();

  const pageValidationCart = pathname !== '/success';
  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <Image src={logoImg.src} width={130} height={52} alt="" />
      </Link>

      {pageValidationCart && <Cart />}
    </HeaderContainer>
  );
}
