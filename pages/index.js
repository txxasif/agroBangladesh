
import PostCard from '@/components/postCard/postCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
export default function Home({userPost}) {
  const fetcher = async (url) => await axios.get(url).then((res) => res.data.data);
  const { data ,error } = useSWR('/api/post',fetcher);
  console.log(data);
  return (
    <h1>
    {
        data.map((user)=>{
        return(
          <PostCard key={user._id} seller={user.sellerData} post={user} />
        )
      })
    }
    </h1>
  )
}
// export async function getServerSideProps(context){
//   const fetcher = async (url) => await axios.get(url).then((res) => res.data.data);
//   const SERVER_URL = process.env.NODE_ENV === "production" ? "https://your-production-server.com" : "http://localhost:3000";
//   const response =  await axios.get(`${SERVER_URL}/api/post`);
  

//   console.log(data,'xbb');
  
//  //                                                                                                                                                                                    console.log(data.data,'home');
//   return({
//     props: {
//       userPost: data
//     }
//   })
// }
