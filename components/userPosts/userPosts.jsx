import PostCard from "../postCard/postCard"
export default function Posts({user}){
  console.log('user','userpos');
  const seller = {
    name: user.name,
    photo: user.photo
  }
    return(
        <div>
           <h1>{`posts of ${user.name}`}</h1>
          {
            user.posts.map((post)=>(<PostCard  key={post._id} post = {post} seller = {seller} />))
          }
        </div>
    )
}