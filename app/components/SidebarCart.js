'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartSidebar } from '../../features/basketItems/cartItemsSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function SidebarCart() {
  const dispatch = useDispatch();
  const { sidebarCartStatus: cartStaus } = useSelector(
    (state) => state.cartItems
  );

  const handleCloseCartSidebar = () => {
    dispatch(toggleCartSidebar());
  };
  // const cartStaus = false;
  return (
    <>
      <div
        onClick={handleCloseCartSidebar}
        className={`dropShadow fixed inset-0 z-[998] bg-black/20 transition-transform duration-300 ${
          cartStaus ? 'scale-100 origin-right' : 'scale-0 origin-right'
        }`}
      />
      <div
        className={`fixed top-0 bottom-0 right-0 w-80 z-[999] bg-slate-200 p-4 translate-x-full transition-transform duration-500 ${
          cartStaus ? 'translate-x-0' : 'translate-x-full'
        } `}>
        <button className='mb-8' type='button' onClick={handleCloseCartSidebar}>
          Close
        </button>
        <div>
          <p>Your cart is empty</p>
          <AddShoppingCartIcon className='w-12 h-12' />
        </div>
      </div>
    </>
  );
}

export default SidebarCart;
