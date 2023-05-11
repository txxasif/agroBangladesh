import PostCard from "../postCard/postCard"
export default function Posts({ posts}){
    return(
        <div>
          {
            posts.map((post)=>(<PostCard postData = {post} />))
          }
        </div>
    )
}