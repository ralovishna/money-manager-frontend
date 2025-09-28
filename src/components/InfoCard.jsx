import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className='flex bg-fuchsia-50 p-6 rounded-2xl shadow-md shadow-gray-100 border border-cyan-200/50'>
            <div className={`w-14 h-14 items-center flex justify-center text-[25px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h5 className='text-sm text-gray-500 mb-1'>{label}</h5>
                <span className='text-[20px]'>&#8377;{value}</span>
            </div>
        </div>
    )
}

export default InfoCard
