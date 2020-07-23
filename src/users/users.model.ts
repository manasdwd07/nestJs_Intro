import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password:{ type: String, required: true },
  confirmPassword:{type:String,required:true}
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password:string;
  confirmPassword:string;
  phone: number;
}