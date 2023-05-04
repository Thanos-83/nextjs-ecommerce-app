'use client';

import { useSelector, useDispatch } from 'react-redux';
import { toggleCartSidebar } from '../../features/basketItems/cartItemsSlice';
import React from 'react';
import Badge from '@mui/material/Badge';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
function CartButton() {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cartItems);
  // console.log(response);

  const handleCart = () => {
    dispatch(toggleCartSidebar());
  };
  return (
    <div>
      <button onClick={handleCart}>
        <Badge badgeContent={cartItems.length} color='secondary'>
          <ShoppingBasketIcon />
        </Badge>
      </button>
    </div>
  );
}

export default CartButton;
