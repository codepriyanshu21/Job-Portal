import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import {useNavigate} from 'react-router'
import toast from 'react-hot-toast';

const RecruiterLogin = () => {
    const navigate = useNavigate()
    const [state, setState] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(false);
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
    const {setShowRecruiterLogin, backendUrl, setCompanyToken,setCompanyData}=useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (state === "Sign Up" && !isTextDataSubmitted) {
            return setIsTextDataSubmitted(true);
        }

        try {
            
            if(state === "Login"){

                const {data}=await axios.post(backendUrl + '/api/company/login',{email,password})

                if(data.success){
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken',data.token)
                    setShowRecruiterLogin(false)
                    toast.success('Logged in successfully')
                    navigate('/dashboard')
                }else{
                    toast.error(error.message)
                }

            }else{
                const formData=new FormData()
                formData.append('name',name)
                formData.append('email',email)
                formData.append('password',password)
                formData.append('image',image)

                const {data}=await axios.post(backendUrl + '/api/company', formData)

                if(data.success){
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken',data.token)
                    setShowRecruiterLogin(false)
                    toast.success('Logged in successfully')
                    navigate('/dashboard')
                }else{
                    toast.error(error.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(()=>{
        document.body.style.overflow='hidden'

        return()=>{
            document.body.style.overflow='auto'
        }
    })

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-sm bg-black/40'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-8 rounded-2xl shadow-xl w-90 flex flex-col gap-4'>
                <img onClick={e=>setShowRecruiterLogin(false)} src={assets.cross_icon} className='absolute top-4 right-4 w-4 h-4 cursor-pointer' alt='Close' />
                <h1 className='text-2xl font-bold text-center text-gray-800'>Recruiter {state}</h1>
                <p className='text-center text-sm text-gray-500'>Welcome back! Please sign in to continue</p>
                {state === "Sign Up" && isTextDataSubmitted ? (
                    <div className='flex items-center gap-4 my-10'>
                        <label htmlFor='image'>
                            <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
                            <input onChange={e => setImage(e.target.files[0])} type='file' id='image' hidden />
                        </label>
                        <p>Upload Company <br />logo</p>
                    </div>
                ) : (
                    <>
                        {state !== 'Login' && (
                            <div className='flex items-center border rounded-lg p-2 bg-gray-100'>
                                <img src={assets.person_icon} alt='' className='mr-2' />
                                <input 
                                    onChange={e => setName(e.target.value)} 
                                    value={name} 
                                    type='text' 
                                    placeholder='Company Name' 
                                    required 
                                    className='bg-transparent text-sm outline-none w-full' 
                                />
                            </div>
                        )}
                        <div className='flex items-center border rounded-lg p-2 bg-gray-100'>
                            <img src={assets.email_icon} alt='' className='mr-2' />
                            <input 
                                onChange={e => setEmail(e.target.value)} 
                                value={email} 
                                type='email' 
                                placeholder='Email Address' 
                                required 
                                className='bg-transparent text-sm outline-none w-full' 
                            />
                        </div>
                        <div className='flex items-center border rounded-lg p-2 bg-gray-100'>
                            <img src={assets.lock_icon} alt='' className='mr-2' />
                            <input 
                                onChange={e => setPassword(e.target.value)} 
                                value={password} 
                                type='password' 
                                placeholder='Password' 
                                required 
                                className='bg-transparent text-sm outline-none w-full' 
                            />
                        </div>
                    </>
                )}
                {state === "Login" && <p className='text-sm text-blue-600 hover:text-blue-800 my-2 cursor-pointer'>Forgot password?</p>}
                <button type='submit' className='mt-3 bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition'>
                    {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
                </button>
                {state === 'Login' ? (
                    <p className='mt-3 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p>
                ) : (
                    <p className='mt-3 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span></p>
                )}
            </form>
        </div>
    );
};

export default RecruiterLogin;
