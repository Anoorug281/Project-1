import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
    <>
        <footer className='border-t'>
            <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
                <p>© All Right Reserved 2024</p>
                <div className='flex items-center gap-4 justify-center'> 
                    <a href='' className='hover:text-primary-light'><FaFacebook /></a>
                    <a href='' className='hover:text-primary-light'><FaInstagram /></a>
                    <a href='' className='hover:text-primary-light' ><FaTwitter /></a>               
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer