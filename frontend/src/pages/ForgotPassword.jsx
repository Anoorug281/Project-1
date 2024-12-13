import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../utilis/Axios';
import SummaryApi from '../common/SummaryApp';
import AxiosToastError from '../utilis/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [data, setData] = useState({ email: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    // Improved email validation regex
    const validValue = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent double submissions
        setLoading(true);

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password,
                data: { email: data.email } // Send only email in the request body
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/verification-otp", { state: data });
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='p-4 text-center text-xl font-bold border-2 border-white rounded-lg'>Forgot Password</p>
                <form className='grid gap-4' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email' 
                            placeholder='Enter your email' 
                            onChange={handleChange} 
                            className='bg-blue-50 p-2 border rounded outline-none focus:border-blue-500' 
                            value={data.email} 
                            required 
                            autoComplete='email'
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={!validValue || loading} 
                        className={`${
                            validValue && !loading ? 
                            "bg-green-800 hover:bg-green-600" : 
                            "bg-gray-400 cursor-not-allowed"
                        } text-white py-2 rounded font-semibold my-3 tracking-wide`}
                    >
                        {loading ? 'Loading...' : 'Send OTP'}
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login" className='font-semibold text-green-700'>Login</Link>
                </p>
            </div>                     
        </section>
    );
};

export default ForgotPassword;
