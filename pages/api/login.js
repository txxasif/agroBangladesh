import connectDB from "@/models/mongoose";
import { checkLogin } from "@/models/user.model";
export default async function handler(req,res){
    await connectDB();
    const response = await checkLogin(req.body);
    if(response.status){
        return res.status(201).json({"msg": true,"user": response})
    }else if(response.status === false){
        return res.status(401).json({"msg": false})
    }else{
        return res.status(500).json({"msg":null});
    }

}