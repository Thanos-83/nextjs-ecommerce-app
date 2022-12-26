import Link from 'next/link';
import { useState, useEffect } from 'react';
import SidebarSubLink from './SidebarSubLink';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  // console.log('Router: ', router);
  // console.log('Link: ', link);
  return (
    <li
      className={`sidebar_link ${
        router.asPath === link ? 'sidebar_activeLink' : ''
      }`}>
      <div className='block'>
        {Icon && <Icon className='' />}
        {!isParent ? (
          <Link href={link}>
            <a className=''>
              <p className=''>{text}</p>
              {Expand && <Expand />}
            </a>
          </Link>
        ) : (
          <button type='button' className='' onClick={() => onExpand()}>
            <p className=''>{text}</p>
            {Expand && <Expand />}
          </button>
        )}
      </div>
      {isParent && (
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
