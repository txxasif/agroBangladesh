import { useSelector } from "react-redux"
import Profile from "@/components/profile/profile";
import { currentUserSelector } from "@/store/reducers/user.selector";
export default function ProfileIndex(){
    const user = useSelector(currentUserSelector);
    return(
        <div>
           { user ? <Profile />: <h1>please login</h1>}
        </div>
    )
}