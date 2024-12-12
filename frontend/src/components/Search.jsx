import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()

    useEffect(()=> {
            const isSearch = location.pathname === "/search"
            setIsSearchPage(isSearch)
    },[location])

    const redirectToSearchPage = () => {
        navigate("/search")
    }

    console.log("search",isSearchPage)

  return (
    <>
        <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-200 group focus-within:border-primary '>
           <div>
           {
                ( isMobile && isSearchPage ) ? (
                    <button className='flex justify-center items-center h-full p-2 m-1  group-focus-within:text-primary bg-white rounded-full shadow-md'>
                        <FaArrowLeft  size={20}/>
                    </button>
                ) : (
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary'>
                        <FaSearch size={22} />
                    </button>
                )
           }
            </div> 
            <div className='w-full h-full'>
                {
                    !isSearchPage ? (
                        //not in search page
                          <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                            <TypeAnimation
                                sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Search "milk"',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Search "bread"',
                                1000,
                                'Search "sugar"',
                                1000,
                                'Search "tea"',
                                1000,
                                'Search "chips"',
                                1000,
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{ fontSize: '2em', display: 'inline-block' }}
                                repeat={Infinity} />
                                    </div>
                    ) : (
                        //when i was search page
                        <div className='w-full h-full'>
                            <input
                                type='text' placeholder='Search for atta dal and more'
                                className='bg-transparent w-full h-full outline-none '                           
                           />
                        </div>
                    )
                }
            </div>

            
        </div>
    </>
  )
}

export default Search