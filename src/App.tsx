
import './App.css'
import {
  Outlet,


} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { Button } from "@/components/ui/button"
import {
  Sheet,

  SheetContent,


  SheetFooter,

  SheetTrigger,
} from "@/components/ui/sheet"


import { SignInButton, UserButton } from "@clerk/clerk-react";

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from './components/mode-toggle'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

function App() {
  const [side, setSide] = useState("left")
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <Sheet >
          <div className='absolute left-2 bottom-2'>
            <UserButton afterSignOutUrl='/' />
          </div>
          <SheetTrigger asChild >
            <Button className="absolute left-2" variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </Button>
          </SheetTrigger>

          <SheetContent side={side}>
            <ul className='flex flex-col space-y-4 mt-4'>
              <li className='hover:bg-gray-800 p-4 rounded hover:text-white'>
                <Link to="/">Home</Link>

              </li>
              <li className='hover:bg-gray-800 p-4 rounded hover:text-white'>
                <Link to="/about">About</Link>
              </li>
              <li className='hover:bg-gray-800 p-4 rounded hover:text-white'>
                <Link to="/gen/info">Generate</Link>
              </li>

            </ul>
          </SheetContent>

          <SheetFooter className='flex flex-row justify-between items-center'>


            <div>
              <div className='hidden md:block'>
                <SignInButton afterSignInUrl='/home' mode="modal" />
              </div>
            </div>

            <ModeToggle />
          </SheetFooter>
        </Sheet>

        <Outlet />
        <TanStackRouterDevtools />

      </ThemeProvider>

    </>
  )
}



export default App
