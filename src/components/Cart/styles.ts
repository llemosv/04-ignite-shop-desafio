import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '../../styles';

export const CartContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '30rem',
  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  padding: '3rem',
  paddingTop: '4.5rem',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',

  h2: {
    fontWeight: 700,
    fontSize: '$lg',
    color: '$gray100',
    marginBottom: '2rem',
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
});

export const CartClose = styled(Dialog.Close, {
  backgroundColor: 'transparent',
  border: 'none',
  color: '$gray500',
  position: 'absolute',
  top: '1.75rem',
  right: '1.75rem',

  cursor: 'pointer',
});

export const CartProduct = styled('div', {
  height: '5.875rem',
  width: '100%',

  display: 'flex',
  gap: '1.25rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',

    p: {
      color: '$gray300',
      fontSize: '$md',
    },

    strong: {
      fontWeight: 'bold',
      color: '$gray100',
      fontSize: '$md',
    },

    button: {
      display: 'flex',
      alignItems: 'flex-start',
      background: 'none',
      border: 0,
      color: '$green500',
      fontSize: '$sm',
      fontWeight: 'bold',

      cursor: 'pointer',

      '&:hover': {
        color: '$green300',
      },
    },
  },
});

export const ImageContainer = styled('div', {
  width: 102,
  maxWidth: 102,
  height: 96,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
});

export const CartCheckout = styled('div', {
  //background: 'red',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 'auto',
  width: '100%',
  paddingTop: 20,

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '& .first-div': {
    p: {
      color: '$gray100',
      fontSize: '$md',
    },

    span: {
      color: '$gray300',
      fontSize: '$lg',
    },
  },

  '& .second-div': {
    marginTop: 7,
    fontWeight: 'bold',
    p: {
      color: '$gray100',
      fontSize: '$lg',
    },
    strong: { color: '$gray100', fontSize: '$xl' },
  },

  button: {
    marginTop: '3.56rem',
    marginLeft: 'calc(50% - 384px/2)',
    padding: '20px 32px',
    borderRadius: 8,
    backgroundColor: '$green500',
    color: '$gray100',
    fontWeight: 'bold',
    fontSize: '$md',
    border: 0,
    cursor: 'pointer',

    width: '24rem',
    height: '69px',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
      transition: 'background-color 0.15s',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
});
