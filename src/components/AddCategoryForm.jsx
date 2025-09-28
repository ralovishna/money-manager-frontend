import React, { useEffect, useState } from 'react'
import Input from './Input';
import EmojiPickerPopup from './EmojiPickerPopup';
import { LoaderCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
    const [category, setCategory] = useState({
        id: null,
        name: "",
        type: "income",
        icon: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory({
                id: initialCategoryData.id || null,
                name: initialCategoryData.name || "",
                type: initialCategoryData.type || "income",
                icon: initialCategoryData.icon || "",
            });
        } else {
            setCategory({ id: null, name: "", type: "income", icon: "" });
        }
    }, [initialCategoryData, isEditing]);


    const categoryTypeOptions = [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" }
    ];

    const handleChange = (key, value) => {
        setCategory({ ...category, [key]: value });
    }

    const handleSubmit = async () => {
        if (!category || typeof category.name !== "string") {
            toast.error("Invalid form state.");
            return;
        }

        if (!category.name.trim()) {
            toast.error("Category name is required.");
            return;
        }

        setLoading(true);
        try {
            await onAddCategory(category);
            if (!isEditing) {
                setCategory({ name: "", type: "income", icon: "" });
            }

        } finally {
            setLoading(false);
        }
    }


    return (
        <div className='p-4'>

            <EmojiPickerPopup
                icon={category.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                label="Category name"
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Freelance, Salary"
                text="text"
                value={category.name}
            />

            <Input
                label="Category type"
                value={category.type}
                onChange={(e) => handleChange("type", e.target.value)}
                isSelect={true}
                options={categoryTypeOptions}
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    onClick={handleSubmit}
                    disabled={loading}
                    className='add-btn add-btn-fill'
                >
                    {loading ? (
                        <>
                            <LoaderCircle className='w-4 h-4 animate-spin' />
                            {isEditing ? "Updating.." : "Adding.."}
                        </>
                    ) : (
                        <>
                            {isEditing ? "Update Category" : "Add Category"}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm
