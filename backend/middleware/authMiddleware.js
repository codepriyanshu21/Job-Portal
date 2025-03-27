import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'

export const protectCompany=async(req,res,next)=>{
    const token=req.headers.token
    if(!token){
        return res.status(401).json({
            status:'false',
            message:"Not authorized, Login again"
        })
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.company=await Company.findById(decoded.id).select('-password')

        next()
    } catch (error) {
        return res.status(500).json({
            status:'false',
            message:error.message
        })
    }
}