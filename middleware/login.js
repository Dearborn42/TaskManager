import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from '../Schema/users.js';
import admin from '../Schema/admin.js';
import bcrypt from 'bcrypt';
dotenv.config();
mongoose.connect(process.env.MONGO)

export async function hashPassword(password){
  return await bcrypt.hash(password, 10);
}


export async function login(req, res) {
  const {email, password} = req.body;
  try {
    const admin_account = await admin.findOne({ email: email, password: password });
    const user_account = await user.findOne({email: email, password: password});
    if (user_account || admin_account){
      const key = await hashPassword(email+password)
      if(key){
        req.session.secret = req.body.password;
        if(user_account)
          res.redirect(301, `/users?token=${encodeURIComponent(key)}`)
        else if(admin_account)
          res.redirect(301, `/admin?token=${encodeURIComponent(key)}`)
      }
    }
  } catch (err) {
    res.status(501).sendFile("error page")
  }
}