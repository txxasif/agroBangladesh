import { currentUserSelector ,currentUserDataSelector} from "@/store/reducers/user.selector"
import { useSelector } from "react-redux"
import AboutSection from "../aboutSection/aboutSection";
import CreatePost from "../createPost/createPost";
import Posts from "../userPosts/userPosts";
export default function Profile({user}){
    const userData = useSelector(currentUserDataSelector);
    return(
        <div>
          <AboutSection user = {userData} />
          <CreatePost />
          <Posts user={user}/>

        </div>
    )
}