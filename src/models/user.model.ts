import mongoose, { Document, Schema } from "mongoose";

// User Interface
export interface IUser extends Document {
    username: string;
    password: string;
    comparePassword(candidate: string): Promise<string>;
};

// User Model Schema
const userShema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
);


// User Model
export const User = mongoose.model<IUser>('User', userShema);

