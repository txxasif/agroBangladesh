import LogIn from "@/components/login/login";
import SignUp from "@/components/signUp/signup";

export default function Login(){
    return(
        <div className="flex justify-center items-start h-screen">
           <LogIn />
           <SignUp />

        </div>
    )
}