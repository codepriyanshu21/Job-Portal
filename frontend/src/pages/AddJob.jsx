import Quill from 'quill';
import React, { useEffect, useRef, useState } from 'react';
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);  // Reference for the Quill editor container
  const quillRef = useRef(null);   // Reference for the Quill instance

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form className="container p-4 max-sm:-mt-28 max-md:-mt-1 flex flex-col w-full items-start gap-3 ">
      <h2 className="text-2xl  mt-2  font-bold text-gray-700  mb-6">Add a New Job</h2>

      {/* Job Title */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Job Title</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
          className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Job Description</label>
        <div ref={editorRef} className="min-h-[200px] border border-gray-300 p-3 rounded-md bg-white"></div>
      </div>

      {/* Job Details Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Job Category */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Category</label>
          <select
            onChange={e => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 outline-none rounded-md focus:ring focus:ring-blue-300"
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Job Location */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Location</label>
          <select
            onChange={e => setLocation(e.target.value)}
            className="w-full border border-gray-300 p-2 outline-none rounded-md focus:ring focus:ring-blue-300"
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Job Level */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Level</label>
          <select
            onChange={e => setLevel(e.target.value)}
            className="w-full border border-gray-300 outline-none p-2 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>

        {/* Job Salary */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Salary</label>
          <input min={0}
            onChange={e => setSalary(e.target.value)}
            type="number"
            placeholder="10000"
            className="w-full border outline-none border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full mt-6 bg-black text-white py-2 rounded-md  transition">
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
