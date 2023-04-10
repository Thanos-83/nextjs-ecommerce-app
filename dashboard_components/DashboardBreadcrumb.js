import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
function DashboardBreadcrumb({ path }) {
  const router = useRouter();

  const links = path.split('/').splice(2);
  const [linksArray, setLinksArray] = React.useState([]);

  React.useEffect(() => {
    const getArrayLinks = path.split('/').splice(2);
    // console.log('Links: ', getArrayLinks);
    const arrayOfLinks = getArrayLinks
      .slice(0, getArrayLinks.length - 1)
      .reduce((previousLink, currentLink, index) => {
        const initialLink = previousLink;

        if (currentLink.includes('[') && currentLink.includes(']')) {
          return previousLink;
        }

        if (previousLink.length === 0) {
          initialLink.push(currentLink);
        } else {
          initialLink.push(previousLink[index - 1] + '/' + currentLink);
        }
        return initialLink;
      }, []);
    setLinksArray(arrayOfLinks);
  }, [path]);

  // console.log('Links Array: ', linksArray);
  // console.log('Links: ', links);
  return (
    <div className='dashboardBreadcrumb flex space-x-2'>
      {linksArray.length > 0 &&
        linksArray?.map((link, index) => (
          <p key={link} className='link_active'>
            <Link href={`/v1/${link}`}>{links[index].replace('/', ' ')}</Link>
            <span>/</span>
          </p>
        ))}
      <p className='link_inactive'>{links[links.length - 1]}</p>
    </div>
  );
}

export default DashboardBreadcrumb;
