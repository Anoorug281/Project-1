import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utilis/Axios';
import SummaryApi from '../common/SummaryApp';
import AxiosToastError from '../utilis/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const OtpVerification = () => {
    const [data, setData] = useState(["","","","","",""]);
    const navigate = useNavigate();
    const inputRef =useRef([])
    const location = useLocation()

    console.log("location",location)

    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/reset")
        }
    },[])

    const validValue = data.every(el => el)

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(''),
                    email: email
                }
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData(new Array(6).fill(''));
                navigate("/reset-password");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    

    return (
        <>
            <section className='w-full container mx-auto px-2'>
                <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                    <p className='p-4 text-center text-xl font-bold border-2 border-white rounded-lg'>Enter OTP</p>
                    <form className='grid gap-4' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label htmlFor='otp'>Enter Your OTP</label>
                            <div className='flex items-center gap-1 justify-between mt-3'>
                               { 
                               data.map((element, index )=>{
                                    return(
                                        <input
                                        key={"otp"+index} 
                                        type='text' 
                                        id='otp'
                                        ref={(ref)=>{
                                            inputRef.current[index] = ref
                                            return ref
                                        }}      
                                        value={data[index]}
                                        onChange={(e)=> {
                                            const value = e.target.value
                                            console.log("value",value) 
                                            
                                            const newData = [...data]
                                            newData[index] = value
                                            setData(newData)

                                            if(value && index < 5){
                                                inputRef.current[index+1].focus()
                                            }
                                        }}
                                        maxLength={1}
                                        className='bg-blue-50 p-2 w-full max-w-16 border rounded outline-none focus:border-blue-500 text-center font-bold' 
                                    />
                                    )
                                })
                            }
                            </div>
                           
                        </div>
                        <button 
                            type="submit" 
                            disabled={!validValue} 
                            className={`${validValue ? "bg-green-800 hover:bg-green-600" : "bg-red-500 cursor-not-allowed"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
                        >
                            Verify OTP
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

export default OtpVerification;
