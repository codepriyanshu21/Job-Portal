import React, { useContext, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  // Function to logout for company
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem('companyToken');
    setCompanyData(null);
    navigate('/');
    toast.success('Logout Successfully');
  };

  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/add-job');
    }
  }, [companyData]);

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Navbar for Recruiter Panel */}
      <div className='bg-white  shadow-md py-4 px-6 flex justify-between items-center'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="Logo" className='cursor-pointer' />
        {companyData && (
          <div className='flex items-center gap-4'>
            <p className='text-gray-700 max-sm:hidden font-medium text-lg'>Welcome, {companyData.name}</p>

            <div className='relative group cursor-pointer'>
              <img src={companyData.image} className='w-10 h-10 rounded-full' />

              {/* Dropdown for Logout */}
              <div className='absolute top-14 right-0 w-32 z-10 bg-white shadow-lg rounded-lg opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible'>
                <ul className='text-gray-600 text-sm'>
                  <li onClick={logout} className='px-4 text-center py-2 hover:bg-gray-200 cursor-pointer'>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className='flex min-h-screen'>
        {/* Left Sidebar */}
        <div className=' bg-white border-r-2 min-h-screen '>
          <ul className='flex flex-col items-start text-gray-800'>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && 'bg-blue-100 border-r-4 border-blue-500'
                }`
              }
              to={'/dashboard/add-job'}
            >
              <img className='min-w-4' src={assets.add_icon} />
              <p className='max-sm:hidden'>Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && 'bg-blue-100 border-r-4 border-blue-500'
                }`
              }
              to={'/dashboard/manage-jobs'}
            >
              <img className='min-w-4' src={assets.home_icon} />
              <p className='max-sm:hidden'>Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                  isActive && 'bg-blue-100 border-r-4 border-blue-500'
                }`
              }
              to={'/dashboard/view-applications'}
            >
              <img className='min-w-4' src={assets.person_tick_icon} />
              <p className='max-sm:hidden'>View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Right Section with Dynamic Content */}
        <div className='flex-1 p-4 sm:p-6 bg-gray-50'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
