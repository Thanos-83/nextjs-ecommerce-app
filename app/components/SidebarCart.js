'use client';

import React from 'react';

function SidebarCart() {
  const cartStaus = false;
  return (
    <>
      <div
        className={`dropShadow fixed inset-0 z-[998] bg-black/20 transition-transform duration-300 ${
          cartStaus ? 'scale-100 origin-right' : 'scale-0 origin-right'
        }`}
      />
      <div
        className={`fixed top-0 bottom-0 right-0 w-80 z-[999] bg-slate-200  translate-x-full transition-transform duration-500 ${
          cartStaus ? 'translate-x-0' : 'translate-x-full'
        } `}>
        SidebarCart
      </div>
    </>
  );
}

export default SidebarCart;
