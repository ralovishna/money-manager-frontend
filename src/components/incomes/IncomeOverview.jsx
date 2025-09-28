import React, { useEffect, useState } from 'react';
import { prepareLineChartData } from '../../util/util';
import CustomLineChart from '../CustomLineChart';
import { Plus } from 'lucide-react';


const IncomeOverview = ({ transactions, onAddIncome }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareLineChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>
                        Income Overview
                    </h5>
                    <p className='text-xs text-gray-400 mt-0 5'>
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button
                    className='add-btn mb-5 cursor-pointer'
                    onClick={onAddIncome}
                >
                    <Plus size={15} className='text-lg text-purple-500' />{"  "}
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"> Add Income </span>
                </button>
            </div>
            <div className='mt-10'>
                {/* create line chart to show the trends */}
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview
