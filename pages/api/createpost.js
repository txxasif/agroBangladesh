import connectDB from "@/models/mongoose";
import { createPostModel } from "@/models/post.model";
export default  async function handler(req,res){
    if(req.method === 'POST'){
        connectDB();
        const result = await createPostModel(req.body);
        if(result){
            return res.status(201).json({message:'done'});
        }else{
            return res.status(404).json({message:'error'});
        }
        
    }
}