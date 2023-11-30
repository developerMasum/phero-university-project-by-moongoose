import { TUser } from './user.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: [true, 'ID is required'], unique: true },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    needPasswordChange: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: [true, 'Role is required'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
      required: [true, 'Status is required'],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// pre save middleware/ hook : will work on create()  save()
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save  data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});





export const User = model<TUser>('User', userSchema);
