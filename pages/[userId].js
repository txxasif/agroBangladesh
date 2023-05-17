import Profile from "@/components/profile/profile";
import { setPostChecker } from "@/store/reducers/post.reducer";
import { isPostCreatedSelector } from "@/store/reducers/post.selector";
import axios from "axios";
import useSWR from 'swr'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ProfileIndex({userData}){
    const check = useSelector(isPostCreatedSelector);
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
      if(check){
        router.replace(router.asPath);
        dispatch(setPostChecker());
      }
    },[check])
    return(
        <div>
            <Profile user = {userData} />
        </div>
    )
}

export async function getServerSideProps(context){
    const SERVER_URL = process.env.NODE_ENV === "production" ? "https://your-production-server.com" : "http://localhost:3000";
    const fetcher = async (url) => await axios.get(url).then((res) => res.data.data);
    const { userId } = context.params;
    console.log(userId)
    const url = `/api/post/${userId}`;
    const response = await axios.get(url);
    const { data,error} = useSWR(url,fetcher)
  //  console.log(response.data.data,'from server');
    return {
        props: {
           userData: data
        }
    }
}