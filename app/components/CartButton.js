'use client';

import React from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
function CartButton() {
  const handleCart = () => {
    alert('clicked');
  };
  return (
    <div>
      <button onClick={handleCart}>
        <ShoppingBasketIcon />
      </button>
    </div>
  );
}

export default CartButton;
