import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { Input } from '../components/Input.jsx';
import { validateEmail } from '../util/validation.js';
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from '../util/apiEndpoints.js';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector.jsx';
import uploadProfileImage from '../util/uploadProfileImage.js';


const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        //basic validation
        if (!fullName.trim()) {
            setError("Please enter your full name");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter your email address");
            setIsLoading(false);
            return;
        }

        setError("");

        //signup api call
        try {
            //upload image if present
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }

            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });

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
        <div class="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background image with blur effect */}
            <img src={assets.login_bg} alt="Background" className='absolute inset-0 w-full h-full object-cover filter' />

            <div className='relative z-10 w-full max-w-lg px-6'>
                <div className='bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto'>
                    <h3 className='text-2xl text-black text-center mb-2 font-semibold'>
                        Create an account
                    </h3>
                    <p className='text-sm text-slate-700 text-center mb-8'>
                        Start tracking your spendings by joining with us.
                    </p>

                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='flex justify-center mb-6'>
                            <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                label="Full Name"
                                placeholder="Ralo"
                                type="text"
                            />
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="*********"
                                type="password"
                            />
                            <div className='col-span-2'>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email Address"
                                    placeholder="name@example.com"
                                    type="text"
                                />
                            </div>

                        </div>
                        {error && (
                            <p class="text-red-800 text-sm text-center bg-red-100 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`w-full py-3 bg-cyan-500 hover:bg-cyan-700 hover:text-red-200 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
                            {isLoading ? (
                                <>
                                    <LoaderCircle className='animate-spin w-5 h-5' />
                                    Signing Up...
                                </>
                            ) : (
                                "SIGN UP"
                            )}
                        </button>

                        <p className='text-sm text-slate-800 text-center mt-6'>
                            Already have an account?
                            <Link to="/login" className='font-medium text-cyan-600 underline hover:text-cyan-900 transition-colors'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
