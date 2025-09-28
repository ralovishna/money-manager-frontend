import { Image, X } from 'lucide-react';
import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerPopup = ({ icon, onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }

    return (
        <div className='flex flex-col items-start gap-5 mb-6 md:flex-row'>
            <div
                onClick={() => setIsOpen(true)}
                className='flex items-center gap-4 cursor-pointer'
            >
                <div className='w-12 h-12 flex items-center justify-center text-2xl bg-cyan-50 text-cyan-500 rounded-lg'>
                    {icon ? (
                        <img src={icon} alt="Icon" className='h-12 w-12' />
                    ) : (
                        <Image />
                    )}

                </div>
                <p className=''>
                    {icon ? "Change icon" : "Pick Icon"}
                </p>
            </div>
            {isOpen && (
                <div className='relative'>
                    <button
                        className='w-7 h-7 items-center flex justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
                        onClick={() => setIsOpen(false)}
                    >
                        <X />
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup
