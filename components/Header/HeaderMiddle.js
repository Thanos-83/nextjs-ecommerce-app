import React, { Fragment, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '@mui/icons-material';
import { deleteItemFromCart } from '../../features/basketItems/cartItemsSlice';
function HeaderMiddle() {
  const cartMenuRef = useRef();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  const [openCart, setOpenCart] = useState(false);

  // useEffect(() => {
  //   document.addEventListener('mousedown', (e) => {
  //     // console.log(cartMenuRef.current);
  //     console.log(e.target);
  //   });
  // });
  // console.log(cartItems.length);

  const handleDeleteItem = (productID) => {
    dispatch(deleteItemFromCart(productID));
  };
  return (
    <div className='header_middle py-4 flex items-center justify-between'>
      <div className='header_middleLeft'>
        <p>Left area</p>
      </div>
      <div className='header_middleMiddle'>
        <p>Middle area</p>
      </div>
      <div className='header_middleRight'>
        <div className='header_middleRight_icons'>
          <Tooltip title='Compare' placement='top' arrow>
            <IconButton aria-label='compare button'>
              <Badge badgeContent={0} color='secondary'>
                <CompareArrowsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title='Wishlist' placement='top' arrow>
            <IconButton aria-label='wishlist button'>
              <Badge badgeContent={0} color='secondary'>
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            as='div'
            className='products_cart relative inline-block text-left z-50'>
            <>
              <Menu.Button onClick={() => setOpenCart(!openCart)}>
                <Tooltip title='Cart' placement='top' arrow>
                  <Badge badgeContent={cartItems?.length} color='secondary'>
                    <ShoppingBasketIcon />
                  </Badge>
                </Tooltip>
              </Menu.Button>
              <Transition
                as={Fragment}
                show={openCart}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'>
                <Menu.Items className='menu_items'>
                  <div
                    // ref={cartMenuRef}
                    className='menuItems_container px-1 py-1 mb-2 space-y-2'>
                    {cartItems?.map((item) => (
                      <Menu.Item key={item.productID}>
                        {({ active }) => (
                          <div className='menuItem_container flex justify-between gap-3'>
                            <div className='menuItem_imageContainer border'>
                              <Link
                                href={'#'}
                                passHref
                                legacyBehavior
                                className={`${
                                  active
                                    ? 'menu_itemActive '
                                    : 'menu_itemInactive '
                                } group `}>
                                <a>
                                  <Image
                                    src={item.image}
                                    width={100}
                                    height={100}
                                    objectFit='contain'
                                    alt='product cart image'
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className='flex flex-1 flex-col justify-around'>
                              <Link href={'/'} passHref legacyBehavior>
                                <a>{item.title}</a>
                              </Link>
                              <div>
                                <p>
                                  {item.quantity} * {item.price}
                                </p>
                              </div>
                            </div>
                            <div className='cartItem_delete w-8'>
                              <IconButton
                                aria-label='wishlist button'
                                onClick={() =>
                                  handleDeleteItem(item.productID)
                                }>
                                <Delete />
                              </IconButton>
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  <div>
                    <p>Total Price</p>
                  </div>
                  <div>
                    <Link href={'/cart'} passHref={true} legacyBehavior>
                      <a> Procced To Checkout </a>
                    </Link>
                  </div>
                </Menu.Items>
              </Transition>
              {/* )} */}
            </>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default HeaderMiddle;
