import mongoose, { Schema, Document } from 'mongoose';
import IUser from '../../../interfaces/IUser';

const userSchema: Schema = new Schema({
  name: { type: String, required: true, maxlength: 35 },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model<IUser & Document>('User', userSchema);

export default User;
