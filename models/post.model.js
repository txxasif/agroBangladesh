import Post from "./post.schema";
import User from "./user.schema";
import mongoose from 'mongoose';
const Default_Page_Limit = 5;
const pagiNation = (page) => {
    const pageNumber = page || 1;
    const skip =(pageNumber-1)*Default_Page_Limit; 
    return {skip,
            limit: De};
}
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
export async function getAllPostsModelx(page){

    const result = await User.find().select('name photo -_id').populate({
        path: 'posts',
        select: '-orders -updatedAt',
        options: {
            sort: { createdAt: -1 }
        }
    })
   return result;
}

export async function getAllPostsModel(page) {
  const itemsPerPage = 2; // Set the desired number of items per page

  // Calculate the total number of posts
  const totalItems = await Post.countDocuments();

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the pagination values for the given page
  const limit = itemsPerPage;
  const skip = (page - 1) * itemsPerPage;

  // Fetch the posts for the given page
  const result = await Post.find()
    .select('-updatedAt -orders')
    .limit(limit)
    .skip(skip);

  // Get the list of seller IDs from the fetched posts
  const sellerIds = result.map((post) => post.seller);

  // Fetch the seller data for each post using the IDs
  const sellerData = await User.find({ _id: { $in: sellerIds } })
    .select('name photo _id')
    .lean();
 console.log(sellerData,'sd');  // Create a map of seller data using the seller IDs
  const sellerDataMap = sellerData.reduce((map, seller) => {
    map[seller._id] = seller;
    return map;
  }, {});
 console.log(sellerDataMap);
  // Populate the seller data for each post
  const postPopulate = result.map((post) => {
    const sellerId = post.seller.toString();
    const seller = sellerDataMap[sellerId];
    console.log(seller);
    console.log(seller, 'from');
    return { ...post.toObject(), sellerData: seller };
  });

  return { postPopulate, totalPages };
}

export async function getPostsModel(page){
    const pageTrack = pagiNation(page);
    const result = await Post.find().select('-updatedAt -orders').limit(pageTrack.limit).skip(pageTrack.skip);
    const postPopulate =  await Promise.all(result.map(async(post)=>{
        let data = await User.findById(post.seller).select('name photo');
        console.log(data,'frpm');
        return { ...post.toObject(),sellerData: data}

    }))
   return postPopulate;
}
    