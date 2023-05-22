import connectDB from "@/models/mongoose";
import { getAllPostsModel} from "@/models/post.model"
export default async function handler(req,res){
    const { page  } = req.query;
    console.log(page,'from paginario');
    await connectDB();
    const data =  await getAllPostsModel(page);
     res.status(200).json({data})
}