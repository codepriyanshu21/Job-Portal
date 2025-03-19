import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment'
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';

const ApplyJob = () => {
  const { id } = useParams();
  const [jobsData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchData = async () => {
    const data = jobs.filter(job => job._id === id)
    if (data.length !== 0) {
      setJobData(data[0])
      console.log(data[0])
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      fetchData()
    }
  }, [id, jobs])
  return jobsData ? (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center'>
              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={jobsData.companyId.image} />
              <div className='text-center md:text-left text-neutral-700'>
                <h2 className='text-2xl sm:text-4xl font-medium'>{jobsData.title}</h2>
                <div className='flex flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} />
                    {jobsData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} />
                    {jobsData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} />
                    {jobsData.level}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} />
                    CTC: {kconvert.convertTo(jobsData.salary)}
                  </span>
                </div>
              </div>
            </div>
            {/* Apply button */}
            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
              <button className='bg-blue-600 hover:bg-blue-800 p-3 px-10 text-white rounded-xl'>Apply Now</button>
              <p className='mt-1 text-gray-600'>Posted {moment(jobsData.date).fromNow()}</p>
            </div>
          </div>

          {/* Description */}
          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold mb-4 text-3xl'>Job Description</h2>
              <div className='job-description' dangerouslySetInnerHTML={{__html:jobsData.description}}></div>
              <button className='bg-blue-600 hover:bg-blue-800 p-3 mt-10 px-10 text-white rounded-xl'>Apply Now</button>
            </div>

            {/* Right side more jobs */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2>More jobs from {jobsData.companyId.name}</h2>
              {jobs.filter(job=>job._id !==jobsData._id && job.companyId._id===jobsData.companyId._id)
              .filter(job=>true).slice(0,4)
              .map((job,index)=><JobCard key={index} job={job}/>)}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  ) : (
    <div>
      <Loading />
    </div>
  )
}

export default ApplyJob