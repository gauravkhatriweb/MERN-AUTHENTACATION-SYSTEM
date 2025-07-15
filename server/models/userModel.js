import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAccountVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpiry: { type: Number, default: 0 },
    forgotPasswordOtp: { type: String, default: '' },
    forgotPasswordOtpExpiry: { type: Number, default: 0 },


},)

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
