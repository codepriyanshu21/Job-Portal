import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Navbar for Recruiter Panel */}
      <div className='bg-white shadow-md py-4 px-6 flex justify-between items-center'>
        <img onClick={e => navigate('/')} src={assets.logo} alt="Logo" className='' />

        <div className='flex items-center gap-4'>
          <p className='text-gray-700 max-sm:hidden  font-medium text-lg'>Welcome, Priyanshu</p>

          <div className='relative group flex items-center cursor-pointer'>
            <img src={assets.company_icon} className='w-10 h-10 rounded-full' />

            <div className='absolute top-16 right-0 w-32 z-10 bg-white shadow-lg rounded-lg hidden group-hover:block'>
              <ul className='text-gray-600 text-sm'>
                <li className='px-4 text-center py-2 hover:bg-gray-200 cursor-pointer'>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex items-center '>
        
        {/* left sidebar with option to add job,manage jobs,view application */}

        <div className='inline-block  min-h-screen border-r-2'>
          <ul className='flex- flex-col items-start pt-5 text-gray-800'>
            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/add-job'}>
              <img className='min-w-4' src={assets.add_icon} />
              <p className='max-sm:hidden'>Add Job</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/manage-jobs'}>
              <img className='min-w-4' src={assets.home_icon} />
              <p className='max-sm:hidden'>Mnage Jobs</p>
            </NavLink>
            <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} to={'/dashboard/view-applications'}>
              <img className='min-w-4' src={assets.person_tick_icon} />
              <p className='max-sm:hidden '>View Applications</p>
            </NavLink>
          </ul>
        </div>

        <div>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
