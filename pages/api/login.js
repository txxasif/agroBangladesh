import connectDB from "@/models/mongoose";
import { checkLogin } from "@/models/user.model";
export default async function handler(req,res){
    await connectDB();
    console.log('login hitt');
    console.log(req.body);
    const response = await checkLogin(req.body);
    if(response.status){
        console.log();
        return res.status(201).json({"msg": true,"user": response.data})
    }else if(response.status === false){
        return res.status(401).json({"msg": false})
    }else{
        return res.status(500).json({"msg":null});
    }

}