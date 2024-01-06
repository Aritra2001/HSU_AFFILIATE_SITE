import React from 'react'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross1 } from "react-icons/rx";
import Logo from '../assets/hsulogo.svg'
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [toggle, setToggle] = useState(false);
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigator = useNavigate()

  const handelLogin = () => {

    if(!user) {
      navigator('/login')
    }
    else {
      logout()
    }

  }

  return (
    <div className='w-full relative bg-zinc-900'>
        <nav className="grid items-center justify-between h-20 grid-cols-2 text-white md:grid-cols-6 font-['Gilroy']">
        <a href="/"><img className='w-20 col-span-2 ml-4 lg:w-[120px] lg:ml-14' src={Logo} alt="hexstar universe"/></a>
        <ul className='flex-row items-center hidden col-span-3 capitalize space-x-7 md:flex'>
            <a href='https://hexstaruniverse.com/all-classes/'><li>all program</li></a>
            <a href="https://hexstaruniverse.com/for-institutions/"><li>For institutions</li></a>
            {user ? <a href='/dashboard'><li>home</li></a> : <></>}
            <a href="https://hexstaruniverse.com/about-us/"><li>about</li></a>
        </ul>
        <div className="flex items-center col-span-1 justify-evenly md:justify-center md:gap-5 md:col-span-2">
            <button className='hidden md:inline' onClick={handelLogin}>{user ? <>Logout</> : <>Login</>}</button>
            <a href="https://hexstaruniverse.com/mentor-registration/"><button className='px-3 capitalize text-xs bg-[#6637ED] h-8 rounded-md md:text-base '>become an instructor</button></a>
            {/* <Button title="become an instructor"/> */}
            <button className='text-3xl md:hidden' onClick={() => setToggle(!toggle)}>{toggle ? <RxCross1 /> : <GiHamburgerMenu/>}</button>

            <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-5 bg-zinc-700 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl text-white`}
          >
            <ul>
            <a href='https://hexstaruniverse.com/all-classes/'><li>All program</li></a>
            <a href="https://hexstaruniverse.com/for-institutions/"><li>For institutions</li></a>
            {user ? <a href='/dashboard'><li>Home</li></a> : <></>}
            <a href="https://hexstaruniverse.com/about-us/"><li>About</li></a>
            </ul>
          </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar