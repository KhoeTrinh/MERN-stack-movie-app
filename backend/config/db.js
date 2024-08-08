import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB successfully 👍');   
    } catch (error) {
        console.log('Failed to connect 😰');
        process.exit(1);
    }
};

export default connectDB