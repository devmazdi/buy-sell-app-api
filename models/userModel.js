import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";


const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'Please provide first name']
    },
    last_name: {
        type: String,
        required: [true, 'Please provide first name']
    },
    email: {
        type: String,
        required: [true, 'Please provide first name'],
        unique: true
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'seller'],
            message: 'Please select role' 
        },
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength:[8, 'password must be 8 characters'],
        select: false 
    },
    token: String,
    tokenExpired: Date,
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function(inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
}

// generate verify/reset token
userSchema.methods.generateVerifyToken = function(){
    const gToken = crypto.randomBytes(20).toString('hex');
    //hash token
    const hashToken = crypto.createHash('sha256').update(gToken).digest('hex');
    this.token = hashToken;
    this.tokenExpired = Date.now() + 30 * 60 * 1000;

    return gToken;
}

// Return Json web Token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    }); 
}

const User = model('User', userSchema);
export default User;