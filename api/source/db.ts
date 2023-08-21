import mongoose from 'mongoose';

const connectToDatabase = async () => {
    const mongoUri = "mongodb+srv://admin1:passwordpassword@blossomcluster0.oxcefg6.mongodb.net/?retryWrites=true&w=majority";
    try {
        const connection = mongoose.connect(mongoUri);
        if (connection) {
            console.log("connection established");
        }
    } catch (error) {
        console.log("error in connecting database", error);
        throw error;
    }
};

export default connectToDatabase;
