import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuCircleUser } from "react-icons/lu";
import useMobile from '../hooks/useMobile';
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()

    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()

   const redirectToLoginPage = ()=>{
            navigate("/login")
   }
  return (
    <>
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex  flex-col justify-center gap-1 bg-white'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='container mx-auto flex items-center  px-2 justify-between'>
                 {/**logo */}
                <div className='h-full'>
                     <Link to={"/"} className='h-full flex justify-center items-center'>
                        <img src={logo} width={170} height={60} alt='logo' className='hidden lg:block'/>
                        <img src={logo} width={120} height={60} alt='logo' className='lg:hidden '/>
                    </Link>
                 </div>
            {/**search */}
                <div className='hidden lg:block'>
                    <Search/>
                </div>

            {/**Login and my cart */}
                <div className=''>
                    {/**user icons display in only mobile version */}
                     <button className='text-neutral-600 lg:hidden'>
                        <LuCircleUser size={26} />
                     </button>

                     {/**desktop*/}
                     <div className='hidden lg:flex items-center gap-10'>
                        <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                        <button className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white'>
                            {/**add to cart icons */}
                            <div className='animate-bounce'>
                                 <FaShoppingCart size={25}/>
                            </div>
                            <div className='font-semibold'>
                                <p>My Cart</p>
                            </div>
                        </button>
                     </div>
                </div>
                    </div>
                )
            }
            
            <div className='container mx-auto px-2 lg:hidden'>
                <Search/>
            </div>
        </header>
    </>
  )
}

export default Header