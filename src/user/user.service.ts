import { UserModel } from "./user.model";
import bcrypt from "bcryptjs"

class UserService{
    async insert(userDetails:IUser){
try {
    const user = await UserModel.findOne({email: userDetails.email});
    if (user){
        return 'user already exits'
        
    }
    else {
        const avatar = 'vbghgtf78gtu';
        Object.assign(userDetails,{avatar})
        const newUser = new UserModel(userDetails)
        bcrypt.genSalt(10,(err,salt)=>{
            if(err) throw err;
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password=hash;
                newUser.save()
            })
        })

    }
} catch (error) {
    
}
    }
}

export interface IUser{
    name: string;
    email: string;
    password:string;
    avatar: string;
}