import connectDB from "@/models/mongoose"
import {createUser} from "@/models/user.model"
export default async function handler(req,res){
    await connectDB();
    console.log(req.body,'from ser');
    let status = await createUser(req.body);
    if(status.status){
      return res.status(201).json({"msg": true,"user": status.data});
    }else if(status.status === false ){
      return res.status(409).json({"msg": false});
    }else{
      return res.status(500).json({"msg": null});
    }
  
}