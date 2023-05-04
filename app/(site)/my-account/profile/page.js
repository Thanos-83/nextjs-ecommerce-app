'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function Profile() {
  const { data: session } = useSession({
    required: true,
  });

  console.log(session);
  return <div>Profile Page</div>;
}

export default Profile;
