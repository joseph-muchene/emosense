import { useNavigate } from '@tanstack/react-router'
import Logo from './assets/emosense.svg'
import { Headline } from './components/headline'
import { Button } from './components/ui/button'
import { useUser } from '@clerk/clerk-react'
export default function HomePage() {

    const navigate = useNavigate({ from: "/" })
    const { user } = useUser();
    function afterSignIn() {

        if (user === null || user === undefined) {
            navigate({ to: "/login" })
        }
        return navigate({ to: "/gen/info" })
    }
    return (
        <div className="flex flex-col space-y-4 mx-auto md:w-[467px]">
            <h1 className='flex justify-center  items-center flex-col md:flex-row text-2xl'>
                Welcome to emosense
                <img className='h-6 w-6 mx-4' src={Logo} />


            </h1>

            <Headline />

            <Button onClick={afterSignIn}>Get started</Button>
        </div>
    )
}