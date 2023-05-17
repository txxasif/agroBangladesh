import { getPostsModel } from "@/models/post.model"

export default async function handler(req,res){
    const data =  await getPostsModel();
   // console.log(data,'from xxxxxxxxx');
    res.status(200).json({data})
}