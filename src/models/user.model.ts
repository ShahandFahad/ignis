import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

// User Interface
export interface IUser extends Document {
    username: string;
    password: string;
    comparePassword(candidate: string): Promise<string>;
};

// User Model Schema
const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
);

// Avoid storing plain password to DB. Salt & Hash it here in document pre-save middleware before saving
userSchema.pre('save', async function(next) {
    // if password is unchanged then immediate return - do not salt password
    if (!this.isModified('password')) return next();

    // get salt
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);

    return next();
});

// Validate user password during login by comparing via  document method
userSchema.methods.comparePassword = async function(candidate: string) {
    return await bcrypt.compare(candidate, this.password);
};
// User Model
export const User = mongoose.model<IUser>('User', userSchema);

