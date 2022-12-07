import React from 'react';
import Link from 'next/link';

function SidebarSubLink({ text, link }) {
  return (
    <li className='sidebar_sublink '>
      <Link href={link}>{text}</Link>
    </li>
  );
}

export default SidebarSubLink;
