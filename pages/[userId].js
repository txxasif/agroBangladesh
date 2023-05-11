import Profile from "@/components/profile/profile";
import axios from "axios";
export default function ProfileIndex({userData}){
    console.log(userData);
    return(
        <div>
            <Profile />
        </div>
    )
}

export async function getServerSideProps(context){
    const SERVER_URL = process.env.NODE_ENV === "production" ? "https://your-production-server.com" : "http://localhost:3000";

    const { userId } = context.params;
    console.log(userId)
    const url = `${SERVER_URL}/api/post/${userId}`;
    const response = await axios.get(url);
    console.log(response.data,'from server');
    return {
        props: {
           userData: response.data.data
        }
    }
}