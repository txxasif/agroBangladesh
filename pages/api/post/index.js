import connectDB from "@/models/mongoose";
import { getPostsModel } from "@/models/post.model"
import { connect } from "mongoose";

export default async function handler(req,res){
    await connectDB();
    const data =  await getPostsModel();
     res.status(200).json({data})
}