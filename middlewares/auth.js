import ErrorHandler from "../utils/ErrorHandler.js";
import handleAsyncErrors from "./handleAsyncErrors.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authCheck = handleAsyncErrors(async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return next(new ErrorHandler('token not found', 404));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findById(decoded.id);
    if(!user.verified){
        return next(new ErrorHandler('You need to verify your email to post ads', 401))
    }

    req.user = user;
    next();
});

export default authCheck;