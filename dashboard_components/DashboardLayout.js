import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

function DashboardLayout({ classes, children }) {
  console.log(classes);
  return (
    <div className={`dashboard_layout ${classes}`}>
      <DashboardHeader />

      <div className='dashboard_main'>
        <DashboardSidebar />
        <div className='dashboard_content'>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
