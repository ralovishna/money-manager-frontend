const CLOUDINARY_CLOUD_NAME = "detm13vni"
export const BASE_URL = "http://localhost:8080/api/v1.0";

export const API_ENDPOINTS = {
    // auth
    LOGIN: "/login",
    REGISTER: "/register",

    // get user
    GET_USER_INFO: "/profile",

    // categories
    GET_ALL_CATEGORIES: "/categories",
    ADD_CATEGORY: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
    CATEGORY_BY_TYPE: (type) => `/categories/${type}`,

    // incomes
    GET_ALL_INCOMES: "/incomes",
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    INCOME_EXCEL_DOWNLOAD: "/incomes/excel/download/income",
    EMAIL_INCOME: "/incomes/email/income-excel",

    // expenses
    GET_ALL_EXPENSE: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    EXPENSE_EXCEL_DOWNLOAD: "/expenses/excel/download/expense",
    EMAIL_EXPENSE: "/expenses/email/expense-excel",

    // filter data
    APPLY_FILTERS: "/filter",

    // dashboard data fetch
    FETCH_DASHBOARD_DATA: "/dashboard",

    // image upload
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
}