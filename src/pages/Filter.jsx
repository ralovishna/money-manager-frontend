import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import useUser from '../context/hooks/useUser';
import { Search } from 'lucide-react';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import toast from 'react-hot-toast';
import TransactionInfoCard from '../components/TransactionInfoCard';
import moment from 'moment';

const Filter = () => {
    useUser();

    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });

            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch the transactions:", error);
            toast.error(error.message || "Failed to fetch the transactions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Filter Transactions</h2>
                </div>

                <div className="card p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Select the filters</h5>
                    </div>

                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {/* Type */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                            <select
                                id="type"
                                value={type}
                                onChange={e => setType(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        {/* Sort Field */}
                        <div>
                            <label htmlFor="sortField" className="block text-sm font-medium mb-1">Sort Field</label>
                            <select
                                id="sortField"
                                value={sortField}
                                onChange={e => setSortField(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label htmlFor="sortOrder" className="block text-sm font-medium mb-1">Sort Order</label>
                            <select
                                id="sortOrder"
                                value={sortOrder}
                                onChange={e => setSortOrder(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        {/* Keyword Search */}
                        <div className="sm:col-span-1 md:col-span-1 flex items-end">
                            <div className="w-full">
                                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                                <input
                                    id="keyword"
                                    type="text"
                                    value={keyword}
                                    onChange={e => setKeyword(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`ml-2 mb-1 p-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded flex items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <Search size={20} />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="card p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-lg font-semibold">Transactions</h5>
                    </div>

                    {transactions.length === 0 && !loading && (
                        <p className="text-gray-500">Select the filters and submit to filter out the transactions</p>
                    )}

                    {loading && (
                        <p className="text-gray-500">Loading Transactions...</p>
                    )}

                    {!loading && transactions.length > 0 && transactions.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format("Do MMM YYYY")}
                            amount={transaction.amount}
                            type={type}
                            hideDeleteBtn
                        />
                    ))}
                </div>
            </div>
        </Dashboard>
    );
};

export default Filter;
