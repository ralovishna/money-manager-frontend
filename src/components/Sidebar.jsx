import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { User } from 'lucide-react';
import { SIDE_BAR_DATA } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeMenu }) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[60px] z-20'>
            <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl || ""}
                        alt='Profile image'
                        className='w-20 h-20 bg-slate-400 rounded-full'
                    />
                ) : (
                    <User className='w-20 h-20 text-xl' />
                )}
                <h5 className='texgray900\ font-medium leading-6'>
                    {user?.fullName || "Ralo"}
                </h5>
            </div>
            {SIDE_BAR_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-4 text-[15px] text-shadow-indigo-100 py-3 px-6 rounded-lg mb-3 cursor-pointer ${activeMenu === item.label ? "text-amber-50 bg-cyan-500" : ""}`}>
                    <item.icon className='text-xl' />
                    {item.label}
                </button>
            ))
            }
        </div >
    )
}

export default Sidebar
