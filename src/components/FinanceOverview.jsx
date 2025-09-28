import React from 'react';
import { addThousandsSeparator } from '../util/util';
import CustomPieChart from './CustomPieChart';

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    // Define balanceData based on props
    const balanceData = [
        { name: 'Balance', value: totalBalance },
        { name: 'Income', value: totalIncome },
        { name: 'Expense', value: totalExpense },
    ];

    // Tailwind CSS colors (base colors for pie segments)
    const COLORS = ['#164E63', '#14532D', '#7F1D1D']; // bg-cyan-800, bg-green-800, bg-red-800

    return (
        <div className="card p-4 bg-white shadow rounded-lg">
            <div className="flex items-center justify-between mb-5">
                <h5 className="text-lg font-semibold text-gray-800">Financial Overview</h5>
            </div>
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;