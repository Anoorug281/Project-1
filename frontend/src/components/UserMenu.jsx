import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider';
import Axios from '../utilis/Axios'
import SummaryApi from '../common/SummaryApp';
import { logout } from '../redux store/userSlice';
import toast from 'react-hot-toast'
import AxiosToastError from '../utilis/AxiosToastError'
import { FaExternalLinkAlt } from "react-icons/fa";

const UserMenu = ({close}) => {
    const user = useSelector((state)=> state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async()=>{
        try {
          const response = await Axios({
            ...SummaryApi.logout
          })

          if(response.data.success){
            if(close){
              close()
            }
            dispatch(logout())
            localStorage.clear()
            toast.success(response.data.message)
            navigate("/")
          }
        } catch (error) {
          AxiosToastError()
        }
    }

    const handleClose = ()=>{
      if(close){
        close()
      }
    }

  return (
    <>
        <div>
            <div className='font-semibold'>My Account</div>
            <div className='text-sm flex items-center gap-2'>
              <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}</span> 
              <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-red-600'>
                  <FaExternalLinkAlt size={15}/>
              </Link>
            </div>

            <Divider/> 

            <div className='text-sm grid gap-2'>
                <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-orange-300'>Category</Link>
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-300'>Sub Category</Link>
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-300'>Upload Product</Link>
                <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-orange-300'>Product</Link>
                <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-300'>My Order</Link>
                <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-orange-300'>Save Address</Link>
                <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-300'>LogOut</button>
            </div>
        </div>    
    </>
  )
}

export default UserMenu