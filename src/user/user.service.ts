import { UserModel } from "./user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {keys} from '../config/keys'
import passport from 'passport';

class UserService {
  async insert(userDetails: IUser) {
    try {
      const user = await UserModel.findOne({ email: userDetails.email });
      if (user) {
        return "user already exits";
      } else {
        const avatar = "vbghgtf78gtu";
        Object.assign(userDetails, { avatar });
        const newUser = new UserModel(userDetails);
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save();
          });
        });
        return newUser;
      }
    } catch (error) {
      throw error;
    }
  }
  async userauth (userDetails: {email:string; password:string}){
    try {
     const user = await UserModel.findOne({email:userDetails.email}).lean()
     if(!user) throw "user not found"
     const isMatched = await bcrypt.compare(userDetails.password, user.password)
    if(!isMatched) throw 'incorrect password'
    const payload = {id:user._id,name:user.name,email:user.email,avatar:user.avatar,memberSince:user.createdAt}
    // let _token;
    const _token = jwt.sign(payload,keys.secret,{expiresIn:3600})
    return {token:`Bearer ${_token}`,id: user._id}
    } catch (error) {
      throw error;
    }
  }

  getCurrentUserDetails(user: IUser){
    try {
      passport.authenticate('jwt',{session: false})
    } catch (error) {
      throw error
    }
  }
}

export default UserService;

export interface IUser {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  avatar: string;
}

