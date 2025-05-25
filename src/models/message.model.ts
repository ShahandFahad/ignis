import mongoose, { Document, Schema } from "mongoose";

// @types
export interface IMessage extends Document {
    user: string;
    message: string;
    response: string;
    createdAt: Date;
};

// @schema
const MessageSchema: Schema = new Schema(
    {
        user: { type: String, required: true },
        message: { type: String, required: true },
        response: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// @model
const Message = mongoose.model<IMessage>('Message', MessageSchema);


export default Message;
