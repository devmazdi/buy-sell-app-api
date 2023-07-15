import mongoose from "mongoose";

const dbCon = async() => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1/buy-sell-app';
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(mongoUrl);
        console.log('mongoDB connected');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

export default dbCon;