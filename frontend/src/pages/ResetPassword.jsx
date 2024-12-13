import React, { useEffect, useState } from 'react'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SummaryApi from '../common/SummaryApp'
import AxiosToastError from '../utilis/AxiosToastError'
import toast from 'react-hot-toast'
import Axios from '../utilis/Axios'

const ResetPassword = () => {
    const location = useLocation()
    const navigate = useNavigate
    const [data,setData] = useState({
      email : "",
      newPassword : "",
      confirmPassword : ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

    const validValue = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email); 

    useEffect (()=>{
        if(!(location.state.data.success)){
              navigate("/")
        }

        if(location?.state?.email){
          setData((prev)=>{
            return{
              ...prev,
              email : location?.state?.email
            }
          })
        }
    },[])

     

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData(prevData => ({ ...prevData, [name]: value }));
  }

    const handleSubmit = async (e) => {
      e.preventDefault()

      //optional
      if(data.newPassword!== data.confirmPassword){
        toast.error("New password and Confirm password must be same")
      }

      try {
          const response = await Axios({
              ...SummaryApi.resetPassword,
              data: { email: data.email } 
          });

          if (response.data.error) {
              toast.error(response.data.message);
          }

          if (response.data.success) {
              toast.success(response.data.message);
              navigate("/login")
              setData({
                email : "",
                newPassword : "",
                confirmPassword : ""
              })
          }
      } catch (error) {
          AxiosToastError(error)
      } 
  };

    

    console.log("data reset password",data)
  return (
    <>
     <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='p-4 text-center text-xl font-bold border-2 border-white rounded-lg'>Enter Your Password</p>
                <form className='grid gap-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                                    <label htmlFor='newPassword'>New Password</label>
                                       <div className='bg-blue-50 p-2 border rounded flex items-center relative focus-within:border-blue-500'>
                                         <input type={showPassword ? "text" : "password"} 
                                           id='password'
                                           name='newPassword'
                                           placeholder='Enter your new password'
                                           onChange={handleChange} 
                                           className='w-full outline-none' 
                                          value={data.newPasswordassword}
                                          required
                                          autoComplete='password'
                                          />
                                            
                                            <div onClick={()=> setShowPassword(prev => !prev)}
                                             className='cursor-pointer absolute right-3 top-3'>
                                             {
                                                showPassword ? <FaEye/> : <FaRegEyeSlash/>
                                             }  
                                            </div>
                                        </div>
                                        
                                        </div>

                                        <div className='grid gap-1'>
                                    <label htmlFor='confirmPassword'>Confirm Password</label>
                                       <div className='bg-blue-50 p-2 border rounded flex items-center relative focus-within:border-blue-500'>
                                         <input type={showPassword ? "text" : "password"} 
                                           id='password'
                                           name='confirmPassword'
                                           placeholder='Enter your confirm password'
                                           onChange={handleChange} 
                                           className='w-full outline-none' 
                                          value={data.confirmPassword}
                                          required
                                          autoComplete='password'
                                          />
                                            
                                            <div onClick={()=> setShowConfirmPassword(prev => !prev)}
                                             className='cursor-pointer absolute right-3 top-3'>
                                             {
                                                showConfirmPassword ? <FaEye/> : <FaRegEyeSlash/>
                                             }  
                                            </div>
                                        </div>
                                        
                                        </div>
                    <button 
                        type="submit" 
                        disabled={!validValue} 
                        className={`${
                            validValue ?
                            "bg-green-800 hover:bg-green-600" : 
                            "bg-gray-400 cursor-not-allowed"
                        } text-white py-2 rounded font-semibold my-3 tracking-wide`}
                    >
                        Change Password
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login" className='font-semibold text-green-700'>Login</Link>
                </p>
            </div>                     
        </section>
    </>
  )
}

export default ResetPassword