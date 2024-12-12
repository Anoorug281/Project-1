import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utilis/Axios';
import SummaryApi from '../common/SummaryApp';
import AxiosToastError from '../utilis/AxiosToastError';
import { Link,useNavigate } from 'react-router-dom';
const ForgotPassword = () => {

    const [data,setData] = useState({
        email : ""
    })

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
                ...SummaryApi.forgot_password,
                data: data // You may also need to pass the form data
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData ({
                    email : ""
                })
                navigate("/verification-otp")
            }
        } catch (error) {
            AxiosToastError(error)
        }
           
    }
  return (
    <>
        <section className=' w-full container mx-auto px-2' >
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='p-4 text-center text-xl font-bold border-2 border-white rounded-lg'>Forgot Password</p>
                <form className='grid gap-4 ' onSubmit={handleSubmit}  >
                    <div className='grid'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter your email' name='email' onChange={handleChange} className='bg-blue-50 p-2 border rounded outline-none focus:border-blue-500' value={data.email}/>
                    </div>
                  
                        <button type="submit" disabled={!validValue} className={`${validValue ? "bg-green-800 hover:bg-green-600" :  "bg-red-500 cursor-pointer"} text-white py-2 rounded font-semibold my-3 tracking-wide `}>
                            Send OTP
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

export default ForgotPassword