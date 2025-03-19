import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {

  const navigate=useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
      {/* Company Icon */}
      <div className="flex items-center gap-4">
        <img src={assets.company_icon} alt="Company" className="w-12 h-12 object-contain" />
        <h4 className="text-lg font-semibold">{job.title}</h4>
      </div>

      {/* Job Location & Level */}
      <div className="mt-3 flex justify-between text-gray-500 text-sm">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{job.location}</span>
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">{job.level}</span>
      </div>

      {/* Job Description Preview */}
      <p className="mt-4 text-gray-700 text-sm">
        <span dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></span>...
      </p>

      {/* Buttons */}
      <div className="mt-5 flex gap-3 whitespace-nowrap">
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Apply Now</button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-200 transition">Learn More</button>
      </div>
    </div>
  );
};

export default JobCard;
