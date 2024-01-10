import { SignIn, } from "@clerk/clerk-react";


export default function Login() {
    return (
        <div className="flex justify-center">
            <SignIn afterSignInUrl={"/gen/info"} />
        </div>
    )
}