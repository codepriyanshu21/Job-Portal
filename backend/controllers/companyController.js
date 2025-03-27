import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/jobApplications.js";

// Register a new company
export const registerCompany=async(req,res)=>{
    const {name,email,password}=req.body

    const imageFile=req.file;

    if(!name || !email || !password || !imageFile){
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    try {
        const companyExist=await Company.findOne({email})
        if(companyExist){
            return res.status(400).json({
                success: false,
                message: "Company already exists with this email"
            });
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const imageUpload=await cloudinary.uploader.upload(imageFile.path)

        const company=await Company.create({
            name,
            email,
            password:hashedPassword,
            image:imageUpload.secure_url
        })

        res.status(200).json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// company login
export const loginComapny=async(req,res)=>{
    const {email,password}=req.body;

    try {
        const company=await Company.findOne({email})
        if(await bcrypt.compare(password,company.password)){
            res.status(200).json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            });
        }else{
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// get company data
export const getCompanyData=async(req,res)=>{
    try {
        
        const company=req.company
        res.status(200).json({
            success:true,
            company
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Posted a new job
export const postJob=async(req,res)=>{
    const {title,description,location,salary,level,category}=req.body

    const companyId=req.company._id

    try {
        const newJob=new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date:Date.now(),
            level,
            category
        })

        await newJob.save()
        res.status(201).json({
            success: true,
            newJob
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Get company job applicants
export const getCompanyJobApplicants=async(req,res)=>{
    try {
        
        const companyId=req.company._id;

        //Find job applications for the user and populate related data
        const applications=await JobApplication.find({companyId})
        .populate('userId','name image resume')
        .populate('jobId','title location category level salary')
        .exec()

        return res.status(200).json({
            success:true,
            applications
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// Get company posted jobs
export const getCompanyPostedJobs=async(req,res)=>{
    try {
        
        const companyId=req.company._id
        const jobs=await Job.find({companyId})

        // Adding no. of applicants info in data
        const jobsData=await Promise.all(jobs.map(async(job)=>{
            const applicants=await JobApplication.find({jobId:job._id});
            return {...job.toObject(),applicants:applicants.length}
        }))

        res.status(200).json({
            success: true,
            jobsData
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Change job application status
export const changeJobApplicationStatus=async(req,res)=>{
    try {
        
        const {id, status}=req.body

        // Find job application and update status
        await JobApplication.findOneAndUpdate({_id:id},{status})

        res.status(200).json({
            success:true,
            message:"Job application status updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// change job visiblity
export const changeVisiblity=async(req,res)=>{
    try {
        
        const {id}=req.body
        const companyId=req.company._id
        const job=await Job.findById(id)

        if(companyId.toString() === job.companyId.toString()){
            job.visible = !job.visible
        }

        await job.save()

        res.status(200).json({
            success: true,
            message: 'Job visiblity changed successfully',
            job
        })

    } catch (error) {
       return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}