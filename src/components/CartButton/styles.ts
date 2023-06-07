import { styled } from '../../styles';

export const CartButtonContainer = styled('button', {
  border: 'none',
  padding: '0.75rem',
  borderRadius: 6,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  svg: {
    color: '$gray300',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    color: '$gray100',
    position: 'absolute',
    backgroundColor: '$green500',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: 1000,
    border: '4px solid $gray900',
    marginTop: '-50px',
    marginRight: '-30px',
  },

  variants: {
    color: {
      gray: {
        background: '$gray800',
      },
      green: {
        background: '$green500',
        color: '$white',
      },
    },
    size: {
      medium: {
        width: '3rem',
        height: '3rem',

        svg: {
          fontSize: 24,
        },
      },
      large: {
        width: '3.5rem',
        height: '3.5rem',

        svg: {
          fontSize: 32,
        },
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});
