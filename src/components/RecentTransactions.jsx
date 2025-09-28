import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionInfoCard from './TransactionInfoCard';
import moment from 'moment';

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h4 className='text-lg'>Recent transactions</h4>

                <button className='card-btn' onClick={onMore}>
                    More <ArrowRight className='text-base' size={15} />
                </button>
            </div>
            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map(transaction => (
                    <TransactionInfoCard
                        key={transaction.id}
                        title={transaction.name}
                        icon={transaction.icon}
                        date={moment(transaction.date).format("Do MMM YYYY")}
                        amount={transaction.amount}
                        type={transaction.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions
