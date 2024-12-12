import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utilis/Axios';
import SummaryApi from '../common/SummaryApp';
import { Link,useNavigate } from 'react-router-dom';
import AxiosToastError from '../utilis/AxiosToastError';
const Login = () => {

    const [data,setData] = useState({
        email : "",
        password : ""
    })

    const [showPassword, setShowPassword] = useState(false)
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
    
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data // You may also need to pass the form data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData ({
                    email : "",
                    password : ""
                })
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
           
    }
  return (
    <>
        <section className=' w-full container mx-auto px-2' >
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

                <form className='grid gap-4 ' onSubmit={handleSubmit}  >
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
                            showPassword ? <FaEye/> : <FaRegEyeSlash/>
                         }  
                        </div>
                    </div>
                    <Link to={"/forgot-password"} className='block ml-auto'>Forgot password?</Link>
                    
                    </div>
                        <button type="submit" disabled={!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-600" :  "bg-red-500"} text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}>
                            Login
                        </button>
                </form>
                <p>
                    Don't have account? <Link to={"/register"} className='font-semibold text-green-700'>Register</Link>
                </p>
            </div>                     
        </section>
    </>
  )
}

export default Login