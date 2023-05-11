import { currentUserSelector ,currentUserDataSelector} from "@/store/reducers/user.selector"
import { useSelector } from "react-redux"
import AboutSection from "../aboutSection/aboutSection";
import CreatePost from "../createPost/createPost";
export default function Profile(){
    const user = useSelector(currentUserSelector);
    const userData = useSelector(currentUserDataSelector);
    return(
        <div>
          <AboutSection user = {userData} />
          <CreatePost />
          

        </div>
    )
}