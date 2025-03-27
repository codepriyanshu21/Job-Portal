import Quill from 'quill';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { JobCategories, JobLocations } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + '/api/company/post-job',
        { title, description, location, salary, category, level },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success('Job Added Successfully');
        setTitle('');
        setSalary(0);
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="p-6 sm:p-10 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Add a New Job</h2>

      {/* Job Title */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Job Title</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-1">Job Description</label>
        <div ref={editorRef} className="w-full min-h-[200px] max-h-[300px] overflow-y-auto border border-gray-300 p-3 rounded-md bg-white"></div>
      </div>

      {/* Job Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Job Category */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-blue-300"
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Job Location */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Location</label>
          <select
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-blue-300"
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Job Level */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Level</label>
          <select
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-blue-300"
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>

        {/* Job Salary */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Job Salary</label>
          <input
            type="number"
            placeholder="10000"
            min={0}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
        Add Job
      </button>
    </form>
  );
};

export default AddJob;
