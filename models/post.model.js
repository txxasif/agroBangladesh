import Post from "./post.schema";
import User from "./user.schema";
export async function createPostModel(postData){
    const newPost = new Post({...postData});
    const result = await newPost.save();
    const result2 = await User.findByIdAndUpdate(postData.seller,{$push: { posts: result._id }}).exec();
    if(result2 && result){
        return true;
    }else{
        return false;
    }
}
export async function getUserPostsModel(id){
    try{
    const userPosts = await User.findById(id).select("name photo _id").populate({
        path: "posts",
        options: {
            sort: { createdAt: -1}
        }
    });
    console.log(userPosts);
    return {status:true,data: userPosts};
    }catch(err){
        console.log(err);
      return {status: false};
    }
}