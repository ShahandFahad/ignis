import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

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

// Avoid stroing plain password to DB. Salt & Hash it here in document pre-save middleware before saving
userShema.pre('save', async function(next) {
    // if password is unchanged then immediate return - do not salt password
    if (!this.isModified('password')) return next();

    // get salt
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    return next();
});

// User Model
export const User = mongoose.model<IUser>('User', userShema);

