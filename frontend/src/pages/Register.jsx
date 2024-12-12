import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utilis/Axios';
import SummaryApi from '../common/SummaryApp';
import AxiosToastError from '../utilis/AxiosToastError';
import {Link,useNavigate} from 'react-router-dom';
const Register = () => {

    const [data,setData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange =(e)=>{
        const {name, value } = e.target

        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }
 
    const validValue =  data.name && data.email && data.password && data.confirmPassword;

    const handleSubmit =async(e) =>{
        e.preventDefault()
        if(data.password !== data.confirmPassword){
            toast.error(
                "Password and Confirm Password must be same"
            )
            return;
        }
        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data// You may also need to pass the form data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : "",
                    email : "",
                    password : "",
                    confirmPassword : ""
                })
                navigate("/login")
            }
        } catch (error) {
            AxiosToastError(error)
        }
           
    }
  return (
    <>
        <section className=' w-full container mx-auto px-2' >
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='bg-black text-white p-4 text-center text-xl font-bold border-2 border-white rounded-lg'>Welcome to BinkeyIt</p>

                <form className='grid gap-2 mt-6 ' onSubmit={handleSubmit}  >
                    <div className='grid'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' autoFocus placeholder='Enter your Full name' name='name' onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-blue-500' value={data.name}/>
                    </div>
                    <div className='grid'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter your email' name='email' onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-blue-500' value={data.email}/>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='password'>Password</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center relative focus-within:border-blue-500'>
                                <input type={showPassword ? "text" : "password"} 
                                id='password'
                                name='password'
                                placeholder='Enter your password'
                                onChange={handleChange} 
                                className='w-full outline-none' 
                                value={data.password}/>
                        
                        <div onClick={()=> setShowPassword(prev => !prev)} className='cursor-pointer absolute right-3 top-3'>
                         {
                            showPassword ? (<FaEye/>) : (<FaRegEyeSlash/>)
                         }  
                        </div>
                    </div>
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='confirmPassword'>Confirm Your Password</label>
                        <div className='bg-blue-50 p-2 border rounded flex items-center relative focus-within:border-blue-500'>
                                <input type={showConfirmPassword ? "text" : "password"} 
                                id='confirmPassword'
                                name='confirmPassword'
                                placeholder='Enter your confirm password'
                                onChange={handleChange} 
                                className='w-full outline-none' 
                                value={data.confirmPassword}/>
                        
                        <div onClick={()=> setShowConfirmPassword(prev => !prev)} className='cursor-pointer absolute right-3 top-3'>
                         {
                            showConfirmPassword ? (<FaEye/>) : (<FaRegEyeSlash/>)
                         }  
                        </div>
                    </div>
                    </div>
                        <button type="submit" disabled={!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-600" :  "bg-red-500"} text-white py-2 rounded font-semibold my-3 tracking-wide `}>
                            Register
                        </button>
                    
                </form>

                <p>
                    Already have account? <Link to={"/login"} className='font-semibold text-green-700'>Login</Link>
                </p>
            </div>                     
        </section>
    </>
  )
}

export default Register