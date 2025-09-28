import { React, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { Input } from '../components/Input.jsx';
import { API_ENDPOINTS } from '../util/apiEndpoints.js';
import { validateEmail } from '../util/validation.js';
import { AppContext } from '../context/AppContext.jsx';
import axiosConfig from "../util/axiosConfig.jsx";
import toast from 'react-hot-toast';
import { LoaderCircle } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        //basic validation

        if (!validateEmail(email)) {
            setError("Please enter your email address");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("");

        //signin api call
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }

            if (response.status === 201) {
                toast.success("Profile created successfully.");
                navigate("/login");
            }
        } catch (err) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }
            else {
                console.error('Something went wrong', err);
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background image with blur effect */}
            <img src={assets.login_bg} alt="Background" className='absolute inset-0 w-full h-full object-cover filter' />

            <div className='relative z-10 w-full max-w-lg px-6'>
                <div className='bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto'>
                    <h3 className='text-2xl text-black text-center mb-2 font-semibold'>
                        Log into an existing account
                    </h3>
                    <p className='text-sm text-slate-700 text-center mb-8'>
                        Continue tracking your spendings with us.
                    </p>

                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="name@example.com"
                            type="text"
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="*********"
                            type="password"
                        />
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-100 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`w-full py-3 bg-cyan-500 hover:bg-cyan-700 hover:text-red-200 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className='animate-spin w-5 h-5' />
                                    Signing In...
                                </>
                            ) : (
                                "SIGN IN"
                            )}
                        </button>

                        <p className='text-sm text-slate-800 text-center mt-6'>
                            Don't have an account?
                            <Link to="/register" className='font-medium text-cyan-600 underline hover:text-cyan-900 transition-colors'>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
