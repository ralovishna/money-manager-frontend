import { Trash, Upload, User } from "lucide-react";
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewURL, setPreviewURL] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewURL(null);
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-red-100 rounded-full relative">
                    <User className="text-cyan-500" size={40} />

                    <button onClick={onChooseFile} className="w-8 h-8 items-center justify-center text-white rounded-full absolute -bottom-1 -right-2">
                        <Upload size={20} className="text-cyan-500 " />
                    </button>
                </div>
            ) : (
                <div class="relative">
                    <img src={previewURL} alt="Profile photo" className="w-20 h-20 rounded-full object-cover" />
                    <button
                        onClick={handleRemoveImage}
                        className="w-8 h-8 flex items-center justify-center bg-fuchsia-700 text-white rounded-full absolute -bottom-1 -right-2"
                    >
                        <Trash size={20} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector;