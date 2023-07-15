import User from "../models/userModel.js"
import handleAsyncErrors from "../middlewares/handleAsyncErrors.js";
import ErrorHandler from "../utils/ErrorHandler.js"
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

/**
 * @path /api/user/register
 * @description register user send verification email
 * @method POST
 */


const registerUser = handleAsyncErrors(async(req, res, next) =>{ 
    const {first_name, last_name, email, password } = req.body;
    if(!first_name || !last_name || !email || !password){
        return next( new ErrorHandler('all fields are required', 401));
    }
    
    const userExist = await User.findOne({email});
    if(userExist){
        return next( new ErrorHandler('Email already exist', 401)); 
    }
    
    const newUser = await User.create({first_name, last_name, email, password });

    // send email
    try {
        const getVerifyToken = newUser.generateToken();
        const options = {
            email: newUser.email,
            subject: `Please verify email`,
            message: `please verify email <a href="http://localhost:5500/api/v1/user/verify/${getVerifyToken}"> Click here to Verify</a>`
        }
        await sendEmail(options);
        newUser.save({validateBeforeSave: false});  
        res.status(200).send({
            success: true,
            message: 'Email send pleas verify your email',
            token: getVerifyToken
        });        
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: 'Email send failed',
            error: error 
        });        
    }  
});
/**
 * @path /api/user/register
 * @description verify email with verify token
 * @method GET
 */
const verifyEmail = handleAsyncErrors(async(req, res, next) => {
    console.log(req.params);
    if(!req.params.token){
        return next( new ErrorHandler('token not found', 404)); 
    }

    const dbToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        token: dbToken,
        tokenExpired: {$gt: Date.now() }
    });

    if(!user){
        return next( new ErrorHandler('token not found', 400));
    }
    user.verified = true;
    await user.save();
    res.status(200).send({
        success: true,
        message: 'Email verified successfully'
    });     
});


export {
    registerUser,
    verifyEmail, 
}