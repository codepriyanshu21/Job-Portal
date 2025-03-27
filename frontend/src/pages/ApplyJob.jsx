import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment'
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const [jobsData, setJobData] = useState(null);
  const [isAlreadyApplied,setIsAlreadyApplied]=useState(false)
  const { jobs,backendUrl,userData,userApplications,fetchUserApplications } = useContext(AppContext);
  const {getToken}=useAuth()

  const fetchData = async () => {
    try {
      
      const {data}=await axios.get(backendUrl+`/api/jobs/${id}`)

      if(data.success){
        setJobData(data.job)
      }else{
        toast.error('Error in applying job')
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied=()=>{
    const hasApplied=userApplications.some(item=>item.jobId._id===jobsData._id)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(()=>{
    if(userApplications.length > 0 && jobsData){
      checkAlreadyApplied()
    }
  },[jobsData,userApplications,id])

  const applyHandler=async()=>{
    try {
      
      if(!userData){
        return toast.error('Login to apply for jobs')
      }

      if(!userData.resume){
        navigate('/applications')
        return toast.error('Upload your resume to apply for jobs')
      }

      const token=await getToken()

      const {data}=await axios.post(backendUrl+'/api/users/apply',
        {jobId:jobsData._id},
        {headers:{Authorization:`Bearer ${token}`}}
      )
      console.log(data)

      if(data.success){
        toast.success('Applied for the job')
        fetchUserApplications()
      }else{
        toast.error('Error in applying job')
      }

    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message) {
        toast.error(error.response.data.message);
    } else {
        toast.error("Internal error");
    }
    }
  }

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
              <button onClick={applyHandler} className='bg-blue-600 hover:bg-blue-800 p-3 px-10 text-white rounded-xl'>{isAlreadyApplied ? 'Already Applied' : 'Apply Now'}</button>
              <p className='mt-1 text-gray-600'>Posted {moment(jobsData.date).fromNow()}</p>
            </div>
          </div>

          {/* Description */}
          <div className='flex flex-col lg:flex-row justify-between items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold mb-4 text-3xl'>Job Description</h2>
              <div className='job-description' dangerouslySetInnerHTML={{__html:jobsData.description}}></div>
              <button onClick={applyHandler} className='bg-blue-600 hover:bg-blue-800 p-3 mt-10 px-10 text-white rounded-xl'>{isAlreadyApplied ? 'Already Applied' : 'Apply Now'}</button>
            </div>

            {/* Right side more jobs */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2>More jobs from {jobsData.companyId.name}</h2>
              {jobs.filter(job=>job._id !==jobsData._id && job.companyId._id===jobsData.companyId._id)
              .filter(job=>{
                //set of applied jobs
                const appliedJobsIds=new Set(userApplications.map(app=>app.jobId && app.jobId._id))
                //Return true if the user has not already applied for this job
                return !appliedJobsIds.has(job._id)
              }).slice(0,4)
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