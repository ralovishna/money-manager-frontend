import { X } from 'lucide-react';
import React from 'react'

const Modal = ({ isOpen, onClose, children, title }) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <div className='fixed inset-0 flex justify-center items-center z-50 h-full w-full overflow-hidden bg-black/40 backdrop-blur-sm'>
                <div className='relative p-4 w-full max-w-2xl max-h-[90vh]'>
                    {/* Modal header */}
                    <div className='relative bg-white rounded-xl shadow-2xl border-gray-100'>
                        {/* Model content */}
                        <div className='items-center flex justify-between p-5 border-b border-gray-100 rounded-t-xl'>
                            <h3 className='text-xl font-semibold text-gray-800'>
                                {title}
                            </h3>

                            <button
                                onClick={onClose}
                                type='button'
                                className='text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 text-sm w-9 h-9 rounded-lg items-center justify-center flex transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'>
                                <X className='w-4 h-4' />
                            </button>
                        </div>

                        {/* Model body */}
                        <div className='p-5 md:p-6 text-gray-700'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
