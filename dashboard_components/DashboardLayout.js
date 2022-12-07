import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

function DashboardLayout({ children }) {
  return (
    <div className='dashboard_layout'>
      <DashboardHeader />

      <div className='dashboard_main'>
        <DashboardSidebar />
        <div className='dashboard_content'>{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
