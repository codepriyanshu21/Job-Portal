import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='container px-4 flex-grow min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        {/* Resume Section */}
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Your Resume</h2>
        <div className='flex flex-wrap gap-3 items-center mb-6'>
          {isEdit ? (
            <>
              <label className='flex items-center cursor-pointer' htmlFor='resumeUpload'>
                <p className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 transition'>Select Resume</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type='file' hidden />
                <img src={assets.profile_upload_icon} alt='Upload Icon' className='w-10 h-10' />
              </label>
              <button onClick={() => setIsEdit(false)} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition'>Save</button>
            </>
          ) : (
            <div className='flex gap-2'>
              <a className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition' href=''>Resume</a>
              <button onClick={() => setIsEdit(true)} className='text-gray-600 border border-gray-300 hover:bg-gray-200 px-4 py-2 rounded-lg transition'>Edit</button>
            </div>
          )}
        </div>
        
        {/* Jobs Applied Section */}
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Jobs Applied</h2>
        <div className='overflow-x-auto rounded-lg shadow-md'>
          <table className='w-full bg-white border rounded-lg min-w-[600px]'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='py-3 px-4 border-b text-left'>Company</th>
                <th className='py-3 px-4 border-b text-left'>Job Title</th>
                <th className='py-3 px-4 border-b text-left hidden md:table-cell'>Location</th>
                <th className='py-3 px-4 border-b text-left hidden md:table-cell'>Date</th>
                <th className='py-3 px-4 border-b text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='py-3 px-4 flex items-center gap-2 border-b'>
                    <img className='w-8 h-8 rounded-full' src={job.logo} alt={job.company} />
                    <span className='font-medium'>{job.company}</span>
                  </td>
                  <td className='py-3 px-4 border-b'>{job.title}</td>
                  <td className='py-3 px-4 border-b hidden md:table-cell'>{job.location}</td>
                  <td className='py-3 px-4 border-b hidden md:table-cell'>{moment(job.date).format('ll')}</td>
                  <td className='py-3 px-4 border-b'>
                    <span className={`px-4 py-1.5 rounded text-white font-semibold ${
                      job.status === 'Accepted' ? 'bg-green-500' : job.status === 'Rejected' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Applications;
