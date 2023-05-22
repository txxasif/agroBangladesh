
import Pagination from '@/components/pagiNation/pagiNation';
import PostCard from '@/components/postCard/postCard';
import axios from 'axios';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
export default function Home() {
  const [page,setPage] = useState(1);
  const fetcher = async (url) => await axios.get(url).then((res) => res.data.data);
  const { data ,error } = useSWR(`/api/post?page=${page}`,fetcher);
  if(!data){
    return( <h1>loading</h1>)
  }
  console.log(data);
  const handleClick = (n) => {
    setPage(n);
  }
  return (
    <div className={styles.postContainer}>
      <div className={styles.post}>
      {
        data.postPopulate.map((user)=>{
        return(
          <PostCard key={user._id} seller={user.sellerData} post={user} />
        )
      })
    }
      </div>
    <Pagination totalPages={data.totalPages} handleClick={handleClick} currentPage={page} />
    </div>
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
