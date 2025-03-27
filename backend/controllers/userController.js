import Job from "../models/Job.js"
import JobApplication from "../models/jobApplications.js"
import User from "../models/User.js"
import {v2 as cloudinary} from 'cloudinary'


// get user data
export const getUserData = async (req, res) => { 

    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ success: false, message: "User ID is missing" });
    }

    const userId = req.auth.userId;

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// Apply for a job
export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.auth?.userId; 

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID is missing",
            });
        }

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required",
            });
        }

        // Check if user already applied for this job
        const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });

        if (isAlreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        //  Check if job exists
        const jobData = await Job.findById(jobId);
        if (!jobData) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Save new job application
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: new Date(),
        });

        return res.status(200).json({
            success: true,
            message: "Applied for the job successfully",
        });

    } catch (error) {
        console.error("Error in applyForJob:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// Get user applied application
export const getUserJobApplications=async(req,res)=>{
    try {

        const userId=req.auth.userId

        const applications=await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()

        if(!applications){
            return res.status(404).json({
                success:false,
                message:"No job applications found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User job applications found",
            applications
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }


}

// update user profile (resume)
export const updateUserResume=async(req,res)=>{

    try {
        
        const userId=req.auth.userId

        const resumeFile=req.file

        const userData=await User.findById(userId)

        if(resumeFile){
            const resumeUpload=await cloudinary.uploader.upload(resumeFile.path)
            userData.resume=resumeUpload.secure_url

        }

        await userData.save()

        return res.status(200).json({
            success:true,
            message:'Resume Updated'
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}