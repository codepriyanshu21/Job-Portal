import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loading from '../components/Loading.jsx'

const ManageJobs = () => {
  const navigate = useNavigate()

  const [jobs, setJobs] = useState(null);

  const { backendUrl, companyToken } = useContext(AppContext)

  // Function to fetch company job application data
  const fetchCompanyJobs = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to change job visiblity
  const changeJobVisiblity = async (id) => {
    // Optimistically update UI
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === id ? { ...job, visible: !job.visible } : job
      )
    );

    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-visiblity',
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // Optional: Refetch to ensure UI is synced with DB
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      // Revert UI change on failure
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === id ? { ...job, visible: !job.visible } : job
        )
      );
    }
  };


  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])

  return jobs ? jobs.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
      <p className='text-xl sm:text-2xl'>No Jobs Available or posted</p>
    </div>
  ) : (
    <div className='container p-3  max-w-5xl'>
      <div  className="overflow-x-auto shadow-md rounded-lg">
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b text-left'>Job Title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b text-center'>Applications</th>
              <th className='py-2 px-4 border-b text-left '>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className='text-gray-700 hover:bg-gray-50'>
                <td className='py-2 px-4 border-b max-sm:hidden'>{index + 1}</td>
                <td className='py-2 px-4 border-b '>{job.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b  text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b'>
                  <input onChange={() => changeJobVisiblity(job._id)} className='scale-125 ml-4' type='checkbox' checked={job.visible} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick={() => navigate('/dashboard/add-job')} className='bg-black rounded-md py-2 px-4 text-white'>Add new job</button>
      </div>
    </div>
  ) : <div className="flex items-center justify-center min-h-screen">
    <Loading/>
  </div>
}

export default ManageJobs