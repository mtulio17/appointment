import React from 'react'
import { Outlet } from 'react-router-dom';
import SettingsSidebar from './SettingsSidebar'

const Account = () => {
  return (
    <div className='flex'>
      <SettingsSidebar />
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>

  )
}

export default Account