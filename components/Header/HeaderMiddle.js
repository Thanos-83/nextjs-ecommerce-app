import React from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Badge, IconButton, Tooltip } from '@mui/material';
function HeaderMiddle() {
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
              <Badge badgeContent={8} color='secondary'>
                <CompareArrowsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title='Wishlist' placement='top' arrow>
            <IconButton aria-label='wishlist button'>
              <Badge badgeContent={2} color='secondary'>
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title='Cart' placement='top' arrow>
            <IconButton aria-label='shopping cart button'>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default HeaderMiddle;
