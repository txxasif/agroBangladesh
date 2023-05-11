import connectDB from "@/models/mongoose";
import { getUserPostsModel } from "@/models/post.model";
export default async function handler(req,res){
    await connectDB();
    const response = await getUserPostsModel(req.query.id) 
    console.log(req.query.id);
    if(response.status){
    return res.status(200).json({message: "done",data: response.data});
    }else{
        return res.status(400).json({message:"error"})
    }
}