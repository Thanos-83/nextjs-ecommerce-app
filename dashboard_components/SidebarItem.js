import Link from 'next/link';
import { useState, useEffect } from 'react';
import SidebarSubLink from './SidebarSubLink';
function SidebarLink({
  Expand,
  Icon,
  text,
  link,
  isParent,
  submenu,
  expand,
  onExpand,
}) {
  return (
    <li className='sidebar_link'>
      <div className=' '>
        {Icon && <Icon className='' />}
        {!isParent ? (
          <Link href={link}>
            <a className=''>
              <p className=''>{text}</p>
              {Expand && <Expand />}
            </a>
          </Link>
        ) : (
          <button type='text' className='' onClick={() => onExpand()}>
            <p className=''>{text}</p>
            {Expand && <Expand />}
          </button>
        )}
      </div>
      {isParent > 0 && (
        <div className={`sidebar_submenu ${expand ? 'expand' : ''}`}>
          <ul>
            {submenu.map((submenuItem, index) => (
              <SidebarSubLink
                key={index}
                text={submenuItem.text}
                link={submenuItem.link}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default SidebarLink;
