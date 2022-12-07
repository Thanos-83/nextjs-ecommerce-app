import React from 'react';
import SidebarItem from './SidebarItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
const submenuProducts = [
  { text: 'Add New', link: '/v1/dashboard/products/add' },
  { text: 'Products', link: '/v1/dashboard/products' },
  { text: 'Popular Products', link: '/v1/dashboard/' },
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
              link={'/v1/dashboard/'}
              isParent={false}
            />
            <SidebarItem
              text='Products'
              Icon={Inventory2Icon}
              Expand={KeyboardArrowDownIcon}
              link='/v1/dashboard/products'
              isParent={true}
              submenu={submenuProducts}
              onExpand={handleExpand}
              expand={expand}
            />
            <SidebarItem
              text='Orders'
              Icon={DashboardIcon}
              Expand={KeyboardArrowDownIcon}
              link='#'
              isParent={true}
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
              link='#'
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
      </nav>
    </div>
  );
}

export default SidebarNav;
