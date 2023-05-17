
import PostCard from '@/components/postCard/postCard';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Home({userPost}) {
  const [msg,setMsg] = useState('');
  console.log(userPost);
  const a =  async() => {
      let response = await fetch('/api/mongodb');
      let data = await response.json();
      console.log(data);
      setMsg(data);
  }
  useEffect(()=>{
    try{
       a();
    }catch(er){
      console.log(er);
    }
  },[])
  return (
    <h1>
    {
      userPost.map((user)=>{
        return(
          <PostCard key={user._id} seller={user.sellerData} post={user} />
        )
      })
    }
    </h1>
  )
}
export async function getServerSideProps(context){
  const SERVER_URL = process.env.NODE_ENV === "production" ? "https://your-production-server.com" : "http://localhost:3000";
  const response =  await axios.get(`${SERVER_URL}/api/post`);
  const data = response.data.data;
  console.log(data,'xbb');
  
 //                                                                                                                                                                                    console.log(data.data,'home');
  return({
    props: {
      userPost: data
    }
  })
}
