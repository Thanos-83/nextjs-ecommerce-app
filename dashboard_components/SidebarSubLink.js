import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SidebarSubLink({ text, link }) {
  const router = useRouter();

  return (
    <li
      className={`sidebar_sublink ${
        router.asPath === link && 'sidebar_activeSublink'
      }`}>
      <Link href={link} passHref={true} legacyBehavior>
        {text}
      </Link>
    </li>
  );
}

export default SidebarSubLink;
