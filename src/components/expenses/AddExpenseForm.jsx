import { LoaderCircle } from 'lucide-react';
import EmojiPickerPopup from '../../components/EmojiPickerPopup';
import Input from '../../components/Input';
import React, { useEffect, useState } from 'react'

const AddExpenseForm = ({ onAddExpense, categories }) => {
    const [expense, setExpense] = useState({
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
        setExpense({ ...expense, [key]: value });
    }

    const handleAddExpense = async () => {
        setLoading(true);
        try {
            await onAddExpense(expense);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id }))
        }
    }, [categories, expense.categoryId]);

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />

            <Input
                label="Expense Source"
                placeholder="e.g., Bonus, Freelance, Salary"
                text="text"
                value={expense.value}
                onChange={(e) => handleChange('name', e.target.value)}
            />

            <Input
                label="Amount"
                placeholder="e.g., 1000"
                type='number'
                value={expense.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
            />

            <Input
                label="Category"
                value={expense.categoryId}
                isSelect={true}
                options={categoryOptions}
                onChange={(e) => handleChange('categoryId', e.target.value)}
            />

            <Input
                label="Date"
                placeholder=""
                type='date'
                value={expense.date}
                onChange={(e) => handleChange('date', e.target.value)}
            />

            <div className='flex justify-end mt-6'>
                <button
                    onClick={handleAddExpense}
                    disabled={loading}
                    className='add-btn add-btn-fill cursor-pointer'
                >
                    {loading ? (
                        <>
                            <LoaderCircle className='w-4 h-4 animate-spin' /> Adding...
                        </>
                    ) : (
                        <>
                            Add Expense
                        </>
                    )}
                </button>
            </div>

        </div>
    )
}

export default AddExpenseForm
