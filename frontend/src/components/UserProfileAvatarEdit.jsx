import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utilis/Axios';
import SummaryApi from '../common/SummaryApp';
import AxiosToastError from '../utilis/AxiosToastError';
import { updatedAvatar } from '../redux store/userSlice';
import { IoMdClose } from "react-icons/io";

const UserProfileAvatarEdit = ({ close }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    
    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]
        
        if(!file){
            return
        }
        const formData = new FormData()
        formData.append('avatar',file)

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data : formData
            })
            const {data : responseData} = response
            dispatch(updatedAvatar(responseData))
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }

    }
  return (
    <>
    <section className='fixed top-0 bottom-0 left-0 right-0
     bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center'>
        <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
           <button onClick={close} className='text-neutral-800 w-fit-block ml-auto'>
             <IoMdClose size={20}/>
           </button>
           <div className='w-20 h-20  flex items-center justify-center
                    rounded-full overflow-hidden drop-shadow-sm'>
                         {
                          user.avatar ? (
                            <img
                              alt={user.name}
                              src={user.avatar}
                              className='w-full h-full'
                            />
                          ):(
                            <FaUserCircle size={60}/>
                          )
                         }
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='uploadProfile'>
                    <div className='border border-primary-light hover:bg-primary px-4
                    cursor-pointer py-1 rounded text-sm my-3'>
                        
                        {
                            loading ? "loading..." : "Upload"
                        }
                    </div>    
                </label>
                <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden'/>
            </form>
            
        </div>
    </section>
    </>
  )
}

export default UserProfileAvatarEdit