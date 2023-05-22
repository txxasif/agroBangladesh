import Profile from "@/components/profile/profile";
import { setPostChecker } from "@/store/reducers/post.reducer";
import { isPostCreatedSelector } from "@/store/reducers/post.selector";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from 'swr';
export default function ProfileIndex(){

    const fetcher = async(url)=>await axios.get(url).then((res)=>res.data.data)
    const check = useSelector(isPostCreatedSelector);
    const router = useRouter();
    const { userId } = router.query;
    const { data,error } = useSWR(`/api/post/${userId}`,fetcher);
    console.log(data,'cc');
    const dispatch = useDispatch();
    useEffect(()=>{
      if(check){
        router.replace(router.asPath);
        dispatch(setPostChecker());
      }
    },[check])
    if(!data){
        return (<h1>loading</h1>)
    }
    return(
        <div>
            <Profile user = {data} />
        </div>
    )
}

// export async function getServerSideProps(context){
//     const SERVER_URL = process.env.NODE_ENV === "production" ? "https://your-production-server.com" : "http://localhost:3000";

//     const { userId } = context.params;
//     console.log(userId)
//     const url = `${SERVER_URL}/api/post/${userId}`;
//     const response = await axios.get(url);
//     console.log(response.data.data,'from server');
//     return {
//         props: {
//            userData: response.data.data
//         }
//     }
// }