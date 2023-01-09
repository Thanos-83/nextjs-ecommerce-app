import React from 'react';
import SidebarItem from './SidebarItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';

const submenuProducts = [
  { text: 'Add New', link: '/v1/dashboard/products/add' },
  { text: 'All Products', link: '/v1/dashboard/products' },
  { text: 'Categories', link: '/v1/dashboard/products/categories' },
  { text: 'Attributes', link: '/v1/dashboard/products/attributes' },
  { text: 'Tags', link: '/v1/dashboard/products/tags' },
];

const submenuOrders = [
  // { text: 'Add Order', link: '/v1/dashboard/products/add' },
  // { text: 'Orders List', link: '/v1/dashboard/' },
  // { text: 'Resent Orders', link: '/v1/dashboard/' },
];

function SidebarNav() {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    console.log(expand);
    setExpand(!expand);
    console.log(expand);
  };
  return (
    <div className='dashboard_sidebar'>
      <nav className=''>
        <ul className=''>
          <>
            <SidebarItem
              text='Dashboard'
              Icon={DashboardIcon}
              Expand={KeyboardArrowDownIcon}
              link={'/v1/dashboard'}
              isParent={false}
            />
            <SidebarItem
              text='Products'
              Icon={Inventory2Icon}
              Expand={KeyboardArrowDownIcon}
              link='#'
              isParent={true}
              submenu={submenuProducts}
              onExpand={handleExpand}
              expand={expand}
            />
            <SidebarItem
              text='Media Library'
              Icon={DashboardIcon}
              // Expand={KeyboardArrowDownIcon}
              link='/v1/dashboard/media'
              // isParent={true}
              submenu={submenuOrders}
              onExpand={handleExpand}
              expand={expand}
            />
            <SidebarItem
              text='Customers'
              Icon={DashboardIcon}
              Expand={KeyboardArrowDownIcon}
              link='#'
              isParent={false}
            />
            <SidebarItem
              text='Transactions'
              Icon={DashboardIcon}
              // Expand={KeyboardArrowDownIcon}
              link='#'
              isParent={false}
            />
            <SidebarItem
              text='Settings'
              Icon={DashboardIcon}
              // Expand={KeyboardArrowDownIcon}
              link='/v1/dashboard/settings'
              isParent={false}
            />
            <SidebarItem
              text='Home'
              Icon={HomeIcon}
              // Expand={KeyboardArrowDownIcon}
              link='/'
              isParent={false}
            />
          </>
        </ul>
        {/* <ul className='test_nav space-y-4'>
          <li className='flex items-center'>
            <input
              type='radio'
              // hidden
              name='link'
              value='link 1'
              id='nameOne'
              onClick={(e) => console.log(e.target.value)}
            />
            <label className='block' htmlFor='nameOne'>
              Link 1
            </label>
          </li>
          <li className='flex items-center'>
            <input
              type='radio'
              name='link'
              value='link 2'
              id='nameTwo'
              onClick={(e) => console.log(e.target.value)}
            />
            <label className='block' htmlFor='nameTwo'>
              Link 2
            </label>
          </li>
          <li className='flex items-center'>
            <input
              type='radio'
              name='link'
              value='link 3'
              id='nameThree'
              onClick={(e) => console.log(e.target.value)}
            />
            <label className='block' htmlFor='nameThree'>
              link 3
            </label>
          </li>
          <li className='flex items-center'>
            <input
              type='radio'
              id='contactChoice2'
              name='link'
              value='phone'
              onClick={(e) => console.log(e.target.value)}
            />
            <label className='block' htmlFor='contactChoice2'>
              Phone
            </label>
          </li>
        </ul> */}
      </nav>
    </div>
  );
}

export default SidebarNav;
