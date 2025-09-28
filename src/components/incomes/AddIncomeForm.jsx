import { LoaderCircle } from 'lucide-react';
import EmojiPickerPopup from '../../components/EmojiPickerPopup';
import Input from '../../components/Input';
import React, { useEffect, useState } from 'react'

const AddIncomeForm = ({ onAddIncome, categories }) => {
    const [income, setIncome] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    });

    const [loading, setLoading] = useState(false);

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value });
    }

    const handleAddIncome = async () => {
        setLoading(true);
        try {
            await onAddIncome(income);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !income.categoryId) {
            setIncome((prev) => ({ ...prev, categoryId: categories[0].id }))
        }
    }, [categories, income.categoryId]);

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                label="Income Source"
                placeholder="e.g., Bonus, Freelance, Salary"
                text="text"
                value={income.value}
                onChange={(e) => handleChange('name', e.target.value)}
            />

            <Input
                label="Amount"
                placeholder="e.g., 1000"
                type='number'
                value={income.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
            />

            <Input
                label="Category"
                value={income.categoryId}
                isSelect={true}
                options={categoryOptions}
                onChange={(e) => handleChange('categoryId', e.target.value)}
            />

            <Input
                label="Date"
                placeholder=""
                type='date'
                value={income.date}
                onChange={(e) => handleChange('date', e.target.value)}
            />

            <div className='flex justify-end mt-6'>
                <button
                    onClick={handleAddIncome}
                    disabled={loading}
                    className='add-btn add-btn-fill cursor-pointer'
                >
                    {loading ? (
                        <>
                            <LoaderCircle className='w-4 h-4 animate-spin' /> Adding
                        </>
                    ) : (
                        <>
                            Add Income
                        </>
                    )}
                </button>
            </div>

        </div>
    )
}

export default AddIncomeForm
