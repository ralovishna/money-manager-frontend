import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import useUser from '../context/hooks/useUser';
import { Plus } from 'lucide-react';
import CategoryList from '../components/CategoryList';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import AddCategoryForm from '../components/AddCategoryForm';

const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);


    const fetchCategoryDetails = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);

            if (response.status === 200) {
                console.log('categories', response.data);
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong while fetching all categories", error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        // check if the category already exists
        const isDuplicate = categoryData.some((item) =>
            item.name.toLowerCase() === name.trim().toLowerCase()
        );

        if (isDuplicate) {
            toast.error("Category name already exists.");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, { name, type, icon });

            if (response.status === 201) {
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Error adding category", error);
            toast.error(error.response?.data?.message || "Failed to add category.");
        }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        console.log("not hello ", updatedCategory);
        const { id, name, type, icon } = updatedCategory;
        console.log("id:", id, "name:", name, "type:", type, "icon:", icon);



        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!id) {
            toast.error("Category ID is missing for update");
            return;
        }

        try {
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), { name, type, icon });

            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully");
            fetchCategoryDetails();

        } catch (error) {
            console.error("Error updating the category", error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update the category");
        }
    }

    return (
        <Dashboard activeMenu="Category">
            <div
                className='my-5 mx-auto'>
                <div className='justify-between flex items-center mb-5'>
                    <h2 className='text-2xl font-semibold'>
                        All Categories
                    </h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className='add-btn flex items-center gap-1'>
                        <Plus size={15} /> Add Category
                    </button>
                </div>

                <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />

                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add Category"
                >
                    <AddCategoryForm onAddCategory={handleAddCategory} />
                </Modal>

                <Modal
                    isOpen={openEditCategoryModal}
                    onClose={() => {
                        setOpenEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    title="Update Category"
                >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Category
