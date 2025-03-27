import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const {user}=useUser()
  const {getToken}=useAuth()

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [userData,setUserData]=useState(null)
  const [userApplications,setUserApplications]=useState([])

  // ✅ Retrieve `companyToken` from localStorage on mount
  const [companyToken, setCompanyToken] = useState(() => {
    return localStorage.getItem("companyToken") || null;
  });

  const [companyData, setCompanyData] = useState(() => {
    return JSON.parse(localStorage.getItem("companyData")) || null;
  });
  

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
     
      const {data}=await axios.get(backendUrl+'/api/jobs')
      
      if(data.success){
        setJobs(data.jobs)
        
      }else{
        toast.error('Error in job fetching');
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/company", {
        headers: { token: companyToken },
      });

      if (data.success) {
        
        setCompanyData(data.company);
        localStorage.setItem("companyData", JSON.stringify(data.company)); // ✅ Store company data in localStorage
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Funtions to fetch user Data
  const fetchUserData = async () => {
      try {
          const token = await getToken();
  
          if (!token) {
              toast.error("Token is missing! Authentication failed.");
              return;
          }
  
          const { data } = await axios.get(backendUrl + "/api/users/user", {
              headers: { Authorization: `Bearer ${token}` },
          });
  
          if (data.success) {
              setUserData(data.user);
          } else {
              toast.error("Error in user data fetching");
          }
      } catch (error) {
          toast.error('User not found');
      }
  };
  
  // Function to fetch user applied applications data
  const fetchUserApplications=async()=>{
    try {
      const token=await getToken()
      if(!token){
        toast.error("Token is missing! Authentication failed.");
        return;
      }

      const {data}=await axios.get(backendUrl+'/api/users/applications',
        {headers:{Authorization:`Bearer ${token}`}}
      )
      if(data.success){
        setUserApplications(data.applications)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  // Fetch jobs and retrieve token from localStorage when the app loads
  useEffect(() => {
    fetchJobs();
    const storedCompanyToken=localStorage.getItem('companyToken')

    if(storedCompanyToken){
      setCompanyToken(storedCompanyToken)
    }
  }, []);

  //  Fetch company data if `companyToken` exists
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  //  Update `localStorage` when `companyToken` changes
  useEffect(() => {
    if (companyToken) {
      localStorage.setItem("companyToken", companyToken);
    } else {
      localStorage.removeItem("companyToken");
      localStorage.removeItem("companyData");
    }
  }, [companyToken]);

  useEffect(()=>{
    if(user){
      fetchUserData()
      fetchUserApplications()
    }
  },[user])

  const value = {
    searchFilter,setSearchFilter,
    isSearched,setIsSearched,
    jobs,setJobs,
    showRecruiterLogin,setShowRecruiterLogin,
    companyToken,setCompanyToken,
    companyData,setCompanyData,
    backendUrl,
    userData,setUserData,
    userApplications,setUserApplications,
    fetchUserData,
    fetchUserApplications,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
