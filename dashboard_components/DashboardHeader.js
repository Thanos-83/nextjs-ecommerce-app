import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

function DashboardHeader() {
  return (
    <div className='dashboard_header'>
      <div className='dashboard_headerLeft'>
        <div>
          <p>LOGO</p>
        </div>
        <div>
          <button type='text'>
            <MenuOpenIcon className='text-gray-400' />
          </button>
        </div>
      </div>
      <div className='dashboard_headerRight'>
        <div className='dashboard_headerSearch'>
          <input type='search' placeholder='Search...' />
          <SearchIcon />
        </div>
        <div className='header_actions'>
          <NotificationsIcon />
          <div className='header_avatar'>
            <Menu as='div' className='relative inline-block text-left'>
              <Menu.Button>
                <div className='flex -space-x-2 overflow-hidden'>
                  <img
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </div>
                <KeyboardArrowDownIcon />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'>
                <Menu.Items className='menu_items'>
                  <div className='px-1 py-1 mb-2'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active ? 'menu_itemActive ' : 'menu_itemInactive '
                          } group `}>
                          {active ? (
                            <AccountBoxIcon aria-hidden='true' />
                          ) : (
                            <AccountBoxIcon aria-hidden='true' />
                          )}
                          Profile
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='px-1 py-1 mb-2'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active ? 'menu_itemActive ' : 'menu_itemInactive '
                          } group `}>
                          {active ? (
                            <EditIcon aria-hidden='true' />
                          ) : (
                            <EditIcon aria-hidden='true' />
                          )}
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='px-1 py-1 mb-2'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active ? 'menu_itemActive ' : 'menu_itemInactive '
                          } group `}>
                          {active ? (
                            <DeleteIcon aria-hidden='true' />
                          ) : (
                            <DeleteIcon aria-hidden='true' />
                          )}
                          Delete
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='px-1 py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active ? 'menu_itemActive ' : 'menu_itemInactive '
                          } group `}>
                          {active ? (
                            <LogoutIcon aria-hidden='true' />
                          ) : (
                            <LogoutIcon aria-hidden='true' />
                          )}
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
