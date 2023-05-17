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
    const userPosts = await User.findById(id).select("name photo email _id").populate({
        path: "posts",
        options: {
            sort: { createdAt: -1}
        }
    });
   // console.log(userPosts,'xxx');
    return {status:true,data: userPosts};
    }catch(err){
        console.log(err);
      return {status: false};
    }
}
export async function deletePost(userId, postId){
    try{
        const user = await User.updateOne(
            {_id: userId},
            {
                $pull: {
                    posts: {
                        _id: postId
                    }
                }
            }
        )
        log(user);
    }catch(err){
        console.log("sorry");
    }
}
export async function getPostsModel1(){
    const result = await User.find().select('name photo -_id').populate({
        path: 'posts',
        select: '-orders -updatedAt',
        options: {
            sort: { createdAt: -1 }
        }
    })
   return result;
}
export async function getPostsModel(){
    const result = await Post.find().select('-updatedAt -orders');
    const postPopulate =  await Promise.all(result.map(async(post)=>{
        let data = await User.findById(post.seller).select('name photo -_id');
        console.log(data,'frpm');
        return { ...post.toObject(),sellerData: data}

    }))
   return postPopulate;
}
    