import Link from 'next/link';
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from '../styles/pages/success';
import { GetServerSideProps } from 'next';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import Image from 'next/image';
import Head from 'next/head';

interface SuccessProps {
  customerName: string;
  products: {
    //name: string;
    imagesUrl: string[];
  };
}

export default function Success({ customerName, products }: SuccessProps) {
  console.log('aqui', products);
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesContainer>
          {products.imagesUrl.map((imageUrl, index) => {
            return (
              <ImageContainer key={index}>
                <Image src={imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            );
          })}
        </ImagesContainer>
        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          {products.imagesUrl.length} camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details.name;
  const products = session.line_items.data.map((product) => {
    return {
      product: product.price.product as Stripe.Product,
    };
  });

  return {
    props: {
      customerName,
      products: {
        imagesUrl: products.map((item) => {
          return item.product.images[0];
        }),
      },
    },
  };
};
